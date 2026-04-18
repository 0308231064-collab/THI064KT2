import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CT1Screen() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  
  // Thêm state phần trăm pin (mặc định 1% cho màn hình hết pin)
  const [batteryPercent, setBatteryPercent] = useState(1); 
  
  const lastTap = useRef(0);
  const blinkAnim = useRef(new Animated.Value(0)).current;

  // Giữ nguyên logic hiệu ứng pin
  useEffect(() => {
    if (isRunning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(blinkAnim, { toValue: 0.1, duration: 800, useNativeDriver: true }),
        ])
      ).start();
    } else {
      blinkAnim.setValue(0);
    }
  }, [isRunning]);

  // Giữ nguyên logic Double Tap
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300; 
    if (now - lastTap.current < DOUBLE_PRESS_DELAY) {
      setIsRunning(false); 
    } else {
      lastTap.current = now;
    }
  };

  // --- GIAO DIỆN NGOÀI (ĐÃ ĐƯỢC LÀM ĐẸP) ---
  if (!isRunning) {
    return (
      <View style={styles.setupContainer}>
        <StatusBar barStyle="dark-content" />
        
        {/* Vòng tròn trang trí mờ phía sau */}
        <View style={styles.bgCircle} />

        <View style={styles.card}>
          <View style={styles.iconContainer}>
             <View style={styles.iconWrapper}>
                <Ionicons name="battery-dead" size={38} color="#FF3B30" />
             </View>
             {/* Chấm xanh nhỏ trạng thái */}
             <View style={styles.statusDot} />
          </View>
          
          <Text style={styles.title}>Mô phỏng Hết Pin</Text>
          <Text style={styles.subtitle}>
            Trạng thái hệ thống sẽ chuyển sang chế độ tiết kiệm năng lượng tối đa.
          </Text>

          <View style={styles.instructionBox}>
             <Ionicons name="information-circle-outline" size={18} color="#8E8E93" />
             <Text style={styles.instructionText}>
                Chạm 2 lần để thoát chế độ mô phỏng.
             </Text>
          </View>
          
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.runButton} 
            onPress={() => setIsRunning(true)}
          >
            <Text style={styles.runButtonText}>Bắt đầu chạy</Text>
            <Ionicons name="play-circle" size={20} color="#fff" style={{marginLeft: 8}} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Quay về Menu</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.versionText}>Simulation Version 1.0.4</Text>
      </View>
    );
  }

  // --- GIAO DIỆN TRONG (GIỮ NGUYÊN HOÀN TOÀN + THÊM HIỂN THỊ % PIN) ---
  return (
    <Pressable style={styles.container} onPress={handleDoubleTap}>
      <StatusBar hidden={true} />

      <View style={styles.batteryContainer}>
        <View style={styles.batteryBody}>
          <Animated.View style={[styles.redBatteryLevel, { opacity: blinkAnim }]} />
        </View>
        <View style={styles.batteryTip} />
      </View>

      {/* THÊM PHẦN TRĂM PIN Ở ĐÂY */}
      <Text style={styles.percentageText}>{batteryPercent}%</Text>

      <Ionicons name="flash" size={28} color="rgba(255,255,255,0.4)" style={styles.lightning} />

      <View style={styles.cableContainer}>
        <View style={styles.cableConnector} />
        <View style={styles.cableCasing} />
        <View style={styles.cableWire} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // STYLE SETUP MỚI (LÀM ĐẸP)
  setupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F9FB", // Màu nền xám cực nhẹ
  },
  bgCircle: {
    position: 'absolute',
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: 'rgba(0, 122, 255, 0.05)',
  },
  card: {
    backgroundColor: "#fff",
    width: "88%",
    padding: 35,
    borderRadius: 32,
    alignItems: "center",
    // Đổ bóng kiểu iOS chuyên nghiệp
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#FFF2F2",
    justifyContent: "center",
    alignItems: "center",
  },
  statusDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    borderWidth: 3,
    borderColor: '#fff',
  },
  title: { 
    fontSize: 24, 
    fontWeight: "800", 
    color: "#1C1C1E", 
    marginBottom: 10,
    letterSpacing: -0.5 
  },
  subtitle: { 
    fontSize: 15, 
    color: "#636366", 
    textAlign: "center", 
    marginBottom: 25, 
    lineHeight: 22 
  },
  instructionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 12,
    color: "#8E8E93",
    marginLeft: 6,
  },
  runButton: {
    backgroundColor: "#007AFF",
    width: "100%",
    paddingVertical: 16,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  runButtonText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  backButton: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
  },
  backButtonText: { color: "#8E8E93", fontSize: 15, fontWeight: "500" },
  versionText: {
    position: 'absolute',
    bottom: 40,
    fontSize: 12,
    color: '#C7C7CC',
    fontWeight: '500',
  },

  // STYLE MÔ PHỎNG (GIỮ NGUYÊN + THÊM PERCENTAGE TEXT)
  container: { flex: 1, backgroundColor: "#000", alignItems: "center", justifyContent: "center" },
  batteryContainer: { flexDirection: "row", alignItems: "center", marginBottom: 5 }, // Chỉnh margin xíu để chèn chữ đẹp hơn
  batteryBody: { 
    width: 75, height: 34, borderWidth: 1.5, 
    borderColor: "rgba(255, 255, 255, 0.35)", borderRadius: 6, 
    padding: 2, justifyContent: "center" 
  },
  redBatteryLevel: { width: "12%", height: "85%", backgroundColor: "#FF3B30", borderRadius: 2 },
  batteryTip: { width: 4, height: 12, backgroundColor: "rgba(255, 255, 255, 0.35)", borderTopRightRadius: 3, borderBottomRightRadius: 3 },
  
  // STYLE THÊM CHO % PIN
  percentageText: {
    color: "#FF3B30", 
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  lightning: { marginBottom: 90 },
  cableContainer: { alignItems: "center", position: "absolute", bottom: 0 },
  cableConnector: { width: 14, height: 18, backgroundColor: "rgba(255, 255, 255, 0.4)", borderTopLeftRadius: 3, borderTopRightRadius: 3 },
  cableCasing: { width: 34, height: 45, backgroundColor: "rgba(255, 255, 255, 0.8)", borderRadius: 8, marginTop: -1 },
  cableWire: { width: 8, height: 200, backgroundColor: "rgba(255, 255, 255, 0.2)" }
});