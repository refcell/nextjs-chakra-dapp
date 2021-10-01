import React, { useEffect, useState } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { ConnectButtons, MintButton } from './';
import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { Button, Container, useColorMode } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ProviderOptions } from "src/utils";
import { Web3Provider } from "@ethersproject/providers";

const MainSection = () => {
  const { colorMode } = useColorMode();
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [account, setAccount] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if(provider) {
      setConnected(provider.isConnected());
    }
  }, [provider])

  useEffect(() => {
    if(window !== undefined) {
      setWeb3Modal(new Web3Modal({
        cacheProvider: false,
        providerOptions: ProviderOptions,
        theme: colorMode == 'light' ? 'light' : 'dark'
      }));
    }
  }, []);

  // ** Function to get the current account
  const getAccount = async (curr_web3) => {
    const accounts = await curr_web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  // ** Function to open web3 modal
  const openModal = async () => {
    if(web3Modal) {
      const new_provider = await web3Modal.connect();
      const new_web3 = new Web3(new_provider);
      getAccount(new_web3);

      // ** Subscribe to accounts change
      new_provider.on("accountsChanged", (accounts) => {
        console.log("account changed!")
        getAccount(new_web3);
      });

      // ** Subscribe to chainId change
      new_provider.on("chainChanged", (chainId) => {
        console.log("chain changed!");
        getAccount(new_web3);
      });

      // ** Subscribe to networkId change
      new_provider.on("networkChanged", (networkId) => {
        console.log("network changed!");
        getAccount(new_web3);
      });

      // ** Update State
      setProvider(new_provider);
      setWeb3(new_web3);
    }
  }

  // ** Function to disconnect web3 account
  const disconnectModal = async () => {
    console.log("in disconnect modal func");
    console.log("provider:", provider);
    try {
      console.log("web3 current provider:", web3.currentProvider);
      console.log(web3Modal);
      await web3.currentProvider.disconnect();
      await web3Modal.clearCachedProvider();
      setProvider(null);
    } catch (e) {
      console.error("Failed to close provider:", e)
    }

  }

  return (
    <Web3ReactProvider getLibrary={() => web3}>
      <NoMarginContainer
        position='absolute'
        margin='0'
        padding='0'
        top='1rem'
        right='1rem'
        justifyContent='right'
        d='flex'
      >
        <Button
          width='auto'
          maxWidth='300px'
          ml='auto'
          cursor='pointer'
          variant='outline'
          colorScheme='blue.600'
          color='blue.600'
          onClick={!connected ? openModal : disconnectModal}
        >
          {!connected ? 'Connect Wallet' : 'Disconnect Wallet'}
        </Button>
      </NoMarginContainer>
    </Web3ReactProvider>
  )
}

const NoMarginContainer = styled(Container)`
  margin-top: 0 !important;
`;

export default MainSection;
