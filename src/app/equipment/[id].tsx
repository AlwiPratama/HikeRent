import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

import { PageFooterArt } from "@/components/PageFooterArt";
import { equipment } from "@/constants/equipment";
import { styles } from "@/constants/styles";
import { useHikeRent } from "@/context/HikeRentContext";

function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

export default function EquipmentDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const item = equipment.find((equipmentItem) => equipmentItem.id === Number(id));
  const { favoriteIds, toggleFavorite, addOrder } = useHikeRent();
  const isFavorite = item ? favoriteIds.includes(item.id) : false;
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const totalPerDay = item ? item.pricePerDay * quantity : 0;

  function handleBack(): void {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/explore");
  }

  function handleRent(): void {
    if (!item || !item.available || quantity < 1 || quantity > item.stock) {
      return;
    }

    addOrder(item, quantity);
    setShowSuccess(true);
  }

    return (
    <>
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
                {item.available
                  ? `Tersedia · stok ${item.stock} unit`
                  : "Sedang disewa"}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>{formatPrice(item.pricePerDay)}</Text>
                <Text style={styles.perDay}>/ hari</Text>
              </View>
              <Text style={styles.detailDescription}>
                Perlengkapan pilihan HikeRent untuk menemani perjalanan
                hiking-mu.
              </Text>
              {item.available && item.stock > 0 ? (
                <>
                  <View style={styles.quantitySection}>
                    <View style={styles.quantityLabels}>
                      <Text style={styles.quantityTitle}>Jumlah gear</Text>
                      <Text style={styles.quantityStock}>
                        Maksimal {item.stock} unit
                      </Text>
                    </View>
                    <View style={styles.quantityControls}>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Kurangi jumlah gear"
                        disabled={quantity <= 1}
                        onPress={() =>
                          setQuantity((current) => Math.max(1, current - 1))
                        }
                        style={[
                          styles.quantityButton,
                          quantity <= 1 && styles.quantityButtonDisabled,
                        ]}
                      >
                        <Text style={styles.quantityButtonText}>−</Text>
                      </Pressable>
                      <Text style={styles.quantityValue}>{quantity}</Text>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel="Tambah jumlah gear"
                        disabled={quantity >= item.stock}
                        onPress={() =>
                          setQuantity((current) =>
                            Math.min(item.stock, current + 1),
                          )
                        }
                        style={[
                          styles.quantityButton,
                          quantity >= item.stock &&
                            styles.quantityButtonDisabled,
                        ]}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  </View>
                  <View style={styles.rentalSummary}>
                    <Text style={styles.rentalSummaryTitle}>
                      Ringkasan sewa
                    </Text>
                    <View style={styles.rentalSummaryRow}>
                      <Text style={styles.rentalSummaryLabel}>
                        {formatPrice(item.pricePerDay)} × {quantity} unit
                      </Text>
                      <Text style={styles.rentalSummaryValue}>
                        {formatPrice(totalPerDay)}
                      </Text>
                    </View>
                    <View style={styles.rentalSummaryDivider} />
                    <View style={styles.rentalSummaryRow}>
                      <Text style={styles.rentalTotalLabel}>
                        Total per hari
                      </Text>
                      <Text style={styles.rentalTotalValue}>
                        {formatPrice(totalPerDay)}
                      </Text>
                    </View>
                  </View>
                </>
              ) : null}
              <Pressable
                accessibilityRole="button"
                onPress={() => item && toggleFavorite(item.id)}
                style={styles.favoriteButton}
              >
                <Text style={styles.favoriteButtonText}>
                  {isFavorite ? "♥ Tersimpan di favorit" : "♡ Simpan ke favorit"}
                </Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                disabled={!item.available || item.stock === 0}
                onPress={handleRent}
                style={[
                  styles.rentButton,
                  styles.detailRentButton,
                  (!item.available || item.stock === 0) &&
                    styles.disabledRentButton,
                ]}
              >
                <Text style={styles.rentButtonText}>
                  {item.available && item.stock > 0
                    ? "Lanjutkan sewa"
                    : "Belum tersedia"}
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
      <PageFooterArt />
    </ScrollView>
    <Modal
      animationType="fade"
      onRequestClose={() => setShowSuccess(false)}
      transparent
      visible={showSuccess}
    >
      <View style={styles.rentalModalOverlay}>
        <View style={styles.rentalModalCard}>
          <View style={styles.successBadge}>
            <Text style={styles.successCheck}>✓</Text>
          </View>
          <Text style={styles.rentalModalTitle}>Permintaan Sewa Berhasil!</Text>
          <Text style={styles.rentalModalDescription}>
            {quantity} unit {item?.name} sudah dipilih. Hubungi HikeRent untuk
            konfirmasi ketersediaan dan pembayaran.
          </Text>
          <Text style={styles.rentalModalTotalLabel}>
            Estimasi biaya per hari
          </Text>
          <Text style={styles.rentalModalTotal}>
            {formatPrice(totalPerDay)}
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setShowSuccess(false)}
            style={styles.rentalModalButton}
          >
            <Text style={styles.rentalModalButtonText}>Selesai</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
    </>
  );
}
