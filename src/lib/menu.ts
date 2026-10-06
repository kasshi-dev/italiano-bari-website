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

export const menuCopy: Record<Language, { nav: string; title: string; subtitle: string; search: string; all: string; favs: string; noFavs: string; addFav: string; removeFav: string; directions: string }> = {
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
    removeFav: "پسندیدہ سے ہٹائیں",
    directions: "दिशा-निर्देश",
  },
};

export const restaurantLinks = {
  location: "url?id=31?q=Italiano+Bari+Dammam",
  instagram: "https://instagram.com",
  tiktok: "https://tiktok.com",
};

export const categories = [
  { id: "pizza", label: { en: "Pizza", ar: "البيتزا", ur: "پٹزا", hi: "पिज्जा" } },
  { id: "pasta", label: { en: "Pasta", ar: "الباستا", ur: "پاستا", hi: "पास्ता" } },
  { id: "salad", label: { en: "Salads & sides", ar: "السلطات", ur: "سلاد", hi: "सलाद" } },
  { id: "drink", label: { en: "Drinks", ar: "المشروبات", ur: "مشروبات", hi: "पेय" } },
] as const;

export const dishes: Dish[] = [
  {
    id: "bari-pizza",
    name: { en: "Bari Pizza", ar: "باري بيتزا", ur: "باری پٹزا", hi: "बारी पिज्जा" },
    desc: {
      en: "Authentic Italian Neapolitan-style pizza crafted with a traditional leopard-spotted artisan crust. Topped with rich Italian tomato sauce, melted mozzarella fior di latte, savory seasoned chicken, and finished with a chef’s signature sauce drizzle.",
      ar: "بيتزا نابوليتانية إيطالية أصلية بعجينة تقليدية، مغطاة بصلصة الطماطم الغنية وجبن الموزاريلا والدجاج المتبل مع صوص الشيف الخاص.",
      ur: "روایتی نیپولیٹن انداز کی پٹزا جس پر ٹماٹر ساس، موزاریلا چیز، مصالحے دار چکن اور شیف کا خاص ساس شامل ہے۔",
      hi: "पारंपरिक इतालवी नेपोलिटन पिज्जा, टमाटर सॉस, मोज़ारेला पनीर, चिकन और शेफ के सिग्नेचर सॉस के साथ।"
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/bari-pizza.png",
    badge: { en: "NEW · SPECIAL", ar: "جديد · مميز", ur: "نیا · خاص", hi: "नया · विशेष" },
    options: ["Spicy", "Non-spicy"],
  },
  {
    id: "pepperoni-pizza",
    name: { en: "Pepperoni Pizza", ar: "بيتزا بيبروني", ur: "پیپرونی پٹزا", hi: "पेपेरोनी पिज्जा" },
    desc: {
      en: "Wood-fired Neapolitan pizza topped with rich tomato sauce, melted mozzarella cheese, and crispy beef pepperoni slices.",
      ar: "بيتزا نابوليتانية بصلصة الطماطم الغنية، جبن الموزاريلا الذائب وشريحات البيبروني المقرمشة.",
      ur: "ٹماٹر ساس، پگھلی ہوئی موزاریلا چیز اور بیف پیپرونی کے ساتھ وڈ فائرڈ پٹزا۔",
      hi: "टमाटर सॉस, मोज़ारेला पनीर और बीफ पेपेरोनी स्लाइस के साथ वुड-फायर्ड पिज्जा।"
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
      hi: "क्रीमी व्हाइट सॉस, मोज़ारेला और ताज़ा मशरूम के साथ वुड-फायर्ड पिज्जा।"
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
      hi: "टमाटर सॉस, मोज़ारेला पनीर, शिमला मिर्च और ताज़ी जड़ी-बूटियों के साथ पिज्जा।"
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
      hi: "टमाटर सॉस, ताज़ा मोज़ारेला, जैतून का तेल और ताज़ा तुलसी के साथ क्लासिक पिज्जा।"
    },
    prices: { small: 29, large: 37 },
    category: "pizza",
    image: "/dishes/margherita-pizza.png",
  },
  {
    id: "bianca-pizza",
    name: { en: "Bianca Pizza", ar: "بيانكا بيتزا", ur: "بيانكا پٹزا", hi: "बियांका पिज्जा" },
    desc: {
      en: "Wood-fired Neapolitan pizza topped with a creamy white sauce base, melted mozzarella cheese, seasoned chicken cubes, and a drizzle of olive oil.",
      ar: "بيتزا نابوليتانية بصلصة البيضاء الكريمة، جبن الموزاريلا، قطع الدجاج المتبلة وزيت الزيتون.",
      ur: "کریمی وائٹ ساس، موزاریلا چیز، چکن کے ٹکڑے اور زیتون کے تیل کے ساتھ پٹزا۔",
      hi: "क्रीमी व्हाइट सॉस, मोज़ारेला, चिकन और जैतून के तेल के साथ पिज्जा।"
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
      hi: "टमाटर सॉस और कीमा में स्पैगेटी, ग्रिल्ड चिकन और परमेसन पनीर के साथ।"
    },
    price: 27,
    category: "pasta",
    image: "/dishes/spaghetti.png",
  },
  {
    id: "tagliatelle-chicken",
    name: { en: "Chicken And Mushroom Fettuccine Pasta", ar: "تالياتيلي دجاج", ur: "چکن اینڈ مشروم فیٹوچینی", hi: "चिकन एंड मशरूम पास्ता" },
    desc: {
      en: "Fettuccine pasta tossed in a creamy mushroom sauce, served with grilled chicken cubes, parmesan, and fresh basil leaves.",
      ar: "باستا فيتوتشيني بصلصة المشروم الكريمة مع قطع الدجاج المشوي وجبن بارميزان.",
      ur: "کریمی مشروم ساس میں تیار کردہ فیٹوچینی پاستا اور گرل چکن۔",
      hi: "क्रीमी मशरूम सॉस में पास्ता और ग्रिल्ड चिकन।"
    },
    price: 27,
    category: "pasta",
    image: "/dishes/tagliatelle.png",
  },
  {
    id: "penne-pink-sauce",
    name: { en: "Penne Pasta With Chicken (Mixed)", ar: "بيني بينك صوص", ur: "پینی پاستا چکن", hi: "पेने पास्ता मिक्स" },
    desc: {
      en: "Penne pasta tossed in a rich marinara sauce, topped with grilled chicken cubes, parmesan cheese, and fresh basil leaves.",
      ar: "باستا بيني بصلصة المارينارا الغنية مع قطع الدجاج المشوي وجبن بارميزان.",
      ur: "مارینارا ساس میں پینی پاستا اور گرل چکن کے ٹکڑے۔",
      hi: "मैरिनारा सॉस में पेने पास्ता और ग्रिल्ड चिकन।"
    },
    price: 27,
    category: "pasta",
    image: "/dishes/penne.png",
  },
  {
    id: "beetroot-salad",
    name: { en: "Beetroot Salad", ar: "سلطة الشمندر", ur: "چقندر کا سلاد", hi: "चुकंदर का सलाद" },
    desc: {
      en: "A delicious mix of tender beetroot cubes, peppery arugula, crumbled cheese, and crushed nuts, finished with a signature creamy drizzle.",
      ar: "مزيج شهي من مكعبات الشمندر، الجرجير، الجبن والمكسرات مع صوص كريمي.",
      ur: "چقندر، جرجیر، پنیر اور اخروٹ کا کریمی ساس کے ساتھ بہترین امتزاج۔",
      hi: "चुकंदर, अरुगुला, पनीर और मेवों का स्वादिष्ट सलाद।"
    },
    price: 18,
    category: "salad",
    image: "/dishes/beetroot-salad.png",
  },
  {
    id: "peach-salad",
    name: { en: "Peach Salad", ar: "سلطة الخوخ", ur: "آڑو کا سلاد", hi: "आड़ू का सलाद" },
    desc: {
      en: "Fresh sliced peaches over crisp Romaine lettuce and wild arugula (gargir), topped with parmesan cheese and our creamy house dressing.",
      ar: "شرائح الخوخ الطازجة على الخس والجرجير مع جبن البارميزان والصوص الكريمي الخاص.",
      ur: "تازہ آڑو، خس اور جرجیر، پارمیسان چیز اور کریمی ڈریسنگ کے ساتھ۔",
      hi: "ताजा आड़ू, लेट्यूस और अरुगुला परमेसन पनीर के साथ।"
    },
    price: 22,
    category: "salad",
    image: "/dishes/peach-salad.png",
  },
  {
    id: "fries",
    name: { en: "Fries", ar: "بطاطس مقلية", ur: "فرائز", hi: "फाइज" },
    desc: {
      en: "Golden crispy french fries, crispy on the outside and tender on the inside.",
      ar: "بطاطس مقلية ذهبية ومقرمشة من الخارج وطرية من الداخل.",
      ur: "سنہری مقرمش فرنچ فرائز۔",
      hi: "सुनहरे कुरकुरे फ्रेंच फ्राइज।"
    },
    price: 10,
    category: "salad",
    image: "/dishes/fries.png",
  }
];
