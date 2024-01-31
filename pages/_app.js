import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import '@fontsource-variable/quicksand';
import { Toaster,toast } from "react-hot-toast";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const shouldRenderNavbar = !router.pathname.startsWith("/admin");
  return (
    <SessionProvider session={session}>
      <Toaster/>
      {shouldRenderNavbar && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
