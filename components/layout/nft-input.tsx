import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { useIsFetching } from "@tanstack/react-query";
import { useStore } from "@/src/state/store";

import { useColorModeValue, Button, Input, InputGroup } from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";

import CancelButton from "@/components/layout/cancel-button";

export default function NFTInput() {
  const { asPath, pathname, query, push } = useRouter();

  const isFetching = useIsFetching();

  const { chain } = useStore();

  const [address, setAddress] = useState<string | string[] | undefined>("");
  const [id, setId] = useState<string | string[] | undefined>("");

  const bgColour = useColorModeValue("white", "#1f2937");

  useEffect(() => {
    if (pathname === "/[chain]/[...nft]" && query.nft) {
      setAddress(query.nft[0]);
      setId(query.nft[1]);
    }
  }, [pathname, query]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          push(`/${chain!.value}/${address}/${id}`);
        }}
      >
        <InputGroup className={"mb-4 sm:max-w-xl"}>
          <Input
            value={address}
            onChange={(e) => setAddress(e.currentTarget.value)}
            placeholder="Token address"
            size="lg"
            isDisabled={isFetching > 0}
            backgroundColor={bgColour}
            isRequired
            borderRadius="0.75rem 0 0 0.75rem"
          />

          <Input
            value={id}
            onChange={(e) => setId(e.currentTarget.value)}
            placeholder="ID"
            size="lg"
            width={"6rem"}
            isDisabled={isFetching > 0}
            backgroundColor={bgColour}
            isRequired
            borderRadius="0 0.75rem 0.75rem 0"
            marginLeft={"-1px"}
          />
        </InputGroup>

        <div className={"space-x-5"}>
          {!isFetching && (
            <Button
              type="submit"
              size="lg"
              colorScheme="blue"
              rightIcon={<IconArrowRight />}
              borderRadius={"0.75rem"}
              paddingX={"1rem"}
              isDisabled={asPath === `/${chain!.value}/${address}/${id}`}
            >
              View
            </Button>
          )}

          {isFetching > 0 && <CancelButton />}
        </div>
      </form>
    </>
  );
}
