import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useMemo,
  ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import LogRocket from "logrocket";
import { useToast } from "@chakra-ui/react";
import { Web3ContextClass } from "../web3context-sdk/index";
import { formatEther } from "@ethersproject/units";

import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";

import { chooseBestWeb3Provider, alchemyURL } from "../utils";

const launchModalLazy = async (
  t: (text: string, extra?: any) => string,
  cacheProvider: boolean = true
) => {
  const providerOptions = {
    injected: {
      display: {
        description: t("Connect with a browser extension"),
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider.default,
      options: {
        rpc: {
          1: alchemyURL,
        },
      },
      display: {
        description: t("Scan with a wallet to connect"),
      },
    },
  };
  if (!cacheProvider) {
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
  }
  const web3Modal = new Web3Modal({
    cacheProvider,
    providerOptions,
    theme: {
      background: "#121212",
      main: "#FFFFFF",
      secondary: "#858585",
      border: "#272727",
      hover: "#000000",
    },
  });

  return web3Modal.connect();
}

export interface Web3ContextData {
  web3Context: any; // to be replaced with an imported sdk (ex at top of file)
  web3ModalProvider: any | null;
  isAuthed: boolean;
  login: (cacheProvider?: boolean) => Promise<any>;
  logout: () => any;
  address: string;
  // ** account ethers balance in ETH **
  balance: number;
  chainId: number;
  isAttemptingLogin: boolean;
}

const EmptyAddress = "0x0000000000000000000000000000000000000000";
const InternalWeb3Context = createContext<Web3ContextData | undefined>(
  undefined
);

const Web3ContextProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  const { query } = useRouter();

  const [web3Context, setWeb3Context] = useState<Web3ContextClass>(
    () => new Web3ContextClass(chooseBestWeb3Provider())
  );

  const [isAttemptingLogin, setIsAttemptingLogin] = useState<boolean>(false);
  const toast = useToast();

  // ** Save chainId for context switches **
  const [chainId, setChainId] = useState<number>(-1);

  // ** Only allow one network toast notification at a time **
  const [toastingNetwork, setToastingNetwork] = useState(false);

  // ** Lock setting context and address
  const [updatingLock, setUpdatingLock] = useState(false);

  // ** Refresh chain id **
  const refreshChainId = ({ contextInstance = web3Context }) => {
    if (!toastingNetwork) {
      setToastingNetwork(true);
      Promise.all([
        contextInstance.web3.eth.net.getId(),
        contextInstance.web3.eth.getChainId(),
      ]).then(([netId, currChainId]) => {
        setChainId(currChainId);
        // ** Don't show "wrong network" toasts if dev
        // if (process.env.NODE_ENV === "development") {
        //   console.log("[NODE_ENV] Development")
        //   return;
        // }

        if (netId !== 1 || currChainId !== 1) {
          // ** Prevent Fast Reentrancy
          setTimeout(() => {
            toast({
              title: "Wrong network!",
              description:
                "You are on the wrong network! Switch to the mainnet!",
              status: "warning",
              position: "bottom",
              duration: 3000,
              isClosable: true,
            });
            setTimeout(() => setToastingNetwork(false), 3000);
          }, 1500);
        }
      });
    }
  };

  useEffect(() => {
    // refreshChainId({});
    if (localStorage.WEB3_CONNECT_CACHED_PROVIDER) {
      // if(!isAttemptingLogin) {
      login();
      // }
    } else {
      // ** If we weren't previously connected, let's try to logout **
      logout();
    }
  }, []);

  const [address, setAddress] = useState<string>(EmptyAddress);
  const [balance, setBalance] = useState<number>(0);
  const [web3ModalProvider, setWeb3ModalProvider] = useState<any | null>(null);

  const [chainChange, setChainChange] = useState<boolean>(false);
  // ** For successfuly chain change toast
  useEffect(() => {
    if(chainChange) {
      setChainChange(false);
      if(address !== EmptyAddress && chainId === 1) {
        // ** Prevent Fast Reentrancy
        setTimeout(() => {
          toast({
            title: "Connected!",
            description:
              "Connected to the correct network!",
            status: "success",
            position: "bottom",
            duration: 3000,
            isClosable: true,
          });
        }, 1500);
      }
    }
  }, [chainId]);

  const setWeb3ContextAndAddressFromModal = (modalProvider) => {
    if (!updatingLock) {
      setUpdatingLock(true);
      const contextInstance = new Web3ContextClass(modalProvider);
      setWeb3Context(contextInstance);

      contextInstance.web3.eth.getAccounts().then((addresses) => {
        if (addresses.length === 0) {
          if (typeof window !== "undefined") {
            console.log("reloading window");
            setIsAttemptingLogin(true);
            logout();
            setAddress(EmptyAddress);
            return;
          }
        }

        // ** We only want to refresh the chain id and do the rest if we have addresses **
        refreshChainId({ contextInstance });

        // ** Set the new address **
        const address = addresses[0] as string;
        const requestedAddress = query.address as string;
        LogRocket.identify(address);
        setAddress(requestedAddress ?? address);

        // ** Get the selected address balance
        contextInstance.web3.eth
          .getBalance(requestedAddress ?? address)
          .then((bal) => {
            setBalance(parseFloat(formatEther(bal)));

            // TODO: show connected balance here ??
          })
          .catch((balance_err) =>
            console.error(
              "Failed to get account ethers with error:",
              balance_err
            )
          );
      });
    }
  };

  const login = async (cacheProvider: boolean = true) => {
    try {
      setIsAttemptingLogin(true);
      let provider = await launchModalLazy(t, cacheProvider);
      setWeb3ModalProvider(provider);
      setWeb3ContextAndAddressFromModal(provider);
      setIsAttemptingLogin(false);
    } catch (err) {
      setIsAttemptingLogin(false);
      return console.error(err);
    }
  };

  const refetchAccountData = () => {
    setWeb3ContextAndAddressFromModal(web3ModalProvider);
  };

  const logout = () => {
    setWeb3ModalProvider((past: any) => {
      try {
        past.clearCachedProvider().then((res) => {
          console.log("Cleared past cached provider!", res);
        });
        console.log(past);
        console.log(web3ModalProvider);
        past.request({
          method: "wallet_requestPermissions",
          params: [
            {
              eth_accounts: {},
            },
          ],
        });
      } catch (e) {
        console.error("Failed to close web3 modal provider");
        console.error(e);
      }
      if (past?.off) {
        past.off("accountsChanged", refetchAccountData);
        past.off("chainChanged", refetchAccountData);
      }
      return null;
    });
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    setAddress(EmptyAddress);
  };

  useEffect(() => {
    if (web3ModalProvider !== null && web3ModalProvider.on) {
      web3ModalProvider.on("accountsChanged", refetchAccountData);
      web3ModalProvider.on("chainChanged", () => {
        setChainChange(true);
        refetchAccountData();
      });
    }
    return () => {
      if (web3ModalProvider?.off) {
        web3ModalProvider.off("accountsChanged", refetchAccountData);
        web3ModalProvider.off("chainChanged", refetchAccountData);
      }
    };
  }, [web3ModalProvider, refetchAccountData]);

  const value = useMemo(
    () => ({
      web3ModalProvider,
      web3Context,
      isAuthed: address !== EmptyAddress,
      login,
      logout,
      address,
      balance,
      chainId,
      isAttemptingLogin,
    }),
    [
      web3Context,
      web3ModalProvider,
      login,
      logout,
      address,
      balance,
      chainId,
      isAttemptingLogin,
    ]
  );

  return (
    <InternalWeb3Context.Provider value={value}>{children}</InternalWeb3Context.Provider>
  );
};

const useWeb3Context = () => {
  const context = useContext(InternalWeb3Context);

  if (context === undefined) {
    throw new Error(`useWeb3Context must be used within a Web3ContextProvider`);
  }

  return context;
}

// ** Exports
export {
  useWeb3Context,
  Web3ContextProvider,
  EmptyAddress,
  InternalWeb3Context,
  launchModalLazy
}
