import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Text,
  OrderedList,
  ListItem,
  Link as ChakraLink,
  UnorderedList,
  Stack,
  Flex,
  Code,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

import { NascentBadge } from ".";

const FAQModal = ({ isOpen = false, onClose = () => {} }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior={"inside"}>
      <ModalOverlay />
      <ModalContent maxWidth={"800px"}>
        <ModalHeader>{t("FAQ")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody width={"auto"}>
          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("Why Nextjs Chakra Dapp?")}
            </Heading>
            <Text>{t("The current web3 dapp landscape is difficult to navigate.")}</Text>
            <Stack direction="row">
              <Text>{t("This is a clean project slate using")}</Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  margin="auto"
                  color="blue.400"
                  isExternal
                  href="https://nextjs.org/"
                >
                  Next.js
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
              </Stack>{" "}
              <Text>and</Text>
              <Stack
                marginInlineStart="0.2em"
                width="auto"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  margin="auto"
                  color="blue.400"
                  isExternal
                  href="https://chakra-ui.com/"
                >
                  Chakra-ui
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
              </Stack>
            </Stack>
            <Text>{t("Building on this template means:")}</Text>
            <OrderedList pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                {t(
                  "You don't have to manage web3 independently in each page. It is abstracted in a custom hook."
                )}
              </ListItem>
              <ListItem>
                {t(
                  "You can relieve your styling worries using the many Chakra prebuilt components!"
                )}
              </ListItem>
              <ListItem>{t("You can quickly deploy on Vercel for extremely rapid development.")}</ListItem>
            </OrderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("What Can't Nextjs Chakra Dapp Do?")}
            </Heading>
            <Text>{t("We do not provide contracts. Basic Dapptools-generated contracts exists in the src/ directory.")}</Text>
            <Text>{t("Not guaranteed to be bug free! This was basically hacked together in one sitting!")}</Text>
            <Text>{t("Provide the contract SDK to integrate into the Dapp. This must be done yourself in the src/web3context-sdk directory.")}</Text>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("Who's built Nextjs Chakra Dapp?")}
            </Heading>
            <UnorderedList pl="1em" maxWidth="calc(100% - 1em)">
              <ListItem>
                <Stack direction="row">
                  <ChakraLink
                    display="flex"
                    mr="0.2em"
                    color="blue.400"
                    isExternal
                    href="https://twitter.com/andreasbigger"
                  >
                    Andreas Bigger
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                      <ExternalLinkIcon />
                    </span>
                  </ChakraLink>
                  <NascentBadge />
                </Stack>
              </ListItem>
              <ListItem>
                <Stack direction="row">
                  <ChakraLink
                    display="flex"
                    mr="0.2em"
                    color="blue.400"
                    isExternal
                    href="https://github.com/permaetheus"
                  >
                    Permætheus
                    <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                      <ExternalLinkIcon />
                    </span>
                  </ChakraLink>
                </Stack>
              </ListItem>
            </UnorderedList>
          </Flex>

          <Flex direction="column" my="1em">
            <Heading mb="0.5em" as="h4" size="md">
              {t("How to reach out to the Nextjs Chakra Dapp builders?")}
            </Heading>
            <Stack direction="row">
              <Text>
                {t(
                  "Reach out to us on Twitter (links above) or create an issue on the"
                )}
              </Text>
              <Stack
                marginInlineStart="0.2em"
                width="min-content"
                direction="row"
              >
                <ChakraLink
                  display="flex"
                  color="purple.400"
                  isExternal
                  href="https://github.com/abigger87/nextjs-chakra-dapp"
                >
                  github
                  <span style={{ margin: "auto", paddingLeft: "0.2em" }}>
                    <ExternalLinkIcon />
                  </span>
                </ChakraLink>
                !
              </Stack>
            </Stack>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FAQModal;
