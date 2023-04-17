import { ChainIcon } from "@/components/chain-select/chain-icon";

export const mainnetOptions = [
  {
    value: "eth",
    label: "Ethereum",
    chainId: 1,
    icon: <ChainIcon value="eth" />,
  },
  {
    value: "polygon",
    label: "Polygon",
    chainId: 137,
    icon: <ChainIcon value="polygon" />,
  },
  {
    value: "bsc",
    label: "Binance",
    chainId: 56,
    icon: <ChainIcon value="bsc" />,
  },
  {
    value: "avalanche",
    label: "Avalanche",
    chainId: 43114,
    icon: <ChainIcon value="avalanche" />,
  },
  {
    value: "fantom",
    label: "Fantom",
    chainId: 250,
    icon: <ChainIcon value="fantom" />,
  },
  {
    value: "cronos",
    label: "Cronos",
    chainId: 25,
    icon: <ChainIcon value="cronos" />,
  },
  {
    value: "arbitrum",
    label: "Arbitrum",
    chainId: 42161,
    icon: <ChainIcon value="arbitrum" />,
  },
  {
    value: "palm",
    label: "Palm",
    chainId: 11297108109,
    icon: <ChainIcon value="palm" />,
  },
];

export const testnetOptions = [
  {
    value: "goerli",
    label: "Goerli",
    chainId: 5,
    icon: <ChainIcon value="goerli" />,
  },
  {
    value: "sepolia",
    label: "Sepolia",
    chainId: 11155111,
    icon: <ChainIcon value="sepolia" />,
  },
  {
    value: "mumbai",
    label: "Mumbai",
    chainId: 80001,
    icon: <ChainIcon value="mumbai" />,
  },
  {
    value: "bsc testnet",
    label: "Binance",
    chainId: 97,
    icon: <ChainIcon value="bsc testnet" />,
  },
];

export const groupedOptions = [
  {
    label: "Mainnet",
    options: mainnetOptions,
  },
  {
    label: "Testnet",
    options: testnetOptions,
  },
];
