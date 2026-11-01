// types/EventItem.ts

// API response shape consumed by the calendar pages.
export interface EventItem {
  id: number;
  title: string;
  description: string;
  starts_at: string;
  ends_at: string;
  btn_link?: string;
  btn_name?: string;
  color?: string;
  dislikes: number;
  likes: number;
  image?: string;
  views: number;
  user_interaction: {
    has_liked: boolean;
    has_disliked: boolean;
  } | null;
}

export interface MappedEventItem {
  id: number;
  title: string;
  image?: string;
  link?: string;
  desc: string;
  start: string;
  end: string;
  color?: string;
  views: number;
  likes: number;
  disLikes: number;
  userLiked: boolean;
  userDisLiked: boolean;
  btnName: any;
}

function assertEventItems(items: unknown): asserts items is EventItem[] {
  if (!Array.isArray(items)) {
    throw new TypeError(
      `Invalid calendar API response: expected an events array, received ${items === null ? "null" : typeof items}`,
    );
  }

  items.forEach((item, index) => {
    if (
      !item ||
      typeof item !== "object" ||
      typeof item.id !== "number" ||
      typeof item.title !== "string" ||
      typeof item.description !== "string" ||
      typeof item.starts_at !== "string" ||
      typeof item.ends_at !== "string"
    ) {
      throw new TypeError(
        `Invalid calendar API response: event at index ${index} is missing required fields`,
      );
    }
  });
}

/**
 * Converts the backend event contract to the shape used by calendar UI.
 * Invalid API payloads fail explicitly instead of causing an opaque map error.
 */
export function mapEvents(items: EventItem[]): MappedEventItem[] {
  assertEventItems(items);

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    image: item.image,
    link: item.btn_link,
    desc: item.description,
    start: item.starts_at,
    end: item.ends_at,
    color: item.color,
    views: item.views,
    likes: item.likes,
    disLikes: item.dislikes,
    userLiked: item.user_interaction?.has_liked ?? false,
    userDisLiked: item.user_interaction?.has_disliked ?? false,
    btnName: item.btn_name,
  }));
}

export interface CalendarProps {
  mainData: any;
  params: any;
  token: string | null;
  events: any;
}

export interface CalendarFilterProps {
  events: MappedEventItem[];
  mainData: any;
  params: any;
  token: string | null;
}
