import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useQuery, useIsFetching } from "@tanstack/react-query";
import { useStore } from "@/src/state/store";

import { useColorModeValue, Button, Input } from "@chakra-ui/react";
import { IconArrowRight, IconDice4 } from "@tabler/icons-react";

import CancelButton from "@/components/layout/cancel-button";

import { fetchRandomWallet } from "@/src/utils/api";

export default function WalletInput() {
  const { asPath, pathname, query, push } = useRouter();

  const isFetching = useIsFetching();

  const { chain, limit } = useStore();
  const [address, setAddress] = useState<string | string[] | undefined>("");

  const bgColour = useColorModeValue("white", "#1f2937");

  const { refetch, data } = useQuery(
    ["randomWallet"],
    () => fetchRandomWallet(),
    {
      retry: 1,
      enabled: false,
    }
  );

  useEffect(() => {
    if (data) {
      push({
        pathname: "/[chain]/[address]",
        query: { chain: chain!.value, address: data.address },
      });
    }
  }, [data]);

  useEffect(() => {
    if (pathname === "/") setAddress("");

    if (pathname === "/[chain]/[address]" && query.address) {
      setAddress(query.address);
    }
  }, [pathname, query]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          push({
            pathname: "/[chain]/[address]",
            query: { chain: chain!.value, address },
          });
        }}
      >
        <Input
          placeholder="Wallet address or domain"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          size="lg"
          className={"mb-4 sm:max-w-xl"}
          isDisabled={isFetching > 0}
          backgroundColor={bgColour}
          isRequired
          borderRadius="0.75rem"
        />

        <div className={"flex justify-center gap-5"}>
          {!isFetching && (
            <>
              <Button
                type="submit"
                size="lg"
                colorScheme="blue"
                rightIcon={<IconArrowRight />}
                borderRadius={"0.75rem"}
                paddingX={"1rem"}
                isDisabled={asPath === `/${chain!.value}/${address}`}
              >
                View
              </Button>
              <Button
                onClick={() => refetch()}
                size="lg"
                colorScheme="blue"
                borderRadius={"0.75rem"}
                rightIcon={<IconDice4 />}
                paddingX={"1rem"}
              >
                Random
              </Button>
            </>
          )}

          {isFetching > 0 && (
            <CancelButton
              queryKey={[chain!.value, address, "nfts", limit!.value]}
            />
          )}
        </div>
      </form>
    </>
  );
}
