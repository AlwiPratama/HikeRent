import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { EquipmentCard } from "@/components/EquipmentCard";
import { equipment } from "@/constants/equipment";
import { useHikeRent } from "@/context/HikeRentContext";
import { getMalangWeather, type MalangWeather } from "@/services/weather";

const featuredGear = equipment.slice(0, 2);
const popularCategories = ["Tenda", "Carrier", "Tidur", "Keamanan"];

export default function HomeScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useHikeRent();
  const [weather, setWeather] = useState<MalangWeather | null>(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    getMalangWeather()
      .then(setWeather)
      .catch(() => setWeatherError(true));
  }, []);

  function openEquipment(id: number): void {
    router.push({ pathname: "/equipment/[id]", params: { id: String(id) } });
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.brand}>
            <Image
              accessibilityLabel="Logo HikeRent"
              source={require("../../../assets/images/Logo Aplikasi.png")}
              style={styles.logo}
            />
            <View>
              <Text style={styles.brandName}>HikeRent</Text>
              <Text style={styles.brandCaption}>GEAR FOR THE OUTDOORS</Text>
            </View>
          </View>
          <Text style={styles.location}>MALANG, ID</Text>
        </View>

        <View style={styles.hero}>
          <Image
            source={{
              uri: "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/WhatsApp%20Image%202026-10-05%20at%2022.42.07.jpeg",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.heroEyebrow}>SIAPKAN PETUALANGANMU</Text>
            <Text style={styles.heroTitle}>Jelajahi lebih jauh.</Text>
            <Text style={styles.heroDescription}>
              Gear pilihan untuk langkah yang lebih nyaman.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/explore")}
              style={styles.heroButton}
            >
              <Text style={styles.heroButtonText}>Jelajahi gear</Text>
              <Text style={styles.heroButtonArrow}>›</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.weatherCard}>
          <View style={styles.weatherIcon}>
            <Text style={styles.weatherIconText}>☀</Text>
          </View>
          <View style={styles.weatherCopy}>
            <Text style={styles.weatherTitle}>Cuaca Malang hari ini</Text>
            <Text style={styles.weatherDescription}>
              {weather
                ? `${weather.temperature}°C · Angin ${weather.windSpeed} km/jam`
                : weatherError
                  ? "Data cuaca belum dapat dimuat."
                  : "Memuat informasi cuaca..."}
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionEyebrow}>PILIH SESUAI RENCANA</Text>
            <Text style={styles.sectionTitle}>Kategori populer</Text>
          </View>
        </View>
        <View style={styles.categories}>
          {popularCategories.map((category) => (
            <Pressable
              key={category}
              accessibilityRole="button"
              onPress={() => router.push("/explore")}
              style={styles.categoryChip}
            >
              <Text style={styles.categoryChipText}>{category}</Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.sectionHeader, styles.recommendationHeader]}>
          <View>
            <Text style={styles.sectionEyebrow}>REKOMENDASI HIKE RENT</Text>
            <Text style={styles.sectionTitle}>Gear pilihan</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/explore")}
          >
            <Text style={styles.seeAll}>Lihat semua</Text>
          </Pressable>
        </View>

        <View style={styles.gearList}>
          {featuredGear.map((item) => (
            <EquipmentCard
              key={item.id}
              item={item}
              isFavorite={favoriteIds.includes(item.id)}
              onOpen={() => openEquipment(item.id)}
              onToggleFavorite={() => toggleFavorite(item.id)}
            />
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={() => router.push("/how-to-rent")}
          style={styles.howToLink}
        >
          <Text style={styles.howToTitle}>Baru pertama menyewa?</Text>
          <Text style={styles.howToText}>Lihat panduan sewa HikeRent ›</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 28,
    backgroundColor: "#F3F4EE",
  },
  content: {
    width: "100%",
    maxWidth: 760,
  },
  header: {
    minHeight: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  brandName: {
    color: "#203D32",
    fontSize: 18,
    fontWeight: "800",
  },
  brandCaption: {
    marginTop: 2,
    color: "#79837A",
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  location: {
    color: "#66766B",
    fontSize: 10,
    fontWeight: "800",
  },
  hero: {
    overflow: "hidden",
    borderRadius: 18,
    backgroundColor: "#203D32",
  },
  heroImage: {
    width: "100%",
    height: 190,
    backgroundColor: "#375E48",
  },
  heroCopy: {
    padding: 19,
  },
  heroEyebrow: {
    color: "#CBE89B",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  heroTitle: {
    marginTop: 6,
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "800",
  },
  heroDescription: {
    marginTop: 5,
    color: "#D8E3D8",
    fontSize: 13,
  },
  heroButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 10,
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#D4EEAA",
  },
  heroButtonText: {
    color: "#203D32",
    fontSize: 12,
    fontWeight: "800",
  },
  heroButtonArrow: {
    color: "#203D32",
    fontSize: 18,
    lineHeight: 18,
  },
  weatherCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  weatherIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#EFF5E8",
  },
  weatherIconText: {
    color: "#8E6823",
    fontSize: 21,
  },
  weatherCopy: {
    flex: 1,
  },
  weatherTitle: {
    color: "#203D32",
    fontSize: 12,
    fontWeight: "800",
  },
  weatherDescription: {
    marginTop: 4,
    color: "#66766B",
    fontSize: 11,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 25,
    marginBottom: 12,
  },
  sectionEyebrow: {
    color: "#A15A37",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.7,
  },
  sectionTitle: {
    marginTop: 4,
    color: "#203D32",
    fontSize: 20,
    fontWeight: "800",
  },
  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: "#DCE4D9",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },
  categoryChipText: {
    color: "#385943",
    fontSize: 11,
    fontWeight: "700",
  },
  recommendationHeader: {
    marginTop: 26,
  },
  seeAll: {
    color: "#28784F",
    fontSize: 11,
    fontWeight: "800",
  },
  gearList: {
    gap: 13,
  },
  howToLink: {
    marginTop: 18,
    padding: 15,
    borderRadius: 13,
    backgroundColor: "#E7EAE1",
  },
  howToTitle: {
    color: "#203D32",
    fontSize: 13,
    fontWeight: "800",
  },
  howToText: {
    marginTop: 4,
    color: "#496B52",
    fontSize: 11,
  },
});
