import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/constants/styles";

const rentalSteps = [
  {
    id: 1,
    title: "Pilih perlengkapan",
    description: "Cari gear yang sesuai dengan rencana pendakianmu di katalog.",
  },
  {
    id: 2,
    title: "Periksa detailnya",
    description: "Lihat harga sewa per hari dan status ketersediaan barang.",
  },
  {
    id: 3,
    title: "Hubungi HikeRent",
    description:
      "Pilih tombol sewa pada barang yang tersedia untuk melihat konfirmasi pilihan.",
  },
];

export default function HowToRentScreen() {
  const router = useRouter();

  function handleBack(): void {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }

  return (
    <ScrollView contentContainerStyle={styles.infoPage}>
      <View style={styles.infoContent}>
        <Pressable
          accessibilityRole="button"
          onPress={handleBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ Kembali</Text>
        </Pressable>

        <View style={styles.infoCard}>
          <Text style={styles.infoEyebrow}>PANDUAN HIKE RENT</Text>
          <Text style={styles.detailTitle}>Cara menyewa perlengkapan</Text>
          {rentalSteps.map((step) => (
            <View key={step.id} style={styles.infoStep}>
              <Text style={styles.infoStepTitle}>
                {step.id}. {step.title}
              </Text>
              <Text style={styles.infoStepDescription}>{step.description}</Text>
            </View>
          ))}
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/about")}
            style={[styles.rentButton, styles.infoButton]}
          >
            <Text style={styles.rentButtonText}>Tentang HikeRent</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}