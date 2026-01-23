import { Stack } from "expo-router";

import { styles } from "../utils/styles";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitleAlign: "center", title: "Pokédex" }} />
      <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: "minimal",
          presentation: "formSheet",
          sheetAllowedDetents: [0.3, 0.7],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
