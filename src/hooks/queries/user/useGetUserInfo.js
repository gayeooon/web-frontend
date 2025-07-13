import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const getUserInfo = async () => {
  const response = await instance.get('/member/info');
  return response.result;
};

const useGetUserInfo = (enabled) =>
  useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
    select: (data) => ({
      name: data.name ?? '',
      email: data.email ?? '',
      phone: data.phone ?? '',
      birth: data.birth ?? '',
      gender: data.gender ?? '',
    }),
    enabled,
  });

export default useGetUserInfo;
