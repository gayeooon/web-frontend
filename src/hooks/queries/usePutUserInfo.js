import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/axios';

const putUserInfo = async (userInfo) => {
  const response = await instance.put('/member/info', userInfo);
  return response;
};

const usePutUserInfo = () =>
  useMutation({
    mutationFn: putUserInfo,
  });

export default usePutUserInfo;
