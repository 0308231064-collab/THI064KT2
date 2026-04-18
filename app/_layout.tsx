import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // Dòng này sẽ ẩn thanh Header ở tất cả các trang
        headerShown: false, 
        
        // Các tùy chỉnh khác (nếu có hiện lại ở trang nào đó)
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      {/* Bạn không cần khai báo từng Stack.Screen nếu tất cả đều ẩn header,
         nhưng nếu muốn định nghĩa riêng cho từng trang thì vẫn giữ cấu trúc này:
      */}
      <Stack.Screen name="index" />
      <Stack.Screen name="CT1" />
      <Stack.Screen name="CT2" />
      <Stack.Screen name="CT3" />
      <Stack.Screen name="INFORMATION" />
    </Stack>
  );
}