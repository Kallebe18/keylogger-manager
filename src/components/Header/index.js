import React from "react";

import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, chakra, Heading } from "@chakra-ui/react";
import { useDrawer } from "../../hooks/useDrawer";

export function Header({ pageTitle }) {
  const { openDrawer } = useDrawer();

  return (
    <chakra.header display="flex" bgColor="gray.700" p={3}>
      <IconButton
        aria-label="Drawer menu"
        colorScheme="gray"
        icon={<HamburgerIcon />}
        onClick={openDrawer}
      />
      <Heading color="whiteAlpha.800" ml={3} as="h3">
        {pageTitle}
      </Heading>
    </chakra.header>
  );
}
