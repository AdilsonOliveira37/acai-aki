import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useClient } from "../../contexts/ClientContext";

const Header = () => {
  const { searchClients } = useClient();
  const [search, setSearch] = React.useState("");

  const onPressFunction = async () => {
    searchClients(search);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Clientes</Text>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar..."
          value={search}
          onChangeText={(value) => setSearch(value)}
        />
        <Pressable onPress={onPressFunction} style={styles.submit}>
          <Text>Buscar</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 220,
    backgroundColor: "#f2f2f2",
    padding: 16,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  content: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    padding: 10,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  submit: {
    backgroundColor: "#d2e555",
    padding: 10,
    borderRadius: 5,
  },
});

export default Header;
