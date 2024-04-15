import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import Header from "./app/components/Header";
import ClientList from "./app/components/ClientList";
import NewClient from "./app/components/NewClient";
import { ClientContextProvider } from "./app/contexts/ClientContext";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ClientContextProvider>
        <Header />
        <ClientList />
        <NewClient />
        <StatusBar style="auto" />
      </ClientContextProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: "100%",
  },
});
