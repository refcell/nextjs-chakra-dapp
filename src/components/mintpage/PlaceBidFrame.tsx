import { useEffect, useState } from "react";
import {
  Button,
  Spinner,
  Input,
  Flex,
  Text,
  useDisclosure,
  Checkbox,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { toast } from "material-react-toastify";
import { useWeb3Context } from "src/contexts/Web3Context";
import { ConnectWallet, NoShadowButton } from "src/components";
import { useTranslation } from "react-i18next";

const BidBox = styled.div`
  min-width: 480px;
  min-height: 350px;
  height: auto;
  margin: auto auto auto 0;
  padding: 1em;
  border-radius: 24px;
  background-color: #191b1f;
  display: flex;
  flex-direction: column;
`;

const PlaceBidText = styled.p`
  height: auto;
  margin: 0.5em auto 0 0;
  font-family: Roboto;
  font-size: 20px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const DataForm = styled.div`
  padding-top: 1em;
  padding-bottom: 2em;
  display: flex;
  flex-direction: column;
`;

const PriceText = styled.p`
  height: auto;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
`;

const PriceSubText = styled.p`
  height: auto;
  padding: 0.2em 0 0.4em 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.07;
  letter-spacing: normal;
  text-align: left;
  color: #95969a;
`;

const CustomInput = styled(Input)`
  width: 100%;
  height: auto;
  min-height: 48px;
  margin: auto;
  border-radius: 1em;
  border: solid 1px #2c2f36;
  background-color: #212429;

  &:focus {
    outline: none !important;
    box-shadow: none !important;
    border-color: var(--chakra-colors-whiteAlpha-400) !important;
  }
`;

const QuantityText = styled.p`
  height: auto;
  font-family: Roboto;
  font-size: 18px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.56;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding-top: 1em;
  padding-bottom: 0.5em;
`;

const ButtonWrapper = styled.div`
  padding-bottom: 1em;
  margin-top: auto;
  display: flex;
`;

const PlaceBidButton = styled(Button)`
  width: 100%;
  margin: auto;

  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

const Row = styled(Flex)`
  display: flex;
  flex-direction: row;
  align-items: space-between;
`;

const GasText = styled(Text)`
  height: auto;
  padding: 0.2em 0 0.4em 0;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #95969a;
`;

const NonSelectableText = styled(Text)`
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;

const PlaceBidFrame = () => {
  const { t } = useTranslation();
  const { isAuthed, balance } = useWeb3Context();
  const [validParams, setValidParams] = useState(false);
  const [placingBid, setPlacingBid] = useState(false);

  // ** Does the user want to see a modal to confirm placing bids? **
  const [isNovice, setIsNovice] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [transactionTimedOut, setTransactionTimedOut] = useState(false);

  useEffect(() => {
    if (!isOpen) setTransactionTimedOut(false);
  }, [isOpen]);

  useEffect(() => {
    setIsNovice(localStorage.getItem("BASED_WEB3_APE_MODE") !== "I_AM_BASED");
  }, []);

  // ** Insufficient Funds **
  const [insufficentFunds, setInsufficientFunds] = useState(false);

  // ** Bid Inputs **
  const [bidPrice, setBidPrice] = useState(0.0);
  const [bidQty, setBidQty] = useState(0);

  // ** Are bid inputs empty **
  const [bidPriceEmpty, setBidPriceEmpty] = useState(false);
  const [bidQtyEmpty, setBidQtyEmpty] = useState(false);

  // ** Frozen bid price and qty when submitting a transaction **
  const [frozenBidPrice, setFrozenBidPrice] = useState(bidPrice);
  const [frozenBidQty, setFrozenBidQty] = useState(bidQty);

  // ** Checks if we have enough ETH balance in the connected wallet **
  useEffect(() => {
    setInsufficientFunds(bidPrice * bidQty > balance || balance == 0);
  }, [bidPrice, bidQty, balance]);

  // ** Gas Estimates **
  // TODO: fetch these predicted fees every x time
  // ?? use previous bids to predict new fees ??
  const [lowGasFee, setLowGasFee] = useState(0);
  const [mediumGasFee, setMediumGasFee] = useState(0);
  const [highGasFee, setHighGasFee] = useState(0);

  // ** Helper function to fetch gas timeouts **
  const updateGasEstimates = () => {
    // TODO::::
    console.log("updating gas estimates...");
  };

  // ** Every 15 seconds, update gas estimates **
  useEffect(() => {
    let gasTimer = setTimeout(() => updateGasEstimates(), 15 * 1000);
    return () => {
      clearTimeout(gasTimer);
    };
  }, []);

  // ** Bid placed helper function **
  const placeBid = () => {
    setPlacingBid(true);

    // ** Freeze Inputs **
    const _frozenBidPrice = bidPrice;
    setFrozenBidPrice(_frozenBidPrice);
    const _frozenBidQty = bidQty;
    setFrozenBidQty(_frozenBidQty);

    // ** Validate Frozen Inputs (sanity check) **
    if (validateParams(_frozenBidPrice, _frozenBidQty)) {
      // ** If novice, Pop up modal and await confirmation to continue **
      if (isNovice) {
        onOpen();

        // Set a 1 minute transaction timeout
        setTimeout(() => {
          setTransactionTimedOut(true);
        }, 60 * 1000);
      } else {
        // ** Continue with placing bid **
        submitBid(_frozenBidPrice, _frozenBidQty);
      }
    } else {
      // !! Invalid Inputs !!
      toast.error({
        title: "Invalid Inputs!",
        description:
          "Please enter a valid bid price and quantity and try again!",
        status: "error",
        position: "bottom",
        duration: 3000,
        isClosable: true,
      });
      setPlacingBid(false);
    }
  };

  const submitBid = (_frozenBidPrice, _frozenBidQty) => {
    // TODO: submit transaction
    console.log("placing bid...");

    // ** Unfreeze Everything **
    // TODO: move this to once transaction is placed
    setPlacingBid(false);
  };

  // ** Helper function to validate parameters
  const validateParams = (_bidPrice, _bidQty) => {
    if (_bidPrice && _bidPrice > 0 && _bidQty && _bidQty > 0) {
      setValidParams(true);
      return true;
    }
    // ** Any other case we reject **
    setValidParams(false);
    return false;
  };

  // ** Whenever our input values change, we want to validate them **
  useEffect(() => {
    validateParams(bidPrice, bidQty);
  }, [bidPrice, bidQty]);

  return (
    <BidBox>
      <PlaceBidText>Place Bid</PlaceBidText>
      <DataForm>
        <PriceText>Price per NFT (ETH)</PriceText>
        <PriceSubText>
          Include gas fees in your bid price. Higher bids will be filled first!
        </PriceSubText>
        <Flex pointerEvents="auto" position="relative" width="100%">
          <NonSelectableText
            cursor="text"
            opacity="0.6"
            position="absolute"
            right="0.7em"
            top="0.7em"
            zIndex="2"
          >
            ETH
          </NonSelectableText>
          <CustomInput
            type="number"
            min="0.000"
            step="0.0001"
            presicion={3}
            onChange={(e) => {
              setBidPriceEmpty(e.target.value == "");
              setBidPrice(
                e.target.value ? parseFloat(e.target.value) : undefined
              );
            }}
            placeholder="0.00"
            size="lg"
          />
        </Flex>
        <Row mt="0.2em">
          <GasText mr="0.5em">Suggested Gas: </GasText>
          <GasText mx="0.5em">Low: {lowGasFee}</GasText>
          <GasText mx="0.5em">Medium: {mediumGasFee}</GasText>
          <GasText mx="0.5em">High: {highGasFee}</GasText>
        </Row>
        <QuantityText>Quantity</QuantityText>
        <CustomInput
          type="number"
          min={1}
          value={bidQty}
          onChange={(e) => {
            setBidQtyEmpty(e.target.value == "");
            setBidQty(e.target.value ? parseInt(e.target.value) : undefined);
          }}
          placeholder="0"
          size="lg"
        />
      </DataForm>
      {insufficentFunds ? (
        <Text mb="0.5em" fontSize="14px" color="red.500">
          Insufficient Funds ~ {balance && balance.toFixed(3)}Ξ
        </Text>
      ) : (
        ""
      )}
      <ButtonWrapper>
        {!isAuthed ? (
          <ConnectWallet fullWidth={true} darkerBackground={true} />
        ) : (
          <PlaceBidButton
            disabled={
              !validParams || insufficentFunds || bidPriceEmpty || bidQtyEmpty
            }
            colorScheme={validParams ? "green" : "red"}
            background={validParams ? "green.600" : "red.800"}
            _hover={
              validParams
                ? {
                    color: "white.900",
                    border: "0.4px",
                    borderStyle: "solid",
                    borderColor: "white.900",
                    backgroundColor: "green.500",
                  }
                : {}
            }
            color={validParams ? "white.800" : "red.100"}
            variant={validParams ? "solid" : "outline"}
            onClick={placeBid}
            display={"flex"}
          >
            {!placingBid ? (
              <>
                {" "}
                {validParams && !bidPriceEmpty && !bidQtyEmpty
                  ? "Place Bid"
                  : "Enter a Price and Quantity"}{" "}
              </>
            ) : (
              <Spinner margin={"auto"} color={"green.400"} />
            )}
          </PlaceBidButton>
        )}
      </ButtonWrapper>
      {/* Place Bid Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>🚨 Place Bid? 🚨</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Checkbox
              colorScheme="red"
              defaultIsChecked={
                typeof window !== "undefined"
                  ? localStorage.getItem("BASED_WEB3_APE_MODE") !==
                    "I_AM_BASED"
                  : false
              }
              onChange={(e) => {
                if (e.target.checked) {
                  localStorage.setItem("BASED_WEB3_APE_MODE", "I_AM_BASED");
                  setIsNovice(false);
                }
              }}
            >
              {t("Don't show this message in the future")}
            </Checkbox>
          </ModalBody>

          <ModalFooter>
            <NoShadowButton
              colorScheme="green"
              mr={3}
              onClick={() => {
                if (!transactionTimedOut) {
                  // SUBMIT
                  submitBid(frozenBidPrice, frozenBidQty);
                  // ** Close the Modal **
                  onClose();
                } else {
                  // ** Close the Modal **
                  onClose();
                  // ** Toast notification that the 1 minute confirmation period timed out...
                  // ** Please resubmit tx
                  toast.error({
                    title: "Confirmation Timeout! (> 1 minute)",
                    description: "Please confirm in less than 60 seconds!",
                    status: "error",
                    position: "middle",
                    duration: 3000,
                    isClosable: true,
                  });
                }
              }}
            >
              Submit
            </NoShadowButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </BidBox>
  );
};

export default PlaceBidFrame;
