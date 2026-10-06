import rawMenuData from "./menu-data.json";

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
  note?: string;
  noteAr?: string;
  nameAr?: string;
}

export type MenuItem = Dish;
export type MenuPrice = number | { small: number; large: number };
export type MenuCategory = "pizza" | "pasta" | "salad" | "drink";
export type MenuFilter = "all" | "saved" | MenuCategory;

export type Language = "en" | "ar" | "ur" | "hi";

export const menuCopy = {
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
    savedToast: "saved to favourites",
    removedToast: "Removed from favourites",
  },
  ar: {
    nav: "قائمتنا",
    title: "شيء لذيذ بانتظارك.",
    subtitle: "اختر علي ذوقك. أو جرب شيئاً جديداً!",
    search: "ابحث عن طبق...",
    all: "كل الأطباق",
    favs: "المفضلة",
    noFavs: "لا توجد أطباق مفضلة بعد. انقر على القلب في أي عنصر لحفظه هنا.",
    addFav: "إضافة إلى المفضلة",
    removeFav: "إزالة من المفضلة",
    directions: "احصل على الاتجاهات",
    savedToast: "تم الحفظ في المفضلة",
    removedToast: "تمت الإزالة من المفضلة",
  },
  ur: {
    nav: "ہمارا مینو",
    title: "کچھ لذیذ آپ کا منتظر ہے۔",
    subtitle: "اپنی پسندیدہ ڈش منتخب کریں۔",
    search: "ڈش تلاش کریں...",
    all: "تمام ڈشز",
    favs: "پسندیدہ",
    noFavs: "ابھی تک کوئی پسندیدہ ڈش نہیں ہے۔",
    addFav: "پسندیدہ میں شامل کریں",
    removeFav: "پسندیدہ سے ہٹائیں",
    directions: "راستہ دیکھیں",
    savedToast: "پسندیدہ میں محفوظ کر لیا گیا",
    removedToast: "پسندیدہ سے ہٹا دیا گیا",
  },
  hi: {
    nav: "हमारा मेनू",
    title: "कुछ स्वादिष्ट आपका इंतजार कर रहा है।",
    subtitle: "अपनी पसंदीदा डिश चुनें।",
    search: "डिश खोजें...",
    all: "सभी व्यंजन",
    favs: "पसंदीदा",
    noFavs: "अभी तक कोई पसंदीदा व्यंजन नहीं है।",
    addFav: "पसंदीदा में जोड़ें",
    removeFav: "पसंदीदा से हटाएं",
    directions: "दिशा-निर्देश प्राप्त करें",
    savedToast: "पसंदीदा में सहेजा गया",
    removedToast: "पसंदीदा से हटा दिया गया",
  },
};

// Required aliases & exports for menu-app.tsx
export const menuSource = menuCopy;
export const menuItems: MenuItem[] = rawMenuData as unknown as MenuItem[];

export const menuCategories: { id: MenuCategory; label: { [key in Language]: string } }[] = [
  { id: "pizza", label: { en: "Pizza", ar: "بيتزا", ur: "پیزا", hi: "पिज्जा" } },
  { id: "pasta", label: { en: "Pasta", ar: "باستا", ur: "پاستا", hi: "पास्ता" } },
  { id: "salad", label: { en: "Salad", ar: "سلطة", ur: "سلاد", hi: "सलाद" } },
  { id: "drink", label: { en: "Drinks", ar: "مشروبات", ur: "مشروبات", hi: "पेय पदार्थ" } },
];

export const restaurantLinks = {
  maps: "https://maps.google.com",
};

export function normalizeMenuSearch(text: string): string {
  return (text || "").toLowerCase().trim();
}
