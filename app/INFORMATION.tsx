import { useRouter } from "expo-router";
import { Alert, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Information() {
  const router = useRouter();

  // ĐÃ SỬA: Thay link chuẩn của Phát vào đây
  const githubURL = "https://github.com/0308231043-collab/PHAT043KT2";

  const openGithub = async () => {
    try {
      const supported = await Linking.canOpenURL(githubURL);
      if (supported) {
        await Linking.openURL(githubURL);
      } else {
        Alert.alert("Lỗi", "Không thể mở liên kết này: " + githubURL);
      }
    } catch (error) {
      Alert.alert("Lỗi", "Có lỗi xảy ra khi mở trình duyệt");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      
      {/* Nút Back */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backText}>{"< BACK"}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainContent}>
        <View style={styles.headerCard}>
          <Image 
            source={require('../img/avatar1.jpg')} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>VÕ VĂN THI</Text>
          <Text style={styles.classText}>Lớp: CD DTTT23MT</Text>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoBox}>
            <Text style={styles.label}>MSSV:</Text>
            <Text style={styles.value}>0308231064</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>Sở thích:</Text>
            <Text style={styles.value}>Lập trình, Đá bóng, Chơi game</Text>
          </View>

          {/* Nút Github đã được cập nhật link chuẩn */}
          <TouchableOpacity 
            style={styles.githubButton} 
            onPress={openGithub}
            activeOpacity={0.7}
          >
            <Text style={styles.githubText}>Xem Source Code trên Github</Text>
            <Text style={styles.githubLink}>github.com/0308231043-collab/PHAT043KT2</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f8f9fa",
    padding: 20,
    justifyContent: "center", 
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 10,
  },
  backBtn: {
    padding: 10,
  },
  backText: {
    fontSize: 16,
    color: "#4A90E2",
    fontWeight: "600",
  },
  mainContent: {
    width: "100%",
    alignItems: "center",
  },
  headerCard: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 25,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#4A90E2",
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  classText: {
    fontSize: 15,
    color: "#777",
    marginTop: 4,
  },
  infoSection: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  infoBox: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
    paddingBottom: 10,
  },
  label: {
    fontSize: 12,
    color: "#aaa",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  githubButton: {
    marginTop: 10,
    backgroundColor: "#24292e", // Màu đặc trưng của Github
    padding: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  githubText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  githubLink: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    marginTop: 2,
  },
});