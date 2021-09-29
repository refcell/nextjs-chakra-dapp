import { Link as ChakraLink, Button, Text } from '@chakra-ui/react'

import { Container } from './'

const CTA = () => (
  <Container
    flexDirection="row"
    bottom="0"
    width="100%"
    mt='auto'
    pb={2}
  >
      <Container
      flexDirection="column"
      width="100%"
      pb={4}
    >
        <Container
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
          py={3}
        >
        <ChakraLink
          isExternal
          href="https://github.com/abigger87/nextjs-chakra-dapp"
          flexGrow={0}
          mx={2}
        >
          <Button width="100%" variant="outline" colorScheme="green">
            Github
          </Button>
        </ChakraLink>
      </Container>
      <Text>Built with ❤️ by <ChakraLink color="blue.500" isExternal href="https://twitter.com/andreasbigger">Andreas Bigger</ChakraLink> @ <ChakraLink color="#4fa682" isExternal href="https://nascent.xyz">Nascent</ChakraLink> </Text>
      <Text>Say thanks by donating to <ChakraLink color="blue.500" isExternal href="https://thegivingblock.com/donate/">The Giving Block Charities</ChakraLink>{" "} ❤️</Text>
    </Container>
  </Container>
)

export default CTA