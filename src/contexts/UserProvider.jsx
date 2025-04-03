import { createContext, useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import axios from '@/lib/axios';

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const queryClient = useQueryClient();

  const updateUserProfile = useMutation({
    mutationFn: (data) => axios.put('/member/info', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
    },
  });

  const updateUserCategories = useMutation({
    mutationFn: (data) => axios.put('/member/categories', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const updateUserPublishers = useMutation({
    mutationFn: (data) => axios.put('/member/press', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['publishers'] });
    },
  });

  return (
    <UserContext.Provider
      value={{
        updateUserProfile,
        updateUserCategories,
        updateUserPublishers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
