import { useEffect, useRef } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { DrawerProvider } from "./hooks/useDrawer";
import { SocketServerProvider } from "./hooks/useSocketServer";

import { Clients } from "./pages/Clients";

let times = 0;

function App() {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current === false) {
      ref.current = true;
      console.log(`called ${times} times`);
      times += 1;
    }
  }, []);

  return (
    <ChakraProvider>
      <SocketServerProvider>
        <DrawerProvider>
          <Clients />
        </DrawerProvider>
      </SocketServerProvider>
    </ChakraProvider>
  );
}

export default App;
