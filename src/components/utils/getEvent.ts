// utils/getEvent.ts
import { EventItem, MappedEventItem, mapEvents } from "@/utils/mapEvents";

const BASE = "https://api.rgb.irpsc.com/api";

// گرفتن تمام ایونت‌ها
export async function getAllEvents(): Promise<MappedEventItem[]> {
  try {
    const res = await fetch(`${BASE}/calendar?type=event`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const json = await res.json();
    const items: EventItem[] = json.data;
    return mapEvents(items);
  } catch (e) {
    console.error("خطا در گرفتن لیست ایونت‌ها:", e);
    return [];
  }
}

// گرفتن یک ایونت بر اساس id
export async function getEventById(id: string): Promise<MappedEventItem | null> {
  try {
    const res = await fetch(`${BASE}/calendar/events/${id}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    const item: EventItem = json.data;
    if (!item) return null;

    return {
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
    };
  } catch (e) {
    console.error("خطا در گرفتن ایونت:", e);
    return null;
  }
}
