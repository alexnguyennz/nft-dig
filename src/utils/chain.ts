import { groupedOptions } from "@/src/chainConfig";

export function getChainValue(chainId: number) {
  switch (chainId) {
    case 1:
      return "eth";
    case 137:
      return "polygon";
    case 56:
      return "bsc";
    case 43114:
      return "avalanche";
    case 250:
      return "fantom";
    case 25:
      return "cronos";
    case 42161:
      return "arbitrum";
    case 11297108109:
      return "palm";
    case 5:
      return "goerli";
    case 11155111:
      return "sepolia";
    case 80001:
      return "mumbai";
    case 97:
      return "bsc testnet";
  }
}

export function getExplorer(chain: string) {
  switch (chain) {
    case "eth":
    case "1":
      return "etherscan.io";
    case "polygon":
    case "137":
      return "polygonscan.com";
    case "bsc":
    case "56":
      return "bscscan.com";
    case "avalanche":
    case "43114":
      return "snowtrace.io";
    case "fantom":
    case "250":
      return "ftmscan.com";
    case "cronos":
    case "25":
      return "cronoscan.com";
    case "arbitrum":
    case "42161":
      return "arbiscan.io";
    case "palm":
    case "11297108109":
      return "explorer.palm.io";
    case "goerli":
    case "5":
      return "goerli.etherscan.io";
    case "sepolia":
    case "11155111":
      return "sepolia.etherscan.io";
    case "mumbai":
    case "80001":
      return "mumbai.polygonscan.com";
    case "bsc testnet":
    case "97":
      return "testnet.bscscan.com";
    default:
      return "etherscan.io";
  }
}

export function getChainName(chain: string) {
  switch (chain) {
    case "eth":
      return "Ethereum";
    case "polygon":
      return "Polygon";
    case "bsc":
      return "Binance";
    case "avalanche":
      return "Avalanche";
    case "fantom":
      return "Fantom";
    case "cronos":
      return "Cronos";
    case "arbitrum":
      return "Arbitrum One";
    case "palm":
      return "Palm";
    case "goerli":
      return "Goerli";
    case "sepolia":
      return "Sepolia";
    case "mumbai":
      return "Mumbai";
    case "bsc testnet":
      return "Binance Testnet";
    default:
      return "Ethereum";
  }
}

export function findChain(chain: string) {
  const chains = groupedOptions[0].options.concat(groupedOptions[1].options);
  return chains.find(({ value }) => value === chain);
}

export function truncate(str: string) {
  return str.substring(0, 4) + "..." + str.substring(str.length - 4); // shorten wallet address
}
