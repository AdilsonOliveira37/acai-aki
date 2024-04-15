import React, { createContext, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export const ClientContext = createContext();

export const ClientContextProvider = ({ children }) => {
  const { getItem, setItem } = useAsyncStorage("clients");
  const [clients, setClients] = useState([]);

  const addClient = async (client) => {
    const existingClients =
      (await getItem().then((data) => JSON.parse(data))) || [];
    const updatedClients = [...existingClients, client];
    setItem(JSON.stringify(updatedClients));
    getClients();
  };

  const updateClient = async (client) => {
    const existingClients =
      (await getItem().then((data) => JSON.parse(data))) || [];
    const updatedClients = existingClients.map((_client) =>
      _client.id === client.id ? client : _client
    );
    setClients(updatedClients);
    setItem(JSON.stringify(updatedClients));
    getClients();
  };

  const removeClient = (clientId) => {
    const newClients = clients.filter((client) => client.id !== clientId);
    setItem(JSON.stringify(newClients));
    getClients();
  };

  const getClients = React.useCallback(async () => {
    return getItem()
      .then((data) => JSON.parse(data))
      .then((data) => setClients(data))
      .catch((error) => console.log(error));
  }, [clients]);

  const searchClients = async (text) => {
    const _clients = await getItem().then((data) => JSON.parse(data));

    if (!text) return getClients();

    const existingClients = _clients.filter((client) =>
      client.name.toLowerCase().includes(text.toLowerCase())
    );

    setClients(existingClients);
  };

  React.useEffect(() => {
    getClients();
  }, []);

  return (
    <ClientContext.Provider
      value={{
        clients,
        addClient,
        updateClient,
        removeClient,
        searchClients,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};

export const useClient = () => React.useContext(ClientContext);
