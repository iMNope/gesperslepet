/* Gesper Slepet — Product database (bilingual) */
const WA_NUMBER = "6281234567890";
const PRODUCTS = [
  {
    id: "wayang-arjuna",
    sku: "GS-01",
    motif: "wayang", size: "L", featured: true,
    price: 700000,
    name: { id: "Gesper Wayang Arjuna", en: "Arjuna Wayang Buckle" },
    short: { id: "Ksatria Arjuna dengan panah & mahkota ukir dalam kuningan tebal.", en: "Knight Arjuna with bow & carved crown in thick brass." },
    desc: {
      id: "Mahakarya terlaris kami. Wajah Arjuna ditatah manual 6 jam dengan 12 jenis tatah. Kuningan 5mm, finishing antik emas, cocok untuk sabuk 3.5–4 cm. Simbol keberanian dan ketepatan tekad.",
      en: "Our best-seller. Arjuna's face is hand-chiseled for 6 hours with 12 chisel types. 5mm brass, antique gold finish, fits 3.5–4 cm belts. A symbol of courage and resolve."
    },
    material: { id: "Kuningan asli 5 mm + pin tembaga", en: "Genuine 5 mm brass + copper pin" },
    dimension: "7.5 × 5.5 cm",
    weight: "118 g",
    finishing: { id: "Antik emas + anti-tarnish", en: "Antique gold + anti-tarnish" },
    stock: 42,
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80",
    badge: { id: "Terlaris", en: "Best Seller" }
  },
  {
    id: "batik-parang",
    sku: "GS-02",
    motif: "batik", size: "M", featured: true,
    price: 295000,
    name: { id: "Gesper Batik Parang Kusuma", en: "Parang Kusuma Batik Buckle" },
    short: { id: "Lereng parang klasik Solo dengan ukiran dalam berlapis.", en: "Classic Solo parang slopes with layered deep carving." },
    desc: {
      id: "Motif parang melambangkan kesinambungan & kekuatan. Diukir dalam (deep relief) sehingga bayangan motif tampak hidup. Favorit untuk seragam komunitas & dinas.",
      en: "Parang motif symbolizes continuity & strength. Deep-relief carved so shadows look alive. A favorite for community & service uniforms."
    },
    material: { id: "Kuningan asli 4 mm", en: "Genuine 4 mm brass" },
    dimension: "7.0 × 5.0 cm",
    weight: "96 g",
    finishing: { id: "Antik tembaga + poles kilap", en: "Antique copper + gloss polish" },
    stock: 58,
    img: "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=800&q=80",
    badge: { id: "Favorit", en: "Favorite" }
  },
  {
    id: "flora-lotus",
    sku: "GS-03",
    motif: "flora", size: "M", featured: true,
    price: 275000,
    name: { id: "Gesper Flora Lotus Majapahit", en: "Majapahit Lotus Flora Buckle" },
    short: { id: "Bunga lotus gaya candi Penataran, anggun untuk pria & wanita.", en: "Penataran-temple style lotus, elegant for men & women." },
    desc: {
      id: "Terinspirasi relief Candi Penataran. Kelopak lotus diukir bertumpuk 3 lapis — simbol kesucian yang tumbuh dari lumpur. Paling ringan dan nyaman dipakai harian.",
      en: "Inspired by Penataran Temple reliefs. Lotus petals carved in 3 stacked layers — purity rising from mud. Lightest and most comfortable for daily wear."
    },
    material: { id: "Tembaga murni 4 mm", en: "Pure 4 mm copper" },
    dimension: "6.8 × 4.8 cm",
    weight: "88 g",
    finishing: { id: "Tembaga natural + doff", en: "Natural copper + matte" },
    stock: 51,
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    badge: { id: "Unisex", en: "Unisex" }
  },
  {
    id: "geometris-kawung",
    sku: "GS-04",
    motif: "geometris", size: "S", featured: true,
    price: 225000,
    name: { id: "Gesper Kawung Tembaga", en: "Copper Kawung Buckle" },
    short: { id: "Pakem kawung Yogya yang minimalis, cocok untuk slim belt.", en: "Minimalist Yogya kawung pakem, perfect for slim belts." },
    desc: {
      id: "Kawung — empat hati menyatu — bermakna persaudaraan & umur panjang. Ukuran S ramping untuk sabuk 2.5–3 cm, gaya modern-etnik untuk kantor & acara formal.",
      en: "Kawung — four hearts as one — means brotherhood & longevity. Slim S size for 2.5–3 cm belts, modern-ethnic style for office & formal events."
    },
    material: { id: "Tembaga murni 3 mm", en: "Pure 3 mm copper" },
    dimension: "6.0 × 4.2 cm",
    weight: "64 g",
    finishing: { id: "Antik coklat + kilap", en: "Antique brown + gloss" },
    stock: 67,
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    badge: { id: "Hemat", en: "Value" }
  },
  {
    id: "wayang-gatotkaca",
    sku: "GS-05",
    motif: "wayang", size: "L", featured: false,
    price: 425000,
    name: { id: "Gesper Wayang Gatotkaca", en: "Gatotkaca Wayang Buckle" },
    short: { id: "Gatotkaca 'otot kawat tulang besi' — paling gagah & berat.", en: "Gatotkaca 'wire-muscle iron-bone' — boldest & heaviest." },
    desc: {
      id: "Edisi kolektor. Detail kotang & sayap ukir timbul tinggi. Kuningan 5mm terberat (132g) dengan pin stainless — untuk sabuk kulit tebal & penggemar wayang purwa.",
      en: "Collector's edition. High-relief kotang & wing details. Heaviest 5mm brass (132g) with stainless pin — for thick leather belts & purwa wayang fans."
    },
    material: { id: "Kuningan 5 mm + pin stainless", en: "5 mm brass + stainless pin" },
    dimension: "8.0 × 6.0 cm",
    weight: "132 g",
    finishing: { id: "Antik emas tua", en: "Aged antique gold" },
    stock: 23,
    img: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80",
    badge: { id: "Kolektor", en: "Collector" }
  },
  {
    id: "batik-mega",
    sku: "GS-06",
    motif: "batik", size: "L", featured: false,
    price: 345000,
    name: { id: "Gesper Batik Mega Mendung", en: "Mega Mendung Batik Buckle" },
    short: { id: "Awan mendung Cirebon yang teduh dalam tembaga merah.", en: "Serene Cirebon clouds in red copper." },
    desc: {
      id: "Tujuh lapis awan mega mendung — pengingat menahan amarah & tetap teduh. Tembaga merah dipadukan list kuningan (teknik sungging).",
      en: "Seven layers of mega mendung clouds — a reminder to restrain anger & stay calm. Red copper combined with brass lining (sungging technique)."
    },
    material: { id: "Tembaga + list kuningan", en: "Copper + brass lining" },
    dimension: "7.6 × 5.4 cm",
    weight: "110 g",
    finishing: { id: "Sungging dua warna", en: "Two-tone sungging" },
    stock: 35,
    img: "https://images.unsplash.com/photo-1611085583191-92a961e7d7f5?auto=format&fit=crop&w=800&q=80",
    badge: { id: "Baru", en: "New" }
  },
  {
    id: "flora-kenanga",
    sku: "GS-07",
    motif: "flora", size: "S", featured: false,
    price: 195000,
    name: { id: "Gesper Flora Kenanga Emas", en: "Golden Kenanga Flora Buckle" },
    short: { id: "Bunga kenanga mungil — ringan, manis, harga bersahabat.", en: "Dainty kenanga flower — light, sweet, friendly price." },
    desc: {
      id: "Pintu masuk terbaik ke dunia slepet. Bunga kenanga khas manten Jawa, finishing emas muda mengilap. Cocok untuk kado & seragam bridesmaid/groomsmen.",
      en: "Best entry to the slepet world. Kenanga flower of Javanese weddings, bright light-gold finish. Perfect for gifts & bridesmaid/groomsmen uniforms."
    },
    material: { id: "Kuningan 3 mm", en: "3 mm brass" },
    dimension: "5.8 × 4.0 cm",
    weight: "58 g",
    finishing: { id: "Emas muda kilap", en: "Bright light gold" },
    stock: 84,
    img: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=800&q=80",
    badge: null
  },
  {
    id: "geometris-limasan",
    sku: "GS-08",
    motif: "geometris", size: "M", featured: false,
    price: 245000,
    name: { id: "Gesper Limasan Klasik", en: "Classic Limasan Buckle" },
    short: { id: "Atap limasan & tumpal — arsitektur Jawa dalam genggaman.", en: "Limasan roof & tumpal — Javanese architecture in hand." },
    desc: {
      id: "Terinspirasi atap rumah limasan Kotagede dengan deret tumpal. Garis tegas geometris, mudah dipadukan dengan batik maupun jeans. Bisa grafir nama gratis.",
      en: "Inspired by Kotagede limasan rooftops with tumpal rows. Bold geometric lines, pairs with batik or jeans. Free name engraving."
    },
    material: { id: "Kuningan 4 mm", en: "4 mm brass" },
    dimension: "6.5 × 4.6 cm",
    weight: "82 g",
    finishing: { id: "Antik + grafir custom", en: "Antique + custom engraving" },
    stock: 49,
    img: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80",
    badge: null
  }
];

function formatIDR(n){ return "Rp " + n.toLocaleString("id-ID"); }
function waLink(p, lang){
  const name = (lang==="en"?p.name.en:p.name.id);
  const text = lang==="en"
    ? `Hello Gesper Slepet! I want to order ${name} (${p.sku}) - ${formatIDR(p.price)}. Is it available?`
    : `Halo Gesper Slepet! Saya mau pesan ${name} (${p.sku}) - ${formatIDR(p.price)}. Apakah ready?`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
}
