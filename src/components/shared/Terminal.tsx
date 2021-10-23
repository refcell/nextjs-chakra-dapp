import { useRef } from 'react';
// import { Terminal as RCETerm } from 'react-console-emulator'
import {
  Link as ChakraLink,
  Text
} from '@chakra-ui/react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'material-react-toastify';
import { Container } from '.'

// ** Container changes to flex-direction column for small screens
const FlexContainer = styled(Container)`
  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const InnerFlexContainer = styled(Container)`
  @media (max-width: 1000px) {
    width: 100%;
    padding-left: 1em;
    padding-right: 1em;
    margin: auto;
    max-width: 800px;
  }
`;

const Terminal = () => {
  const term_ref = useRef();

  return (
    <Container
    flexDirection="row"
    width="100%"
    margin="auto"
    px={6}
  >
    <ToastContainer
      position="top-left"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
    <Container
      flexDirection="column"
      width="100%"
    >
    <FlexContainer
          flexDirection="row"
          justifyContent="center"
          margin="auto"
          width="100%"
          pb={6}
        >
          {/* <InnerFlexContainer
            flexDirection="column"
            width="100%"
            maxWidth="600px"
            maxHeight="600px"
            height="600px"
            marginRight="1.5em"
            px={4}
          >
        <RCETerm
            ref={term_ref}
            welcomeMessage={'Welcome to Nextjs Chakra Dapp Template... \nType \'help\' for a list of commands.'}
            promptLabel={'~'}
            style={{
              height: '600px',
              maxHeight: '600px',
              width: '100%',
            }}
            commands={{
              about: {
                description: 'What is this??',
                usage: 'about',
                fn: function () {
                  
                    TODO: you can reference parameters passed to the cli using the `arguments` array
                    For example: `const some_arg = parseInt(arguments[0])`
                  
                  return 'nextjs-chakra-dapp is a template repository to create a basic dapp based on nextjs and chakra-ui.';
                }
              },
            }}
          />
          <Text mr='auto' fontWeight={800} pt={4} mb={2}>No data entered here is recorded <ChakraLink
              isExternal
              href="https://github.com/abigger87/nextjs-chakra-dapp"
              color='blue.400'
            >GitHub</ChakraLink></Text>
          </InnerFlexContainer> */}
        </FlexContainer>
      </Container>
    </Container>
  )
};

export default Terminal;