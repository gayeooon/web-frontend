import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';

const putUserCategories = async (userCategories) => {
  return await instance.put('/member/categories', userCategories);
};

const usePutUserCategories = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: putUserCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userCategories'],
      });
    },
  });
};

export default usePutUserCategories;
