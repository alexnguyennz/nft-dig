import { ReactNode, useEffect } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { useStore } from "@/src/state/store";

import { useColorModeValue, Box } from "@chakra-ui/react";

import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer";

import Tabs from "@/components/layout/tabs";

import { findChain } from "@/src/utils/chain";

export default function Layout({ children }: { children: ReactNode }) {
  const { query } = useRouter();

  const { setChain } = useStore();

  const bgColour = useColorModeValue("bg-rose-50", "bg-gray-900");
  const logo = useColorModeValue("logo", "logo-dark");

  useEffect(() => {
    if (query.chain) {
      const foundChain = findChain(query.chain as string);
      if (foundChain) setChain(foundChain);
    }
  }, [query]);

  return (
    <Box className={`flex min-h-screen flex-col  p-5 ${bgColour}`}>
      <section className="flex flex-col text-center">
        <Header />
        <div className={"mb-3 mt-5"}>
          <NextLink href="/">
            <Image
              src={`/${logo}.png`}
              alt="logo"
              width={250}
              height={283}
              className={"inline-block w-32"}
              priority
            />
          </NextLink>
        </div>
      </section>

      <Tabs />

      <main className={"flex flex-1 flex-col"}>{children}</main>

      <Footer />
    </Box>
  );
}
