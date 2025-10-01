export type UserAttributes = {
  id: string;
  username: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  active: boolean;
  address?: string;
};