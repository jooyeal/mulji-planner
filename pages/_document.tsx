import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <title>물지플래너</title>
      <link rel="manifest" href="/manifest.json" />
      <link
        rel="icon"
        href="/favicon-16x16.png"
        type="image/png"
        sizes="16x16"
      />
      <link
        rel="icon"
        href="/favicon-32x32.png"
        type="image/png"
        sizes="32x32"
      />
      <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
      <meta name="msapplication-TileColor" content="#FF98BA"></meta>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
