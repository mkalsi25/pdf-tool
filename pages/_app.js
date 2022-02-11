import { QueryClient, QueryClientProvider } from "react-query";
import "../styles/global.css";
function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
}

export default MyApp;
