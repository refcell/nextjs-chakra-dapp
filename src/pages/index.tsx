import {
  Hero,
  Container,
  Terminal,
  Main,
  DarkModeSwitch,
  CTA
} from '../components';

const Index = () => (
  <Container height="auto" minHeight="100%">
    <Main>
      <Hero title={'Nextjs Chakra Dapp Template'} />
      <Terminal />
    </Main>

    <DarkModeSwitch />
    <CTA />
  </Container>
)

export default Index
