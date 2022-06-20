import { createContext, useContext, useEffect, useRef, useState } from "react";

const Server = window.require("socket.io").Server;
const io = new Server();

const SocketServerContext = createContext();

export function SocketServerProvider({ children }) {
  const [clients, setClients] = useState([]);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) {
      ref.current = true;

      io.on("connection", (socket) => {
        const newClient = {
          id: socket.id,
          address: socket.handshake.address,
          connected: true,
          lastKeysReleased: [],
        };
        setClients((prevClients) => [
          ...prevClients.filter(
            (client) => client.address !== socket.handshake.address
          ),
          newClient,
        ]);

        socket.on("key_released", (key) => {
          setClients((prevClients) =>
            prevClients.map((client) => {
              if (client.id === socket.id) {
                let newClient = structuredClone(client);
                newClient.lastKeysReleased = [
                  ...newClient.lastKeysReleased,
                  key,
                ];
                return newClient;
              }
              return client;
            })
          );
        });

        socket.on("disconnect", () => {
          setClients((prevClients) =>
            prevClients.map((client) => {
              if (client.id === socket.id) {
                let newClient = structuredClone(client);
                newClient.connected = false;
                return newClient;
              }
              return client;
            })
          );
        });
      });

      io.listen(3010);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <SocketServerContext.Provider
      value={{
        clients,
      }}
    >
      {children}
    </SocketServerContext.Provider>
  );
}

export function useSocketServer() {
  return useContext(SocketServerContext);
}
