import {
  useDisclosure,
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Link,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

import { mainnetOptions, testnetOptions } from "@/src/chainConfig";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconInfoCircleFilled,
} from "@tabler/icons-react";

export default function InfoModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <button onClick={onOpen}>
        <IconInfoCircleFilled />
      </button>

      <Modal
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent borderRadius={"1.5rem"}>
          <ModalHeader textAlign="center" fontWeight={"medium"}>
            What is NFT Dig?
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize={"lg"}>
            <div className="mb-5 space-y-3 text-center">
              <p>NFT Dig is a tool to view NFTs for any wallet.</p>
              <p>You can connect your wallet to view your NFTs.</p>
              <p>
                Works with{" "}
                <Link href="https://ens.domains/" isExternal>
                  ENS
                </Link>{" "}
                and{" "}
                <Link href="https://unstoppabledomains.com/" isExternal>
                  Unstoppable
                </Link>
                .
              </p>
            </div>
            <Accordion allowToggle>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left" fontSize={"lg"}>
                      Supported formats
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel>
                  <List>
                    <ListItem>
                      <ListIcon as={Check} color="green.500" />
                      images
                    </ListItem>
                    <ListItem>
                      <ListIcon as={Check} color="green.500" />
                      videos
                    </ListItem>
                    <ListItem>
                      <ListIcon as={Check} color="green.500" />
                      audio
                    </ListItem>
                    <ListItem>
                      <ListIcon as={Check} color="green.500" />
                      3D models (glTF/GLB)
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize={"lg"}>
                    Supported chains
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel className="space-y-3">
                  <h3 className={"font-semibold"}>Mainnet</h3>
                  <List>
                    {mainnetOptions.map((chain) => (
                      <ListItem key={chain.value}>
                        <ListIcon as={Check} color="green.500" />
                        {chain.label}
                      </ListItem>
                    ))}
                  </List>
                  <h3 className={"font-semibold"}>Testnet</h3>
                  <List>
                    {testnetOptions.map((chain) => (
                      <ListItem key={chain.value}>
                        <ListIcon as={Check} color="green.500" />
                        {chain.label}
                      </ListItem>
                    ))}
                  </List>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontSize={"lg"}>
                    NFTs not displaying correctly?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  <List>
                    <ListItem>
                      <ListIcon as={X} color="green.500" />
                      broken or dead metadata/token URI
                    </ListItem>
                    <ListItem>
                      <ListIcon as={X} color="green.500" />
                      IPFS issues e.g. content removed
                    </ListItem>
                    <ListItem>
                      <ListIcon as={X} color="green.500" />
                      unsupported format
                    </ListItem>
                  </List>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
}

function Check() {
  return (
    <IconCircleCheckFilled
      className={"mb-1 mr-2 inline h-6 w-6 text-green-600"}
    />
  );
}

function X() {
  return (
    <IconCircleXFilled className={"mb-1 mr-2 inline h-6 w-6 text-red-500"} />
  );
}
