export interface ContactType {
  id?: string;
  name: string;
  email: string;
  subject?: string | null;
  message?: string | null;
  created_at?: string;
  user_id?: string;
}