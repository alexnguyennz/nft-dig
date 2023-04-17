import { Fragment } from "react";
import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useStore } from "@/src/state/store";

import PageLimit from "@/components/layout/page-limit";
import Error from "@/components/misc/error";
import NFTCard from "@/components/nft/nft-card";
import LoadMoreButton from "@/components/load-more-button/load-more-button";

import { type NFT } from "@/src/types";

import { fetchWalletNfts } from "@/src/utils/api";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { chain, address } = query;

  return {
    props: {
      chain,
      address,
      cookies: req.headers.cookie ?? "",
    },
  };
};

export default function UserNFTs({
  chain,
  address,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { limit } = useStore();

  const {
    data,
    isSuccess,
    isError,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [chain, address, "nfts", limit!.value],
    (query) => fetchWalletNfts(query, chain, address, limit!.value),
    {
      retry: 1,
      getNextPageParam: (lastPage) => lastPage.cursor, // return cursor if valid otherwise undefined to make this the last page
      keepPreviousData: true,
    }
  );

  if (isError)
    return (
      <>
        <Head>
          <title>{`NFT Dig - ${address}`}</title>
        </Head>
        <Error
          msg={"An error occurred. Make sure the address or domain is valid."}
        />
      </>
    );

  if (data?.pages[0].result.length === 0)
    return (
      <>
        <Head>
          <title>{`NFT Dig - ${address}`}</title>
        </Head>
        <Error msg={"No NFTs found."} />
      </>
    );

  return (
    <>
      <Head>
        <title>{`NFT Dig - ${address}`}</title>
      </Head>

      <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {data?.pages.map((page, idx) => (
          <Fragment key={idx}>
            {page.result.map((nft: NFT) => (
              <NFTCard key={nft.token_hash} nft={nft} chain={chain} />
            ))}
          </Fragment>
        ))}
      </div>

      <div className={"mt-10 flex items-center justify-center gap-10"}>
        <LoadMoreButton
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          limit={limit!.value}
        />

        {isSuccess && <PageLimit />}
      </div>
    </>
  );
}
