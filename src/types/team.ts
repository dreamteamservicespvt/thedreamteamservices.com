export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  order?: number;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface TeamMemberFormData {
  name: string;
  role: string;
  image: string;
  bio: string;
  order?: number;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}
