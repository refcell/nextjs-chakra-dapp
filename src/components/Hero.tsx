import { Flex, Heading } from '@chakra-ui/react'
import { Header } from './';

const Hero = ({ title = 'Nextjs Chakra Dapp Template' }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="auto"
    p={4}
  >
    <Heading fontSize="3vw">🤖</Heading>
    <Heading px={2} fontSize="3vw" bgClip="text" bgGradient="linear(to top right, #3F8468, #4fa682, #72B79B)">{title}</Heading>
    <Heading fontSize="3vw">⚡</Heading>
  </Flex>
)

// Hero.defaultProps = {
//   title: 'Nextjs Chakra Dapp Template',
// }

export default Hero;