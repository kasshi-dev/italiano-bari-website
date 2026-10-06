export type Language = "en" | "ar" | "ur" | "hi";

export interface ComplexPrice {
  small?: number;
  large?: number;
  price?: number;
  oldPrice?: number;
  length?: number;
  map?: (cb: (option: any, i: number) => any) => any;
  [key: string]: any;
}

export type MenuPrice = number | ComplexPrice | any;

export interface Dish {
  id: string;
  name: any;
  nameAr?: string;
  desc: any;
  price?: MenuPrice;
  prices?: any;
  oldPrice?: number;
  category: "pizza" | "pasta" | "salad" | "drink" | "drinks" | string;
  image: string;
  badge?: any;
  options?: string[];
  note?: string;
  noteAr?: string;
}

export type MenuItem = Dish;

export const validMenuFilter = ["all", "saved", "pizza", "pasta", "salad", "drink", "drinks"] as const;
export type MenuFilter = (typeof validMenuFilter)[number];
export type MenuCategory = string;

export function normalizeMenuSearch(query: string): string {
  return (query || "").trim().toLowerCase();
}

export const menuCategories: any = [
  { id: "pizza", name: "Pizza", nameAr: "البيتزا", label: { en: "Pizza", ar: "البيتزا", ur: "پٹزا", hi: "पिज्जा" } },
  { id: "pasta", name: "Pasta", nameAr: "الباستا", label: { en: "Pasta", ar: "الباستا", ur: "پاستا", hi: "पास्ता" } },
  { id: "salad", name: "Salad", nameAr: "السلطات", label: { en: "Salads & sides", ar: "السلطات", ur: "سلاد", hi: "सलाद" } },
  { id: "drinks", name: "Drinks", nameAr: "المشروبات", label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } },
  { id: "drink", name: "Drinks", nameAr: "المشروبات", label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } },
];

export const categories = menuCategories;

export const menuCopy: any = {
  en: {
    nav: "Our menu", title: "Something delicious awaits.", subtitle: "Find your favourite. Or fall for something new.",
    search: "Find a dish...", all: "All dishes", favs: "Favourites", noFavs: "No favourite dishes yet.",
    addFav: "Add to favourites", removeFav: "Remove from favourites", directions: "Get directions",
    savedToast: "Saved to favourites", removedToast: "Removed from favourites", explore: "Explore Menu",
    heroKicker: "Authentic Italian Taste", heroFirst: "Italiano", heroSecond: "Bari",
    heroDescription: "Experience the true essence of Italian cuisine.", join: "Join Loyalty Program",
    heroTag: "Special Offer", special: "Featured Selection", from: "Dammam, KSA",
    loyaltyTitle: "Earn Rewards Every Visit", loyaltyDescription: "Collect points with every order.",
  },
  ar: {
    nav: "قائمتنا", title: "شيء لذيذ بانتظارك.", subtitle: "اعثر على مفضلك.", search: "ابحث عن طبق...",
    all: "كل الأطباق", favs: "المفضلة", noFavs: "لا توجد أطباق مفضلة بعد.", addFav: "إضافة للمفضلة",
    removeFav: "إزالة من المفضلة", directions: "الاتجاهات", savedToast: "تم الحفظ في المفضلة",
    removedToast: "تمت الإزالة من المفضلة", explore: "استكشف القائمة", heroKicker: "طعم إيطالي أصيل",
    heroFirst: "إيتاليانو", heroSecond: "باري", heroDescription: "تذوق الجوهر الحقيقي للمطبخ الإيطالي.",
    join: "انضم لبرنامج الولاء", heroTag: "عرض خاص", special: "اختيارات مميزة", from: "الدمام، السعودية",
    loyaltyTitle: "اجمع النقاط مع كل زيارة", loyaltyDescription: "اجمع النقاط واستبدلها بوجبات مجانية.",
  },
  ur: {
    nav: "ہمارا مینو", title: "کچھ لذیذ آپ کا منتظر ہے۔", subtitle: "اپنی پسندیدہ ڈش تلاش کریں۔", search: "ڈش تلاش کریں...",
    all: "تمام ڈشز", favs: "پسندیدہ", noFavs: "ابھی تک کوئی پسندیدہ ڈش نہیں ہے۔", addFav: "پسندیدہ میں شامل کریں",
    removeFav: "پسندیدہ سے ہٹائیں", directions: "راستہ حاصل کریں", savedToast: "محفوظ کر لیا گیا",
    removedToast: "ہٹا دیا گیا", explore: "مینو دیکھیں", heroKicker: "خالص اطالوی ذائقہ",
    heroFirst: "اطالوی", heroSecond: "باری", heroDescription: "اطالوی کھانوں کا بہترین تجربہ حاصل کریں۔",
    join: "وفاداری پروگرام میں شامل ہوں", heroTag: "خاص پیشکش", special: "خاص انتخاب", from: "دمام، سعودی عرب",
    loyaltyTitle: "ہر آرڈر پر انعامات حاصل کریں", loyaltyDescription: "ہر آرڈر پر پوائنٹس حاصل کریں۔",
  },
  hi: {
    nav: "हमारा मेनू", title: "कुछ स्वादिष्ट आपका इंतज़ार कर रहा है।", subtitle: "अपनी पसंदीदा डिश खोजें।", search: "डिश खोजें...",
    all: "सभी व्यंजन", favs: "पसंदीदा", noFavs: "अभी कोई पसंदीदा डिश नहीं है।", addFav: "पसंदीदा में जोड़ें",
    removeFav: "पसंदीदा से हटाएं", directions: "दिशा-निर्देश", savedToast: "सहेजा गया",
    removedToast: "हटा दिया गया", explore: "मेनू देखें", heroKicker: "असली इतालवी स्वाद",
    heroFirst: "इतालवी", heroSecond: "बारी", heroDescription: "असली इतालवी व्यंजनों का आनंद लें।",
    join: "वफादारी कार्यक्रम में शामिल हों", heroTag: "विशेष प्रस्ताव", special: "विशेष चयन", from: "दम्माम, सऊदी अरब",
    loyaltyTitle: "पुरस्कार अर्जित करें", loyaltyDescription: "हर ऑर्डर पर अंक अर्जित करें।",
  },
};

export const menuSource = menuCopy;

export const restaurantLinks = {
  location: "https://maps.google.com/?q=Italiano+Bari+Dammam",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
  maps: "https://maps.google.com/?q=Italiano+Bari+Dammam",
};

export const dishes: Dish[] = [
  {
    id: "bari-pizza",
    name: { en: "Bari Pizza", ar: "باري بيتزا", ur: "باری پٹزا", hi: "बारी पिज्जा" },
    nameAr: "باري بيتزا",
    desc: { en: "Authentic Italian Neapolitan-style pizza.", ar: "بيتزا نابوليتانية إيطالية أصلية.", ur: "روایتی نیپولیٹن پٹزا۔", hi: "पारंपरिक नेपोलिटن पिज्जा।" },
    prices: Object.assign([29, 37], { small: 29, large: 37 }),
    price: Object.assign(29, { oldPrice: 35 }),
    category: "pizza",
    image: "/dishes/bari-pizza.png",
    options: ["Spicy", "Non-spicy"],
  },
  {
    id: "pepperoni-pizza",
    name: { en: "Pepperoni Pizza", ar: "بيتزا بيبروني", ur: "پیپرونی پٹزا", hi: "पेपेरोनी पिज्जा" },
    nameAr: "بيتزا بيبروني",
    desc: { en: "Wood-fired Neapolitan pizza with pepperoni.", ar: "بيتزا نابوليتانية بالبيبروني.", ur: "بیف پیپرونی کے ساتھ پٹزا۔", hi: "पेपेरोनी के साथ पिज्जा।" },
    prices: Object.assign([29, 37], { small: 29, large: 37 }),
    price: Object.assign(29, { oldPrice: 35 }),
    category: "pizza",
    image: "/dishes/pepperoni-pizza.png",
  },
  {
    id: "spaghetti-red-sauce",
    name: { en: "Spaghetti Pasta", ar: "سباجيتي صلصة حمراء", ur: "اسپیگیٹی", hi: "स्पैगेटी" },
    nameAr: "سباجيتي صلصة حمراء",
    desc: { en: "Classic spaghetti in tomato sauce.", ar: "سباجيتي كلاسيكية بصلصة الطماطم.", ur: "کلاسیکی اسپیگیٹی۔", hi: "क्लासिक स्पैगेटी।" },
    price: Object.assign(27, { oldPrice: 32 }),
    category: "pasta",
    image: "/dishes/spaghetti.png",
  },
];

export const menuItems = dishes;
