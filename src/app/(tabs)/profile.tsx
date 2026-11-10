import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PageFooterArt } from "@/components/PageFooterArt";
import { useHikeRent } from "@/context/HikeRentContext";

export default function ProfileScreen() {
  const router = useRouter();
  const { favoriteIds, orders } = useHikeRent();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>AKUN HIKE RENT</Text>
        <Text style={styles.title}>Profil</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>H</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Pendaki HikeRent</Text>
            <Text style={styles.profileLocation}>Malang, Jawa Timur</Text>
          </View>
          <Text style={styles.profileArrow}>›</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{favoriteIds.length}</Text>
            <Text style={styles.statLabel}>Gear favorit</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{orders.length}</Text>
            <Text style={styles.statLabel}>Permintaan sewa</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Bantuan & informasi</Text>
        <View style={styles.linkGroup}>
          <ProfileLink
            title="Cara menyewa"
            description="Panduan memilih dan menyewa perlengkapan."
            onPress={() => router.push("/how-to-rent")}
          />
          <View style={styles.linkDivider} />
          <ProfileLink
            title="Tentang HikeRent"
            description="Kenali layanan dan perlengkapan kami."
            onPress={() => router.push("/about")}
          />
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>
            Siap untuk perjalanan berikutnya?
          </Text>
          <Text style={styles.noteText}>
            Simpan gear favoritmu atau jelajahi katalog untuk menyiapkan
            perlengkapan hiking.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => router.push("/explore")}
            style={styles.exploreButton}
          >
            <Text style={styles.exploreButtonText}>Jelajahi perlengkapan</Text>
          </Pressable>
        </View>
      </View>
      <PageFooterArt imageUrl="https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/Untitled%20design%20(4).png" />
    </ScrollView>
  );
}

function ProfileLink({
  title,
  description,
  onPress,
}: {
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={styles.linkRow}
    >
      <View style={styles.linkCopy}>
        <Text style={styles.linkTitle}>{title}</Text>
        <Text style={styles.linkDescription}>{description}</Text>
      </View>
      <Text style={styles.linkArrow}>›</Text>
    </Pressable>
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
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E9E1",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  avatar: {
    width: 54,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 27,
    backgroundColor: "#DCEBCF",
  },
  avatarText: {
    color: "#203D32",
    fontSize: 22,
    fontWeight: "800",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 13,
  },
  profileName: {
    color: "#203D32",
    fontSize: 15,
    fontWeight: "800",
  },
  profileLocation: {
    marginTop: 4,
    color: "#79837A",
    fontSize: 11,
  },
  profileArrow: {
    color: "#79837A",
    fontSize: 24,
  },
  statsRow: {
    flexDirection: "row",
    gap: 11,
    marginTop: 12,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 13,
    backgroundColor: "#E7EAE1",
  },
  statValue: {
    color: "#203D32",
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    marginTop: 4,
    color: "#66766B",
    fontSize: 10,
  },
  sectionTitle: {
    marginTop: 25,
    marginBottom: 10,
    color: "#203D32",
    fontSize: 15,
    fontWeight: "800",
  },
  linkGroup: {
    paddingHorizontal: 15,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  linkCopy: {
    flex: 1,
  },
  linkTitle: {
    color: "#203D32",
    fontSize: 13,
    fontWeight: "800",
  },
  linkDescription: {
    marginTop: 4,
    color: "#79837A",
    fontSize: 10,
  },
  linkArrow: {
    marginLeft: 10,
    color: "#79837A",
    fontSize: 22,
  },
  linkDivider: {
    height: 1,
    backgroundColor: "#E7EBE5",
  },
  noteCard: {
    marginTop: 16,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#203D32",
  },
  noteTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
  noteText: {
    marginTop: 6,
    color: "#D8E3D8",
    fontSize: 11,
    lineHeight: 17,
  },
  exploreButton: {
    alignSelf: "flex-start",
    marginTop: 13,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 8,
    backgroundColor: "#D4EEAA",
  },
  exploreButtonText: {
    color: "#203D32",
    fontSize: 10,
    fontWeight: "800",
  },
});
