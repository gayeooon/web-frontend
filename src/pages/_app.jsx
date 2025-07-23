import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ToasterProvider from '@/contexts/ToasterProvider';
import { useState } from 'react';
import ErrorBoundary from '@/components/ui/custom/ErrorBoundary';
import { DefaultErrorFallback } from '@/components/ui/custom/ErrorFallback';
import './globals.css';

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

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ErrorBoundary errorFallback={DefaultErrorFallback} onReset={handleReload}>
      <QueryClientProvider client={queryClient}>
        <ToasterProvider>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </ToasterProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
