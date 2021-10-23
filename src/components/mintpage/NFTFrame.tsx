import { Flex } from "@chakra-ui/layout";
import styled from "@emotion/styled";

const NFTBox = styled.div`
  height: auto;
  margin: 0 0 auto auto;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
`;

const TrippyImage = styled.img`
  width: 212px;
  height: 213px;
  flex-grow: 0;
  margin: auto;
  border-radius: 16px;
  grid-column-start: 1;
  grid-row-start: 1;
  z-index: 1;
`;

const ShadowBackground = styled.div`
  width: 215px;
  height: 215px;
  flex-grow: 0;
  margin: auto;
  -webkit-filter: blur(25px);
  filter: blur(25px);
  background-color: #d42bd2;
  grid-column-start: 1;
  grid-row-start: 1;
`;

const DropTitle = styled.p`
  min-width: 157px;
  min-height: 28px;
  font-family: Roboto;
  font-weight: bold;
  font-size: 20px;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding: 0.5em 0 0.5em 0;
`;

const DropDateTime = styled.p`
  min-width: 105px;
  min-height: 56px;
  width: min-width;
  font-family: Roboto;
  font-size: 20px;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  padding: 0.2em 0 0 0;
`;

const LeftAutoMarginWrapper = styled.div`
  margin-left: auto;
`;

const NFTFrame = ({
  title = "ArtBlocks Launch",
  dateTime = "04/02/2021 16:40 PST",
}) => {
  return (
    <NFTBox>
      <LeftAutoMarginWrapper>
        <Flex m="auto" w="auto" d="grid" padding="0 0 1em 0">
          <ShadowBackground />
          <TrippyImage src="/logo.png" alt="Placeholder Art Piece" />
        </Flex>
        <DropTitle>{title}</DropTitle>
        <DropDateTime>{dateTime}</DropDateTime>
      </LeftAutoMarginWrapper>
    </NFTBox>
  );
};

export default NFTFrame;
