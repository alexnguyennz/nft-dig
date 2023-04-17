import { useColorMode } from "@chakra-ui/react";
import { IconMoonFilled, IconSunFilled } from "@tabler/icons-react";

export default function ColourMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <button onClick={toggleColorMode} aria-label={"Toggle colour mode"}>
      {colorMode === "dark" ? <IconMoonFilled /> : <IconSunFilled />}
    </button>
  );
}
