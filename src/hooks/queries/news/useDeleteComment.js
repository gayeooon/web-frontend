import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';
import { useToaster } from '@/contexts/ToasterProvider';

const deleteComment = async ({ articleId, commentId }) => {
  const response = await instance.delete(
    `/articles/${articleId}/comments/${commentId}`
  );
  return response.result;
};

const useDeleteComment = (articleId) => {
  const toast = useToaster();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      toast('info', '댓글을 삭제했습니다.');
    },
    onError: (error) => {
      console.error('Error:', error);
      toast('error', '지원되지 않는 기능입니다.');
    },
  });
};

export default useDeleteComment;
