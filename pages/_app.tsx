import "../styles/globals.css";
import type { AppProps } from "next/app";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <div className="p-4 pt-20">
        <Component {...pageProps} />
      </div>
    </>
  );
}
