import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import type { EquipmentItem } from "@/constants/equipment";

interface EquipmentCardProps {
  item: EquipmentItem;
  isFavorite: boolean;
  onOpen: () => void;
  onToggleFavorite: () => void;
  compact?: boolean;
  cardWidth?: number;
}

function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export function EquipmentCard({
  item,
  isFavorite,
  onOpen,
  onToggleFavorite,
  compact = false,
  cardWidth,
}: EquipmentCardProps) {
  return (
    <View
      style={[
        styles.card,
        compact && styles.compactCard,
        cardWidth ? { width: cardWidth } : undefined,
      ]}
    >
      <Pressable accessibilityRole="button" onPress={onOpen}>
        <Image
          accessibilityLabel={item.name}
          source={{ uri: item.image }}
          style={[
            styles.image,
            compact && styles.compactImage,
            compact && cardWidth ? { height: cardWidth * 0.7 } : undefined,
          ]}
        />
      </Pressable>
      {compact ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? `Hapus ${item.name} dari favorit` : `Simpan ${item.name} ke favorit`
          }
          onPress={onToggleFavorite}
          style={[styles.compactFavoriteButton, isFavorite && styles.favoriteActive]}
        >
          <Text style={[styles.favoriteIcon, styles.compactFavoriteIcon, isFavorite && styles.favoriteIconActive]}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </Pressable>
      ) : null}
      <View style={[styles.body, compact && styles.compactBody]}>
        {compact ? (
          <>
            <Text numberOfLines={1} style={styles.compactCategory}>{item.category}</Text>
            <Text numberOfLines={2} style={styles.compactName}>{item.name}</Text>
            <Text
              numberOfLines={1}
              style={[styles.compactAvailability, !item.available && styles.unavailable]}
            >
              {item.available ? "Tersedia" : "Disewa"}
            </Text>
            <Text numberOfLines={1} style={styles.compactPrice}>{formatPrice(item.pricePerDay)}</Text>
            <Text style={styles.compactPerDay}>per hari</Text>
            <Pressable
              accessibilityRole="button"
              disabled={!item.available}
              onPress={onOpen}
              style={[styles.compactOpenButton, !item.available && styles.openButtonDisabled]}
            >
              <Text numberOfLines={1} style={styles.compactOpenButtonText}>Detail</Text>
            </Pressable>
          </>
        ) : (
          <>
        <View style={styles.topLine}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.rating}>★ {item.rating}</Text>
        </View>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={[
            styles.availability,
            !item.available && styles.unavailable,
          ]}
        >
          {item.available ? `Tersedia · ${item.stock} unit` : "Sedang disewa"}
        </Text>
        <View style={styles.bottomLine}>
          <View>
            <Text style={styles.price}>{formatPrice(item.pricePerDay)}</Text>
            <Text style={styles.perDay}>per unit / hari</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isFavorite ? `Hapus ${item.name} dari favorit` : `Simpan ${item.name} ke favorit`
            }
            onPress={onToggleFavorite}
            style={[styles.favoriteButton, isFavorite && styles.favoriteActive]}
          >
            <Text style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}>
              {isFavorite ? "♥" : "♡"}
            </Text>
          </Pressable>
        </View>
        <Pressable
          accessibilityRole="button"
          disabled={!item.available}
          onPress={onOpen}
          style={[styles.openButton, !item.available && styles.openButtonDisabled]}
        >
          <Text style={styles.openButtonText}>
            {item.available ? "Lihat detail & sewa" : "Belum tersedia"}
          </Text>
        </Pressable>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E9E1",
  },
  image: {
    width: "100%",
    height: 170,
    backgroundColor: "#DDE3D9",
  },
  compactCard: {
    position: "relative",
    borderRadius: 12,
  },
  compactImage: {
    height: 100,
  },
  body: {
    padding: 15,
  },
  compactBody: {
    padding: 8,
  },
  compactCategory: {
    color: "#A15A37",
    fontSize: 8,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  compactName: {
    minHeight: 30,
    marginTop: 4,
    color: "#203D32",
    fontSize: 11,
    fontWeight: "800",
    lineHeight: 14,
  },
  compactAvailability: {
    marginTop: 3,
    color: "#496B52",
    fontSize: 9,
    fontWeight: "700",
  },
  compactPrice: {
    marginTop: 7,
    color: "#203D32",
    fontSize: 11,
    fontWeight: "800",
  },
  compactPerDay: {
    marginTop: 1,
    color: "#79837A",
    fontSize: 8,
  },
  compactOpenButton: {
    alignItems: "center",
    marginTop: 8,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: "#203D32",
  },
  compactOpenButtonText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "800",
  },
  compactFavoriteButton: {
    position: "absolute",
    zIndex: 1,
    top: 7,
    right: 7,
    width: 27,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#FFFFFFE8",
  },
  compactFavoriteIcon: {
    fontSize: 19,
    lineHeight: 23,
  },
  topLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    color: "#A15A37",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.7,
  },
  rating: {
    color: "#8E6823",
    fontSize: 11,
    fontWeight: "700",
  },
  name: {
    marginTop: 7,
    color: "#203D32",
    fontSize: 17,
    fontWeight: "800",
  },
  availability: {
    marginTop: 4,
    color: "#496B52",
    fontSize: 11,
    fontWeight: "700",
  },
  unavailable: {
    color: "#A15A37",
  },
  bottomLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 13,
  },
  price: {
    color: "#203D32",
    fontSize: 16,
    fontWeight: "800",
  },
  perDay: {
    marginTop: 2,
    color: "#79837A",
    fontSize: 10,
  },
  favoriteButton: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#F3F4EE",
  },
  favoriteActive: {
    backgroundColor: "#E4F0E4",
  },
  favoriteIcon: {
    color: "#496B52",
    fontSize: 23,
    lineHeight: 27,
  },
  favoriteIconActive: {
    color: "#26734A",
  },
  openButton: {
    alignItems: "center",
    marginTop: 13,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#203D32",
  },
  openButtonDisabled: {
    backgroundColor: "#8A918B",
  },
  openButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});
