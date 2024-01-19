import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import ScreenSizeProvider from '@/contexts/screenSizeContext';
import AuthContextProvider from '@/contexts/authContext';

export default function App({ Component, pageProps }: AppProps) {
  return(
      <ScreenSizeProvider>
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
      </ScreenSizeProvider>
  );
}
