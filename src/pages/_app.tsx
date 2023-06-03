import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as JotaiProvider } from "jotai";

const queryClient = new QueryClient();

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import ReactModal from "react-modal";

export default function App({ Component, pageProps }: AppProps) {
  ReactModal.setAppElement("#__next");

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </JotaiProvider>
  );
}
