export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "new" | "in-progress" | "resolved";
  createdAt: Date | null;
  updatedAt?: Date | null;
  response?: string;
}

export const INQUIRY_STATUS = [
  'new',
  'in-progress',
  'resolved'
] as const;
