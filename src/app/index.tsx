//Ahmad Nadhif Zuvar: 202410370110243

import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { equipment, type EquipmentItem } from "@/constants/equipment";
import { styles } from "@/constants/styles";

// Fungsi custom untuk mengubah angka harga menjadi format Rupiah.
function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleEquipment, setVisibleEquipment] =
    useState<EquipmentItem[]>(equipment);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const normalizedQuery = searchQuery.trim().toLowerCase();

      setVisibleEquipment(
        equipment.filter(
          (item) =>
            item.name.toLowerCase().includes(normalizedQuery) ||
            item.category.toLowerCase().includes(normalizedQuery),
        ),
      );
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);
  // Membuat satu kartu dari data perlengkapan yang diterima sebagai parameter.
  function renderEquipmentCard(item: EquipmentItem) {
    return (
      <View key={item.id} style={styles.equipmentCard}>
        <Image source={{ uri: item.image }} style={styles.equipmentImage} />
        <View style={styles.equipmentDetails}>
          <View style={styles.cardHeading}>
            <Text style={styles.categoryLabel}>{item.category}</Text>
            <Text style={styles.rating}>★ {item.rating}</Text>
          </View>
          <Text style={styles.equipmentName}>{item.name}</Text>
          {/* Inline style dipakai di sini karena warna mengikuti status ketersediaan. */}
          <Text
            style={{
              color: item.available ? "#496B52" : "#A15A37",
              fontSize: 11,
              fontWeight: "700",
              marginTop: 4,
            }}
          >
            {item.available ? "Tersedia" : "Sedang disewa"}
          </Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(item.pricePerDay)}</Text>
            <Text style={styles.perDay}>/ hari</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            disabled={!item.available}
            onPress={() =>
              router.push({
                pathname: "/equipment/[id]",
                params: { id: String(item.id) },
              })
            }
            style={[
              styles.rentButton,
              !item.available && styles.disabledRentButton,
            ]}
          >
            <Text style={styles.rentButtonText}>
              {item.available ? "Lihat detail & sewa" : "Belum tersedia"}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.brandLockup}>
            <Image
              source={require("../../assets/images/Logo Aplikasi.png")}
              style={styles.brandLogo}
              resizeMode="contain"
              accessibilityLabel="Logo HikeRent"
            />
            <View>
              <Text style={styles.brandName}>HikeRent</Text>
              <Text style={styles.brandCaption}>GEAR FOR THE OUTDOORS</Text>
            </View>
          </View>
          <Text style={styles.headerNote}>MALANG, ID</Text>
        </View>

        <View style={styles.hero}>
          <Image
            source={{
              uri: "https://6ac3c4acae1f22aea6d1af7f.imgix.net/sandbox/WhatsApp%20Image%202026-10-05%20at%2022.42.07.jpeg",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>PETUALANGAN DIMULAI DI SINI</Text>
            <Text style={styles.heroTitle}>Gear Up.{"\n"}Go Further.</Text>
            <Text style={styles.heroDescription}>
              Perlengkapan untuk setiap langkah petualangmu.
            </Text>
          </View>
        </View>

        <View style={styles.introRow}>
          <View>
            <Text style={styles.sectionEyebrow}>PILIH PERLENGKAPAN</Text>
            <Text style={styles.sectionTitle}>Gear untuk perjalananmu</Text>
          </View>
          <Text style={styles.itemCount}>
            {visibleEquipment.length} dari {equipment.length} item
          </Text>
        </View>

        <TextInput
          accessibilityLabel="Cari perlengkapan"
          placeholder="Cari nama atau kategori perlengkapan"
          placeholderTextColor="#79837A"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <View style={styles.equipmentList}>
          {visibleEquipment.length > 0 ? (
            // .map() mengulang data; renderEquipmentCard membuat tampilan untuk tiap item.
            visibleEquipment.map(renderEquipmentCard)
          ) : (
            <Text style={styles.emptyMessage}>
              Perlengkapan tidak ditemukan. Coba kata kunci lain.
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Berangkat dengan persiapan yang tepat.
          </Text>
          <Text style={styles.footerText}>
            HikeRent · Ahmad Nadhif Zuvar: 202410370110243.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
