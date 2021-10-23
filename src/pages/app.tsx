import {
  Navbar,
  Main,
  GradientContainer,
  AppPageMain,
  CTA,
  FAQModal,
} from "src/components";

import { useDisclosure } from "@chakra-ui/react";

const App = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <GradientContainer>
      <Main>
        <Navbar onOpen={onOpen} accountButton={true} />
        <AppPageMain />
        <CTA onOpen={onOpen} />
        <FAQModal isOpen={isOpen} onClose={onClose} />
      </Main>
    </GradientContainer>
  );
};

export default App;
