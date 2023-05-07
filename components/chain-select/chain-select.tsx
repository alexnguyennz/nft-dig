import { useEffect, useState } from "react";
import NextLink from "next/link";

import { useColorModeValue, Button } from "@chakra-ui/react";

import { useIsFetching } from "@tanstack/react-query";

import { useStore, type Chain } from "@/src/state/store";

import {
  Select,
  chakraComponents,
  type ChakraStylesConfig,
  type OptionBase,
  type GroupBase,
  type SelectComponentsConfig,
} from "chakra-react-select";

import { groupedOptions } from "@/src/chainConfig";
import { ChainIcon } from "@/components/chain-select/chain-icon";
import { IconFlame } from "@tabler/icons-react";

interface ChainOption extends OptionBase {
  value: string;
  label: string;
  chainId: number;
  icon: JSX.Element;
}

const customComponents: SelectComponentsConfig<
  ChainOption,
  false,
  GroupBase<ChainOption>
> = {
  Option: ({ children, ...props }) => (
    <chakraComponents.Option {...props}>
      <ChainIcon value={props.data.value} label={props.data.label} />
    </chakraComponents.Option>
  ),
  SingleValue: ({ children, ...props }) => (
    <chakraComponents.SingleValue {...props}>
      <ChainIcon value={props.data.value} label={props.data.label} />
    </chakraComponents.SingleValue>
  ),
};

export default function ChainSelect() {
  const isFetching = useIsFetching();

  const { chain, setChain } = useStore();

  const bgColour = useColorModeValue("white", "#1f2937");

  const chakraStyles: ChakraStylesConfig<
    ChainOption,
    false,
    GroupBase<ChainOption>
  > = {
    dropdownIndicator: (base) => ({
      ...base,
      backgroundColor: bgColour,
      borderLeft: "0px",
      paddingLeft: "0px",
      paddingRight: "5px",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      borderLeft: "0px",
    }),
    control: (base) => ({
      ...base,
      backgroundColor: bgColour,
      borderRadius: "0.75rem",
      width: "11rem",
    }),
    valueContainer: (base) => ({
      ...base,
      paddingLeft: "3px",
      paddingRight: "0px",
    }),
    menuList: (base) => ({
      ...base,
      borderRadius: "0.75rem 0rem 0rem 0.75rem", // rounded options list (dropdown)
    }),
    groupHeading: (base) => ({
      ...base,
      fontWeight: "normal",
    }),
  };

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (chain) setLoaded(true);
  }, [chain]);

  if (!loaded)
    return (
      <Button
        size="lg"
        style={{ width: "11rem" }}
        backgroundColor={bgColour}
        border={"1px solid rgba(255, 255, 255, 0.16)"}
        borderRadius="0.75rem"
        isLoading={true}
      />
    );

  return (
    <>
      <form data-testid="chain-select">
        <Select<ChainOption, false, GroupBase<ChainOption>>
          instanceId="chain-select"
          name={"chain-select"}
          inputId={"chain-select"}
          size="lg"
          colorScheme={bgColour}
          options={groupedOptions}
          defaultValue={{
            value: "eth",
            label: "Ethereum",
            chainId: 1,
            icon: <ChainIcon value="eth" />,
          }}
          onChange={(option) => {
            setChain(option as unknown as Chain);
          }}
          className={"inline-block cursor-pointer"}
          chakraStyles={chakraStyles}
          isDisabled={isFetching > 0}
          isSearchable={false}
          components={customComponents}
          aria-label={"Chain options select"}
        />
      </form>
      {chain.value === "eth" && (
        <div className={"my-3 flex justify-center"}>
          <NextLink href="/eth/top" className={"flex items-center"}>
            <IconFlame className={"inline-block"} /> Top Collections
          </NextLink>
        </div>
      )}
    </>
  );
}
