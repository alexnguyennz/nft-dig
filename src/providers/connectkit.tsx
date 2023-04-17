import { WagmiConfig, createClient } from "wagmi";
import {
  mainnet,
  polygon,
  bsc,
  avalanche,
  fantom,
  cronos,
  arbitrum,
  goerli,
  sepolia,
  polygonMumbai,
  bscTestnet,
} from "wagmi/chains";

import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { palm } from "@/src/customWalletChains";

const client = createClient(
  getDefaultClient({
    appName: "NFT Dig",
    infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    chains: [
      mainnet,
      polygon,
      bsc,
      avalanche,
      fantom,
      cronos,
      arbitrum,
      palm,
      goerli,
      sepolia,
      polygonMumbai,
      bscTestnet,
    ],
  })
);

export default function CustomConnectKitProvider({
  children,
}: {
  children: JSX.Element;
}) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
