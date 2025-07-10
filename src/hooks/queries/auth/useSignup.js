import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/axios';

const signup = async (formData) => {
  return await instance.post('/auth/signup', formData);
};

const useSignup = () =>
  useMutation({
    mutationFn: signup,

    onSuccess: () => {
      window.location.replace('/');
    },

    onError: (error) => {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    },
  });

export default useSignup;
