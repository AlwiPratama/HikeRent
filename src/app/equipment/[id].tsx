import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { equipment } from "@/constants/equipment";
import { styles } from "@/constants/styles";

function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function EquipmentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = equipment.find((equipmentItem) => equipmentItem.id === Number(id));
  const [isFavorite, setIsFavorite] = useState(false);

  function handleBack(): void {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/");
  }

  function handleRent(): void {
    if (!item) {
      return;
    }

    alert(`${item.name} dipilih. Hubungi HikeRent untuk melanjutkan.`);
  }

  return (
    <ScrollView contentContainerStyle={styles.detailPage}>
      <View style={styles.detailContent}>
        <Pressable
          accessibilityRole="button"
          onPress={handleBack}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>‹ Kembali ke katalog</Text>
        </Pressable>

        {item ? (
          <View style={styles.detailCard}>
            <Image
              source={{ uri: item.image }}
              style={styles.detailImage}
              accessibilityLabel={item.name}
            />
            <View style={styles.detailCopy}>
              <View style={styles.cardHeading}>
                <Text style={styles.categoryLabel}>{item.category}</Text>
                <Text style={styles.rating}>★ {item.rating}</Text>
              </View>
              <Text style={styles.detailTitle}>{item.name}</Text>
              <Text
                style={[
                  styles.detailAvailability,
                  { color: item.available ? "#496B52" : "#A15A37" },
                ]}
              >
                {item.available ? "Tersedia untuk disewa" : "Sedang disewa"}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{formatPrice(item.pricePerDay)}</Text>
                <Text style={styles.perDay}>/ hari</Text>
              </View>
              <Text style={styles.detailDescription}>
                Perlengkapan pilihan HikeRent untuk menemani perjalanan
                hiking-mu.
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsFavorite((current) => !current)}
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteButtonText}>
                  {isFavorite ? "♥ Tersimpan di favorit" : "♡ Simpan ke favorit"}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={!item.available}
                onPress={handleRent}
                style={[
                  styles.rentButton,
                  styles.detailRentButton,
                  !item.available && styles.disabledRentButton,
                ]}
              >
                <Text style={styles.rentButtonText}>
                  {item.available ? "Sewa perlengkapan" : "Belum tersedia"}
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.detailCard}>
            <Text style={styles.detailTitle}>Perlengkapan tidak ditemukan</Text>
            <Text style={styles.detailDescription}>
              Perlengkapan ini mungkin sudah tidak tersedia di katalog.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
