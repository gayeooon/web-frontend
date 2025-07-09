import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
    <ToasterProvider>
      <Component {...pageProps} />
      <ReactQueryDevtools initialIsOpen={false} />
    </ToasterProvider>
  </QueryClientProvider>
);

export default App;
