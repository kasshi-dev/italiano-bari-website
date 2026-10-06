export interface Dish {
  id: string;
  name: { en: string; ar: string; ur: string; hi: string };
  desc: { en: string; ar: string; ur: string; hi: string };
  price?: number;
  prices?: { small: number; large: number };
  category: "pizza" | "pasta" | "salad" | "drink";
  image: string;
  badge?: { en: string; ar: string; ur: string; hi: string };
  options?: string[];
}

export type Language = "en" | "ar" | "ur" | "hi";

export const validMenuFilter = ["all", "saved", "pizza", "pasta", "salad", "drink"] as const;
export type MenuFilter = (typeof validMenuFilter)[number];

export function normalizeMenuSearch(query: string): string {
  return query.trim().toLowerCase();
}

export const menuCategories = [
  { id: "pizza", label: { en: "Pizza", ar: "البيتزا", ur: "پٹزا", hi: "पिज्जा" } },
  { id: "pasta", label: { en: "Pasta", ar: "الباستا", ur: "پاستا", hi: "पास्ता" } },
  { id: "salad", label: { en: "Salads & sides", ar: "السلطات", ur: "سلاد", hi: "सलाद" } },
  { id: "drink", label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } },
] as const;

export const categories = menuCategories;

export const menuCopy: Record<
  Language,
  {
    nav: string;
    title: string;
    subtitle: string;
    search: string;
    all: string;
    favs: string;
    noFavs: string;
    addFav: string;
    removeFav: string;
    directions: string;
  }
> = {
  en: {
    nav: "Our menu",
    title: "Something delicious awaits.",
    subtitle: "Find your favourite. Or fall for something new.",
    search: "Find a dish...",
    all: "All dishes",
    favs: "Favourites",
    noFavs: "No favourite dishes yet. Tap the heart on any item to save it here.",
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
    noFavs: "لا توجد أطباق مفضلة بعد. اضغط على القلب للحفظ.",
    addFav: "إضافة للمفضلة",
    removeFav: "إزالة من المفضلة",
    directions: "الاتجاهات",
  },
  ur: {
    nav: "ہمارا مینو",
    title: "کچھ لذیذ آپ کا منتظر ہے۔",
    subtitle: "اپنی پسندیدہ ڈش تلاش کریں۔ یا کچھ نیا آزمائیں۔",
    search: "ڈش تلاش کریں...",
    all: "تمام ڈشز",
    favs: "پسندیدہ",
    noFavs: "ابھی تک کوئی پسندیدہ ڈش نہیں۔ محفوظ کرنے کے لیے دل کے نشان پر ٹیپ کریں۔",
    addFav: "پسندیدہ میں شامل کریں",
    removeFav: "پسندیدہ سے ہٹائیں",
    directions: "راستہ حاصل کریں",
  },
  hi: {
    nav: "हमारा मेनू",
    title: "कुछ स्वादिष्ट आपका इंतज़ार कर रहा है।",
    subtitle: "अपनी पसंदीदा डिश खोजें। या कुछ नया ट्राई करें।",
    search: "डिश खोजें...",
    all: "सभी व्यंजन",
    favs: "पसंदीदा",
    noFavs: "अभी कोई पसंदीदा डिश नहीं है। सेव करने के लिए दिल पर टैप करें।",
    addFav: "पसंदीदा में जोड़ें",
    removeFav: "
      
