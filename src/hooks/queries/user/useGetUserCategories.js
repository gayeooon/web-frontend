import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const getUserCategories = async () => {
  const response = await instance.get('/member/categories');
  return response.result;
};

const useGetUserCategories = (enabled) =>
  useQuery({
    queryKey: ['userCategories'],
    queryFn: getUserCategories,
    enabled,
  });

export default useGetUserCategories;
