import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/axios';
import { useToaster } from '@/contexts/ToasterProvider';

const postArticleLike = async (articleId) => {
  const response = await instance.post(`/articles/${articleId}/likes`);
  return response.result;
};

const usePostArticleLike = (articleId) => {
  const toast = useToaster();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postArticleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
      toast('info', '좋아요를 눌렀습니다.');

      // 선호도 표시
      // axios.post(`/articles/${articleId}/rate`, {
      //   preference: 2,
      // });
    },
    onError: (error) => {
      console.error('Error:', error);
      toast('error', '지원되지 않는 기능입니다.');
    },
  });
};

export default usePostArticleLike;
