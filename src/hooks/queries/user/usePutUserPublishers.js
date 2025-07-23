import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';

const putUserPublishers = async (userPublishers) => {
  return await instance.put('/member/press', userPublishers);
};

const usePutUserPublishers = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserPublishers,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userPublishers'],
      });
    },
  });
};

export default usePutUserPublishers;
