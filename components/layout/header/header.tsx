import { useEffect } from "react";

import { useNetwork } from "wagmi";
import { groupedOptions } from "@/src/chainConfig";

import { useStore } from "@/src/state/store";

import ConnectButton from "@/components/layout/header/connectkit/connectkit";

import ColourMode from "@/components/layout/header/colour-mode";
import InfoModal from "@/components/layout/header/info-modal";

export default function Header() {
  const { chain: walletChain } = useNetwork();

  const setChain = useStore((state) => state.setChain);

  /**
   * Set the current chain to the wallet's selected chain
   */
  useEffect(() => {
    const chains = [...groupedOptions[0].options, ...groupedOptions[1].options];

    const chain = chains.find((el) => el.chainId === walletChain?.id);

    if (chain) setChain(chain);
  }, [walletChain]);

  return (
    <header className="flex items-center justify-end gap-4">
      <ConnectButton />
      <ColourMode />
      <InfoModal />
    </header>
  );
}
