import { useRouter } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/constants/styles";

export default function AboutScreen() {
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
          <Text style={styles.infoEyebrow}>TENTANG LAYANAN</Text>
          <Text style={styles.detailTitle}>HikeRent</Text>
          <Text style={styles.infoStepDescription}>
            HikeRent adalah katalog penyewaan perlengkapan hiking untuk membantu
            pendaki menyiapkan gear sebelum berangkat.
          </Text>
          <View style={styles.infoStep}>
            <Text style={styles.infoStepTitle}>Perlengkapan terpilih</Text>
            <Text style={styles.infoStepDescription}>
              Jelajahi tenda, carrier, perlengkapan tidur, dan gear keamanan
              dalam satu katalog.
            </Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/how-to-rent")}
            style={[styles.rentButton, styles.infoButton]}
          >
            <Text style={styles.rentButtonText}>Lihat cara menyewa</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}