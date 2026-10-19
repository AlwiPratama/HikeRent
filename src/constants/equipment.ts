// Union type membatasi kategori agar hanya memakai pilihan yang sudah ditentukan.
export type EquipmentCategory = "Tenda" | "Carrier" | "Tidur" | "Keamanan";

// Interface menentukan properti dan tipe data setiap perlengkapan.
export interface EquipmentItem {
  id: number;
  name: string;
  category: EquipmentCategory;
  pricePerDay: number;
  rating: string;
  image: string;
  available: boolean;
}

// Array of objects: setiap data perlengkapan mengikuti bentuk EquipmentItem.
export const equipment: EquipmentItem[] = [
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
