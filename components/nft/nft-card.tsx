import NextLink from "next/link";

import { useQuery } from "@tanstack/react-query";

import {
  useColorModeValue,
  Box,
  Heading,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  IconAlertCircleFilled,
  IconCode,
  IconDots,
  IconRefresh,
} from "@tabler/icons-react";

import NFTImage from "@/components/nft/nft-media";
import { refreshMetadata } from "@/src/utils/api";
import { type NFT } from "@/src/types";

interface NFTCardProps {
  nft: NFT;
  chain: string;
}

export default function NFTCard({ nft, chain }: NFTCardProps) {
  const { refetch } = useQuery(
    [chain, nft.token_address, nft.token_id, "refreshMetadata"],
    () => refreshMetadata(chain, nft.token_address, nft.token_id),
    {
      retry: 1,
      enabled: false,
    }
  );

  const colorModeBg = useColorModeValue("bg-white", "bg-gray-800");
  const colorModeCard = useColorModeValue(
    "white border-gray-200",
    "bg-gray-700 border-gray-800"
  );

  return (
    <div className={`mt-auto rounded-b-xl shadow-md ${colorModeBg}`}>
      <NFTImage nft={nft} chain={chain} size="350" />

      <div
        className={`mt-auto rounded-b-lg border-t p-3 text-center ${colorModeCard}`}
      >
        <Heading as={"h2"} size={"md"} noOfLines={2} fontWeight={"medium"}>
          <NextLink href={`/${chain}/${nft.token_address}/${nft.token_id}`}>
            {nft.appMetadata?.name ? nft.appMetadata.name : `#${nft.token_id}`}
          </NextLink>
        </Heading>

        <h3>
          <NextLink href={`/${chain}/collection/${nft.token_address}`}>
            {nft.name ? nft.name : "Collection"}
          </NextLink>
        </h3>

        <Box className="flex justify-end gap-3">
          <Menu isLazy={true} lazyBehavior="keepMounted">
            <MenuButton as="button">
              <IconDots />
            </MenuButton>
            <MenuList
              className={"nft-menu"}
              minWidth={"125px"}
              borderRadius={"0.75rem"}
            >
              <MenuItem
                onClick={() => refetch()}
                icon={<IconRefresh className={"h-5 w-5"} />}
              >
                Refresh metadata
              </MenuItem>
              <MenuItem
                icon={
                  nft.token_uri ? (
                    <IconCode className={"h-5 w-5"} />
                  ) : (
                    <IconAlertCircleFilled className={"h-5 w-5"} />
                  )
                }
                as={Link}
                href={nft.token_uri ? nft.token_uri : "#"}
                isExternal
                isDisabled={!nft.token_uri}
              >
                {nft.token_uri ? "Token URI" : "No token URI"}
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </div>
    </div>
  );
}
