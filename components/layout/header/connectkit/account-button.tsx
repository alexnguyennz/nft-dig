import {
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import { IconChevronDown, IconSearch, IconUser } from "@tabler/icons-react";
import { getChainValue, truncate } from "@/src/utils/chain";
import NextLink from "next/link";

interface AccountButtonProps {
  address: `0x${string}` | undefined;
  chain: number | undefined;
  show: (() => void) | undefined;
}
export default function AccountButton({
  address,
  chain,
  show,
}: AccountButtonProps) {
  const bgColour = useColorModeValue("#1f2937", "white");
  const hoverBgColour = useColorModeValue("rgb(2 6 23)", "rgb(203 213 225)");
  const textColour = useColorModeValue("white", "rgb(15 23 42)");

  return (
    <Menu isLazy={true} lazyBehavior="keepMounted">
      <MenuButton
        as={Button}
        className={"shadow-md"}
        rightIcon={<IconChevronDown strokeWidth={2.5} />}
        iconSpacing={"5px"}
        paddingX={"10px"}
        borderRadius={"0.75rem"}
        fontWeight={"medium"}
        backgroundColor={bgColour}
        _hover={{
          backgroundColor: hoverBgColour,
        }}
        _active={{
          backgroundColor: hoverBgColour,
        }}
        textColor={textColour}
      >
        {truncate(address!)}
      </MenuButton>
      <MenuList minWidth={"125px"} borderRadius={"0.75rem"}>
        <MenuItem
          as={NextLink}
          href={{
            pathname: "/[chain]/[address]",
            query: {
              chain: getChainValue(chain!),
              address: address,
            },
          }}
          icon={<IconSearch className={"h-5 w-5"} />}
        >
          <span>View NFTs</span>
        </MenuItem>
        <MenuDivider />
        <MenuItem onClick={show} icon={<IconUser className={"h-5 w-5"} />}>
          <span>Account</span>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
