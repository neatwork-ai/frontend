import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === "/") {
        document.body.style.overflow = 'hidden !important';
      } else {
        document.body.style.overflow = 'auto';
      }
    };

    // Set initial overflow style
    handleRouteChange(router.pathname);

    // Add route change complete event listener
    router.events.on('routeChangeComplete', handleRouteChange);

    // Cleanup the listener when the component is unmounted
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return <Component {...pageProps} />;
}

export default MyApp;
