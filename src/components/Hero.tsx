import { Flex, Heading } from '@chakra-ui/react'

const Hero = ({ title = 'Nextjs Chakra Dapp Template' }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height="auto"
    p={8}
  >
    <Heading fontSize="3vw">🤖</Heading>
    <Heading px={2} fontSize="3vw" bgClip="text" bgGradient="linear(to right, #4fa682, #2c5282)">{title}</Heading>
    <Heading fontSize="3vw">⚡</Heading>
  </Flex>
)

export default Hero;