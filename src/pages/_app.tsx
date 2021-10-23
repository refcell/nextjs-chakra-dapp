import { ChakraProvider } from '@chakra-ui/react'
import Head from "next/head";
import theme from '../theme'
import { AppProps } from 'next/app'
import 'material-react-toastify/dist/ReactToastify.css';
import { Web3ContextProvider } from "src/contexts/Web3Context";

import LogRocket from "logrocket";
// @ts-ignore
import { version } from "../../package.json";
export { version };

if (process.env.NODE_ENV === "production") {
  console.log("Connecting to LogRocket...");
  LogRocket.init(process.env.LOG_ROCKET_ID, {
    console: {
      shouldAggregateConsoleErrors: true,
    },
    release: version,
  });
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Nextjs Chakra Dapp</title>
      </Head>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
      <style jsx global>{`
        html,
        body {
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
