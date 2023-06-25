export type Video = {
    id: number;
    title: string;
    description: string;
    creator_code: string;
    creator_image: string;
    creator_name: string;
    video: string;
    image: string;
    views: number;
    likes: number;
    dislikes: number;
    category_name: string;
    category_slug: string;
    sub_category_name: string;
    sub_category_slug: string;
    created_at: string;
};

export type SingleVideo = {
  data: Video
};

export type VideoData = {
  data: Video[];
  links: {
    first: string;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
  };
};

export type SingleComment = {
  id: number,
  video_id: number,
  user_id: number,
  commenter_name: string,
  commenter_code: string,
  commenter_image: string,
  content: string,
  likes: number,
  dislikes: number,
  created_at: string
};

export type CommentData = {
  data: SingleComment[];
  links: {
    first: string;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
  };
};
export type SearchApiResponseData = {
    id: number;
    title: string;
    description: string;
    creator_code: string;
    creator_image: string;
    video: string;
    image: string;
    views: number;
    likes: number;
    dislikes: number;
    category_name: string;
    category_slug: string;
    sub_category_name: string;
    sub_category_slug: string;
    created_at: string;
}

export type SearchApiResponse = {
  data: SearchApiResponseData[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    path: string;
    per_page: number;
    to: number;
  };
}
export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export type CategoryData = {
  data: Category[];
};
export type LoginError = {
  email: string,
  password: string,
};
export type RegisterError = {
  name: string,
  email: string,
  password: string,
};
export type ForgotError = {
  password: string,
  token: string,
  email: string,
};
export type SendCommentError = {
  content: string,
};

export type ProfilePhoto = {
  id: number;
  imageable_type: string; 
  imageable_id: number;
  url: string;
  created_at: string;
  updated_at: string;
}

export type Kyc = {
  nationality: string;
  fname: string; 
  lname: string;
  birth_date: string;
  phone: string;
  email: string;
  address: string;  
}

export type LevelsImages = {
  images: string[];
}

export type Level = {
  name: string;
  slug: string;
  levels_images: LevelsImages;
}

export type CitizenData = {
  profilePhotos: ProfilePhoto[];
  kyc: Kyc;
  code: string;
  name: string;  
  position: string;
  registered_at: string;
  score: number;
  score_percentage_to_next_level: number;   
  level: Level;
  avatar: string;    
}
export type CitizenResponse = {
  data: CitizenData;
}