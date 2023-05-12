import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import ReactModal from "react-modal";

export default function App({ Component, pageProps }: AppProps) {
  ReactModal.setAppElement("#__next");

  return <Component {...pageProps} />
}
