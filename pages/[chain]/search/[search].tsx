import { Fragment } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { useInfiniteQuery } from "@tanstack/react-query";

import { useStore } from "@/src/state/store";

import NFTCard from "@/components/nft/nft-card";
import PageLimit from "@/components/layout/page-limit";
import Error from "@/components/misc/error";
import LoadMoreButton from "@/components/load-more-button/load-more-button";

import { searchNfts } from "@/src/utils/api";
import { NFT } from "@/src/types";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { chain, search } = query;

  return { props: { chain, search, cookies: req.headers.cookie ?? "" } };
};

export default function Search({
  chain,
  search,
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
    [chain, search, "searchNfts", limit!.value],
    (query) => searchNfts(query, chain, search, "name", limit!.value),
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
          <title>{`NFT Dig - ${search}`}</title>
        </Head>
        <Error msg={"An error occurred. Please try again."} />
      </>
    );

  if (data?.pages[0].result.length === 0)
    return (
      <>
        <Head>
          <title>{`NFT Dig - ${search}`}</title>
        </Head>
        <Error msg={"No NFTs found."} />
      </>
    );

  return (
    <>
      <Head>
        <title>{`NFT Dig - ${search}`}</title>
      </Head>

      <div className="3xl:grid-cols-7 4xl:grid-cols-8 grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
