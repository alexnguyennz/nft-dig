import Head from "next/head";
import Error from "@/components/misc/error";
export default function _404() {
  return (
    <>
      <Head>
        <title>NFT Dig. 404 - page not found</title>
      </Head>
      <Error msg={"404 - page not found."} />
    </>
  );
}
