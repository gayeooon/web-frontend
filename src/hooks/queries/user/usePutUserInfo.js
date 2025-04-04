import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';

const putUserInfo = async (userInfo) => {
  return await instance.put('/member/info', userInfo);
};

const usePutUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userInfo'],
      });
    },
  });
};

export default usePutUserInfo;
