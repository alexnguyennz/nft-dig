import { useLayoutEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  Tab,
  Tabs as ChakraTabs,
  TabList,
  TabPanel,
  TabPanels,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  IconFolder,
  IconPhoto,
  IconSearch,
  IconTrendingUp,
  IconWallet,
} from "@tabler/icons-react";

import ChainSelect from "@/components/chain-select/chain-select";
import WalletInput from "@/components/layout/wallet-input";
import NFTInput from "@/components/layout/nft-input";
import CollectionInput from "@/components/layout/collection-input";
import SearchInput from "@/components/layout/search-input";

export default function Tabs() {
  const { pathname, push } = useRouter();

  const [tab, setTab] = useState(0);

  const bgColour = useColorModeValue("bg-rose-50", "bg-gray-900");
  const tabStyles = {
    color: useColorModeValue("white", "rgb(15 23 42)"),
    bg: useColorModeValue("#1f2937", "white"),
  };

  useLayoutEffect(() => {
    switch (pathname) {
      case "/[chain]/[address]":
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
      case "/[chain]/top":
        setTab(4);
        break;
    }
  }, [pathname]);

  return (
    <>
      <h2 className={"text-center text-xl font-medium"}>
        {tabDescription(tab)}
      </h2>
      <ChakraTabs
        index={tab}
        onChange={setTab}
        align="center"
        variant="soft-rounded"
        className={"mt-5"}
      >
        <TabList className={"mb-5"}>
          <Tab
            className={"flex flex-col justify-center rounded-lg"}
            _selected={tabStyles}
            textColor={bgColour}
            borderRadius="0.75rem"
            paddingX={"10px"}
          >
            <IconWallet /> <span>Wallet</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            textColor={bgColour}
            borderRadius="0.75rem"
            paddingX={"10px"}
          >
            <IconPhoto />
            <span>NFT</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            textColor={bgColour}
            borderRadius="0.75rem"
            paddingX={"10px"}
          >
            <IconFolder /> <span>Collection</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            textColor={bgColour}
            borderRadius="0.75rem"
            paddingX={"10px"}
          >
            <IconSearch /> <span>Search</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            textColor={bgColour}
            borderRadius="0.75rem"
            paddingX={"10px"}
            onClick={() => push("/eth/top")}
          >
            <IconTrendingUp /> <span>Top</span>
          </Tab>
        </TabList>
        {tab !== 4 && <ChainSelect />}
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
      </ChakraTabs>
    </>
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
    case 4:
      return "Top Ethereum Collections.";
  }
}
