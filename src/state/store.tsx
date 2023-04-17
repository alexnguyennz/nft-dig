import { create } from "zustand";
import { type OptionBase } from "chakra-react-select";

import { ChainIcon } from "@/components/chain-select/chain-icon";

export interface Chain extends OptionBase {
  value: string;
  label: string;
  chainId: number;
  icon: JSX.Element;
}

export interface Limit extends OptionBase {
  value: string;
  label: string;
}

interface State {
  chain: Chain;
  limit: Limit;
}

interface Action {
  setChain: (chain: State["chain"]) => void;
  setLimit: (limit: State["limit"]) => void;
}

export const useStore = create<State & Action>((set) => ({
  chain: {
    value: "eth",
    label: "Ethereum",
    chainId: 1,
    icon: <ChainIcon value="eth" />,
  },
  setChain: (chain) => set({ chain }),
  limit: {
    value: "10",
    label: "10",
  },
  setLimit: (limit) => set({ limit }),
}));
