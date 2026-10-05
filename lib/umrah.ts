export interface UmrahStage {
  id: string;
  title: string;
  titleArabic: string;
  description: string;
  duas: {
    id: string;
    arabicText: string;
    transliteration: string;
    englishTranslation: string;
    timing?: string;
    source?: string;
  }[];
}

export const umrahStages: UmrahStage[] = [
  {
    id: "before-miqat",
    title: "Before Miqat",
    titleArabic: "قبل الميقات",
    description: "Prepare yourself physically and spiritually before reaching the Miqat",
    duas: [
      {
        id: "ghusl",
        arabicText: "الغسل والطهارة",
        transliteration: "Perform Ghusl (ritual bath)",
        englishTranslation: "Cleanse yourself and prepare. Men: wear two white Ihram sheets. Women: wear modest ordinary clothing.",
        timing: "Before Miqat",
        source: "Sahih Muslim"
      }
    ]
  },
  {
    id: "miqat",
    title: "At Miqat - Entering Ihram",
    titleArabic: "الميقات",
    description: "Make niyyah and declare your intention to perform Umrah",
    duas: [
      {
        id: "labbayka",
        arabicText: "لَبَّيْكَ اللَّهُمَّ عُمْرَة",
        transliteration: "Labbayka-llāhumma 'umratan",
        englishTranslation: "Here I am, O Allah, (in answer to Your call) for Umrah.",
        timing: "At Miqat",
        source: "Sahih Muslim 1218"
      }
    ]
  },
  {
    id: "talbiyah",
    title: "Talbiyah",
    titleArabic: "التلبية",
    description: "The sacred invocation to recite on the way to Makkah",
    duas: [
      {
        id: "talbiyah-full",
        arabicText: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ",
        transliteration: "Labbayk Allāhumma Labbayk, Labbayka lā sharīka laka Labbayk, Innal-ḥamda wan-ni'mata laka wal-mulk, Lā sharīka lak",
        englishTranslation: "Here I am, O Allah, here I am. Here I am, You have no partner, here I am. Truly, all praise and blessings are Yours, and all dominion. You have no partner.",
        timing: "Keep reciting on the way to Makkah",
        source: "Sahih al-Bukhari 1549 • Sahih Muslim 1184"
      }
    ]
  },
  {
    id: "entering-mosque",
    title: "Entering Masjid al-Haram",
    titleArabic: "دخول المسجد الحرام",
    description: "Upon entering the sacred mosque, seek Allah's mercy",
    duas: [
      {
        id: "mosque-entry",
        arabicText: "اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ",
        transliteration: "Allāhumma-ftaḥ lī abwāba raḥmatik",
        englishTranslation: "O Allah, open for me the doors of Your mercy.",
        timing: "Enter with right foot",
        source: "Sahih Muslim 713"
      }
    ]
  },
  {
    id: "first-sight",
    title: "First Sight of the Ka'bah",
    titleArabic: "عند رؤية الكعبة",
    description: "When you see the Ka'bah for the first time, make heartfelt dua",
    duas: [
      {
        id: "kabah-sight",
        arabicText: "رفع اليدين والدعاء بما تشاء من قلبك",
        transliteration: "Raise your hands and make sincere personal dua from your heart",
        englishTranslation: "Stop the Talbiyah. Raise your hands, praise Allah, send salawat on the Prophet (صلى الله عليه وسلم), and make sincere personal dua in any words.",
        timing: "At first sight of Ka'bah",
        source: "Make your own sincere dua - no fixed wording"
      }
    ]
  },
  {
    id: "tawaf",
    title: "Tawaf - 7 Circuits Around the Ka'bah",
    titleArabic: "الطواف",
    description: "Circle the Ka'bah 7 times, making dua throughout",
    duas: [
      {
        id: "hajr-aswad",
        arabicText: "اللَّهُ أَكْبَرُ",
        transliteration: "Allāhu Akbar",
        englishTranslation: "Allah is the Greatest.",
        timing: "At each Black Stone (start of each circuit)",
        source: "Sahih al-Bukhari 1613"
      },
      {
        id: "yamani-corner",
        arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّار",
        transliteration: "Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā 'adhāban-nār",
        englishTranslation: "Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire.",
        timing: "Between Yamani Corner and Black Stone (every circuit)",
        source: "Qur'an 2:201 • Sunan Abi Dawud 1892"
      },
      {
        id: "tawaf-dhikr",
        arabicText: "سُبْحَانَ اللَّهُ • الْحَمْدُ لِلَّهِ • لَا إِلَهَ إِلَّا اللَّهُ • اللَّهُ أَكْبَرُ",
        transliteration: "SubhanAllah • Alhamdulillah • La ilaha illallah • Allahu Akbar",
        englishTranslation: "Glory be to Allah • All praise is due to Allah • There is no god but Allah • Allah is the Greatest",
        timing: "Throughout Tawaf",
        source: "No fixed dua for each round - recite what you wish"
      }
    ]
  },
  {
    id: "maqam-ibrahim",
    title: "Maqam Ibrahim & Prayer",
    titleArabic: "مقام إبراهيم",
    description: "Pray two Rak'ah behind the Station of Ibrahim",
    duas: [
      {
        id: "maqam-verse",
        arabicText: "وَاتَّخِذُوا مِن مَّقَامِ إِبْرَاهِيمَ مُصَلًّى",
        transliteration: "Wattakhidhū min maqāmi Ibrāhīma muṣallā",
        englishTranslation: "And take the standing-place of Ibrahim as a place of prayer.",
        timing: "Before the two Rak'ah",
        source: "Qur'an 2:125"
      },
      {
        id: "tawaf-prayer",
        arabicText: "الركعة الأولى: الفاتحة + سورة الكافرون\nالركعة الثانية: الفاتحة + سورة الإخلاص",
        transliteration: "1st Rak'ah: Al-Fatihah + Al-Kafirun\n2nd Rak'ah: Al-Fatihah + Al-Ikhlas",
        englishTranslation: "Pray two Rak'ah. First: Al-Fatihah and Surah Al-Kafirun. Second: Al-Fatihah and Surah Al-Ikhlas.",
        timing: "After Tawaf",
        source: "Sahih Muslim 1218"
      }
    ]
  },
  {
    id: "zamzam",
    title: "Zamzam Water",
    titleArabic: "ماء زمزم",
    description: "Drink Zamzam and make dua for what you need",
    duas: [
      {
        id: "zamzam-dua",
        arabicText: "استقبل القبلة واشرب وادع بما تشاء",
        transliteration: "Face the Qiblah, drink your fill, and make sincere personal dua",
        englishTranslation: "Drink your fill of Zamzam. Face the Qiblah and make sincere personal dua. Zamzam is for whatever it is drunk for.",
        timing: "After two Rak'ah",
        source: "Sunan Ibn Majah 3062"
      }
    ]
  },
  {
    id: "safa",
    title: "Safa - Beginning Sa'i",
    titleArabic: "الصفا",
    description: "Begin the Sa'i (walking between Safa and Marwah)",
    duas: [
      {
        id: "safa-verse",
        arabicText: "إِنَّ الصَّفَا وَالْمَرْوَةَ مِن شَعَائِرِ اللَّهِ",
        transliteration: "Innaṣ-Ṣafā wal-Marwata min sha'ā'irillāh",
        englishTranslation: "Indeed, Safa and Marwah are among the symbols of Allah.",
        timing: "As you approach Safa",
        source: "Qur'an 2:158"
      },
      {
        id: "safa-first",
        arabicText: "أَبْدَأُ بِمَا بَدَأَ اللَّهُ بِهِ",
        transliteration: "Abda'u bimā bada'allāhu bih",
        englishTranslation: "I begin with what Allah began with.",
        timing: "Once, only at the start",
        source: "Sahih Muslim 1218"
      }
    ]
  },
  {
    id: "safi-marwah-dhikr",
    title: "Dhikr on Safa & Marwah",
    titleArabic: "الذكر على الصفا والمروة",
    description: "Face the Ka'bah and recite the sacred remembrance",
    duas: [
      {
        id: "safa-marwah-takbir",
        arabicText: "اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ، أَنْجَزَ وَعْدَهُ، وَنَصَرَ عَبْدَهُ، وَهَزَمَ الْأَحْزَابَ وَحْدَهُ",
        transliteration: "Allāhu Akbar (×3). Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa huwa 'alā kulli shay'in qadīr. Lā ilāha illallāhu waḥdah, anjaza wa'dah, wa naṣara 'abdah, wa hazamal-aḥzāba waḥdah",
        englishTranslation: "Allah is the Greatest (3 times). There is no god but Allah alone, with no partner. His is the dominion and the praise, and He has power over all things. There is no god but Allah alone; He fulfilled His promise, helped His servant, and defeated the confederates alone.",
        timing: "Face Ka'bah and recite 3 times at each of Safa and Marwah",
        source: "Sahih Muslim 1218"
      }
    ]
  },
  {
    id: "sai",
    title: "Sa'i - 7 Trips Between Safa & Marwah",
    titleArabic: "السعي",
    description: "Walk/jog between Safa and Marwah 7 times",
    duas: [
      {
        id: "sai-walk",
        arabicText: "الذكر والقرآن والدعاء الشخصي",
        transliteration: "Dhikr, Qur'an recitation, or personal dua",
        englishTranslation: "While walking: dhikr, Qur'an, or personal dua. Men jog lightly between the green markers; women walk normally. No fixed dua per trip.",
        timing: "During all 7 trips",
        source: "No specific dua prescribed"
      }
    ]
  },
  {
    id: "halq-qasr",
    title: "Halq/Qasr - Hair Cutting",
    titleArabic: "الحلق أو القصر",
    description: "Complete your Umrah by cutting or trimming your hair",
    duas: [
      {
        id: "halq",
        arabicText: "للرجال: الحلق أو القصر\nللنساء: قص طول إصبع (2-3 سم)",
        transliteration: "Men: Halq (shave) or Qasr (trim). Women: Trim about 2-3 cm.",
        englishTranslation: "Men: Shave the whole head (more reward) or trim evenly all over. Women: Trim about a fingertip's length (2-3 cm) from the ends of hair.",
        timing: "After Sa'i (7th trip ends at Marwah)",
        source: "Sahih al-Bukhari 1727 • Sunan Abi Dawud 1985"
      }
    ]
  }
];

export const getUmrahStageById = (id: string): UmrahStage | undefined => {
  return umrahStages.find((stage) => stage.id === id);
};

export const getAllUmrahStages = (): UmrahStage[] => {
  return umrahStages;
};
