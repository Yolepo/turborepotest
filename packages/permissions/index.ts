import { User } from '@repo/types';
import { defineAbility, AnyAbility } from '@casl/ability';
import { createContext } from 'react';
import { createContextualCan } from '@casl/react';

export const defineAbilityFor = (user: User) => {
  return defineAbility((can, cannot) => {
    if (user.activeRole === 'portal') {
      can('manage', 'all'); // Portal user can access everything
    } else if (user.activeRole === 'admin') {
      can('read', 'AdminApp');
      can('read', 'ModuleAbonnes');
      can('read', 'ModuleRC');
      cannot('write', 'ModuleRC');
    } else if (user.activeRole === 'docs') {
      can('read', 'DocsApp');
      can('read', 'ModuleRC');
      can('', 'ModuleRC');
    }
  });
};

export const AbilityContext = createContext<AnyAbility>({} as AnyAbility);
export const Can = createContextualCan(AbilityContext.Consumer);
