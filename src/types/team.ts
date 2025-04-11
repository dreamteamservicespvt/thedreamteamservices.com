export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  createdAt?: any;
  updatedAt?: any;
}

export type TeamMemberFormData = Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>;
