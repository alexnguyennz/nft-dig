import { type Chain } from "wagmi/chains";

export const palm: Chain = {
  id: 11297108109,
  name: "Palm",
  network: "palm",
  nativeCurrency: {
    decimals: 18,
    name: "Palm",
    symbol: "PALM",
  },
  rpcUrls: {
    default: {
      http: [
        "https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b",
      ],
    },
    public: {
      http: [
        "https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b",
      ],
    },
  },
  blockExplorers: {
    default: { name: "Palm NFT Explorer", url: "https://explorer.palm.io/" },
    etherscan: { name: "Palm NFT Explorer", url: "https://explorer.palm.io/" },
  },
  testnet: false,
};
