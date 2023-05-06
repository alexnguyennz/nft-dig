import { useState } from "react";
import Head from "next/head";

import { useQuery } from "@tanstack/react-query";

import {
  Image,
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconChartBar, IconFlame } from "@tabler/icons-react";

export default function TopCollections() {
  const [tab, setTab] = useState(0);

  const bgColour = useColorModeValue("bg-rose-50", "bg-gray-900");
  const tabStyles = {
    color: useColorModeValue("white", "rgb(15 23 42)"),
    bg: useColorModeValue("#1f2937", "white"),
  };

  return (
    <>
      <Head>
        <title>NFT Dig - Top Ethereum collections</title>
      </Head>

      <h2 className={"mt-10 text-center text-3xl font-bold"}>
        Top Ethereum Collections
      </h2>

      <Tabs
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
          >
            <IconChartBar />
            <span>Market Cap</span>
          </Tab>
          <Tab
            className={"flex flex-col justify-center"}
            _selected={tabStyles}
            textColor={bgColour}
            borderRadius="0.75rem"
          >
            <IconFlame />
            <span>Trending</span>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            <MarketCap type={"top"} />
          </TabPanel>
          <TabPanel paddingX={0}>
            <MarketCap type={"hottest"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function MarketCap({ type }: { type: string }) {
  const { data } = useQuery([type, "collections"], () =>
    fetch(
      `https://deep-index.moralis.io/api/v2/market-data/nfts/${type}-collections`,
      { headers: { "x-api-key": "test" } }
    ).then((response) => response.json())
  );

  return (
    <>
      {data && (
        <Table className={"max-w-4xl"}>
          <Thead>
            <Tr>
              <Th>Rank</Th>
              <Th>Collection</Th>
              <Th isNumeric>
                {type === "top" ? "Market Cap (USD)" : "Volume (USD)"}
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((collection, idx: number) => (
              <Tr key={idx}>
                <Td>{collection.rank}</Td>
                <Td className={"flex items-center gap-3"}>
                  <Image
                    src={
                      collection.collection_image ?? "/img/no-image-card.png"
                    }
                    alt={collection.collection_title}
                    width={50}
                    height={50}
                    className={"rounded-full"}
                    fallback={
                      <Spinner w={8} h={8} thickness="4px" speed="1s" />
                    }
                    fallbackSrc={"/img/no-image-card.png"}
                  />
                  {collection.collection_title}
                </Td>
                <Td isNumeric>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                  }).format(collection.market_cap_usd ?? collection.volume_usd)}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}
