import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/constants/styles";

type EquipmentCategory = "Tenda" | "Carrier" | "Tidur" | "Keamanan";

interface EquipmentItem {
  id: number;
  name: string;
  category: EquipmentCategory;
  pricePerDay: number;
  rating: string;
  image: string;
  available: boolean;
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
    available: true,
  },
  {
    id: 2,
    name: "Carrier Trek 45L",
    category: "Carrier",
    pricePerDay: 35000,
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=640&auto=format&fit=crop&q=85",
    available: true,
  },
  {
    id: 3,
    name: "Sleeping Bag Summit",
    category: "Tidur",
    pricePerDay: 20000,
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=640&auto=format&fit=crop&q=85",
    available: false,
  },
];

function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function HomeScreen() {
  function handleRent(item: EquipmentItem): void {
    alert(`${item.name} dipilih. Hubungi HikeRent untuk melanjutkan.`);
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
            onPress={() => handleRent(item)}
            style={[
              styles.rentButton,
              !item.available && styles.disabledRentButton,
            ]}
          >
            <Text style={styles.rentButtonText}>
              {item.available ? "Sewa perlengkapan" : "Belum tersedia"}
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
          <Text style={styles.itemCount}>{equipment.length} item</Text>
        </View>

        <View style={styles.equipmentList}>
          {equipment.length > 0 ? (
            equipment.map(renderEquipmentCard)
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
