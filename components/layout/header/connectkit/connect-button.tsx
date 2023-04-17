import { Button, useColorModeValue } from "@chakra-ui/react";

interface ConnectButtonProps {
  show: (() => void) | undefined;
}
export default function ConnectButton({ show }: ConnectButtonProps) {
  const backgroundColor = useColorModeValue("#1f2937", "white");
  const hoverBackgroundColor = useColorModeValue(
    "rgb(2 6 23)",
    "rgb(203 213 225)"
  );
  const textColor = useColorModeValue("white", "rgb(15 23 42)");

  return (
    <Button
      onClick={show}
      className={"shadow-md"}
      borderRadius={"0.75rem"}
      fontWeight={"medium"}
      backgroundColor={backgroundColor}
      _hover={{
        backgroundColor: hoverBackgroundColor,
      }}
      textColor={textColor}
    >
      Connect Wallet
    </Button>
  );
}
