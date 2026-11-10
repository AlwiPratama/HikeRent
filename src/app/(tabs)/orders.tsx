import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { PageFooterArt } from "@/components/PageFooterArt";
import { useHikeRent } from "@/context/HikeRentContext";

function formatPrice(price: number): string {
  return `Rp${price.toLocaleString("id-ID")}`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function OrdersScreen() {
  const router = useRouter();
  const { orders } = useHikeRent();

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.content}>
        <Text style={styles.eyebrow}>RIWAYAT HIKE RENT</Text>
        <Text style={styles.title}>Pesanan</Text>
        <Text style={styles.subtitle}>
          Pantau permintaan sewa yang kamu buat di aplikasi.
        </Text>

        {orders.length > 0 ? (
          <View style={styles.orderList}>
            {orders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderTopLine}>
                  <Text style={styles.orderDate}>{formatDate(order.createdAt)}</Text>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusText}>{order.status}</Text>
                  </View>
                </View>
                <Text style={styles.orderName}>{order.name}</Text>
                <Text style={styles.orderQuantity}>{order.quantity} unit · per hari</Text>
                <View style={styles.orderDivider} />
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Estimasi total / hari</Text>
                  <Text style={styles.totalValue}>
                    {formatPrice(order.totalPerDay)}
                  </Text>
                </View>
                <Text style={styles.orderNote}>
                  Hubungi HikeRent untuk konfirmasi stok dan pembayaran.
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconCircle}>
              <Text style={styles.emptyIcon}>▤</Text>
            </View>
            <Text style={styles.emptyTitle}>Belum ada pesanan</Text>
            <Text style={styles.emptyText}>
              Permintaan sewa yang kamu buat akan muncul di halaman ini.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => router.push("/explore")}
              style={styles.exploreButton}
            >
              <Text style={styles.exploreButtonText}>Cari perlengkapan</Text>
            </Pressable>
          </View>
        )}
      </View>
      <PageFooterArt imageUrl="https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/Untitled%20design%20(6).png" />
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
  orderList: {
    gap: 13,
    marginTop: 20,
  },
  orderCard: {
    padding: 17,
    borderWidth: 1,
    borderColor: "#E5E9E1",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
  },
  orderTopLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  orderDate: {
    color: "#79837A",
    fontSize: 10,
  },
  statusPill: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 12,
    backgroundColor: "#F1F5E9",
  },
  statusText: {
    color: "#496B52",
    fontSize: 9,
    fontWeight: "800",
  },
  orderName: {
    marginTop: 14,
    color: "#203D32",
    fontSize: 16,
    fontWeight: "800",
  },
  orderQuantity: {
    marginTop: 4,
    color: "#66766B",
    fontSize: 11,
  },
  orderDivider: {
    height: 1,
    marginVertical: 13,
    backgroundColor: "#E7EBE5",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: "#66766B",
    fontSize: 11,
  },
  totalValue: {
    color: "#203D32",
    fontSize: 14,
    fontWeight: "800",
  },
  orderNote: {
    marginTop: 10,
    color: "#79837A",
    fontSize: 10,
    lineHeight: 15,
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
    fontSize: 30,
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
