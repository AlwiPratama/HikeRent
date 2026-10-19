# HikeRent

Katalog sederhana penyewaan perlengkapan hiking dan pendakian. Project Expo ini dapat dijalankan sebagai aplikasi web atau dibuka melalui Expo Go.

## Menjalankan

```bash
npm run web
```

Untuk Expo Go, jalankan `npx expo start --go` dan pindai QR code.

## Penerapan Modul 1 dan 2

- Custom function: `formatPrice`, `handleRent`, dan `renderEquipmentCard`.
- Loop: `.map()` untuk menampilkan daftar perlengkapan.
- TypeScript: union type `EquipmentCategory`, interface `EquipmentItem`, dan array of objects.
- Styling: external StyleSheet dan inline style untuk status ketersediaan.
- Komponen: `View`, `Text`, `Image`, `ScrollView`, dan `Pressable`.
- Hooks: `useState` mengelola kata kunci pencarian dan tombol favorit; `useEffect` menerapkan debounce pencarian serta membersihkan timer sebelumnya.
- Dynamic route: `/equipment/[id]` menampilkan detail perlengkapan yang dipilih.
- Navigasi: `router.push()` membuka detail, `router.back()` kembali ke katalog, serta `router.canGoBack()` dan `router.replace()` menangani pembukaan detail tanpa riwayat.
- Layout: `src/app/_layout.tsx` mengatur Stack dan mendaftarkan layar katalog serta detail dengan `<Stack.Screen>`.

Tanya jawab dan modifikasi kode saat demo tetap dilakukan langsung di lab.
