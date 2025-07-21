import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToasterProvider from '@/contexts/ToasterProvider';
import './globals.css';
import { useState } from 'react';

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: false,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ToasterProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ToasterProvider>
    </QueryClientProvider>
  );
};

export default App;
