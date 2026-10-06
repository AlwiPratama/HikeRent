import { StyleSheet } from "react-native";

// External stylesheet agar aturan tampilan terpisah dari komponen screen.
export const styles = StyleSheet.create({
  // Area halaman: flexGrow mengisi ruang yang tersedia, padding memberi jarak dari tepi.
  page: {
    flexGrow: 1,
    backgroundColor: "#F3F4EE",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingBottom: 40,
  },
  // Konten memakai lebar layar, tetapi dibatasi agar tidak terlalu melebar di layar besar.
  content: {
    width: "100%",
    maxWidth: 920,
  },
  // Header disusun mendatar; space-between memberi jarak di antara sisi kiri dan kanan.
  header: {
    minHeight: 78,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  // Baris kecil untuk menyusun logo dan nama brand berdampingan.
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  brandName: {
    color: "#203D32",
    fontSize: 19,
    fontWeight: "800",
  },
  brandCaption: {
    marginTop: 2,
    color: "#79837A",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  headerNote: {
    color: "#66766B",
    fontSize: 10,
    fontWeight: "700",
  },
  // Bagian utama pembuka; overflow menyembunyikan gambar yang melewati sudut membulat.
  hero: {
    overflow: "hidden",
    backgroundColor: "#203D32",
    borderRadius: 8,
  },
  heroImage: {
    width: "100%",
    height: 225,
  },
  // Jarak intro dari tepi kartu dan antar elemen di dalamnya.
  heroCopy: {
    paddingHorizontal: 22,
    paddingTop: 20,
    paddingBottom: 23,
  },
  eyebrow: {
    color: "#F3C46B",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 9,
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 31,
    lineHeight: 37,
    fontWeight: "800",
  },
  heroDescription: {
    color: "#D5DED5",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 9,
    maxWidth: 390,
  },
  // Baris judul dan jumlah item: rata bawah, dengan jarak vertikal dari bagian lain.
  introRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 32,
    marginBottom: 15,
  },
  sectionEyebrow: {
    color: "#A15A37",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 6,
  },
  sectionTitle: {
    color: "#203D32",
    fontSize: 23,
    fontWeight: "800",
  },
  itemCount: {
    color: "#79837A",
    fontSize: 12,
    paddingBottom: 3,
  },
  // Jarak antar kartu pada daftar perlengkapan.
  equipmentList: {
    gap: 12,
  },
  // Setiap kartu menaruh gambar dan detail berdampingan.
  equipmentCard: {
    flexDirection: "row",
    overflow: "hidden",
    minHeight: 150,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
  },
  equipmentImage: {
    width: 132,
    minHeight: 150,
    backgroundColor: "#DDE3D9",
  },
  // Detail mengisi sisa lebar kartu (flex: 1) dan kontennya dirapikan di tengah.
  equipmentDetails: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  cardHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLabel: {
    color: "#A15A37",
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  rating: {
    color: "#9B6A20",
    fontSize: 11,
    fontWeight: "700",
  },
  equipmentName: {
    color: "#203D32",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 7,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: 5,
  },
  price: {
    color: "#203D32",
    fontSize: 15,
    fontWeight: "800",
  },
  perDay: {
    color: "#79837A",
    fontSize: 11,
    marginLeft: 4,
  },
  // Tombol sewa memakai warna berbeda saat item tidak tersedia.
  rentButton: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: "#C66B43",
  },
  disabledRentButton: {
    backgroundColor: "#8A918B",
  },
  rentButtonText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  emptyMessage: {
    paddingVertical: 28,
    color: "#66766B",
    fontSize: 14,
    textAlign: "center",
  },
  // Garis pemisah footer dan jarak dari daftar perlengkapan.
  footer: {
    paddingTop: 25,
    marginTop: 26,
    borderTopWidth: 1,
    borderTopColor: "#D7DDD2",
  },
  footerTitle: {
    color: "#203D32",
    fontSize: 16,
    fontWeight: "800",
  },
  footerText: {
    color: "#79837A",
    fontSize: 12,
    marginTop: 5,
  },
});
