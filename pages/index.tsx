import Head from "next/head";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      cookies: req.headers.cookie ?? "",
    },
  };
};

export default function Index() {
  return (
    <Head>
      <title>NFT Dig - A multi-chain NFT viewer.</title>
      <meta
        name="description"
        content="NFT Dig is a simple multi-chain NFT viewer. View NFTs for any wallet/collection or search for them."
      />
    </Head>
  );
}
