import { Link as ChakraLink, Badge } from "@chakra-ui/react";

const NascentBadge = () => {
  return (
    <ChakraLink isExternal src="https://nascent.xyz">
      <Badge variant="solid" colorScheme="green">
        Nascent
      </Badge>
    </ChakraLink>
  );
};

export default NascentBadge;
