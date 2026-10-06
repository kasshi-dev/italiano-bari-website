export interface Dish {
  id: string;
  name: { en: string; ar: string };
  desc: { en: string; ar: string };
  price?: number;
  prices?: { small: number; large: number };
  category: "pizza" | "pasta" | "salad" | "drink";
  image: string;
  badge?: { en: string; ar: string };
  options?: string[];
}

export type Language = "en" | "ar";

export const validMenuFilter = ["all", "pizza", "pasta", "salad", "drink"] as const;
export type MenuFilter = (typeof validMenuFilter)[number];

export function normalizeMenuSearch(query: string): string {
  return query.trim().toLowerCase();
}

export const menuCategories = [
  { id: "pizza", label: { en: "Pizza", ar: "البيتزا" } },
  { id: "pasta", label: { en: "Pasta", ar: "الباستا" } },
  { id: "salad", label: { en: "Salads & sides", ar: "السلطات" } },
  { id: "drink", label: { en: "Drinks", ar: "المشروبات" } },
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
    name: { en: "Bari Pizza", ar: "باري بيتزا" },
    desc: {
      en: "Authentic Italian Neapolitan-style pizza.",
      ar: "بيتزا نابوليتانية إيطالية أصلية.",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/bari-pizza.png",
    badge: { en: "NEW · SPECIAL", ar: "جديد · مميز" },
    options: ["Spicy", "Non-spicy"],
  },
  {
    id: "pepperoni-pizza",
    name: { en: "Pepperoni Pizza", ar: "بيتزا بيبروني" },
    desc: {
      en: "Wood-fired Neapolitan pizza with pepperoni.",
      ar: "بيتزا نابوليتانية بالبيبروني.",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/pepperoni-pizza.png",
  },
  {
    id: "spaghetti-red-sauce",
    name: { en: "Spaghetti Pasta", ar: "سباجيتي صلصة حمراء" },
    desc: {
      en: "Classic spaghetti tossed in a rich tomato sauce.",
      ar: "سباجيتي كلاسيكية بصلصة الطماطم.",
    },
    price: 27,
    category: "pasta",
    image: "/dishes/spaghetti.png",
  },
  {
    id: "penne-pink-sauce",
    name: {
      en: "Penne Pasta With Chicken",
      ar: "بيني بينك صوص مع دجاج",
    },
    desc: {
      en: "Penne pasta in a mixture of tomato and cream sauce.",
      ar: "باستا بيني بصلصة بينك ممزوجة مع قطع الدجاج.",
    },
    price: 27,
    category: "pasta",
    image: "/dishes/penne.png",
  },
];

export const menuItems = dishes;
