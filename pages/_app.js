import { useRouter } from 'next/router';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navbar';
import '@/styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith('/admin');

  return (
    <SessionProvider session={session}>
      {!isAdminPage && <Navbar />}
      <Component {...pageProps} />
    </SessionProvider>
  );
}
