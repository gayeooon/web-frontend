import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthProvider } from '@/contexts/AuthProvider';
import ScrollToTop from '@/components/ui/custom/ScrollToTop';
import ToasterProvider from '@/contexts/ToasterProvider';
import './globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ToasterProvider>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </ToasterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
