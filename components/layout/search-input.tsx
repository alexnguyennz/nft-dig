import { useEffect, useState, type SetStateAction } from "react";
import { useRouter } from "next/router";

import { useIsFetching } from "@tanstack/react-query";

import { useStore } from "@/src/state/store";

import { useColorModeValue, Button } from "@chakra-ui/react";
import { CreatableSelect, ChakraStylesConfig } from "chakra-react-select";
import { IconSearch } from "@tabler/icons-react";

import CancelButton from "@/components/layout/cancel-button";

interface SearchItem {
  label: string;
  value: string;
}

export default function SearchInput() {
  const { asPath, pathname, query, push } = useRouter();

  const isFetching = useIsFetching();

  const { chain } = useStore();

  const bgColour = useColorModeValue("white", "#1f2937");
  const placeholderColour = useColorModeValue(
    "rgb(160,167,178)",
    "rgb(156,163,175)"
  );

  const [searchOptions, setSearchOptions] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  const chakraStyles: ChakraStylesConfig = {
    control: (base) => ({
      ...base,
      backgroundColor: bgColour,
      borderRadius: "0.75rem",
    }),
    placeholder: (base) => ({
      ...base,
      color: placeholderColour,
      marginLeft: "0px", // align placeholder text with other tab inputs
    }),
    inputContainer: (base) => ({
      ...base,
      color: placeholderColour,
      marginLeft: "0px", // align placeholder text with other tab inputs
    }),
  };

  useEffect(() => {
    if (searchOptions) {
      const query = searchOptions
        .map((item: SearchItem) => item.value)
        .join(" ");

      setSearchQuery(query);
    }
  }, [searchOptions]);

  useEffect(() => {
    if (pathname === "/[chain]/search/[search]" && query.search) {
      if (typeof query.search === "string") {
        setSearchOptions(
          query.search.split(" ").map((term) => ({
            label: term,
            value: term,
          }))
        );
      }
    }
  }, [pathname, query]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (chain) setLoaded(true);
  }, [chain]);

  if (!loaded) return null;

  return (
    <>
      <CreatableSelect
        instanceId="search-select"
        size="lg"
        className="mb-4 w-full cursor-text text-left sm:max-w-xl"
        components={{ DropdownIndicator: null }}
        isMulti
        value={searchOptions}
        onChange={(value) => {
          setSearchOptions(
            value as SetStateAction<{ label: string; value: string }[]>
          );
        }}
        placeholder="Search keywords"
        chakraStyles={chakraStyles}
        formatCreateLabel={(value) => `Add ${value}`}
        noOptionsMessage={() => null}
      />

      <div>
        {!isFetching && (
          <>
            <Button
              type="submit"
              size="lg"
              loadingText="Loading"
              spinnerPlacement="end"
              colorScheme="blue"
              rightIcon={<IconSearch />}
              borderRadius={"0.75rem"}
              paddingX={"1rem"}
              onClick={() => {
                if (searchQuery) push(`/${chain!.value}/search/${searchQuery}`);
              }}
              isDisabled={
                asPath ===
                `/${chain!.value}/search/${encodeURIComponent(searchQuery)}`
              }
            >
              Search
            </Button>
          </>
        )}

        {isFetching > 0 && <CancelButton />}
      </div>
    </>
  );
}
