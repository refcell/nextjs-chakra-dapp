export const alchemyURL = `https://eth-mainnet.alchemyapi.io/v2/${
  process.env.ALCHEMY_PROD_API_KEY ? process.env.ALCHEMY_PROD_API_KEY : ""
}`;
export const testnetURL = `http://localhost:8545`;

export function chooseBestWeb3Provider() {
  if (typeof window === "undefined") {
    return alchemyURL;
  }

  if (window.ethereum) {
    return window.ethereum;
  } else if (window.web3) {
    return window.web3.currentProvider;
  } else {
    return alchemyURL;
  }
}
