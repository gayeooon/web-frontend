import { createContext, useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from '@/lib/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const login = useMutation({
    mutationFn: (fetchURL) => axios.get(fetchURL),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.result.accessToken);
      localStorage.setItem('refreshToken', response.result.refreshToken);
      if (response.statusCode === 200)
        window.location.replace('/', { replace: true });
      else if (response.statusCode === 201) window.location.replace('/signup');
    },
    onError: (error) => {
      console.log('Login error:', error);
      navigate('/login', { replace: true });
    },
  });

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login', { replace: true });
  };

  const deleteUser = useMutation({
    mutationFn: () => axios.delete('/member/delete'),
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login', { replace: true });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('반드시 AuthPrvider 안에서 사용해야 합니다.');
  }

  return context;
}
