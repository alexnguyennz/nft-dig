import { ReactNode, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { useStore } from "@/src/state/store";

import {
  useColorModeValue,
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer";
import WalletInput from "@/components/layout/wallet-input";
import NFTInput from "@/components/layout/nft-input";
import ChainSelect from "@/components/chain-select/chain-select";
import CollectionInput from "@/components/layout/collection-input";
import {
  IconFolder,
  IconPhoto,
  IconSearch,
  IconWallet,
} from "@tabler/icons-react";
import SearchInput from "@/components/layout/search-input";

import { findChain } from "@/src/utils/chain";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname, query } = useRouter();

  const { setChain } = useStore();

  const [tab, setTab] = useState(0);

  const bgColour = useColorModeValue("bg-rose-50", "bg-gray-900");
  const logo = useColorModeValue("logo", "logo-dark");
  const tabStyles = {
    color: useColorModeValue("white", "rgb(15 23 42)"),
    bg: useColorModeValue("#1f2937", "white"),
  };

  useEffect(() => {
    switch (pathname) {
      case "/[chain]/[collection]":
        setTab(0);
        break;
      case "/[chain]/[...nft]":
        setTab(1);
        break;
      case "/[chain]/collection/[collection]":
        setTab(2);
        break;
      case "/[chain]/search/[search]":
        setTab(3);
        break;
    }
  }, [pathname]);

  useEffect(() => {
    if (query.chain) {
      const foundChain = findChain(query.chain as string);
      if (foundChain) setChain(foundChain);
    }
  }, [query]);

  return (
    <Box className={`flex min-h-screen flex-col space-y-5 p-5 ${bgColour}`}>
      <section className="flex flex-col text-center">
        <Header />
        <div className={"mb-3 mt-5"}>
          <NextLink href="/">
            <Image
              src={`/${logo}.png`}
              alt="logo"
              width={250}
              height={283}
              className={"inline-block w-32"}
              priority
            />
          </NextLink>
        </div>

        <h2 className={"text-xl font-medium"}>{tabDescription(tab)}</h2>
      </section>

      <Tabs index={tab} onChange={setTab} align="center" variant="soft-rounded">
        <TabList className={"mb-5"}>
          <Tab
            className={"flex flex-col justify-center rounded-lg"}
            _selected={tabStyles}
            borderRadius="0.75rem"
          >
            <IconWallet /> <span>Wallet</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            borderRadius="0.75rem"
          >
            <IconPhoto />
            <span>NFT</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            borderRadius="0.75rem"
          >
            <IconFolder /> <span>Collection</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            borderRadius="0.75rem"
          >
            <IconSearch /> <span>Search</span>
          </Tab>
        </TabList>
        <ChainSelect />
        <TabPanels>
          <TabPanel paddingX={0}>
            <WalletInput />
          </TabPanel>
          <TabPanel paddingX={0}>
            <NFTInput />
          </TabPanel>
          <TabPanel paddingX={0}>
            <CollectionInput />
          </TabPanel>
          <TabPanel paddingX={0}>
            <SearchInput />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <main className={"flex flex-1 flex-col"}>{children}</main>

      <Footer />
    </Box>
  );
}

function tabDescription(tab: number) {
  switch (tab) {
    case 0:
      return "View NFTs for any wallet.";
    case 1:
      return "View any NFT.";
    case 2:
      return "View NFTs for any collection.";
    case 3:
      return "Search for any NFTs.";
  }
}
