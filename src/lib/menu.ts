export interface Dish {
  id: string;
  name: { en: string; ar: string; ur: string; hi: string } | string;
  nameAr?: string;
  desc: { en: string; ar: string; ur: string; hi: string } | string;
  price?: number;
  prices?: { small: number; large: number };
  category: "pizza" | "pasta" | "salad" | "drink" | "drinks";
  image: string;
  badge?: { en: string; ar: string; ur: string; hi: string } | string;
  options?: string[];
  note?: string;
  noteAr?: string;
}

export type MenuItem = Dish;
export type MenuPrice = number | { small: number; large: number };

export type Language = "en" | "ar" | "ur" | "hi";

export const validMenuFilter = ["all", "saved", "pizza", "pasta", "salad", "drink", "drinks"] as const;
export type MenuFilter = (typeof validMenuFilter)[number];
export type MenuCategory = "pizza" | "pasta" | "salad" | "drink" | "drinks";

export function normalizeMenuSearch(query: string): string {
  return (query || "").trim().toLowerCase();
}

export const menuCategories = [
  { 
    id: "pizza", 
    name: "Pizza", 
    nameAr: "البيتزا", 
    label: { en: "Pizza", ar: "البيتزا", ur: "پٹزا", hi: "पिज्जा" } 
  },
  { 
    id: "pasta", 
    name: "Pasta", 
    nameAr: "الباستا", 
    label: { en: "Pasta", ar: "الباستا", ur: "پاستا", hi: "पास्ता" } 
  },
  { 
    id: "salad", 
    name: "Salad", 
    nameAr: "السلطات", 
    label: { en: "Salads & sides", ar: "السلطات", ur: "سلاد", hi: "सलाद" } 
  },
  { 
    id: "drinks", 
    name: "Drinks", 
    nameAr: "المشروبات", 
    label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } 
  },
  { 
    id: "drink", 
    name: "Drinks", 
    nameAr: "المشروبات", 
    label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } 
  },
];

export const categories = menuCategories;

export const menuCopy: Record<Language, Record<string, string>> = {
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
    savedToast: "Saved to favourites",
    removedToast: "Removed from favourites",
    explore: "Explore Menu",
    heroKicker: "Authentic Italian Taste",
    heroFirst: "Italiano",
    heroSecond: "Bari",
    heroDescription: "Experience the true essence of Italian cuisine with our artisanal pizzas and handcrafted pastas.",
    join: "Join Loyalty Program",
    heroTag: "Special Offer",
    special: "Featured Selection",
    from: "Dammam, KSA",
    loyaltyTitle: "Earn Rewards Every Visit",
    loyaltyDescription: "Collect points with every order and redeem them for free meals, discounts, and exclusive perks.",
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
    savedToast: "تم الحفظ في المفضلة",
    removedToast: "تمت الإزالة من المفضلة",
    explore: "استكشف القائمة",
    heroKicker: "طعم إيطالي أصيل",
    heroFirst: "إيتاليانو",
    heroSecond: "باري",
    heroDescription: "تذوق الجوهر الحقيقي للمطبخ الإيطالي مع البيتزا والباستا المصنوعة يدوياً.",
    join: "انضم لبرنامج الولاء",
    heroTag: "عرض خاص",
    special: "اختيارات مميزة",
    from: "الدمام، المملكة العربية السعودية",
    loyaltyTitle: "اجمع النقاط مع كل زيارة",
    loyaltyDescription: "اجمع النقاط مع كل طلب واستبدلها بوجبات مجانية وخصومات ومزايا حصرية.",
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
    savedToast: "پسندیدہ میں محفوظ کر لیا گیا",
    removedToast: "پسندیدہ سے ہٹا دیا گیا",
    explore: "مینو دیکھیں",
    heroKicker: "خالص اطالوی ذائقہ",
    heroFirst: "اطالوی",
    heroSecond: "باری",
    heroDescription: "ہماری تازہ تیار کردہ پٹزا اور پاستا کے ساتھ اطالوی کھانوں کا بہترین تجربہ حاصل کریں۔",
    join: "وفاداری پروگرام میں شامل ہوں",
    heroTag: "خاص پیشکش",
    special: "خاص انتخاب",
    from: "دمام، سعودی عرب",
    loyaltyTitle: "ہر آرڈر پر انعامات حاصل کریں",
    loyaltyDescription: "ہر آرڈر پر پوائنٹس حاصل کریں اور مفت کھانا اور ڈسکاؤنٹ حاصل کریں۔",
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
    removeFav: "पसंदीदा से हटाएं",
    directions: "दिशा-निर्देश",
    savedToast: "पसंदीदा में सहेजा गया",
    removedToast: "पसंदीदा से हटा दिया गया",
    explore: "मेनू देखें",
    heroKicker: "असली इतालवी स्वाद",
    heroFirst: "इतालवी",
    heroSecond: "बारी",
    heroDescription: "हमारे ताज़ा पिज्जा और पास्ता के साथ असली इतालवी व्यंजनों का आनंद लें।",
    join: "वफादारी कार्यक्रम में शामिल हों",
    heroTag: "विशेष प्रस्ताव",
    special: "विशेष चयन",
    from: "दम्माम, सऊदी अरब",
    loyaltyTitle: "हर ऑर्डर पर पुरस्कार अर्जित करें",
    loyaltyDescription: "हर ऑर्डर पर अंक अर्जित करें और मुफ़्त भोजन और छूट प्राप्त करें।",
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
    desc: {
      en: "Authentic Italian Neapolitan-style pizza crafted with a traditional leopard-spotted artisan crust.",
      ar: "بيتزا نابوليتانية إيطالية أصلية بعجينة تقليدية.",
      ur: "روایتی نیپولیٹن انداز کی پٹزا۔",
      hi: "पारंपरिक इतालवी नेपोलिटन पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/bari-pizza.png",
    badge: { en: "NEW · SPECIAL", ar: "جديد · مميز", ur: "نیا · خاص", hi: "نیا · विशेष" },
    options: ["Spicy", "Non-spicy"],
    note: "Chef Special",
    noteAr: "خاص من الشيف",
  },
  {
    id: "pepperoni-pizza",
    name: { en: "Pepperoni Pizza", ar: "بيتزا بيبروني", ur: "پیپرونی پٹزا", hi: "पेपेरोनी पिज्जा" },
    nameAr: "بيتزا بيبروني",
    desc: {
      en: "Wood-fired Neapolitan pizza topped with rich tomato sauce and beef pepperoni.",
      ar: "بيتزا نابوليتانية بصلصة الطماطم الغنية والبيبروني.",
      ur: "ٹماٹر ساس اور بیف پیپرونی کے ساتھ پٹزا۔",
      hi: "टमाटर सॉस और बीफ पेपेरोनी के साथ पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/pepperoni-pizza.png",
  },
  {
    id: "spaghetti-red-sauce",
    name: { en: "Spaghetti Pasta", ar: "سباجيتي صلصة حمراء", ur: "اسپیگیٹی", hi: "स्पैगेटी" },
    nameAr: "سباجيتي صلصة حمراء",
    desc: {
      en: "Classic spaghetti tossed in a rich tomato sauce.",
      ar: "سباجيتي كلاسيكية بصلصة الطماطم.",
      ur: "کلاسیکی ٹماٹر ساس اسپیگیٹی۔",
      hi: "क्लासिक टमाटर सॉस स्पैगेटी।",
    },
    price: 27,
    category: "pasta",
    image: "/dishes/spaghetti.png",
  },
];

export const menuItems = dishes;
