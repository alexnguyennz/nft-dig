import { useRouter } from "next/router";

import { useQueryClient, type QueryKey } from "@tanstack/react-query";

import { Button, Spinner } from "@chakra-ui/react";

export default function CancelButton({ queryKey }: { queryKey: QueryKey }) {
  const { push } = useRouter();

  const queryClient = useQueryClient();

  return (
    <Button
      onClick={() => {
        queryClient.cancelQueries({ queryKey });
        push("/");
      }}
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
  );
}
