import { Button, Box, Text, useDisclosure } from "@chakra-ui/react";
import { useCallback } from "react";
import styled from "@emotion/styled";
import { useTranslation } from "react-i18next";

import { Identicon, AccountModal } from "src/components";
import { useWeb3Context } from "src/contexts/Web3Context";
import { useAuthedCallback, useIsSmallScreen } from "src/hooks";

const ButtonWrapper = styled.div`
  margin-left: var(--chakra-space-2);
  margin-right: var(--chakra-space-2);
  flex-grow: 0;
`;

const NoShadowButton = styled(Button)`
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

const ConnectWallet = ({ fullWidth = false, darkerBackground = false }) => {
  const { address, isAuthed, balance, login, isAttemptingLogin } = useWeb3Context();

  const {
    isOpen: isWeb3ModalOpen,
    onOpen: openWeb3Modal,
    onClose: closeWeb3Modal,
  } = useDisclosure();

  const openModal = useAuthedCallback(openWeb3Modal);

  const { t } = useTranslation();

  const isMobile = useIsSmallScreen();

  const handleAccountButtonClick = useCallback(() => {
    if (isAuthed) {
      openModal();
    } else login();
  }, [isAuthed, login, openModal]);

  return (
    <ButtonWrapper style={{ width: fullWidth ? "100%" : "auto" }}>
      {isAuthed ? (
        <Box
          display="flex"
          alignItems="center"
          background="gray.700"
          borderRadius="xl"
          py="0"
        >
          <Box px="3">
            <Text color="white" fontSize="md" w="max-content">
              {balance && balance.toFixed(3)} ETH
            </Text>
          </Box>
          <NoShadowButton
            bg="gray.800"
            border="1px solid transparent"
            _hover={{
              border: "1px",
              borderStyle: "solid",
              borderColor: "blue.400",
              backgroundColor: "gray.700",
            }}
            borderRadius="xl"
            m="1px"
            px={3}
            width="100%"
            onClick={openWeb3Modal}
          >
            <Text color="white" fontSize="md" fontWeight="medium" mr="2">
              {address &&
                `${address.slice(0, 6)}...${address.slice(
                  address.length - 4,
                  address.length
                )}`}
            </Text>
            <Identicon />
          </NoShadowButton>
          <AccountModal isOpen={isWeb3ModalOpen} onClose={closeWeb3Modal} />
        </Box>
      ) : (
        <NoShadowButton
          width="100%"
          border="1px"
          borderColor={darkerBackground ? "gray.700" : "gray.600"}
          background={darkerBackground ? "gray.800" : "gray.700"}
          _hover={{
            border: "1px",
            borderStyle: "solid",
            borderColor: darkerBackground ? "blue.900" : "blue.800",
            backgroundColor: darkerBackground ? "gray.700" : "gray.600",
          }}
          onClick={handleAccountButtonClick}
        >
          {t("Connect Wallet")}
        </NoShadowButton>
      )}
    </ButtonWrapper>
  );
};

export default ConnectWallet;
