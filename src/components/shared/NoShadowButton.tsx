import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

const NoShadowButton = styled(Button)`
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

export default NoShadowButton;
