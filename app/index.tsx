import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>MÀN HÌNH CHÍNH</Text>

      <View style={styles.buttonContainer}>
        {/* Nút dẫn đến trang CT1 */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#2732c4' }]} 
          onPress={() => router.push("/CT1")} // Dùng "/" để chỉ định file trong thư mục app
        >
          <Text style={styles.buttonText}>CT1</Text>
        </TouchableOpacity>

        {/* Nút dẫn đến trang CT2 */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#14916b' }]} 
          onPress={() => router.push("/CT2")}
        >
          <Text style={styles.buttonText}>CT2</Text>
        </TouchableOpacity>

        {/* Nút dẫn đến trang CT3 */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#1391a1' }]} 
          onPress={() => router.push("/CT3")}
        >
          <Text style={styles.buttonText}>CT3</Text>
        </TouchableOpacity>

        {/* Nút dẫn đến trang INFORMATION */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: '#924545' }]} 
          onPress={() => router.push("/INFORMATION")}
        >
          <Text style={styles.buttonText}>Thông Tin (Info)</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});