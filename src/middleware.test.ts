import { describe, expect, it } from 'vitest';
import { NextRequest } from 'next/server';
import { middleware } from './middleware';

describe('middleware', () => {
  it('redirects uppercase citizen identifiers to lowercase with a permanent redirect', () => {
    const request = new NextRequest('https://metarang.com/fa/citizens/HM-123');
    const response = middleware(request);

    expect(response.status).toBe(301);
    expect(response.headers.get('location')).toBe('https://metarang.com/fa/citizens/hm-123');
  });

  it('does not redirect an already lowercase citizen identifier', () => {
    const request = new NextRequest('https://metarang.com/fa/citizens/hm-123');
    const response = middleware(request);

    expect(response.headers.get('x-middleware-next')).toBe('1');
  });

  it('does not redirect unrelated paths', () => {
    const request = new NextRequest('https://metarang.com/en/articles/example');
    const response = middleware(request);

    expect(response.headers.get('x-middleware-next')).toBe('1');
  });
});
