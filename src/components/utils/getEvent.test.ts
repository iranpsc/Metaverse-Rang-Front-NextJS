import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mocks/server';

const API_URL = 'https://dev-api.metarang.com';

const event = {
  id: 17,
  title: 'Test event',
  description: 'Event description',
  starts_at: '2026-11-01T10:00:00Z',
  ends_at: '2026-11-02T10:00:00Z',
  btn_link: '/events/17',
  btn_name: 'Read more',
  color: '#123456',
  dislikes: 2,
  likes: 8,
  image: '/event.webp',
  views: 120,
  user_interaction: { has_liked: true, has_disliked: false },
};

describe('calendar event data actions', () => {
  let getAllEvents: typeof import('./getEvent').getAllEvents;
  let getEventById: typeof import('./getEvent').getEventById;

  beforeEach(async () => {
    vi.stubEnv('NEXT_PUBLIC_API_BASE_URL', API_URL);
    vi.resetModules();
    const actions = await import('./getEvent');
    getAllEvents = actions.getAllEvents;
    getEventById = actions.getEventById;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('maps the event list returned by the calendar API', async () => {
    server.use(
      http.get(`${API_URL}/api/calendar`, () =>
        HttpResponse.json({ data: [event] }),
      ),
    );

    await expect(getAllEvents()).resolves.toEqual([
      {
        id: 17,
        title: 'Test event',
        image: '/event.webp',
        link: '/events/17',
        desc: 'Event description',
        start: event.starts_at,
        end: event.ends_at,
        color: '#123456',
        views: 120,
        likes: 8,
        disLikes: 2,
        userLiked: true,
        userDisLiked: false,
        btnName: 'Read more',
      },
    ]);
  });

  it('returns an empty list when the events endpoint fails', async () => {
    server.use(
      http.get(`${API_URL}/api/calendar`, () =>
        HttpResponse.json({ message: 'Unavailable' }, { status: 503 }),
      ),
    );

    await expect(getAllEvents()).resolves.toEqual([]);
  });

  it('maps a single event and defaults missing interaction flags to false', async () => {
    server.use(
      http.get(`${API_URL}/api/calendar/events/:id`, () =>
        HttpResponse.json({
          data: { ...event, user_interaction: null },
        }),
      ),
    );

    await expect(getEventById('17')).resolves.toMatchObject({
      id: 17,
      title: 'Test event',
      userLiked: false,
      userDisLiked: false,
    });
  });

  it('returns null when a single event does not exist', async () => {
    server.use(
      http.get(`${API_URL}/api/calendar/events/:id`, () =>
        HttpResponse.json({ message: 'Not found' }, { status: 404 }),
      ),
    );

    await expect(getEventById('missing')).resolves.toBeNull();
  });

  it('returns null when the single-event payload has no data', async () => {
    server.use(
      http.get(`${API_URL}/api/calendar/events/:id`, () =>
        HttpResponse.json({ data: null }),
      ),
    );

    await expect(getEventById('17')).resolves.toBeNull();
  });

  it('returns an empty list when the events response contains malformed JSON', async () => {
    server.use(
      http.get(`${API_URL}/api/calendar`, () =>
        new HttpResponse('{broken', {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      ),
    );

    await expect(getAllEvents()).resolves.toEqual([]);
  });
});
