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
  nameAr?: string;
  note?: string;
  noteAr?: string;
}

export type MenuItem = Dish;
export type MenuPrice = number | { small: number; large: number };

export type Language = "en" | "ar" | "ur" | "hi";

export const validMenuFilter = ["all", "saved", "pizza", "pasta", "salad", "drink"] as const;
export type MenuFilter = (typeof validMenuFilter)[number];
export type MenuCategory = "pizza" | "pasta" | "salad" | "drink";

export function normalizeMenuSearch(query: string): string {
  return (query || "").trim().toLowerCase();
}

export const menuCategories: { id: MenuCategory; label: Record<Language, string> }[] = [
  { id: "pizza", label: { en: "Pizza", ar: "البيتزا", ur: "پٹزا", hi: "पिज्जा" } },
  { id: "pasta", label: { en: "Pasta", ar: "الباستا", ur: "پاستا", hi: "पास्ता" } },
  { id: "salad", label: { en: "Salads & sides", ar: "السلطات", ur: "سلاد", hi: "सलाद" } },
  { id: "drink", label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } },
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
    id: "truffle-pizza",
    name: { en: "Truffle Pizza", ar: "بيتزا ترفل", ur: "ٹرفل پٹزا", hi: "ट्रफल पिज्जा" },
    desc: {
      en: "Wood-fired Neapolitan pizza with a creamy white sauce base, melted mozzarella cheese, and sliced fresh mushrooms.",
      ar: "بيتزا نابوليتانية بصلصة البيضاء الكريمة، جبن الموزاريلا والمشروم الطازج.",
      ur: "کریمی وائٹ ساس، موزاریلا چیز اور تازہ مشرومز کے ساتھ وڈ فائرڈ پٹزا۔",
      hi: "क्रीमी व्हाइट सॉस, मोज़ारेला और ताज़ा मशरूम के साथ वुड-फायर्ड पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/truffle-pizza.png",
  },
  {
    id: "vegetable-pizza",
    name: { en: "Vegetable Pizza", ar: "بيتزا خضار", ur: "سبزیوں والا پٹزا", hi: "वेजीटेबल पिज्जा" },
    desc: {
      en: "Wood-fired Neapolitan pizza topped with rich tomato sauce, melted mozzarella cheese, sliced bell peppers, and fresh herbs.",
      ar: "بيتزا نابوليتانية بصلصة الطماطم الغنية، جبن الموزاريلا، الفلفل الرومي والأعشاب الطازجة.",
      ur: "ٹماٹر ساس، موزاریلا چیز، شملہ مرچ اور تازہ جڑی بوٹیوں کے ساتھ پٹزا۔",
      hi: "टमाटर सॉस, मोज़ारेلا पनीर, शिमला मिर्च और ताज़ी जड़ी-बूटियों के साथ पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/vegetable-pizza.png",
  },
  {
    id: "margherita-pizza",
    name: { en: "Margherita Pizza", ar: "مارجريتا بيتزا", ur: "مارگریٹا پٹزا", hi: "मार्गेरीटा पिज्जा" },
    desc: {
      en: "Classic wood-fired Neapolitan pizza topped with rich tomato sauce, melted fresh mozzarella, extra virgin olive oil, and fresh basil leaves.",
      ar: "بيتزا كلاسيكية بصلصة الطماطم الغنية، موزاريلا طازجة، زيت زيتون بكر وأوراق الريحان الطازجة.",
      ur: "کلاسیکی ٹماٹر ساس، تازہ موزاریلا چیز، زیتون کا تیل اور باسل کے پتوں کے ساتھ پٹزا۔",
      hi: "टमाटर सॉस, ताज़ा मोज़ारेला, जैतून का तेल और ताज़ा तुलसी के साथ क्लासिक पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/margherita-pizza.png",
  },
  {
    id: "bianca-pizza",
    name: { en: "Bianca Pizza", ar: "بيانكا بيتزا", ur: "بيانكا پٹزا", hi: "बियांكا पिज्जा" },
    desc: {
      en: "Wood-fired Neapolitan pizza topped with a creamy white sauce base, melted mozzarella cheese, seasoned chicken cubes, and a drizzle of olive oil.",
      ar: "بيتزا نابوليتانية بصلصة البيضاء الكريمة، جبن الموزاريلا، قطع الدجاج المتبلة وزيت الزيتون.",
      ur: "کریمی وائٹ ساس، موزاریلا چیز، چکن کے ٹکڑے اور زیتون کے تیل کے ساتھ پٹزا۔",
      hi: "क्रीमी व्हाइट सॉस, मोज़ारेला, चिकन और जैतून के तेल के साथ पिज्जा।",
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/bianca-pizza.png",
  },
  {
    id: "spaghetti-red-sauce",
    name: { en: "Spaghetti Pasta | Red Sauce Pasta", ar: "سباجيتي صلصة حمراء", ur: "اسپیگیٹی ریڈ ساس", hi: "स्पैगेटी रेड सॉस" },
    desc: {
      en: "Classic spaghetti tossed in a rich tomato and minced meat sauce, topped with grilled chicken, parmesan cheese, and fresh basil leaves.",
      ar: "سباجيتي كلاسيكية بصلصة الطماطم واللحم المفروم مع دجاج مشوي وجبن بارميزان وريحان.",
      ur: "ٹماٹر اور قیمہ ساس میں تیار کردہ اسپیگیٹی، گرل چکن اور پارمیسان چیز کے ساتھ۔",
      hi: "टमाटर सॉस और कीमा में स्पैगेटी, ग्रिल्ड चिकन और परमेसन पनीर के साथ।",
    },
    price: 27,
    category: "pasta",
    image: "/dishes/spaghetti.png",
  },
  {
    id: "tagliatelle-chicken",
    name: { en: "Chicken And Mushroom Fettuccine Pasta", ar: "تالياتيلي دجاج", ur: "چکن اینڈ مشروم فیٹوچینی", hi: "چکن اینڈ مشروم पास्ता" },
    desc: {
      en: "Fettuccine pasta tossed in a creamy mushroom sauce, served with grilled chicken cubes, parmesan, and fresh basil leaves.",
      ar: "باستا فيتوتشيني بصلصة المشروم الكريمة مع قطع الدجاج المشوي وجبن بارميزان.",
      ur: "کریمی مشروم ساس میں تیار کردہ فیٹوچینی پاستا اور گرل چکن۔",
      hi: "क्रीमी मशरूम सॉस में पास्ता और ग्रिल्ड चिकन।",
    },
    price: 27,
    category: "pasta",
    image: "/dishes/tagliatelle.png",
  },
  {
    id: "penne-pink-sauce",
    name: {
      en: "Penne Pasta With Chicken (Mixed)",
      ar: "بيني بينك صوص مع دجاج",
      ur: "پینی پنک ساس چکن کے ساتھ",
      hi: "पेने पिंक सॉस चिकन के साथ",
    },
    desc: {
      en: "Penne pasta tossed in a delicious mix of tomato and cream sauce, served with grilled chicken cubes and fresh herbs.",
      ar: "باستا بيني بصلصة بينك ممزوجة مع قطع الدجاج المشوي والأعشاب الطازجة.",
      ur: "ٹماٹر اور کریمی ساس کے مکسچر میں پینی پاستا اور گرل چکن۔",
      hi: "पिंक सॉस में पेने पास्ता और ग्रिल्ड चिकन।",
    },
    price: 27,
    category: "pasta",
    image: "/dishes/penne.png",
  },
];

export const menuItems = dishes;
