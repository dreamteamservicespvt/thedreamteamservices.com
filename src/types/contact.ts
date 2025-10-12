export interface ContactInquiry {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
}
