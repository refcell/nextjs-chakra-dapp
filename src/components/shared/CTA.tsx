import { Link as ChakraLink, Text, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { FAQModal, GrayButton } from ".";

const CTA = ({ onOpen }) => {
  const { t } = useTranslation();
  return (
    <Flex
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      bottom="0"
      width="100%"
      mt="auto"
      pb={2}
    >
      <Flex direction="column" width="100%" pb={4}>
        <Flex
          direction="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
          py={3}
        >
          <Flex flexGrow={0} mx={2} minWidth="100px">
            <GrayButton width="100%" onClick={onOpen}>
              {t("FAQ")}
            </GrayButton>
          </Flex>
          <ChakraLink
            isExternal
            href="https://github.com/abigger87/nextjs-chakra-dapp"
            flexGrow={0}
            mx={2}
            minWidth="100px"
          >
            <GrayButton width="100%">Github</GrayButton>
          </ChakraLink>
        </Flex>
        <Flex
          direction="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
        >
          <Text>
            Built with ❤️ by{" "}
            <ChakraLink
              color="blue.500"
              isExternal
              href="https://twitter.com/andreasbigger"
            >
              Andreas Bigger
            </ChakraLink>{" "}
            @{" "}
            <ChakraLink color="#4fa682" isExternal href="https://nascent.xyz">
              Nascent
            </ChakraLink>{" "}
            and{" "}
            <ChakraLink
              color="blue.500"
              isExternal
              href="https://github.com/permaetheus"
            >
              Permætheus
            </ChakraLink>{" "}
          </Text>
        </Flex>
        <Flex
          direction="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          maxWidth="48rem"
        >
          <Text>
            Say thanks by donating to{" "}
            <ChakraLink
              color="blue.500"
              isExternal
              href="https://thegivingblock.com/donate/"
            >
              The Giving Block Charities
            </ChakraLink>{" "}
            ❤️
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CTA;
