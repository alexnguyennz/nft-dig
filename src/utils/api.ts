/* Wallet NFTs */
export async function fetchWalletNfts(
  { pageParam = "" },
  chain: string | string[] | undefined,
  address: string | string[] | undefined,
  limit: string | undefined
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/resolve/chain/${chain}/address/${address}/limit/${limit}/` +
      pageParam
  ).then((response) => response.json());
}

/* getNFTMetadata */
export async function fetchNft(
  chain: string | string[] | undefined,
  address: string | string[] | undefined,
  tokenId: string | string[] | undefined
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/nft/chain/${chain}/address/${address}/id/${tokenId}`
  ).then((response) => response.json());
}

/* Collection */
export async function fetchCollectionNfts(
  { pageParam = "" },
  chain: string | string[] | undefined,
  collection: string | string[] | undefined,
  limit: string | string[] | undefined = "1"
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/collection/chain/${chain}/address/${collection}/limit/${limit}/` +
      pageParam
  ).then((response) => response.json());
}

/* Get Random Wallet Address */
export async function fetchRandomWallet() {
  return fetch(`${process.env.NEXT_PUBLIC_SERVER}/api/randomwallet`).then(
    (response) => response.json()
  );
}

export async function refreshMetadata(
  chain: string | string[] | undefined,
  address: string | string[] | undefined,
  tokenId: string | string[] | undefined
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/resync/chain/${chain}/address/${address}/id/${tokenId}`
  );

  if (!response.ok) throw new Error("Error refreshing metadata");

  return response.json();
}

/* Search NFTs */
export async function searchNfts(
  { pageParam = "" },
  chain: string | string[] | undefined,
  searchTerms: string | string[] | undefined,
  searchFilter: string | string[] | undefined,
  limit: string | undefined
) {
  return fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/api/search/chain/${chain}/q/${searchTerms}/filter/${searchFilter}/limit/${limit}/` +
      pageParam
  ).then((response) => response.json());
}
