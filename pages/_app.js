import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import '@fontsource-variable/quicksand';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const shouldRenderNavbar = !router.pathname.startsWith("/admin");
  return (
    <SessionProvider session={session}>
      {shouldRenderNavbar && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
