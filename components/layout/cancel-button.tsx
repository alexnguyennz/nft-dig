import NextLink from "next/link";

import { Button, Spinner } from "@chakra-ui/react";

export default function CancelButton() {
  return (
    <NextLink href="/" passHref legacyBehavior={true}>
      <Button
        as="a"
        size="lg"
        loadingText="Loading"
        spinnerPlacement="end"
        colorScheme="red"
        borderRadius={"0.75rem"}
        backgroundColor="red.400"
        fontWeight={"medium"}
        rightIcon={<Spinner w={4} h={4} />}
      >
        Cancel
      </Button>
    </NextLink>
  );
}
