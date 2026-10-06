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

export const menuCopy: Record<Language, Record<string, any>> = {
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
    bottomSecond: "Italiano Bari",
    bottomDescription: "Authentic Italian Taste",
    join: "Join Loyalty Program",
    priceNote: "Prices subject to change",
    original: "Original",
    imageCaption: "Delicious Dish",
    spicy: "Spicy",
    selectSize: "Select Size",
    small: "Small",
    large: "Large",
    regular: "Regular",
    detailNote: "Fresh ingredients",
    unsave: "Remove from saved",
    save: "Save dish",
    savedDevice: "Saved on this device",
    loyaltyButton: "Loyalty Program",
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
    bottomSecond: "إيتاليانو باري",
    bottomDescription: "طعم إيطالي أصيل",
    join: "انضم لبرنامج الولاء",
    priceNote: "الأسعار قابلة للتغيير",
    original: "الأصلي",
    imageCaption: "طبق لذیذ",
    spicy: "حار",
    selectSize: "اختر الحجم",
    small: "صغير",
    large: "كبير",
    regular: "عادي",
    detailNote: "مكونات طازجة",
    unsave: "إزالة من المحفوظات",
    save: "حفظ الطبق",
    savedDevice: "محفوظ على هذا الجهاز",
    loyaltyButton: "برنامج الولاء",
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
    bottomSecond: "اطالوی باری",
    bottomDescription: "خالص اطالوی ذائقہ",
    join: "وفاداری پروگرام میں شامل ہوں",
    priceNote: "قیمتیں تبدیل ہو سکتی ہیں",
    original: "اصل",
    imageCaption: "لذیذ ڈش",
    spicy: "مسالہ دار",
    selectSize: "سائز منتخب کریں",
    small: "چھوٹا",
    large: "بڑا",
    regular: "عام",
    detailNote: "تازہ اجزاء",
    unsave: "محفوظ سے ہٹائیں",
    save: "ڈش محفوظ کریں",
    savedDevice: "اس ڈیوائس پر محفوظ ہے",
    loyaltyButton: "وفاداری پروگرام",
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
    bottomSecond: "इतालवी बारी",
    bottomDescription: "असली इतालवी स्वाद",
    join: "वफादारी कार्यक्रम में शामिल हों",
    priceNote: "कीमतें बदल सकती हैं",
    original: "मूल",
    imageCaption: "स्वादिष्ट व्यंजन",
    spicy: "मसालेदार",
    selectSize: "आकार चुनें",
    small: "छोटा",
    large: "बड़ा",
    regular: "सामान्य",
    detailNote: "ताज़ा सामग्री",
    unsave: "सहेजे गए से हटाएं",
    save: "व्यंजन सहेजें",
    savedDevice: "इस डिवाइस पर सहेजा गया",
    loyaltyButton: "वफादारी कार्यक्रम",
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
    name: { en: "Bari Pizza", ar: "باري بيتزا", ur: "باری پٹزا", hi: "बारी पिज्जा" },
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
  },
  {
    id: "pepperoni-pizza",
    name: { en: "Pepperoni Pizza", ar: "بيتزا بيبروني", ur: "پیپرونی پٹزا", hi: "पेपेरोनी पिज्जा" },
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
