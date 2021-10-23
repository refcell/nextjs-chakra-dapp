import {
  Link as ChakraLink,
  Button
} from '@chakra-ui/react';

const MintButton = ({
    className,
    link = "https://github.com/abigger87/nextjs-chakra-dapp",
    ...props
  }) => {
  return (
    <ChakraLink
      isExternal
      href={link}
      flexGrow={0}
      mx={2}
    >
      <Button width="100%" variant="outline" colorScheme="green">
        {props}
      </Button>
    </ChakraLink>
  );
};

export default MintButton;