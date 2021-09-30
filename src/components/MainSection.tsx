import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import cn from "classnames";
import debounce from "debounce";

import { ConnectButtons, MintButton } from './';

const mainnetContractAddress = process.env.DEPLOYED_MAINNET_CONTRACT_ADDRESS;
const rinkebyContractAddress = process.env.DEPLOYED_RINKEBY_CONTRACT_ADDRESS;

const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const wcConnector = new WalletConnectConnector({
  infuraId: "cddde80366fc42c2ac9202c6a0f9850b",
});

function getLibrary(provider) {
  return new Web3(provider);
}

const MainSection = () => {
  const { activate, active, account, library, networkId } = useWeb3React();

  const [contractAddress, setContractAddress] = useState(networkId === 1 ? mainnetContractAddress : rinkebyContractAddress);
  console.log("Using crontractAddress:", contractAddress);
  const [working, setWorking] = useState(false);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [yearTotal, setYearTotal] = useState(0);
  const [friendAddress, setFriendAddress] = useState("");
  const [realFriendAddress, setRealFriendAddress] = useState("");
  const [transactionHash, setTransactionHash] = useState(null);
  const friendField = useRef();

  useEffect(() => {
    if (!library) return;

    setContractAddress(networkId === 1 ? mainnetContractAddress : rinkebyContractAddress);
    const contract = new library.eth.Contract(abi, contractAddress);
    setContract(contract);

    contract.methods
      .currentYearTotalSupply()
      .call()
      .then((res) => {
        setYearTotal(res);
      }, handleError);

    setWorking(false);
  }, [account, networkId]);

  const debouncedLookup = debounce(async () => {
    setWorking(true);
    try {
      const address = await library.eth.ens.getAddress(friendAddress);
      setRealFriendAddress(address);
    } catch {}

    setWorking(false);
  }, 1000);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {!active && (
        <ConnectButtons setWorking={setWorking} activate={activate} />
      )}
      {active && (
        <div className="flex flex-col space-y-4 md:max-w-md">
          <MintButton
            disabled={working}
            onClick={craftForSelf}
            className="rounded-full"
          >
            Mint Rustacean (Ξ0.02)
          </MintButton>

          <div className="flex flex-col">
            <input
              ref={friendField}
              className="input text-sm md:text-lg rounded-2xl rounded-b-none"
              value={friendAddress}
              onChange={(event) => {
                setFriendAddress(event.target.value);
              }}
              placeholder={"0x… or ENS domain"}
            />
            <MintButton
              disabled={working}
              className="rounded-2xl rounded-t-none"
              onClick={craftForFriend}
            >
              Mint for a friend (Ξ0.02)
            </MintButton>
          </div>

          {realFriendAddress && (
            <div className="text-sm truncate">
              Sending to{" "}
              <code className="bg-gray-100" title={realFriendAddress}>
                {realFriendAddress}
              </code>
            </div>
          )}

          <div className="h-2"></div>

          {transactionHash && (
            <div className="text-green-500 text-xs flex flex-col space-y-2">
              <span>Success!</span>
              <a
                href={`https://etherscan.io/tx/${transactionHash}`}
                className="btn font-normal bg-gray-100 rounded-full shadow-md"
              >
                View transaction on Etherscan
              </a>
            </div>
          )}
          {error && (
            <div className="text-red-500 text-xs">{error.message}</div>
          )}

          <div className="text-sm space-y-2 leading-normal">
            <p>
              <strong>Rustaceans are Ξ0.02</strong>{" "}
            </p>
            <p>
              You can mint one for yourself or for a friend. The result will
              be different for each rustacean depending on its number and
              destination address.
            </p>

            <p>
              {yearTotal}/1,000 rustaceans have been minted in{" "}
              {new Date().getFullYear()}.
            </p>

            <progress
              className="w-full"
              max={1000}
              value={yearTotal}
              disabled={working}
            />

            <p>
              If all 1,000 rustaceans are minted in a year, holders of both Cranes and Rustaceans get to mint
              a <em>Special Edition</em> [redacted] for free.
            </p>
          </div>
        </div>
      )}
    </Web3ReactProvider>
  )
}

export default MainSection;
