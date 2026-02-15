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
