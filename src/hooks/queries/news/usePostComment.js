import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';
import { useToaster } from '@/contexts/ToasterProvider';

const postComment = async ({ articleId, comment }) => {
  const response = await instance.post(`/articles/${articleId}/comments`, {
    comment,
  });
  return response.result;
};

const usePostComment = (articleId) => {
  const toast = useToaster();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      toast('info', '댓글이 등록되었습니다.');
    },
    onError: (error) => {
      console.error('Error:', error);
      toast('error', '지원되지 않는 기능입니다.');
    },
  });
};

export default usePostComment;
