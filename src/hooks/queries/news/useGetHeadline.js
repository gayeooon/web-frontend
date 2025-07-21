import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/axios';

const getHeadline = async () => {
  const response = await instance.get('/articles/headLine');
  return response.result;
};

const useGetHeadline = () =>
  useQuery({
    queryKey: ['headlines'],
    queryFn: getHeadline,
  });

export default useGetHeadline;
