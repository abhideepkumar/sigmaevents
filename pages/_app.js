import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import '@fontsource-variable/quicksand';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Navbar/>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
