import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useIsFetching } from "@tanstack/react-query";
import { useStore } from "@/src/state/store";

import { useColorModeValue, Button, Input } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";

import CancelButton from "@/components/layout/cancel-button";

export default function CollectionInput() {
  const { asPath, pathname, query, push } = useRouter();

  const isFetching = useIsFetching();

  const { chain } = useStore();
  const [address, setAddress] = useState<string | string[] | undefined>("");

  const bgColour = useColorModeValue("white", "#1f2937");

  useEffect(() => {
    if (pathname === "/") setAddress("");

    if (pathname === "/[chain]/collection/[collection]" && query.collection) {
      setAddress(query.collection);
    }
  }, [pathname, query]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          push(`/${chain!.value}/collection/${address}`);
        }}
      >
        <Input
          placeholder="Token address"
          value={address}
          onChange={(e) => setAddress(e.currentTarget.value)}
          size="lg"
          className={"mb-4 sm:max-w-xl"}
          isDisabled={isFetching > 0}
          backgroundColor={bgColour}
          isRequired
          borderRadius="0.75rem"
        />

        <div>
          {!isFetching && (
            <Button
              type="submit"
              size="lg"
              colorScheme="blue"
              rightIcon={<IconArrowRight />}
              borderRadius={"0.75rem"}
              paddingX={"1rem"}
              isDisabled={asPath === `/${chain!.value}/collection/${address}`}
            >
              View
            </Button>
          )}

          {isFetching > 0 && (
            <CancelButton queryKey={[chain!.value, address, "collection"]} />
          )}
        </div>
      </form>
    </>
  );
}
