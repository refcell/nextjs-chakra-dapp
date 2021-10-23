import { Link as ChakraLink, Button } from "@chakra-ui/react";
import { GrayButton } from "./";

const LaunchAppButton = () => {
  return (
    <ChakraLink m="auto" href="/app" flexGrow={0} mx={2}>
      <GrayButton width="100%">Launch App</GrayButton>
    </ChakraLink>
  );
};

export default LaunchAppButton;
