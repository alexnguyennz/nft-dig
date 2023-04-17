import { Box, Spinner } from '@chakra-ui/react';

export default function LoadingSpinner() {
  return (
    <Box className="p-10 text-center">
      <Spinner w={24} h={24} thickness="8px" speed="0.9s" color="blue.500" />
    </Box>
  );
}
