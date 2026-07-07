export type Role = 'portal' | 'admin' | 'docs';

export type User = {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  activeRole: Role;
};

export type Subscriber = User & {
  plan: 'basic' | 'premium';
};
