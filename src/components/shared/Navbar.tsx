import { Link as ChakraLink, Flex, Heading} from "@chakra-ui/react";
import styled from "@emotion/styled";
import { DiscordSVG, TwitterSVG } from "src/assets";
import { ConnectWallet, FAQ, LaunchAppButton } from ".";

const StyledTitle = styled.div`
  margin-right: auto;
  margin-left: 1em;
`;

const LaunchGroup = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: row;
  min-width: 300px;

  @media (max-width: 600px) {
    min-width: 100px;
    flex-direction: column;
    margin: auto 0 auto auto;
  }
`;

const NavbarFlex = styled(Flex)`
  min-height: 100px;
  height: auto;
  max-height: 150px;
  padding: var(--chakra-space-8);
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 600px) {
    position: absolute;
    top: 0.5em;
    width: 100%;
    left: 0;
    justify-content: center;
  }
`;

const NoShadowLink = styled(ChakraLink)`
  text-decoration: none !important;
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

const Navbar = ({ accountButton = false, launchApp = false, onOpen }) => {
  return (
    <NavbarFlex>
      <NoShadowLink
        textDecoration="none"
        href="/"
        d="flex"
        flexGrow={0}
      >
        <StyledTitle>
          <Heading textDecoration="none" as="h1">Nextjs Chakra Dapp</Heading>
        </StyledTitle>
      </NoShadowLink>
      <LaunchGroup>
        <LinkWrapper>
          <ChakraLink
            textDecoration="none !important"
            height="min-content"
            margin="auto"
            onClick={onOpen}
          >
            <FAQ mx="0.5em" />
          </ChakraLink>
          <ChakraLink
            textDecoration="none !important"
            height="min-content"
            margin="auto"
            isExternal
            href={process.env.DISCORD_INVITE_LINK}
          >
            <DiscordSVG mx="0.5em" />
          </ChakraLink>
          <ChakraLink
            textDecoration="none !important"
            height="min-content"
            margin="auto"
            isExternal
            href={process.env.TWITTER_HANDLE}
          >
            <TwitterSVG mx="0.5em" />
          </ChakraLink>
        </LinkWrapper>
        {accountButton ? <ConnectWallet /> : null}
        {launchApp ? <LaunchAppButton /> : null}
      </LaunchGroup>
    </NavbarFlex>
  );
};

export default Navbar;
