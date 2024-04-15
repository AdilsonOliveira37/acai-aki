import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import NewClientForm from "../NewClientForm";

function NewClient() {
  const [isVisible, setIsVisible] = React.useState(false);
  const onOpen = () => setIsVisible(true);
  const onClose = () => setIsVisible(false);

  return (
    <View>
      <Pressable style={styles.buttonPlus} onPress={onOpen}>
        <Text style={styles.plus}>+</Text>
      </Pressable>

      <Modal animationType="slide" visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#555" size={22} />
            </Pressable>
          </View>
          <View style={styles.form}>
            <Text style={styles.title}>Cadastre um novo Cliente</Text>
            <NewClientForm onRequestClose={() => onClose()} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonPlus: {
    position: "absolute",
    bottom: 30,
    right: 16,
    backgroundColor: "#d2e555",
    width: 40,
    height: 40,
    fontSize: 24,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
  },
  plus: {
    fontSize: 24,
  },
  modalContent: {
    height: "100%",
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 20,
  },
});

export default NewClient;
