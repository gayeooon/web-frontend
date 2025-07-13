import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const getUserPublishers = async () => {
  const response = await instance.get('/member/press');
  return response.result;
};

const useGetUserPublishers = (enabled) =>
  useQuery({
    queryKey: ['userPublishers'],
    queryFn: getUserPublishers,
    enabled,
  });

export default useGetUserPublishers;
