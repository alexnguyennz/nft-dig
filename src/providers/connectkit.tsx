import { WagmiConfig, createConfig } from "wagmi";
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

import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { palm } from "@/src/customWalletChains";

const config = createConfig(
  getDefaultConfig({
    appName: "NFT Dig",
    infuraId: process.env.NEXT_PUBLIC_INFURA_API_KEY,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
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
    <WagmiConfig config={config}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}
