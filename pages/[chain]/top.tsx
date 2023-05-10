import { useState } from "react";
import Head from "next/head";
import { type GetServerSideProps, InferGetServerSidePropsType } from "next";

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
import { IconChartBar, IconTrendingUp } from "@tabler/icons-react";

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await Promise.allSettled([
    fetch(
      `https://deep-index.moralis.io/api/v2/market-data/nfts/top-collections`,
      { headers: { "x-api-key": "test" } }
    ).then((response) => response.json()),
    fetch(
      `https://deep-index.moralis.io/api/v2/market-data/nfts/hottest-collections`,
      { headers: { "x-api-key": "test" } }
    ).then((response) => response.json()),
  ]);

  return { props: { data } };
};

interface Collection {
  rank: number;
  collection_title: string;
  collection_image: string;
  market_cap_usd?: string;
  volume_usd?: string;
}

export default function TopCollections({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

      <Tabs index={tab} onChange={setTab} align="center" variant="soft-rounded">
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
            <IconTrendingUp />
            <span>Trending</span>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel paddingX={0}>
            <MarketCap type={"top"} data={data[0].value} />
          </TabPanel>
          <TabPanel paddingX={0}>
            <MarketCap type={"hottest"} data={data[1].value} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

function MarketCap({ type, data }: { type: string; data: Collection[] }) {
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
            {data.map((collection) => (
              <Tr key={collection.rank}>
                <Td>{collection.rank}</Td>
                <Td className={"flex flex-col items-center gap-3 sm:flex-row"}>
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
                <Td isNumeric className={"break-all"}>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    currencyDisplay: "narrowSymbol",
                  }).format(
                    collection.market_cap_usd
                      ? Number(collection.market_cap_usd)
                      : Number(collection.volume_usd)
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </>
  );
}
