import {
  FormControl,
  FormLabel,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChakraStylesConfig, GroupBase, Select } from "chakra-react-select";
import { useStore, type Limit } from "@/src/state/store";

export default function PageLimit() {
  const { limit, setLimit } = useStore();

  const colorModeBg = useColorModeValue("white", "#1f2937");

  const chakraStyles: ChakraStylesConfig<Limit, true, GroupBase<Limit>> = {
    dropdownIndicator: (provided) => ({
      ...provided,
      paddingX: "3px",
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: colorModeBg,
      width: "4.5rem",
      borderRadius: "0.75rem",
    }),
    valueContainer: (provided) => ({
      ...provided,
      paddingLeft: "5px",
      paddingRight: "5px",
    }),
    menuList: (provided) => ({
      ...provided,
      borderRadius: "0.75rem", // rounded options list (dropdown)
    }),
  };

  return (
    <div>
      <FormControl
        id="react-select-limit-select-input"
        className="flex items-center justify-center text-center"
      >
        <FormLabel mb="0" fontWeight={"300"}>
          <Tooltip hasArrow openDelay={750} label="NFTs per page">
            Limit
          </Tooltip>
        </FormLabel>
        <Select<Limit, true, GroupBase<Limit>>
          instanceId="limit-select" // client-
          options={[
            {
              value: "5",
              label: "5",
            },
            {
              value: "10",
              label: "10",
            },
            {
              value: "25",
              label: "25",
            },
          ]}
          value={limit}
          onChange={(option) => {
            setLimit(option as unknown as Limit);
          }}
          className={"cursor-pointer"}
          chakraStyles={chakraStyles}
          isSearchable={false}
          menuPlacement={"auto"}
          aria-label={"page limit"}
        />
      </FormControl>
    </div>
  );
}
