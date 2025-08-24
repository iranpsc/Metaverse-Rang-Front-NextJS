// types/EventItem.ts

// تایپ اصلی داده دریافتی از API
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

// تایپ خروجی داده مپ‌شده
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
  btnName:any
}

// تابع تبدیل EventItem به MappedEventItem
export function mapEvents(items: EventItem[]): MappedEventItem[] {
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
    btnName:item.btn_name,
  }));
}

// تایپ props کامپوننت تقویم
export interface CalendarProps {
  mainData: any;
  params: any;
  token: string | null;
  events:any;
}

// تایپ props برای فیلتر کردن رویدادها
export interface CalendarFilterProps {
  events: MappedEventItem[];
  mainData: any;
  params: any;
  token: string | null;
}
