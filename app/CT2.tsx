import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CT2Screen() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [isCalling, setIsCalling] = useState(false); 
  
  const [name, setName] = useState("BỐ Gọi");
  const [phone, setPhone] = useState("Di động"); // Thay đổi mặc định cho giống iOS
  const [delay, setDelay] = useState("3");

  const lastTap = useRef(0);

  const handleRun = () => {
    setIsRunning(true);
    setIsCalling(false);
    const delayTime = parseInt(delay) * 1000 || 0;
    setTimeout(() => {
      setIsCalling(true);
    }, delayTime);
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setIsRunning(false);
      setIsCalling(false);
    } else {
      lastTap.current = now;
    }
  };

  // --- MÀN HÌNH 1: GIAO DIỆN CÀI ĐẶT (GIỮ NGUYÊN) ---
  if (!isRunning) {
    return (
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.setupContainer}
      >
        <StatusBar barStyle="dark-content" />
        <View style={styles.bgCircleCall} />
        <View style={styles.card}>
          <View style={styles.headerIconWrapper}>
            <Ionicons name="call" size={32} color="#007AFF" />
          </View>
          <Text style={styles.setupTitle}>Cài đặt Cuộc gọi</Text>
          <Text style={styles.setupSubtitle}>Tùy chỉnh thông tin người gọi để bắt đầu mô phỏng</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Tên hiển thị</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Số điện thoại / Vị trí</Text>
            <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Thời gian trễ (giây)</Text>
            <TextInput style={styles.input} keyboardType="numeric" value={delay} onChangeText={setDelay} />
          </View>
          <TouchableOpacity style={styles.runButton} onPress={handleRun}>
            <Text style={styles.runButtonText}>Bắt đầu mô phỏng</Text>
            <Ionicons name="chevron-forward" size={18} color="#fff" style={{marginLeft: 5}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backLink}>Quay về Menu</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  // --- MÀN HÌNH 2: ĐANG CHỜ ---
  if (isRunning && !isCalling) {
    return (
      <View style={styles.blackContainer}>
        <StatusBar hidden />
        <Text style={styles.waitingText}>Đang chờ cuộc gọi...</Text>
      </View>
    );
  }

  // --- MÀN HÌNH 3: GIAO DIỆN CUỘC GỌI TỚI (ĐÃ LÀM ĐẸP) ---
  return (
    <View style={styles.callRoot}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <Pressable style={styles.callContainer} onPress={handleDoubleTap}>
        
        {/* Nội dung phía trên */}
        <View style={styles.callHeader}>
          <Text style={styles.callerName}>{name}</Text>
          <Text style={styles.callerInfo}>{phone}</Text>
        </View>

        {/* Cụm chức năng phụ */}
        <View style={styles.callActions}>
          <View style={styles.actionRow}>
            <View style={styles.actionBtn}>
              <View style={styles.smallIconCircle}>
                 <Ionicons name="alarm" size={24} color="white" />
              </View>
              <Text style={styles.actionText}>Nhắc tôi</Text>
            </View>
            <View style={styles.actionBtn}>
              <View style={styles.smallIconCircle}>
                 <Ionicons name="mail" size={24} color="white" />
              </View>
              <Text style={styles.actionText}>Tin nhắn</Text>
            </View>
          </View>

          {/* Cụm nút nghe/từ chối */}
          <View style={styles.acceptRow}>
            <View style={styles.declineCol}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.circleBtn, { backgroundColor: "#FF3B30" }]}>
                <Ionicons name="close" size={45} color="white" />
              </TouchableOpacity>
              <Text style={styles.acceptLabel}>Từ chối</Text>
            </View>

            <View style={styles.acceptCol}>
              <TouchableOpacity activeOpacity={0.7} style={[styles.circleBtn, { backgroundColor: "#4CD964" }]}>
                <Ionicons name="call" size={38} color="white" />
              </TouchableOpacity>
              <Text style={styles.acceptLabel}>Chấp nhận</Text>
            </View>
          </View>
        </View>
        
        <Text style={styles.footerNote}>Nhấn 2 lần để thoát mô phỏng</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  // SETUP STYLES (Giữ nguyên từ code cũ)
  setupContainer: { flex: 1, backgroundColor: "#F8F9FB", justifyContent: "center", alignItems: "center" },
  bgCircleCall: { position: 'absolute', bottom: -80, left: -60, width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(76, 217, 100, 0.05)' },
  card: { backgroundColor: "#fff", width: "88%", padding: 30, borderRadius: 30, elevation: 10 },
  headerIconWrapper: { width: 60, height: 60, borderRadius: 20, backgroundColor: "#F0F7FF", justifyContent: "center", alignItems: "center", marginBottom: 15, alignSelf: 'center' },
  setupTitle: { fontSize: 22, fontWeight: "800", marginBottom: 8, textAlign: "center", color: "#1C1C1E" },
  setupSubtitle: { fontSize: 13, color: "#8E8E93", textAlign: "center", marginBottom: 25 },
  inputGroup: { width: '100%', marginBottom: 15 },
  label: { fontSize: 13, fontWeight: "600", color: "#3A3A3C", marginBottom: 6, marginLeft: 4 },
  input: { backgroundColor: "#F2F2F7", padding: 14, borderRadius: 15, fontSize: 16, color: "#000", borderWidth: 1, borderColor: "#E5E5EA" },
  runButton: { backgroundColor: "#007AFF", padding: 16, borderRadius: 18, flexDirection: 'row', justifyContent: "center", alignItems: "center", marginTop: 15 },
  runButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  backBtn: { marginTop: 20 },
  backLink: { color: "#8E8E93", textAlign: "center", fontSize: 14, fontWeight: "500" },

  // BLACK SCREEN
  blackContainer: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  waitingText: { color: "#1c1c1c", fontSize: 12 },

  // --- NEW CALL UI STYLES ---
  callRoot: { flex: 1, backgroundColor: "#0a0a0a" }, // Nền tối sâu
  callContainer: { 
    flex: 1, 
    paddingTop: 100, 
    paddingBottom: 60, 
    justifyContent: "space-between", 
    alignItems: "center" 
  },
  callHeader: { alignItems: "center" },
  callerName: { 
    color: "#fff", 
    fontSize: 36, 
    fontWeight: "300", 
    marginBottom: 5,
    letterSpacing: 0.5
  },
  callerInfo: { 
    color: "rgba(255,255,255,0.6)", 
    fontSize: 19,
    fontWeight: "400"
  },
  
  callActions: { width: "100%", paddingHorizontal: 50 },
  actionRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    marginBottom: 80 
  },
  actionBtn: { alignItems: "center" },
  smallIconCircle: {
    marginBottom: 8,
    opacity: 0.9
  },
  actionText: { 
    color: "#fff", 
    fontSize: 13,
    fontWeight: "500"
  },
  
  acceptRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center",
    width: "100%"
  },
  circleBtn: { 
    width: 76, 
    height: 76, 
    borderRadius: 38, 
    justifyContent: "center", 
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5
  },
  declineCol: { alignItems: "center" },
  acceptCol: { alignItems: "center" },
  acceptLabel: { 
    color: "#fff", 
    marginTop: 12, 
    fontSize: 15,
    fontWeight: "500"
  },
  footerNote: { 
    color: "rgba(255,255,255,0.15)", 
    fontSize: 11, 
    position: 'absolute', 
    bottom: 30 
  }
});