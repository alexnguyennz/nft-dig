import { ConnectKitButton } from "connectkit";

import ConnectButton from "@/components/layout/header/connectkit/connect-button";
import AccountButton from "@/components/layout/header/connectkit/account-button";
import { Button, Spinner, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ConnectKit() {
  const bgColour = useColorModeValue("#1f2937", "white");
  const hoverBgColour = useColorModeValue("rgb(2 6 23)", "rgb(203 213 225)");
  const textColour = useColorModeValue("white", "rgb(15 23 42)");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 250); // hide placeholder button as ConnectKit renders
  }, []);

  if (loading)
    return (
      <Button
        className={"shadow-md"}
        rightIcon={<Spinner size={"sm"} />}
        iconSpacing={0}
        borderRadius={"0.75rem"}
        fontWeight={"medium"}
        backgroundColor={bgColour}
        _hover={{
          backgroundColor: hoverBgColour,
        }}
        textColor={textColour}
        isDisabled={true}
      />
    );

  return (
    <>
      <ConnectKitButton.Custom>
        {({ isConnected, show, address, chain }) => {
          return (
            <>
              {isConnected ? (
                <AccountButton
                  address={address}
                  chain={chain!.id}
                  show={show}
                />
              ) : (
                <ConnectButton show={show} />
              )}
            </>
          );
        }}
      </ConnectKitButton.Custom>
    </>
  );
}
