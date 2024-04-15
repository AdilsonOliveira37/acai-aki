import React from "react";
import { FlatList, Text, StyleSheet, View, Pressable } from "react-native";
import { useClient } from "../../contexts/ClientContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EditClient from "../EditClient";

const ClientListItem = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const isOpenModal = () => setIsModalVisible(true);
  const { removeClient } = useClient();
  const handleRemoveClient = () => removeClient(item.id);

  return (
    <View style={styles.item}>
      <View style={styles.column}>
        <Text style={styles.title}>Nome: {item.name}</Text>
        <Text style={styles.title}>CEP: {item.postalCode}</Text>
      </View>
      <View style={styles.column}>
        <Text style={styles.title}>Telefone: {item.phone}</Text>
        <Text style={styles.title}>Cidade: {item.city}</Text>
      </View>
      <Pressable style={styles.title} onPress={isOpenModal}>
        <MaterialIcons name="edit" size={28} color="#333" />
      </Pressable>
      <Pressable style={styles.excludeButton} onPress={handleRemoveClient}>
        <MaterialIcons name="delete" size={28} color="#F33" />
      </Pressable>
      <EditClient
        client={item}
        isVisible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const renderItem = ({ item }) => <ClientListItem item={item} />;

const ClientList = () => {
  const { clients } = useClient();

  return (
    <FlatList
      data={clients}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      styles={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  item: {
    color: "#993399",
    width: "100%",
    padding: 20,
    borderBottomColor: "#993399",
    borderBottomWidth: 2,
    flexDirection: "row",
    gap: 5,
  },
  title: {
    fontSize: 14,
  },
  column: {
    flexDirection: "column",
    width: "40%",
  },
  editButton: {
    alignItems: "center",
  },
  cancelButton: {
    alignItems: "center",
  },
});

export default ClientList;
