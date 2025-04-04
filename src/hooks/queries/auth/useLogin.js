import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/axios';

const useLogin = () =>
  useMutation({
    mutationFn: (fetchURL) => instance.get(fetchURL),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.result.accessToken);
      localStorage.setItem('refreshToken', response.result.refreshToken);
      if (response.statusCode === 200)
        window.location.replace('/', { replace: true });
      else if (response.statusCode === 201) window.location.replace('/signup');
    },
    onError: (error) => {
      console.log('Login error:', error);
      window.location.replace('/login');
    },
  });

export default useLogin;
