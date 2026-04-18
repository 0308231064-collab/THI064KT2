import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Thêm các màu sắc rực rỡ hơn
const COLORS = ["#FFFFFF", "#FF3B30", "#4CD964", "#FFCC00", "#AF52DE", "#007AFF", "#FF9500", "#FF2D55"];

export default function CT3Screen() {
  const router = useRouter();
  const [isRunning, setIsRunning] = useState(false);
  const [text, setText] = useState("THI - SIÊU CẤP VIP PRO");
  const [textWidth, setTextWidth] = useState(0);
  const [selectedColor, setSelectedColor] = useState("#455bce");
  const [speed, setSpeed] = useState(6); 
  const [isRainbow, setIsRainbow] = useState(false); // Tính năng mới: Đổi màu cầu vồng

  const scrollAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const rainbowAnim = useRef(new Animated.Value(0)).current;
  const lastTap = useRef(0);

  // Hiệu ứng chạy chữ
  useEffect(() => {
    if (isRunning && textWidth > 0) {
      const startAnimation = () => {
        scrollAnim.setValue(SCREEN_HEIGHT);
        const duration = (textWidth + SCREEN_HEIGHT) * speed; 
        Animated.timing(scrollAnim, {
          toValue: -textWidth,
          duration: duration,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished && isRunning) startAnimation();
        });
      };
      startAnimation();
    }
    return () => scrollAnim.stopAnimation();
  }, [isRunning, textWidth, speed]);

  // Hiệu ứng đổi màu Gradient (Cầu vồng)
  useEffect(() => {
    if (isRunning && isRainbow) {
      Animated.loop(
        Animated.timing(rainbowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false, // Màu sắc không dùng native driver được
        })
      ).start();
    } else {
      rainbowAnim.setValue(0);
    }
  }, [isRunning, isRainbow]);

  const textColor = isRainbow ? rainbowAnim.interpolate({
    inputRange: [0, 0.2, 0.4, 0.6, 0.8, 1],
    outputRange: ["#FF3B30", "#FFCC00", "#4CD964", "#007AFF", "#AF52DE", "#FF3B30"]
  }) : selectedColor;

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) setIsRunning(false);
    else lastTap.current = now;
  };

  if (!isRunning) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        
        <Text style={styles.header}>NEON BOARD</Text>

        <View style={styles.glassCard}>
          <TextInput 
            style={[styles.input, { color: selectedColor, textShadowColor: selectedColor, textShadowRadius: 10 }]} 
            value={text} 
            onChangeText={(val) => { setText(val); setTextWidth(0); }}
            placeholder="Ghi gì đó thật ngầu..."
            placeholderTextColor="#333"
          />

          <Text style={styles.label}>CHỌN MÀU ĐÈN</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.colorPicker}>
            {/* Nút Cầu Vồng Đặc Biệt */}
            <TouchableOpacity 
              style={[styles.rainbowBtn, isRainbow && styles.activeBorder]} 
              onPress={() => setIsRainbow(!isRainbow)}
            >
              <Text style={styles.rainbowText}>🌈</Text>
            </TouchableOpacity>

            {COLORS.map((c) => (
              <TouchableOpacity 
                key={c} 
                style={[styles.colorCircle, { backgroundColor: c }, selectedColor === c && !isRainbow && styles.activeBorder]} 
                onPress={() => { setSelectedColor(c); setIsRainbow(false); }}
              />
            ))}
          </ScrollView>

          <Text style={styles.label}>TỐC ĐỘ LUÂN CHUYỂN</Text>
          <View style={styles.speedRow}>
            {[ {l: 'Chậm', v: 12}, {l: 'Vừa', v: 6}, {l: 'Nhanh', v: 2} ].map((item) => (
              <TouchableOpacity 
                key={item.v}
                style={[styles.speedBtn, speed === item.v && styles.speedBtnActive]} 
                onPress={() => setSpeed(item.v)}
              >
                <Text style={[styles.speedBtnText, speed === item.v && {color: '#000'}]}>{item.l}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.goBtn} onPress={() => setIsRunning(true)}>
            <Text style={styles.goBtnText}>RUN</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Thoát ra</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Pressable style={styles.ledCanvas} onPress={handleDoubleTap}>
      <StatusBar hidden />
      <View style={styles.rotateStage}>
        <Animated.View style={[styles.animBox, { transform: [{ translateX: scrollAnim }], width: textWidth + 150 }]}>
          <Animated.Text 
            style={[
              styles.ledText, 
              { 
                color: textColor, 
                textShadowColor: textColor,
                textShadowRadius: 25, // Tạo hiệu ứng Neon Glow cực mạnh
                textShadowOffset: { width: 0, height: 0 }
              }
            ]} 
            onLayout={(e) => {
              const w = e.nativeEvent.layout.width;
              if (w > 0) setTextWidth(w);
            }}
          >
            {text}
          </Animated.Text>
        </Animated.View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000", padding: 25, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 35, fontWeight: '900', color: '#FFF', marginBottom: 30, letterSpacing: 5 },
  
  glassCard: { 
    width: '100%', 
    backgroundColor: '#111', 
    borderRadius: 30, 
    padding: 25, 
    borderWidth: 1, 
    borderColor: '#222' 
  },
  input: { 
    fontSize: 24, 
    fontWeight: '800', 
    textAlign: 'center', 
    marginBottom: 30, 
    borderBottomWidth: 1, 
    borderBottomColor: '#333',
    paddingBottom: 10
  },

  label: { fontSize: 10, fontWeight: 'bold', color: '#555', letterSpacing: 2, marginBottom: 15 },
  
  colorPicker: { marginBottom: 30 },
  colorCircle: { width: 45, height: 45, borderRadius: 15, marginRight: 12 },
  rainbowBtn: { width: 45, height: 45, borderRadius: 15, marginRight: 12, backgroundColor: '#222', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#333' },
  rainbowText: { fontSize: 20 },
  activeBorder: { borderWidth: 3, borderColor: '#FFF' },

  speedRow: { flexDirection: 'row', gap: 10, marginBottom: 40 },
  speedBtn: { flex: 1, padding: 15, borderRadius: 15, backgroundColor: '#1A1A1A', alignItems: 'center' },
  speedBtnActive: { backgroundColor: '#FFF' },
  speedBtnText: { color: '#666', fontWeight: 'bold', fontSize: 12 },

  goBtn: { backgroundColor: '#FF2D55', padding: 20, borderRadius: 20, alignItems: 'center', shadowColor: '#FF2D55', shadowOpacity: 0.4, shadowRadius: 20, elevation: 10 },
  goBtnText: { color: '#FFF', fontWeight: '900', fontSize: 18 },
  
  backLink: { color: '#444', marginTop: 30, fontWeight: 'bold' },

  // MÀN HÌNH LED
  ledCanvas: { flex: 1, backgroundColor: "#000", justifyContent: "center", alignItems: "center" },
  rotateStage: { width: SCREEN_HEIGHT, height: SCREEN_WIDTH, justifyContent: "center", transform: [{ rotate: "90deg" }] },
  animBox: { flexDirection: 'row', position: 'absolute', left: 0 },
  ledText: { fontSize: SCREEN_WIDTH * 0.75, fontWeight: "900", paddingRight: 300 }
});