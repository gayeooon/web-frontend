import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/axios';

const deleteUser = async () => {
  return await instance.delete('/auth/delete');
};

const useDeleteUser = () =>
  useMutation({
    mutationFn: deleteUser,
  });

export default useDeleteUser;
