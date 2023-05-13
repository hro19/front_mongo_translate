import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactModal from "react-modal";

export default function App({ Component, pageProps }: AppProps) {
  ReactModal.setAppElement("#__next");

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
