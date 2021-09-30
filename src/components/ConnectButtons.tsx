import { Flex, Heading, Container } from '@chakra-ui/react'
import cn from "classnames";

const ConnectButtons = ({ activate, setWorking }) => {
  const cls =
    "btn bg-white dark:bg-gray-900 rounded-full inline-flex images-center space-x-2 shadow-md border w-100 md:w-auto text-base font-normal";

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
        <Heading as="h3" size="lg">Connect wallet</Heading>
        <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-2">
          <button
            onClick={() => {
              setWorking(true);
              activate(injected);
            }}
            className={cn(cls, "text-yellow-600 border-yellow-600")}
          >
            <img src="/metamask-fox.svg" className="h-5 w-5" />
            <span>Metamask</span>
          </button>
          <button
            onClick={() => {
              setWorking(true);
              activate(wcConnector);
            }}
            className={cn(cls, "text-blue-500 border-blue-600")}
          >
            <img src="/walletconnect-logo.svg" className="h-5 w-5" />
            <span>WalletConnect</span>
          </button>
        </div>
      </Container>
    </Flex>
  );
}

export default ConnectButtons;