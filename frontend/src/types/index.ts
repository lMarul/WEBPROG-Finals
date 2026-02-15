export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
  updated_at?: string;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar?: string;
  email?: string;
  location?: string;
  socialLinks: SocialLink[];
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}
