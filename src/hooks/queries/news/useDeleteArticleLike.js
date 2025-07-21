import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';
import { useToaster } from '@/contexts/ToasterProvider';

const deleteArticleLike = async (articleId) => {
  const response = await instance.delete(`/articles/${articleId}/likes`);
  return response.result;
};

const useDeleteArticleLike = (articleId) => {
  const toast = useToaster();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteArticleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      toast('info', '좋아요가 취소되었습니다');

      // 선호도 표시
      // axios.delete(`/articles/${articleId}/rate`, {
      //   preference: 0,
      // });
    },
    onError: (error) => {
      console.error('Error:', error);
      toast('error', '네트워크 오류가 발생했습니다.');
    },
  });
};

export default useDeleteArticleLike;
