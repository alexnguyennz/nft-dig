import { type FetchNextPageOptions } from "@tanstack/query-core";
import { type UseInfiniteQueryResult } from "@tanstack/react-query";

import { Button } from "@chakra-ui/react";
import { IconSquareRoundedPlusFilled } from "@tabler/icons-react";

interface LoadMoreButtonProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<UseInfiniteQueryResult>;
  isFetchingNextPage: boolean;
  limit: string;
}

export default function LoadMore({
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage,
  limit,
}: LoadMoreButtonProps) {
  return (
    <div className="text-center">
      {hasNextPage && (
        <Button
          type="submit"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          isLoading={isFetchingNextPage}
          colorScheme="blue"
          borderRadius={"0.75rem"}
          fontWeight={"medium"}
        >
          Load {limit} <IconSquareRoundedPlusFilled className={"ml-1"} />
        </Button>
      )}
    </div>
  );
}
