/* eslint-disable */
import Web3 from "web3";
import axios from "axios";
import Big from "big.js";

import { Cache } from ".";

// var erc20Abi = require("." + "/abi/ERC20.json");

class Web3ContextClass {
  // ** ------------------------------ **
  // ** TYPE YOUR STATE VARIABLES HERE **
  // ** ------------------------------ **

  // ** Types **
  web3: Web3;
  cache: Cache;
  getEthUsdPriceBN: () => Big;
  someAsyncFunction: () => Promise<any>;

  // ** Class Statics **
  static Web3 = Web3;

  // ?? web3 utils should have BN ??
  // @ts-ignore
  static BN = Web3.utils.BN;

  // ** Constructor **
  constructor(web3Provider) {
    // ** -------------------------------- **
    // ** DEFINE YOUR STATE VARIABLES HERE **
    // ** -------------------------------- **

    this.web3 = new Web3(web3Provider);
    this.cache = new Cache({ allTokens: 86400, ethUsdPrice: 300 });

    var self = this;

    // ** --------------------- **
    // ** DEFINE FUNCTIONS HERE **
    // ** (functions are vars)  **
    // ** --------------------- **

    this.getEthUsdPriceBN = async function () {
      return await self.cache.getOrUpdate("ethUsdPrice", async function () {
        try {
          return Web3.utils.toBN(
            new Big(
              (
                await axios.get(
                  "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=ethereum"
                )
              ).data.ethereum.usd
            )
              .mul(1e18)
              .toFixed(0)
          );
        } catch (error) {
          throw new Error("Error retrieving data from Coingecko API: " + error);
        }
      });
    };

    this.someAsyncFunction = async function (cacheTimeout = 86400) {
      // ** example async function definition
    };
  }
}

export default Web3ContextClass;
