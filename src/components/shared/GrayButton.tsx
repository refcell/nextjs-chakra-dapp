import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";

const GrayButton = styled(Button)`
  border: 1px;
  border-color: var(--chakra-colors-gray-600);
  background: var(--chakra-colors-gray-700);
  border-style: solid;

  &:hover {
    border-color: var(--chakra-colors-blue-800);
    background-color: var(--chakra-colors-gray-600);
  }

  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
  }
`;

export default GrayButton;
