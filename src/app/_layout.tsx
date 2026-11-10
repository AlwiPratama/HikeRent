import { Stack } from "expo-router";

import { HikeRentProvider } from "@/context/HikeRentContext";

export default function RootLayout() {
  return (
    <HikeRentProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="equipment/[id]" />
        <Stack.Screen name="how-to-rent" />
        <Stack.Screen name="about" />
      </Stack>
    </HikeRentProvider>
  );
}
