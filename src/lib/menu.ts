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

export const validMenuFilter = ["all", "pizza", "pasta", "salad", "drink"] as const;
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
    name: { en: "Bari Pizza", ar: "باري بيتزا", ur: "باری پٹزا", hi: "बारी पिज्जा" },
    desc: {
      en: "Authentic Italian Neapolitan-style pizza crafted with a traditional leopard-spotted artisan crust. Topped with rich Italian tomato sauce, melted mozzarella fior di latte, savory seasoned chicken, and finished with a chef’s signature sauce drizzle.",
      ar: "بيتزا نابوليتانية إيطالية أصلية بعجينة تقليدية، مغطاة بصلصة الطماطم الغنية وجبن الموزاريلا والدجاج المتبل مع صوص الشيف الخاص.",
      ur: "روایتی نیپولیٹن انداز کی پٹزا جس پر ٹماٹر ساس، موزاریلا چیز، مصالحے دار چکن اور شیف کا خاص ساس شامل ہے۔",
      hi: "पारंपरिक इतालवी नेपोलिटन पिज्जा, टमाटर सॉस, मोज़ारेला पनीर, चिकन और शेफ के सिग्नेचर सॉस के साथ।",
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
      en: "Wood-fired Neapolitan pizza topped with rich tomato sauce, melted mozzarella cheese, and crispy beef pepperoni slices.",
      ar: "بيتزا نابوليتانية بصلصة الطماطم الغنية، جبن الموزاريلا الذائب وشريحات البيبروني المقرمشة.",
      ur: "ٹماٹر ساس، پگھلی ہوئی موزاریلا چیز اور بیف پیپرونی کے ساتھ وڈ فائرڈ پٹزا۔",
      hi: "टमाटर सॉस, मोज़ारेला पनीर और बीफ पेपेरोनी स्लाइस के साथ वुड-फायर्ड पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/pepperoni-pizza.png",
  },
  {
    id: "spaghetti-red-sauce",
    name: { en: "Spaghetti Pasta | Red Sauce Pasta", ar: "سباجيتي صلصة حمراء", ur: "اسپیگیٹی ریڈ ساس", hi: "स्पैगेटी रेड सॉस" },
    desc: {
      en: "Classic spaghetti tossed in a rich tomato and minced meat sauce, topped with grilled chicken, parmesan cheese, and fresh basil leaves.",
      ar: "سباجيتي كلاسيكية بصلصة الطماطم واللحم المفروم مع دجاج مشوي وجبن بارميزان وريحان.",
      ur: "ٹماٹر اور قیمہ ساس میں تیار کردہ اسپیگیٹی، گرل چکن اور پارمیسان چیز کے ساتھ۔",
      hi: "टमाटर सॉस और कीमा में स्पैगेटी, ग्रिल्
        
