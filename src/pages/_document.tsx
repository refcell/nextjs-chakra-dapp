import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html >
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <title>Nextjs Chakra Dapp Template</title>
          <meta
            name="description"
            content="Nextjs Chakra Dapp Template."
          />
          <meta name="author" content="Andreas Bigger <andreas@nascent.xyz>" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript initialColorMode='dark' />
          <Main />
          <NextScript />
          <style jsx global>{`
            html, body {
              min-height: 100%;
              height: 100%;
            }

            #__next {
              height: 100%;
              min-height: 100%;
            }
          `}</style>
        </body>
      </Html>
    )
  }
}
