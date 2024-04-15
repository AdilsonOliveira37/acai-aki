import React, { useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useClient } from "../../contexts/ClientContext";

const EditClientForm = ({ values, onRequestClose }) => {
  const { updateClient } = useClient();
  const [formData, setFormData] = useState({
    name: values.name || "",
    email: values.email || "",
    street: values.street || "",
    postalCode: values.postalCode || "",
    city: values.city || "",
    phone: values.phone || "",
  });

  const handleChangeText = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSearchAddress = async () => {
    await fetch(`https://viacep.com.br/ws/${formData.postalCode}/json/`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          ...formData,
          street: data.logradouro,
          city: data.localidade,
        });
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = async () => {
    const client = {
      id: values.id,
      ...formData,
    };

    updateClient(client);
    onRequestClose();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(text) => handleChangeText("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={formData.email}
        onChangeText={(text) => handleChangeText("email", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleChangeText("phone", text)}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 10,
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.postalCodeInput}
          placeholder="Postal Code"
          keyboardType="numeric"
          value={formData.postalCode}
          onChangeText={(text) => handleChangeText("postalCode", text)}
        />
        <Pressable onPress={handleSearchAddress}>
          <MaterialIcons name="search" color="#555" size={22} />
        </Pressable>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={formData.street}
        onChangeText={(text) => handleChangeText("street", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={formData.city}
        onChangeText={(text) => handleChangeText("city", text)}
      />

      <Pressable title="Submit" onPress={handleSubmit} style={styles.submit}>
        <Text>Editar Cliente</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  postalCodeInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  submit: {
    marginTop: 20,
    backgroundColor: "#d2e555",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EditClientForm;
