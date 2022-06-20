import { createContext, useContext, useState } from "react";

import {
  Drawer,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";

const DrawerContext = createContext();

export function DrawerProvider({ children }) {
  const [open, setOpen] = useState([]);

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <DrawerContext.Provider
      value={{
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
      <Drawer isOpen={open} placement="left" onClose={closeDrawer}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Keylogger Manager</DrawerHeader>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerContext);
}
