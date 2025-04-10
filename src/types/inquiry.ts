export interface Inquiry {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
}

export const INQUIRY_STATUS = [
  'new',
  'in-progress',
  'resolved'
] as const;
