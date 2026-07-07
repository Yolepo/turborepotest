import { User } from '@repo/types';

export const login = (username: string, password: string): User | null => {
  if (username === 'portal' && password === 'portal') {
    return {
      id: '1',
      name: 'Portal Admin',
      email: 'portal@example.com',
      roles: ['portal'],
      activeRole: 'portal',
    };
  }
  
  if (username === 'admin' && password === 'admin') {
    return {
      id: '2',
      name: 'Admin User',
      email: 'admin@example.com',
      roles: ['admin'],
      activeRole: 'admin',
    };
  }
  
  if (username === 'docs' && password === 'docs') {
    return {
      id: '3',
      name: 'Docs User',
      email: 'docs@example.com',
      roles: ['docs'],
      activeRole: 'docs',
    };
  }

  if (username === 'bob' && password === 'bob') {
    return {
      id: '4',
      name: 'Bob Multi-Roles',
      email: 'bob@example.com',
      roles: ['admin', 'docs'],
      activeRole: 'admin',
    };
  }
  
  return null;
};
