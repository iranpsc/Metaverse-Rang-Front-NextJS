import { afterEach, describe, expect, it, vi } from 'vitest';
import type { NextRequest } from 'next/server';
import { getUserData } from '@/components/utils/actions';
import { GET } from './route';

vi.mock('@/components/utils/actions', () => ({
  getUserData: vi.fn(),
}));

const makeRequest = () =>
  new Request('http://localhost/fa/api/citizen/100') as NextRequest;

const makeContext = (id: string) => ({
  params: Promise.resolve({ id }),
});

describe('GET /api/citizen/[id]', () => {
  afterEach(() => vi.clearAllMocks());

  it('returns the citizen payload from the Go API', async () => {
    vi.mocked(getUserData).mockResolvedValue({ data: { id: '100', code: 'TEST' } } as never);

    const response = await GET(makeRequest(), makeContext('100'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({
      data: { id: '100', code: 'TEST' },
    });
    expect(getUserData).toHaveBeenCalledWith('100');
  });

  it('returns 404 when the citizen does not exist', async () => {
    vi.mocked(getUserData).mockResolvedValue({ data: null } as never);

    const response = await GET(makeRequest(), makeContext('missing'));

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toMatchObject({ error: 'Citizen not found' });
  });

  it('returns 500 when the backend action throws', async () => {
    vi.mocked(getUserData).mockRejectedValue(new Error('backend unavailable'));

    const response = await GET(makeRequest(), makeContext('100'));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toHaveProperty('error');
  });
});
