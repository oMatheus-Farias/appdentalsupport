import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import ScreenSizeProvider from '@/contexts/screenSizeContext';
import AuthContextProvider from '@/contexts/authContext';

import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {
  return(
      <ScreenSizeProvider>
        <AuthContextProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
          />
          <Component {...pageProps} />
        </AuthContextProvider>
      </ScreenSizeProvider>
  );
}
