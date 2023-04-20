import { Fragment } from "react";
import Head from "next/head";
import NextLink from "next/link";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

import { useStore } from "@/src/state/store";

import {
  useColorModeValue,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Text,
  Heading,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import {
  IconCategory,
  IconExternalLink,
  IconHome,
  IconId,
  IconLink,
} from "@tabler/icons-react";

/*** Components ***/
import NFTCard from "@/components/nft/nft-card";
import NFTImage from "@/components/nft/nft-media";
import LoadMore from "@/components/pagination/load-more";
import PageLimit from "@/components/pagination/page-limit";
import Error from "@/components/misc/error";
import LoadingSpinner from "@/components/misc/loading-spinner";

import { type NFT } from "@/src/types";

import { fetchCollectionNfts } from "@/src/utils/api";

import { truncate, getChainName, getExplorer } from "@/src/utils/chain";

interface CollectionNFTsProps {
  token_address: string;
  token_id: string;
  amount: string;
  token_hash: string;
  block_number_minted: string;
  contract_type: string;
  name: string;
  symbol: string;
  token_uri: string;
  appMetadata: {
    animation_url?: string;
    attributes?: unknown[];
    content_length: number;
    content_type: string;
    description?: string;
    external_url?: string;
    image?: string;
    name?: string;
    original_image?: string;
  };
  last_token_uri_sync: string;
  last_metadata_sync: string;
  minter_address: string;
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { chain, collection } = query;

  return {
    props: {
      chain,
      collection,
      cookies: req.headers.cookie ?? "",
    },
  };
};

export default function NFTCollection({
  chain,
  collection,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // Queries
  const { data, isSuccess } = useQuery(
    [chain, collection, "collection"],
    (query) => fetchCollectionNfts(query, chain, collection),
    {
      retry: 1,
      keepPreviousData: true,
    }
  );

  if (isSuccess)
    return (
      <>
        <Head>
          <title>{`NFT Dig - Collection ${
            data.result[0]?.symbol
              ? data.result[0].symbol
              : data.result[0].token_address
          }`}</title>
        </Head>
        <div className={"mb-5 flex justify-center"}>
          <Breadcrumb spacing="8px" separator="→">
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/">
                <IconHome />
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">
                {data.result[0]?.name
                  ? data.result[0]?.name
                  : truncate(data.result[0].token_address)}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div>
          {data.result[0] && (
            <Metadata data={data.result[0]} chain={chain as string} />
          )}

          <NFTs chain={chain} collection={collection} />
        </div>
      </>
    );
}

interface MetadataProps {
  data: CollectionNFTsProps;
  chain: string;
}

function Metadata({ data, chain }: MetadataProps) {
  const { name, symbol, token_address, contract_type } = data;

  const bgColour = useColorModeValue("bg-white", "bg-gray-800");

  return (
    <section
      className={`nft mx-auto mb-10 grid max-w-7xl gap-5 rounded-3xl p-5 shadow-md md:grid-cols-2 md:gap-10 ${bgColour}`}
    >
      <div className={"m-auto flex items-center"}>
        <NFTImage nft={data} chain={chain} />
      </div>

      <div>
        <Stack divider={<StackDivider />} spacing="4">
          <div className={"flex flex-col justify-between gap-5 md:flex-row"}>
            <h2 className={"text-2xl font-bold"}>
              {name || truncate(token_address)}
            </h2>
          </div>

          <Box>
            <div className={"flex items-end gap-2"}>
              <IconId className={"h-5 w-5"} />
              <Heading as="h2" size="xs" fontWeight={"normal"}>
                SYMBOL
              </Heading>
            </div>

            <Text fontSize="xl">{symbol}</Text>
          </Box>

          <Box>
            <div className={"flex items-end gap-2"}>
              <IconLink className={"h-5 w-5"} />
              <Heading as="h2" size="xs" fontWeight={"normal"}>
                CHAIN
              </Heading>
            </div>
            <Text fontSize="xl">{getChainName(chain)}</Text>
          </Box>

          <Box>
            <div className={"flex items-end gap-2"}>
              <IconCategory className={"h-5 w-5"} />
              <Heading as="h2" size="xs" fontWeight={"normal"}>
                TYPE
              </Heading>
            </div>

            <Text fontSize="xl">{contract_type}</Text>
          </Box>

          <Box>
            <div className={"flex items-end gap-2"}>
              <IconExternalLink className={"h-5 w-5"} />
              <Heading as="h2" size="xs" fontWeight={"normal"}>
                CONTRACT
              </Heading>
            </div>
            <Text fontSize="xl">
              <Link
                href={`https://${getExplorer(chain)}/token/${token_address}`}
                isExternal
              >
                {truncate(token_address)}
              </Link>
            </Text>
          </Box>
        </Stack>
      </div>
    </section>
  );
}

type NFTsProps = {
  chain: string | string[] | undefined;
  collection: string | string[] | undefined;
};

function NFTs({ chain, collection }: NFTsProps) {
  const { limit } = useStore();

  const {
    data,
    isSuccess,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [chain, collection, "collectionNfts", limit!.value],
    (query) => fetchCollectionNfts(query, chain, collection, limit?.value),
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (data?.pages[0].result.length === 0)
    return <Error msg={"No NFTs found for this collection."} />;

  return (
    <div>
      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.pages.map((page) => (
          <Fragment key={page}>
            {page.result.map((nft: NFT) => (
              <NFTCard key={nft.token_hash} nft={nft} chain={chain as string} />
            ))}
          </Fragment>
        ))}
      </div>

      <div className={"mt-10 flex items-center justify-center gap-10"}>
        <LoadMore
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          limit={limit!.value}
        />

        {isSuccess && <PageLimit />}
      </div>
    </div>
  );
}
