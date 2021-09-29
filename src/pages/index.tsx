import {
  Hero,
  Container,
  MainSection,
  Main,
  DarkModeSwitch,
  CTA
} from '../components';

const Index = () => (
  <Container height="auto" minHeight="100%">
    <Main>
      <Hero title={'Nextjs Chakra Dapp Template'} />
      {/*
        // ** MainSection stores logic for wallet connection - this probably should be pulled out into a main container
      */}
      <MainSection />
    </Main>

    <DarkModeSwitch />
    <CTA />
  </Container>
)

export default Index
