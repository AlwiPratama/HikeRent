import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { EquipmentCard } from "@/components/EquipmentCard";
import { PageFooterArt } from "@/components/PageFooterArt";
import { equipment } from "@/constants/equipment";
import { useHikeRent } from "@/context/HikeRentContext";

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useHikeRent();
  const favoriteItems = equipment.filter((item) => favoriteIds.includes(item.id));

  function openEquipment(id: number): void {
    router.push({ pathname: "/equipment/[id]", params: { id: String(id) } });
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>DISIMPAN UNTUK NANTI</Text>
        <Text style={styles.title}>Gear favorit</Text>
        <Text style={styles.subtitle}>
          Gear yang kamu tandai dari katalog dan halaman detail.
        </Text>

        {favoriteItems.length > 0 ? (
          <View style={styles.gearList}>
            {favoriteItems.map((item) => (
              <EquipmentCard
                key={item.id}
                item={item}
                isFavorite
                onOpen={() => openEquipment(item.id)}
                onToggleFavorite={() => toggleFavorite(item.id)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>♡</Text>
            </View>
            <Text style={styles.emptyTitle}>Belum ada gear favorit</Text>
            <Text style={styles.emptyText}>
              Tekan ikon hati pada gear untuk menyimpannya di sini.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/explore")}
              style={styles.exploreButton}
            >
              <Text style={styles.exploreButtonText}>Jelajahi gear</Text>
            </Pressable>
          </View>
        )}
      </View>
      <PageFooterArt imageUrl="https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/Untitled%20design%20(5).png" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 28,
    backgroundColor: "#F3F4EE",
  },
  content: {
    width: "100%",
    maxWidth: 760,
  },
  eyebrow: {
    color: "#A15A37",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  title: {
    marginTop: 5,
    color: "#203D32",
    fontSize: 27,
    fontWeight: "800",
  },
  subtitle: {
    marginTop: 5,
    color: "#66766B",
    fontSize: 13,
    lineHeight: 19,
  },
  gearList: {
    gap: 13,
    marginTop: 20,
  },
  emptyCard: {
    alignItems: "center",
    marginTop: 24,
    padding: 25,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    backgroundColor: "#E8F1E4",
  },
  emptyIcon: {
    color: "#28784F",
    fontSize: 34,
  },
  emptyTitle: {
    marginTop: 14,
    color: "#203D32",
    fontSize: 16,
    fontWeight: "800",
  },
  emptyText: {
    maxWidth: 270,
    marginTop: 6,
    color: "#66766B",
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
  },
  exploreButton: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#203D32",
  },
  exploreButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});
