import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

import { EquipmentCard } from "@/components/EquipmentCard";
import { PageFooterArt } from "@/components/PageFooterArt";
import { equipment } from "@/constants/equipment";
import { useHikeRent } from "@/context/HikeRentContext";

export default function ExploreScreen() {
  const router = useRouter();
  const { favoriteIds, toggleFavorite } = useHikeRent();
  const { width: screenWidth } = useWindowDimensions();
  const contentWidth = Math.min(screenWidth - 36, 760);
  const cardWidth = (contentWidth - 20) / 3;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const categories = [
    "Semua",
    ...new Set(equipment.map((item) => item.category)),
  ];

  const filteredEquipment = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return equipment.filter((item) => {
      const matchesCategory =
        selectedCategory === "Semua" || item.category === selectedCategory;
      const matchesQuery =
        item.name.toLowerCase().includes(normalizedQuery) ||
        item.category.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const equipmentRows = useMemo(() => {
    const rows: (typeof filteredEquipment)[] = [];

    for (let index = 0; index < filteredEquipment.length; index += 3) {
      rows.push(filteredEquipment.slice(index, index + 3));
    }

    return rows;
  }, [filteredEquipment]);

  function openEquipment(id: number): void {
    router.push({ pathname: "/equipment/[id]", params: { id: String(id) } });
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>KATALOG HIKE RENT</Text>
        <Text style={styles.title}></Text>
        <Text style={styles.subtitle}>
          Temukan perlengkapan yang cocok untuk rencana pendakianmu.
        </Text>

        <TextInput
          accessibilityLabel="Cari perlengkapan"
          onChangeText={setSearchQuery}
          placeholder="Cari nama atau kategori gear"
          placeholderTextColor="#79837A"
          style={styles.search}
          value={searchQuery}
        />

        <ScrollView
          horizontal
          contentContainerStyle={styles.categoryList}
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <Pressable
                key={category}
                accessibilityRole="button"
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.categoryChip,
                  active && styles.categoryChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    active && styles.categoryChipTextActive,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.resultRow}>
          <Text style={styles.resultTitle}>Semua perlengkapan</Text>
          <Text style={styles.resultCount}>
            {filteredEquipment.length} gear
          </Text>
        </View>

        {filteredEquipment.length > 0 ? (
          <View style={styles.gearGrid}>
            {equipmentRows.map((row) => (
              <View key={row[0]?.id} style={styles.gearRow}>
                {row.map((item) => (
                  <EquipmentCard
                    key={item.id}
                    item={item}
                    compact
                    cardWidth={cardWidth}
                    isFavorite={favoriteIds.includes(item.id)}
                    onOpen={() => openEquipment(item.id)}
                    onToggleFavorite={() => toggleFavorite(item.id)}
                  />
                ))}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Gear tidak ditemukan</Text>
            <Text style={styles.emptyText}>
              Coba kata kunci atau kategori yang berbeda.
            </Text>
          </View>
        )}
      </View>
      <PageFooterArt />
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
  search: {
    height: 48,
    marginTop: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: "#D7DDD2",
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    color: "#203D32",
    fontSize: 13,
  },
  categoryList: {
    gap: 8,
    paddingVertical: 15,
  },
  categoryChip: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#D7DDD2",
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
  },
  categoryChipActive: {
    borderColor: "#203D32",
    backgroundColor: "#203D32",
  },
  categoryChipText: {
    color: "#496B52",
    fontSize: 11,
    fontWeight: "700",
  },
  categoryChipTextActive: {
    color: "#FFFFFF",
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: {
    color: "#203D32",
    fontSize: 15,
    fontWeight: "800",
  },
  resultCount: {
    color: "#79837A",
    fontSize: 11,
  },
  gearGrid: {
    gap: 12,
  },
  gearRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 10,
  },
  emptyCard: {
    alignItems: "center",
    marginTop: 10,
    padding: 24,
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  emptyTitle: {
    color: "#203D32",
    fontSize: 15,
    fontWeight: "800",
  },
  emptyText: {
    marginTop: 6,
    color: "#66766B",
    fontSize: 12,
    textAlign: "center",
  },
});
