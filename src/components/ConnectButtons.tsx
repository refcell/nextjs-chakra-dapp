import { Flex, Heading, Container, Image, Button } from '@chakra-ui/react'
import cn from "classnames";

const ConnectButtons = ({ injected, activate, setWorking }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="auto"
      p={4}
      m={0}
    >
      <Container
        flexDirection="column"
        width="100%"
      >
        <Heading mx={8} as="h4" size="lg">Connect wallet</Heading>
        <Container
          flexDirection="row"
          width="100%"
          justifyContent={'center'}
          display={'flex'}
        >
          <Button
            variant="outline"
            colorScheme="orange"
            mt={4}
            mx={'1em'}
            w={'100%'}
            onClick={() => {
              setWorking(true);
              activate(injected);
            }}
            >
            <Image m={'0.3em'} h={5} w={5} src="/metamask-fox.svg" />
            Metamask
          </Button>
          <Button
            variant="outline"
            colorScheme="blue"
            mt={4}
            mx={'1em'}
            w={'100%'}
            onClick={() => {
              setWorking(true);
              activate(injected);
            }}
            >
            <Image m={'0.3em'} h={5} w={5} src="/walletconnect-logo.svg" />
            WalletConnect
          </Button>
        </Container>
      </Container>
    </Flex>
  );
}

export default ConnectButtons;