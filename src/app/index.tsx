import { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { styles } from "@/constants/styles";

type EquipmentCategory = "Tenda" | "Carrier" | "Tidur" | "Keamanan";

interface EquipmentItem {
  id: number;
  name: string;
  category: EquipmentCategory;
  pricePerDay: number;
  rating: string;
  image: string;
}

const equipment: EquipmentItem[] = [
  {
    id: 1,
    name: "Tenda Alpine 2P",
    category: "Tenda",
    pricePerDay: 45000,
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=640&auto=format&fit=crop&q=85",
  },
  {
    id: 2,
    name: "Carrier Trek 45L",
    category: "Carrier",
    pricePerDay: 35000,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=640&auto=format&fit=crop&q=85",
  },
  {
    id: 3,
    name: "Sleeping Bag Summit",
    category: "Tidur",
    pricePerDay: 20000,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=640&auto=format&fit=crop&q=85",
  },
];

function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");

  const filteredEquipment = equipment.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  function handleRent(item: EquipmentItem): void {
    Alert.alert(
      "Ajukan penyewaan",
      `${item.name} dipilih. Hubungi HikeRent untuk melanjutkan.`,
    );
  }

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
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(item.pricePerDay)}</Text>
            <Text style={styles.perDay}>/ hari</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => handleRent(item)}
            style={styles.rentButton}
          >
            <Text style={styles.rentButtonText}>Sewa perlengkapan</Text>
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
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>H</Text>
            </View>
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
              uri: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1400&auto=format&fit=crop&q=90",
            }}
            style={styles.heroImage}
          />
          <View style={styles.heroCopy}>
            <Text style={styles.eyebrow}>PETUALANGAN DIMULAI DI SINI</Text>
            <Text style={styles.heroTitle}>
              Jelajah alam.{"\n"}Sewa perlengkapannya.
            </Text>
            <Text style={styles.heroDescription}>
              Peralatan terpilih untuk perjalanan yang lebih siap dan nyaman.
            </Text>
          </View>
        </View>

        <View style={styles.introRow}>
          <View>
            <Text style={styles.sectionEyebrow}>PILIH PERLENGKAPAN</Text>
            <Text style={styles.sectionTitle}>Gear untuk perjalananmu</Text>
          </View>
          <Text style={styles.itemCount}>{filteredEquipment.length} item</Text>
        </View>

        <TextInput
          accessibilityLabel="Cari perlengkapan"
          onChangeText={setSearchText}
          placeholder="Cari tenda, carrier, sleeping bag..."
          placeholderTextColor="#79837A"
          style={styles.searchInput}
          value={searchText}
        />

        <View style={styles.categoryRow}>
          <Text style={[styles.categoryChip, styles.activeCategory]}>
            Semua gear
          </Text>
          <Text style={styles.categoryChip}>Tenda</Text>
          <Text style={styles.categoryChip}>Carrier</Text>
          <Text style={styles.categoryChip}>Tidur</Text>
        </View>

        <View style={styles.equipmentList}>
          {filteredEquipment.length > 0 ? (
            filteredEquipment.map(renderEquipmentCard)
          ) : (
            <Text style={styles.emptyMessage}>
              Perlengkapan tidak ditemukan.
            </Text>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Berangkat dengan persiapan yang tepat.
          </Text>
          <Text style={styles.footerText}>
            HikeRent · Sewa gear, nikmati perjalanan.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
