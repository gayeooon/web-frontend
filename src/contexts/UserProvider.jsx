import { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import axios from '@/lib/axios';
import { PageSpinner } from '@/components/ui/custom/Loading';

const UserContext = createContext(null);
const EXCLUDED_PATHS = [
  '/login',
  '/member/oauth/kakao',
  '/member/oauth/google',
  '/member/oauth/naver',
];

export function UserProvider({ children }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = router.pathname;
  const [isEnabled, setIsEnabled] = useState(
    !EXCLUDED_PATHS.includes(pathname)
  );

  useEffect(() => {
    setIsEnabled(!EXCLUDED_PATHS.includes(pathname));
  }, [pathname]);

  const { data: userProfile = {}, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['userProfile'],
    queryFn: () => axios.get('/member/info'),
    select: ({ result }) => ({
      name: result?.name ?? '',
      email: result?.email ?? '',
      phone: result?.phone ?? '',
      birth: result?.birth?.split('T')[0] ?? '',
      gender: result?.gender ?? '',
    }),
    enabled: isEnabled,
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => axios.get('/member/categories'),
    select: (data) => data.result,
    enabled: isEnabled,
  });

  const { data: publishers = [], isLoading: isLoadingPublishers } = useQuery({
    queryKey: ['publishers'],
    queryFn: () => axios.get('/member/press'),
    select: (data) => data.result,
    enabled: isEnabled,
  });

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

  if (isLoadingProfile || isLoadingCategories || isLoadingPublishers) {
    return <PageSpinner />;
  }

  return (
    <UserContext.Provider
      value={{
        userProfile,
        categories,
        publishers,
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
