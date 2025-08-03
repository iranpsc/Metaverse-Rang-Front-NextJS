export interface EventItem {
  id: number;
  title: string;
  description: string;
  desc: string; 
  starts_at: string;
  ends_at: string;
  start: string;
  end: string;
  btn_link?: string;
  link?: string;
  btn_name?: string;
  color?: string;
  disLikes: number;
  dislikes: number;
  likes: number;
  image?: string;
  views: number;
  userLiked: boolean;
  userDisLiked: boolean;
  user_interaction: {
    has_liked: boolean;
    has_disliked: boolean;
  } | null;
}

export interface CalendarProps {
  mainData: any;
  params: any;
  events: EventItem[];
  token: string | null;
}
export interface CalendarFilterProps {
  events: EventItem[];
  mainData: any;
  params: any;
  selectedFilters: any;
  token: string | null;
}
