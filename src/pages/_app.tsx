import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import ScreenSizeProvider from '@/contexts/screenSizeContext';

export default function App({ Component, pageProps }: AppProps) {
  return(
    <ScreenSizeProvider>
      <Component {...pageProps} />
    </ScreenSizeProvider>
  );
}
