import { Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { TrippyArt } from ".";

const PageGroup = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1em;
  max-width: 800px;

  @media (max-width: 900px) {
    max-width: 600px;
  }
`;

const MinorHeading = styled.p`
  font-family: Impact;
  font-size: 26px;
  font-weight: lighter;
  line-height: 1.35;
  letter-spacing: 0.028em;
  text-align: center;
  color: #fff;
  padding-top: 1em;
  padding-bottom: 1em;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 900px) {
    font-size: 22px;
    max-width: 400px;
  }
`;

const BigBreak = styled.div`
  padding: 2em;
`;

const LandingPageMainBlurb = styled.h1`
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  font-family: Impact;
  font-size: 60px;
  line-height: 60px;
  font-weight: 900;
  font-stretch: normal;
  font-style: normal;
  background-image: linear-gradient(
    70deg,
    #ff02cc 2%,
    #8444df 32%,
    #63cea6 66%,
    #d67336 115%
  );
  text-transform: uppercase;
  background-clip: text;
  color: transparent !important;
  text-align: center;
  letter-spacing: 0.02em;
  text-decoration: none;
  display: inline-block;
  transform: scale(1, 1.6);
  -webkit-transform: scale(1, 1.6); /* Safari and Chrome */
  -moz-transform: scale(1, 1.6); /* Firefox */
  -ms-transform: scale(1, 1.6); /* IE 9+ */
  -o-transform: scale(1, 1.6); /* Opera */

  @media (max-width: 900px) {
    font-size: 60px;
    line-height: 60px;
  }

  @media (max-width: 600px) {
    padding-bottom: 1em;
  }
`;

const LandingPageMain = () => (
  <Flex minHeight="100px" height="auto" flexGrow={1} p={8}>
    <PageGroup>
      <LandingPageMainBlurb>
        ⚡ Supercharge your Dapp ⚡
      </LandingPageMainBlurb>
      <MinorHeading>
        Leverage Nextjs and Chakra for your dapp.
      </MinorHeading>
      <BigBreak />
      <TrippyArt />
    </PageGroup>
  </Flex>
);

export default LandingPageMain;
