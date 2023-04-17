import { useEffect, useState } from "react";
import { useColorModeValue, Button } from "@chakra-ui/react";

import { useIsFetching } from "@tanstack/react-query";

import { useStore, type Chain } from "@/src/state/store";

import {
  Select,
  chakraComponents,
  type ChakraStylesConfig,
  type OptionProps,
  type GroupBase,
} from "chakra-react-select";

import { groupedOptions } from "@/src/chainConfig";
import { ChainIcon } from "@/components/chain-select/chain-icon";

const customComponents = {
  Option: ({
    children,
    ...props
  }: OptionProps<Chain, true, GroupBase<Chain>>) => (
    <chakraComponents.Option {...props}>
      {props.data.icon} {children}
    </chakraComponents.Option>
  ),
};

export default function ChainSelect() {
  const isFetching = useIsFetching();

  const { chain, setChain } = useStore();

  const bgColour = useColorModeValue("white", "#1f2937");

  const chakraStyles: ChakraStylesConfig<Chain, true, GroupBase<Chain>> = {
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
      <Select<Chain, true, GroupBase<Chain>>
        instanceId="chain-select"
        size="lg"
        colorScheme={bgColour}
        options={groupedOptions}
        value={{
          icon: <ChainIcon value={chain!.value} label={chain!.label} />,
          value: chain!.value,
          label: (
            <ChainIcon value={chain!.value} label={chain!.label} />
          ) as unknown as string,
          chainId: 1,
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
    </>
  );
}
