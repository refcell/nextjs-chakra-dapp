import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import { AppProps } from 'next/app'
import 'material-react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
      <style jsx global>{`
            html, body {
              min-height: 100%;
              height: 100%;
              font-family: Azeret Mono, monospace;
            }

            #__next {
              height: 100%;
              min-height: 100%;
            }
          `}</style>
    </ChakraProvider>
  )
}

export default MyApp
