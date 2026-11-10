// Union type membatasi kategori agar hanya memakai pilihan yang sudah ditentukan.
export type EquipmentCategory =
  | "Tenda"
  | "Carrier"
  | "Tidur"
  | "Keamanan"
  | "Memasak"
  | "Pakaian"
  | "Aksesori"
  | "Penerangan";

// Interface menentukan properti dan tipe data setiap perlengkapan.
export interface EquipmentItem {
  id: number;
  name: string;
  category: EquipmentCategory;
  pricePerDay: number;
  rating: string;
  image: string;
  available: boolean;
  stock: number;
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
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/WhatsApp%20Image%202026-10-05%20at%2023.02.47.jpeg",
    available: true,
    stock: 3,
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
    stock: 5,
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
    stock: 0,
  },
  {
    id: 4,
    name: "Headlamp Trail",
    category: "Keamanan",
    pricePerDay: 10000,
    rating: "4.6",
    image:
      "https://6ac3c4acae1f22aea6d1af7f.imgix.net/sandbox/silva-trail-runner-free-2-ultra-headlamp.webp",
    available: true,
    stock: 6,
  },
  {
    id: 5,
    name: "Matras Camping Lipat",
    category: "Tidur",
    pricePerDay: 15000,
    rating: "4.8",
    image:
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/id-11134207-7r98y-lom02k058lb5bb.jpeg",
    available: true,
    stock: 4,
  },
  {
    id: 6,
    name: "Kompor Portable Trekking",
    category: "Memasak",
    pricePerDay: 18000,
    rating: "4.8",
    image: "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/3oo-1.png",
    available: true,
    stock: 3,
  },
  {
    id: 7,
    name: "Trekking Pole Aluminium",
    category: "Aksesori",
    pricePerDay: 12000,
    rating: "4.7",
    image:
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/taffsport-tongkat-hiking-trekking-pole-telescopic-4-section-e4102.jpg",
    available: true,
    stock: 4,
  },
  {
    id: 8,
    name: "Jas Hujan Hiking",
    category: "Pakaian",
    pricePerDay: 12000,
    rating: "4.6",
    image: "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/images%20(4).jpeg",
    available: true,
    stock: 5,
  },
  {
    id: 9,
    name: "Lentera Camping LED",
    category: "Penerangan",
    pricePerDay: 10000,
    rating: "4.7",
    image:
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/fa73a89c4df3167a2ee60d92a1bd78fd.jpg",
    available: true,
    stock: 4,
  },
  {
    id: 10,
    name: "Dry Bag Outdoor 20L",
    category: "Aksesori",
    pricePerDay: 8000,
    rating: "4.6",
    image:
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/consina_consina_aqua_scan_dry_bag_20l_tas_kedap_air_waterproof_outdoor_hiking_trekking_rafting_full01_qg4k82mv.jpeg",
    available: true,
    stock: 5,
  },
  {
    id: 11,
    name: "Kotak P3K Pendaki",
    category: "Keamanan",
    pricePerDay: 8000,
    rating: "4.9",
    image:
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/7ee04e01-f51f-4067-8d03-e2cdae8ef47e.jpeg",
    available: true,
    stock: 3,
  },
  {
    id: 12,
    name: "Flysheet Camping 3x4 m",
    category: "Tenda",
    pricePerDay: 12000,
    rating: "4.7",
    image:
      "https://6af217ee1310907ad5f8ffd6.imgix.net/sandbox/id-11134207-7ras9-m3a4qr4i2rpw1b.jpeg",
    available: false,
    stock: 0,
  },
];
