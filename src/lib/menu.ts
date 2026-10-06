export interface Dish {
  id: string;
  name: any;
  desc: any;
  nameAr?: string;
  descAr?: string;
  note?: any;
  price?: number;
  prices?: any;
  category: string;
  image: string;
  badge?: any;
  options?: any;
}

export type Language = "en" | "ar" | "ur" | "hi";

export const validMenuFilter = ["all", "saved", "pizza", "pasta", "salad", "drink", "drinks"] as const;
export type MenuFilter = string;

export function normalizeMenuSearch(query: string): string {
  return query.trim().toLowerCase();
}

export const menuCategories: any[] = [
  { id: "pizza", label: { en: "Pizza", ar: "البيتزا", ur: "پٹزا", hi: "पिज्जा" }, nameAr: "البيتزا" },
  { id: "pasta", label: { en: "Pasta", ar: "الباستا", ur: "پاستا", hi: "पास्ता" }, nameAr: "الباستا" },
  { id: "salad", label: { en: "Salads & sides", ar: "السلطات", ur: "سلاد", hi: "सलाद" }, nameAr: "السلطات" },
  { id: "drink", label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" }, nameAr: "المشروبات" },
];

export const categories = menuCategories;

export const menuCopy: Record<string, any> = {
  en: {
    nav: "Our menu",
    title: "Something delicious awaits.",
    subtitle: "Find your favourite. Or fall for something new.",
    search: "Find a dish...",
    all: "All dishes",
    favs: "Favourites",
    noFavs: "No favourite dishes yet.",
    addFav: "Add to favourites",
    removeFav: "Remove from favourites",
    directions: "Get directions",
  },
  ar: {
    nav: "قائمتنا",
    title: "شيء لذيذ بانتظارك.",
    subtitle: "اعثر على مفضلك. أو جرب شيئاً جديداً.",
    search: "ابحث عن طبق...",
    all: "كل الأطباق",
    favs: "المفضلة",
    noFavs: "لا توجد أطباق مفضلة بعد.",
    addFav: "إضافة للمفضلة",
    removeFav: "إزالة من المفضلة",
    directions: "الاتجاهات",
  },
  ur: {
    nav: "ہمارا مینو",
    title: "کچھ لذیذ آپ کا منتظر ہے۔",
    subtitle: "اپنی پسندیدہ ڈش تلاش کریں۔",
    search: "ڈش تلاش کریں...",
    all: "تمام ڈشز",
    favs: "پسندیدہ",
    noFavs: "ابھی تک کوئی پسندیدہ ڈش نہیں۔",
    addFav: "پسندیدہ میں شامل کریں",
    removeFav: "پسندیدہ سے ہٹائیں",
    directions: "راستہ حاصل کریں",
  },
  hi: {
    nav: "हमारा मेनू",
    title: "कुछ स्वादिष्ट आपका इंतज़ार कर रहा है।",
    subtitle: "अपनी पसंदीदा डिश खोजें।",
    search: "डिश खोजें...",
    all: "सभी व्यंजन",
    favs: "पसंदीदा",
    noFavs: "अभी कोई पसंदीदा डिश नहीं है।",
    addFav: "पसंदीदा में जोड़ें",
    removeFav: "पसंदीदा से हटाएं",
    directions: "दिशा-निर्देश",
  },
};

export const menuSource = menuCopy;

export const restaurantLinks = {
  location: "https://maps.google.com/?q=Italiano+Bari+Dammam",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
};

export const dishes: Dish[] = [
  {
    id: "bari-pizza",
    name: "Bari Pizza",
    nameAr: "باري بيتزا",
    desc: "Authentic Italian Neapolitan-style pizza.",
    descAr: "بيتزا نابوليتانية إيطالية أصلية.",
    price: 29,
    prices: [
      { size: "Small", price: 29 },
      { size: "Large", price: 37 },
    ],
    category: "pizza",
    image: "/dishes/bari-pizza.png",
    options: ["Spicy", "Non-spicy"],
  },
  {
    id: "pepperoni-pizza",
    name: "Pepperoni Pizza",
    nameAr: "بيتزا بيبروني",
    desc: "Wood-fired Neapolitan pizza with pepperoni.",
    descAr: "بيتزا نابوليتانية بالبيبروني.",
    price: 29,
    prices: [
      { size: "Small", price: 29 },
      { size: "Large", price: 37 },
    ],
    category: "pizza",
    image: "/dishes/pepperoni-pizza.png",
  },
  {
    id: "spaghetti-red-sauce",
    name: "Spaghetti Pasta",
    nameAr: "سباجيتي صلصة حمراء",
    desc: "Classic spaghetti tossed in a rich tomato sauce.",
    descAr: "سباجيتي كلاسيكية بصلصة الطماطم.",
    price: 27,
    prices: [],
    category: "pasta",
    image: "/dishes/spaghetti.png",
  },
  {
    id: "penne-pink-sauce",
    name: "Penne Pasta With Chicken",
    nameAr: "بيني بينك صوص مع دجاج",
    desc: "Penne pasta in tomato and cream sauce.",
    descAr: "باستا بيني بصلصة بينك مع قطع الدجاج.",
    price: 27,
    prices: [],
    category: "pasta",
    image: "/dishes/penne.png",
  },
];

export const menuItems = dishes;
