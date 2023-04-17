import Head from "next/head";
import { GetServerSideProps } from "next";

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
      <title>NFT Dig - A multichain NFT viewer.</title>
      <meta
        name="description"
        content="NFT Dig is a simple multichain NFT viewer."
      />
    </Head>
  );
}
