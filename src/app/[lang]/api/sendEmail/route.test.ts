import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';

vi.mock('nodemailer', () => ({
  default: { createTransport: vi.fn() },
}));

import nodemailer from 'nodemailer';
import { POST } from './route';

const transport = {
  verify: vi.fn(),
  sendMail: vi.fn(),
};

const makeRequest = (formData: Record<string, unknown>, startTime = Date.now() - 5_000) =>
  new Request('http://localhost/fa/api/sendEmail', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ formData, startTime }),
  }) as NextRequest;

const validForm = {
  name: 'Test User',
  email: 'test@example.com',
  phoneNo: '09120000000',
  title: 'Test message',
  message: 'This is a deterministic contact form test.',
  website: '',
};

describe('POST /api/sendEmail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(nodemailer.createTransport).mockReturnValue(transport as never);
    transport.verify.mockResolvedValue(true);
    transport.sendMail.mockResolvedValue({ messageId: 'mock-message-id' });
    vi.stubEnv('SMTP_HOST', '127.0.0.1');
    vi.stubEnv('SMTP_PORT', '1025');
    vi.stubEnv('SMTP_USER', 'mock-user');
    vi.stubEnv('SMTP_PASS', 'mock-password');
    vi.stubEnv('EMAIL_FROM', 'noreply@example.test');
    vi.stubEnv('EMAIL_TO', 'inbox@example.test');
  });

  afterEach(() => vi.unstubAllEnvs());

  it('silently accepts honeypot submissions without opening SMTP', async () => {
    const response = await POST(makeRequest({ ...validForm, website: 'spam-bot' }));

    expect(response.status).toBe(200);
    expect(nodemailer.createTransport).not.toHaveBeenCalled();
  });

  it('rate-limits submissions sent in less than three seconds', async () => {
    const response = await POST(makeRequest(validForm, Date.now() - 1_000));

    expect(response.status).toBe(429);
    expect(nodemailer.createTransport).not.toHaveBeenCalled();
  });

  it('rejects a missing form payload', async () => {
    const response = await POST(makeRequest({}));

    expect(response.status).toBe(400);
  });

  it('rejects missing required fields', async () => {
    const response = await POST(makeRequest({ name: 'Test', email: '', message: '' }));

    expect(response.status).toBe(400);
  });

  it('rejects malformed email addresses', async () => {
    const response = await POST(makeRequest({ ...validForm, email: 'not-an-email' }));

    expect(response.status).toBe(400);
  });

  it('rejects oversized name and message values', async () => {
    const nameResponse = await POST(makeRequest({ ...validForm, name: 'n'.repeat(101) }));
    const messageResponse = await POST(makeRequest({ ...validForm, message: 'm'.repeat(2001) }));

    expect(nameResponse.status).toBe(400);
    expect(messageResponse.status).toBe(400);
  });

  it('sends a valid contact message through the configured SMTP transport', async () => {
    const response = await POST(makeRequest(validForm));

    expect(response.status).toBe(200);
    expect(nodemailer.createTransport).toHaveBeenCalledOnce();
    expect(transport.verify).toHaveBeenCalledOnce();
    expect(transport.sendMail).toHaveBeenCalledOnce();
    expect(transport.sendMail.mock.calls[0][0]).toMatchObject({
      to: 'inbox@example.test',
      subject: 'Contact Form: Test message',
    });
  });

  it('returns 500 when SMTP verification fails', async () => {
    transport.verify.mockRejectedValueOnce(new Error('SMTP unavailable'));

    const response = await POST(makeRequest(validForm));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({ message: 'خطا در ارسال پیام' });
  });
});
