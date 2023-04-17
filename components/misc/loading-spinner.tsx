import { Box, Spinner } from "@chakra-ui/react";

export default function LoadingSpinner() {
  return (
    <Box className="m-10 flex items-center justify-center">
      <Spinner w={24} h={24} thickness="8px" speed="1s" />
    </Box>
  );
}
