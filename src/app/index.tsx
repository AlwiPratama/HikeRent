import { Image, Pressable, ScrollView, Text, View } from "react-native";

import { styles } from "@/constants/styles";

// Union type membatasi kategori agar hanya memakai pilihan yang sudah ditentukan.
type EquipmentCategory = "Tenda" | "Carrier" | "Tidur" | "Keamanan";

// Interface menentukan properti dan tipe data yang wajib dimiliki setiap perlengkapan.
interface EquipmentItem {
  id: number;
  name: string;
  category: EquipmentCategory;
  pricePerDay: number;
  rating: string;
  image: string;
  available: boolean;
}

// Array of objects: setiap data perlengkapan mengikuti bentuk EquipmentItem.
const equipment: EquipmentItem[] = [
  {
    id: 1,
    name: "Tenda Alpine 2P",
    category: "Tenda",
    pricePerDay: 45000,
    rating: "4.9",
    image:
      "https://6ac3c4acae1f22aea6d1af7f.imgix.net/sandbox/WhatsApp%20Image%202026-10-05%20at%2023.02.47.jpeg",
    available: true,
  },
  {
    id: 2,
    name: "Carrier Trek 45L",
    category: "Carrier",
    pricePerDay: 35000,
    rating: "4.8",
    image:
      "https://6ac3c4acae1f22aea6d1af7f.imgix.net/sandbox/WhatsApp%20Image%202026-10-05%20at%2023.05.12.jpeg",
    available: true,
  },
  {
    id: 3,
    name: "Sleeping Bag Summit",
    category: "Tidur",
    pricePerDay: 20000,
    rating: "4.7",
    image:
      "https://6ac3c4acae1f22aea6d1af7f.imgix.net/sandbox/WhatsApp%20Image%202026-10-05%20at%2023.09.02.jpeg",
    available: false,
  },
];

// Fungsi custom untuk mengubah angka harga menjadi format Rupiah.
function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function HomeScreen() {
  // Fungsi ini dijalankan saat tombol sewa ditekan.
  function handleRent(item: EquipmentItem): void {
    alert(`${item.name} dipilih. Hubungi HikeRent untuk melanjutkan.`);
  }

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
          <Text style={styles.itemCount}>{equipment.length} item</Text>
        </View>

        <View style={styles.equipmentList}>
          {equipment.length > 0 ? (
            // .map() mengulang data; renderEquipmentCard membuat tampilan untuk tiap item.
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
