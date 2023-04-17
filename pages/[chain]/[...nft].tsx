import Head from "next/head";
import NextLink from "next/link";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useQuery } from "@tanstack/react-query";

import {
  useColorModeValue,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Link,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Stack,
  StackDivider,
  Heading,
  Text,
  MenuButton,
  MenuList,
  MenuItem,
  Menu,
} from "@chakra-ui/react";
import {
  IconAlertCircleFilled,
  IconCode,
  IconDots,
  IconExternalLink,
  IconFileDescription,
  IconFolder,
  IconHash,
  IconHome,
  IconListDetails,
  IconPhoto,
  IconRefresh,
  IconUser,
} from "@tabler/icons-react";

import ReactMarkdown from "react-markdown";

import NFTImage from "@/components/nft/nft-media";

import { fetchNft, refreshMetadata } from "@/src/utils/api";
import { truncate, getExplorer } from "@/src/utils/chain";

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
  const { chain = "eth", nft } = query;

  const address = nft?.[0];
  const tokenId = nft?.[1];

  return {
    props: {
      chain,
      address,
      tokenId,
      cookies: req.headers.cookie ?? "",
    },
  };
};

export default function NFT({
  chain,
  address,
  tokenId,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isSuccess } = useQuery(
    [chain, address, tokenId, "nft metadata"],
    () => fetchNft(chain, address, tokenId),
    {
      retry: 1,
      keepPreviousData: true,
    }
  );

  console.log("data", data);

  const { refetch } = useQuery(
    [chain, address, tokenId, "refreshMetadata"],
    () => refreshMetadata(chain, address, tokenId),
    {
      retry: 1,
      enabled: false,
    }
  );

  const bgColour = useColorModeValue("bg-white", "bg-gray-800");

  if (isSuccess)
    return (
      <>
        <Head>
          <title>{`NFT Dig - ${
            data.appMetadata?.name ? data.appMetadata.name : `#${data.token_id}`
          }`}</title>
        </Head>
        <div className={"mb-5 flex justify-center"}>
          <Breadcrumb spacing="8px" separator="→">
            <BreadcrumbItem>
              <BreadcrumbLink as={NextLink} href="/">
                <IconHome />
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink
                as={NextLink}
                href={`/${chain}/collection/${data.token_address}`}
              >
                {data.name || truncate(data.token_address)}
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#" fontWeight={"bold"}>
                {data.appMetadata?.name
                  ? data.appMetadata?.name
                  : `#${data.token_id}`}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <section
          className={`nft mx-auto grid max-w-7xl grid-cols-1 gap-5 rounded-3xl p-5 shadow-md md:grid-cols-2 md:gap-10 ${bgColour}`}
        >
          <div className={"flex items-center justify-center"}>
            <div className={"grow"}>
              <NFTImage nft={data} chain={chain as string} fullSize={true} />
            </div>
          </div>

          <div>
            <Stack divider={<StackDivider />} spacing="4">
              <div
                className={"flex flex-col justify-between gap-5 md:flex-row"}
              >
                <h2 className={"text-2xl font-bold"}>
                  {data.appMetadata?.name
                    ? data.appMetadata?.name
                    : `#${data.token_id}`}
                </h2>

                <div className={"flex gap-5"}>
                  <Menu isLazy={true} lazyBehavior="keepMounted">
                    <MenuButton as="button">
                      <IconDots className={"h-8 w-8"} />
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
                      {data.appMetadata?.original_image && (
                        <MenuItem
                          icon={<IconPhoto className={"h-5 w-5"} />}
                          as={Link}
                          href={
                            data.appMetadata?.animation_url ||
                            data.appMetadata.original_image
                          }
                          isExternal
                        >
                          Source
                        </MenuItem>
                      )}
                      <MenuItem
                        icon={
                          data.token_uri ? (
                            <IconCode className={"h-5 w-5"} />
                          ) : (
                            <IconAlertCircleFilled className={"h-5 w-5"} />
                          )
                        }
                        as={Link}
                        href={data.token_uri ? data.token_uri : "#"}
                        isExternal
                        isDisabled={!data.token_uri}
                      >
                        {data.token_uri ? "Token URI" : "No token URI"}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>

              {data.appMetadata?.description &&
                data.appMetadata.description && (
                  <Box>
                    <div className={"flex items-end gap-2"}>
                      <IconFileDescription className={"h-5 w-5"} />
                      <Heading as="h2" size="xs" fontWeight={"normal"}>
                        DESCRIPTION
                      </Heading>
                    </div>

                    <div className={"markdown-body text-xl"}>
                      <ReactMarkdown>
                        {String(data.appMetadata.description).replace(
                          /\n/gi,
                          "\n\n &nbsp;"
                        )}
                      </ReactMarkdown>
                    </div>
                  </Box>
                )}

              {data.appMetadata?.attributes &&
                data.appMetadata?.attributes?.length && (
                  <Box>
                    <div className={"flex items-end gap-2"}>
                      <IconListDetails className={"h-5 w-5"} />
                      <Heading as="h2" size="xs" fontWeight={"normal"}>
                        ATTRIBUTES
                      </Heading>
                    </div>
                    <Box className="text-lg">
                      <TableContainer whiteSpace="normal">
                        <Table>
                          <Tbody>
                            {data.appMetadata?.attributes?.map(
                              (attribute: [], idx: number) => {
                                const values = Object.values(attribute);

                                return (
                                  <Tr key={idx}>
                                    <Td p={3}>{values[0]}</Td>
                                    <Td p={3} className={"break-all"}>
                                      {values[1]}
                                    </Td>
                                  </Tr>
                                );
                              }
                            )}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                )}

              {data.appMetadata?.external_url && (
                <Box>
                  <div className={"flex items-end gap-2"}>
                    <IconExternalLink className={"h-5 w-5"} />
                    <Heading as="h2" size="xs" fontWeight={"normal"}>
                      URL
                    </Heading>
                  </div>
                  <Text fontSize="xl">
                    <Link href={data.appMetadata.external_url} isExternal>
                      {data.appMetadata.external_url}
                    </Link>
                  </Text>
                </Box>
              )}

              <Box>
                <div className={"flex items-end gap-2"}>
                  <IconHash className={"h-5 w-5"} />
                  <Heading as="h2" size="xs" fontWeight={"normal"}>
                    TOKEN ID
                  </Heading>
                </div>
                <Text fontSize="xl">
                  <Link
                    href={`https://${getExplorer(chain as string)}/token/${
                      data.token_address
                    }?a=${data.token_id}`}
                    isExternal
                  >
                    {data.token_id.length > 10
                      ? truncate(data.token_id)
                      : data.token_id}
                  </Link>
                </Text>
              </Box>

              <Box>
                <div className={"flex items-end gap-2"}>
                  <IconFolder className={"h-5 w-5"} />
                  <Heading as="h2" size="xs" fontWeight={"normal"}>
                    COLLECTION
                  </Heading>
                </div>

                <Text fontSize="xl">
                  <NextLink href={`/${chain}/collection/${data.token_address}`}>
                    {data.name || truncate(data.token_address)}
                  </NextLink>
                </Text>
              </Box>

              <Box>
                <div className={"flex items-end gap-2"}>
                  <IconUser className={"h-5 w-5"} />
                  <Heading as="h2" size="xs" fontWeight={"normal"}>
                    OWNER
                  </Heading>
                </div>

                <Text fontSize="xl">
                  <NextLink href={`/${chain}/${data.owner_of}`}>
                    {truncate(data.owner_of)}
                  </NextLink>
                </Text>
              </Box>
            </Stack>
          </div>
        </section>
      </>
    );
}
