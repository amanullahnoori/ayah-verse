export interface Dua {
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
    source?: string; // e.g., "Quran 2:286", "Sahih Bukhari", "Sahih Muslim", etc.
    reference?: string; // Book and hadith number
  }[];
}

export const duasData: Dua[] = [
  {
    id: "prayer-after",
    title: "Azkar After Prayer",
    titleArabic: "الأذكار بعد الصلاة",
    description: "Beautiful supplications and remembrances to recite after completing your daily prayers",
    duas: [
      {
        id: "subhanallah-3",
        arabicText: "سُبْحَانَ اللَّهُ",
        transliteration: "Subhanallahu",
        englishTranslation: "Glory be to Allah",
        timing: "Recite 33 times",
        source: "Sahih Muslim",
        reference: "Narrated by Abu Huraira - Authentic hadith on post-prayer azkar"
      },
      {
        id: "alhamdulillah-3",
        arabicText: "الحمدُ لله",
        transliteration: "Alhamdulillahu",
        englishTranslation: "All praise is due to Allah",
        timing: "Recite 33 times",
        source: "Sahih Muslim",
        reference: "Narrated by Abu Huraira - Post-prayer remembrance"
      },
      {
        id: "allahu-akbar-3",
        arabicText: "اللهُ أكبر",
        transliteration: "Allahu Akbar",
        englishTranslation: "Allah is the Greatest",
        timing: "Recite 34 times",
        source: "Sahih Muslim",
        reference: "Narrated by Abu Huraira - Post-prayer dhikr"
      },
      {
        id: "shahada-prayer",
        arabicText: "لَا إِلَـٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
        transliteration: "Lā ilāha illallāhu waḥdahu lā sharīka lahu, lahu l-mulku wa lahu l-ḥamdu, wa huwa ʿalā kulli shay'in qadīr",
        englishTranslation: "There is no god but Allah alone, with no partner to Him. To Him belongs dominion and to Him belongs all praise, and He is over all things omnipotent.",
        timing: "Recite once",
        source: "Sahih Bukhari & Muslim",
        reference: "Post-prayer supplication - widely authenticated"
      },
      {
        id: "dua-forgiveness",
        arabicText: "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ",
        transliteration: "Allāhumma anta s-salāmu wa minka s-salāmu, tabārakta yā dhā l-jalāli wa-l-ikrām",
        englishTranslation: "O Allah, You are the source of peace and from You comes peace. Blessed are You, O Lord of majesty and honor.",
        timing: "Recite once after prayer",
        source: "Sahih Muslim",
        reference: "Narrated by Thawban - Authentic post-prayer dua"
      }
    ]
  },
  {
    id: "morning-evening",
    title: "Morning & Evening Azkar",
    titleArabic: "أذكار الصباح والمساء",
    description: "Powerful remembrances for protection and blessings throughout the day and night",
    duas: [
      {
        id: "morning-1",
        arabicText: "بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ",
        transliteration: "Bismillāhi alladhī lā yaḍurru maʿa smih shay'un fī l-arḍi wa lā fī s-samā'i wa huwa s-samīʿu l-ʿalīm",
        englishTranslation: "In the name of Allah, with whose name nothing on earth or in heaven can cause harm, and He is the All-Hearing, All-Knowing.",
        timing: "Morning & Evening - Recite 3 times",
        source: "Jami' At-Tirmidhi",
        reference: "Authentic (Sahih) - Protection dua"
      },
      {
        id: "morning-2",
        arabicText: "أَصْبَحْنَا عَلَى فِطْرَةِ الله وَعَلَى نِعَمِ الله وَعَلَى شَهَادَةِ أَن لَّا إِلَـٰهَ إِلَّا الله وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Aṣbaḥnā ʿalā fiṭrati llāhi wa ʿalā niʿami llāhi wa ʿalā shahādat anna lā ilāha illallāhu waḥdahu lā sharīka lah",
        englishTranslation: "We have reached the morning on the natural disposition of Allah, upon the blessings of Allah, and upon the testimony that there is no god but Allah alone, with no partner to Him.",
        timing: "Morning - Recite once",
        source: "Sunan Abu Dawud & Jami' At-Tirmidhi",
        reference: "Sahih - Morning supplication"
      },
      {
        id: "evening-1",
        arabicText: "أَمْسَيْنَا عَلَى فِطْرَةِ الله وَعَلَى نِعَمِ الله وَعَلَى شَهَادَةِ أَن لَّا إِلَـٰهَ إِلَّا الله وَحْدَهُ لَا شَرِيكَ لَهُ",
        transliteration: "Amsaynā ʿalā fiṭrati llāhi wa ʿalā niʿami llāhi wa ʿalā shahādat anna lā ilāha illallāhu waḥdahu lā sharīka lah",
        englishTranslation: "We have reached the evening on the natural disposition of Allah, upon the blessings of Allah, and upon the testimony that there is no god but Allah alone, with no partner to Him.",
        timing: "Evening - Recite once",
        source: "Sunan Abu Dawud & Jami' At-Tirmidhi",
        reference: "Sahih - Evening supplication"
      },
      {
        id: "protection",
        arabicText: "اللَّهُمَّ بِعِلْمِكَ الْغَيْبَ، وَبِقُدْرَتِكَ عَلَى الْخَلْقِ، أَحْيِنِي مَا كَانَتِ الْحَيَاةُ خَيْرًا لِي، وَتَوَفَّنِي إِذَا كَانَتِ الْوَفَاةُ خَيْرًا لِي",
        transliteration: "Allāhumma biʿilmika l-ghayba wa biqudrataika ʿala l-khalq aḥyinī mā kānat al-ḥayāt khayra lī wa tawaffani idhā kānat al-wafāt khayra lī",
        englishTranslation: "O Allah, by Your knowledge of the unseen and by Your power over creation, keep me alive as long as life is good for me, and cause me to die when death is good for me.",
        timing: "Anytime - Recite once",
        source: "Sunan An-Nasai",
        reference: "Sahih - General life dua"
      }
    ]
  },
  {
    id: "prayer-duas",
    title: "Supplications in Prayer",
    titleArabic: "الدعاء في الصلاة",
    description: "Authentic duas and supplications to recite during the prayer",
    duas: [
      {
        id: "dua-qunoot",
        arabicText: "اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ",
        transliteration: "Allāhumma innā nastaʿīnuka wa nastaghfiruka wa nu'minu bika wa natawakkalu ʿalayk",
        englishTranslation: "O Allah, we seek Your help and ask for Your forgiveness, and we believe in You and put our trust in You.",
        timing: "During Witr prayer",
        source: "Jami' At-Tirmidhi",
        reference: "Qunoot du'a - Authenticated"
      },
      {
        id: "dua-tahiyyat",
        arabicText: "التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ",
        transliteration: "At-tahiyyātu lillāhi wa-ṣalawātu wa-ṭṭayyibāt, as-salāmu ʿalayka ayyuha n-nabīyu wa raḥmatu -llāhi wa barakātuh",
        englishTranslation: "All greetings, prayers and good deeds are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings.",
        timing: "While sitting in prayer after Ruku",
        source: "Sahih Bukhari & Muslim",
        reference: "Tahiyyat (Tashahhud) - Narrated by Abdullah bin Mas'ud"
      },
      {
        id: "ruku-dua",
        arabicText: "سُبْحَانَ رَبِّيَ الْعَظِيمِ وَبِحَمْدِهِ",
        transliteration: "Subḥāna rabbiya l-ʿaẓīmi wa biḥamdi-h",
        englishTranslation: "Glory be to my Lord, the Most Great, and with His praise.",
        timing: "During Ruku (bowing)",
        source: "Quran 40:74 & Authenticated Hadith",
        reference: "Minimum 3 times in Ruku - Sunnah"
      },
      {
        id: "sujud-dua",
        arabicText: "سُبْحَانَ رَبِّيَ الْأَعْلَىٰ وَبِحَمْدِهِ",
        transliteration: "Subḥāna rabbiya l-aʿlā wa biḥamdi-h",
        englishTranslation: "Glory be to my Lord, the Most High, and with His praise.",
        timing: "During Sujud (prostration)",
        source: "Quran 87:1 & Authenticated Hadith",
        reference: "Minimum 3 times in Sajdah - Sunnah"
      }
    ]
  },
  {
    id: "sleep-azkar",
    title: "Azkar Before Sleep",
    titleArabic: "أذكار النوم",
    description: "Protective supplications to recite before going to sleep for spiritual protection",
    duas: [
      {
        id: "sleep-1",
        arabicText: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا",
        transliteration: "Biʾismika -llāhumma amūtu wa aḥyā",
        englishTranslation: "In Your name, O Allah, I die and I live.",
        timing: "Before sleep - Recite once",
        source: "Sahih Bukhari",
        reference: "Narrated by Hudhaifah - Sleep dua"
      },
      {
        id: "sleep-2",
        arabicText: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا",
        transliteration: "Allāhumma biʾismika amūtu wa aḥyā",
        englishTranslation: "O Allah, in Your name I die and live.",
        timing: "Before sleep - Recite once",
        source: "Sunan Abu Dawud",
        reference: "Variation of sleep supplication"
      },
      {
        id: "sleep-protection",
        arabicText: "اللَّهُمَّ إِنِّي أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ",
        transliteration: "Allāhumma innī aslamt nafsi ilayк, wa wajjahtu wajhī ilayк, wa fawwaḍt amrī ilayк, wa alhаjʾt ẓahrī ilayк, raghbatan wa rahbatan ilayk",
        englishTranslation: "O Allah, I have submitted myself to You, I have turned my face to You, I have entrusted my affairs to You, I have placed my reliance on You in hope and fear of You.",
        timing: "Before sleep - Recite once",
        source: "Quran 6:40 & Sahih Muslim",
        reference: "Sleep protection dua - Narrated by Ali"
      },
      {
        id: "sleep-angels",
        arabicText: "الحَمْدُ لِلَّهِ الَّذي أَطْعَمَنا وَسَقَاناَ، وَكَفَانا وَآوانا، فَكَم مِمَّن لَا كَافِيَ لَهُ، وَلَا مُؤْويَ",
        transliteration: "Al-ḥamdu lillāhi alladhī aṭʿamanaā wa saqānaā, wa kafānaā wa āwānaā, fakam mimman lā kāfiya lahu wa lā muʾwī",
        englishTranslation: "All praise is due to Allah who has fed us, given us drink, and clothed us. How many do not have anyone to suffice for them or give them shelter?",
        timing: "Before sleep - Recite once",
        source: "Sunan Abu Dawud & Jami' At-Tirmidhi",
        reference: "Sahih - Sleep gratitude dua"
      }
    ]
  },
  {
    id: "asma-ul-husna",
    title: "Allah's 99 Names",
    titleArabic: "الأسماء الحسنى",
    description: "The beautiful names and attributes of Allah that reflect His divine qualities. Meditate on these names to deepen your connection with the Divine.",
    duas: [
      { id: "1", arabicText: "الرَّحْمَٰن", transliteration: "Ar-Rahman", englishTranslation: "The Most Gracious, The Most Merciful" },
      { id: "2", arabicText: "الرَّحِيم", transliteration: "Ar-Rahim", englishTranslation: "The Most Merciful" },
      { id: "3", arabicText: "الْمَلِك", transliteration: "Al-Malik", englishTranslation: "The Sovereign, The King" },
      { id: "4", arabicText: "الْقُدُّوس", transliteration: "Al-Quddus", englishTranslation: "The Most Pure, The Holy" },
      { id: "5", arabicText: "السَّلَام", transliteration: "As-Salam", englishTranslation: "The Source of Peace" },
      { id: "6", arabicText: "الْمُؤْمِن", transliteration: "Al-Mu'min", englishTranslation: "The Guardian of Faith" },
      { id: "7", arabicText: "الْعَزِيز", transliteration: "Al-Aziz", englishTranslation: "The Mighty, The Invincible" },
      { id: "8", arabicText: "الْجَبَّار", transliteration: "Al-Jabbar", englishTranslation: "The Irresistible Force, The Compeller" },
      { id: "9", arabicText: "الْمُتَكَبِّر", transliteration: "Al-Mutakabbir", englishTranslation: "The Majestic, The Superb" },
      { id: "10", arabicText: "الْخَالِق", transliteration: "Al-Khaliq", englishTranslation: "The Creator" },
      { id: "11", arabicText: "الْبَارِئ", transliteration: "Al-Bari", englishTranslation: "The Maker of Order" },
      { id: "12", arabicText: "الْمُصَوِّر", transliteration: "Al-Musawwir", englishTranslation: "The Fashioner, The Shaper" },
      { id: "13", arabicText: "الْغَفَّار", transliteration: "Al-Ghaffar", englishTranslation: "The All-Forgiving" },
      { id: "14", arabicText: "الْقَهَّار", transliteration: "Al-Qahhar", englishTranslation: "The Subduer, The Overcomer" },
      { id: "15", arabicText: "الْوَهَّاب", transliteration: "Al-Wahhab", englishTranslation: "The Bestower of Gifts" },
      { id: "16", arabicText: "الرَّزَّاق", transliteration: "Ar-Razzaq", englishTranslation: "The Provider of Sustenance" },
      { id: "17", arabicText: "الْفَتَّاح", transliteration: "Al-Fattah", englishTranslation: "The Opener, The Judge" },
      { id: "18", arabicText: "الْعَلِيم", transliteration: "Al-Alim", englishTranslation: "The All-Knowing, The Omniscient" },
      { id: "19", arabicText: "الْقَابِض", transliteration: "Al-Qabid", englishTranslation: "The Restrainer, The Constrictor" },
      { id: "20", arabicText: "الْبَاسِط", transliteration: "Al-Basit", englishTranslation: "The Expander, The Extender" },
      { id: "21", arabicText: "الْخَافِض", transliteration: "Al-Khafid", englishTranslation: "The Abaser, The Reducer" },
      { id: "22", arabicText: "الرَّافِع", transliteration: "Ar-Rafi", englishTranslation: "The Exalter, The Raiser" },
      { id: "23", arabicText: "الْمُعِزّ", transliteration: "Al-Mu'izz", englishTranslation: "The Bestower of Honour" },
      { id: "24", arabicText: "الْمُذِل", transliteration: "Al-Mudhil", englishTranslation: "The Humiliator, The Disgraced" },
      { id: "25", arabicText: "السَّمِيع", transliteration: "As-Sami", englishTranslation: "The All-Hearing" },
      { id: "26", arabicText: "الْبَصِير", transliteration: "Al-Basir", englishTranslation: "The All-Seeing" },
      { id: "27", arabicText: "الْحَكَم", transliteration: "Al-Hakam", englishTranslation: "The Judge, The Arbiter" },
      { id: "28", arabicText: "الْعَدْل", transliteration: "Al-Adl", englishTranslation: "The Just, The Utterly Fair" },
      { id: "29", arabicText: "اللَّطِيف", transliteration: "Al-Latif", englishTranslation: "The Subtle, The Gracious" },
      { id: "30", arabicText: "الْخَبِير", transliteration: "Al-Khabir", englishTranslation: "The All-Aware" },
      { id: "31", arabicText: "الْحَلِيم", transliteration: "Al-Halim", englishTranslation: "The Clement, The Forbearing" },
      { id: "32", arabicText: "الْعَظِيم", transliteration: "Al-Azim", englishTranslation: "The Great, The Mighty" },
      { id: "33", arabicText: "الْغَفُور", transliteration: "Al-Ghafur", englishTranslation: "The All-Forgiving" },
      { id: "34", arabicText: "الشَّكُور", transliteration: "Ash-Shakur", englishTranslation: "The Appreciative, The Grateful" },
      { id: "35", arabicText: "الْعَلِيّ", transliteration: "Al-Ali", englishTranslation: "The Most High, The Exalted" },
      { id: "36", arabicText: "الْكَبِير", transliteration: "Al-Kabir", englishTranslation: "The Greatest, The Most Great" },
      { id: "37", arabicText: "الْحَفِيظ", transliteration: "Al-Hafiz", englishTranslation: "The Preserver, The Protector" },
      { id: "38", arabicText: "الْمُقِيت", transliteration: "Al-Muqit", englishTranslation: "The Maintainer, The Guardian" },
      { id: "39", arabicText: "الْحَسِيب", transliteration: "Al-Hasib", englishTranslation: "The Reckoner, The Account Keeper" },
      { id: "40", arabicText: "الْجَلِيل", transliteration: "Al-Jalil", englishTranslation: "The Majestic, The Mighty" },
      { id: "41", arabicText: "الْكَرِيم", transliteration: "Al-Karim", englishTranslation: "The Generous, The Noble" },
      { id: "42", arabicText: "الرَّقِيب", transliteration: "Ar-Raqib", englishTranslation: "The Watchful, The Vigilant" },
      { id: "43", arabicText: "الْمُجِيب", transliteration: "Al-Mujib", englishTranslation: "The Responsive, The Answerer" },
      { id: "44", arabicText: "الْوَاسِع", transliteration: "Al-Wasi", englishTranslation: "The All-Encompassing, The Vast" },
      { id: "45", arabicText: "الْحَكِيم", transliteration: "Al-Hakim", englishTranslation: "The Wise, The All-Wise" },
      { id: "46", arabicText: "الْوَدُود", transliteration: "Al-Wadud", englishTranslation: "The Loving, The Affectionate" },
      { id: "47", arabicText: "الْمَاجِد", transliteration: "Al-Majid", englishTranslation: "The Glorious, The Magnificent" },
      { id: "48", arabicText: "الْبَاعِث", transliteration: "Al-Baes", englishTranslation: "The Resurrector, The Raiser" },
      { id: "49", arabicText: "الشَّهِيد", transliteration: "Ash-Shahid", englishTranslation: "The Witness" },
      { id: "50", arabicText: "الْحَقّ", transliteration: "Al-Haqq", englishTranslation: "The Truth, The Real" },
      { id: "51", arabicText: "الْوَكِيل", transliteration: "Al-Wakil", englishTranslation: "The Trustee, The Ultimate Disposer" },
      { id: "52", arabicText: "الْقَوِيّ", transliteration: "Al-Qawi", englishTranslation: "The Strong, The Powerful" },
      { id: "53", arabicText: "الْمَتِين", transliteration: "Al-Matin", englishTranslation: "The Firm, The Unassailable" },
      { id: "54", arabicText: "الْوَلِيّ", transliteration: "Al-Wali", englishTranslation: "The Protector, The Ally" },
      { id: "55", arabicText: "الْحَمِيد", transliteration: "Al-Hamid", englishTranslation: "The Praiseworthy, The All-Lauded" },
      { id: "56", arabicText: "الْمُحْصِي", transliteration: "Al-Muhsi", englishTranslation: "The Accountant, The Numberer" },
      { id: "57", arabicText: "الْمُبْدِئ", transliteration: "Al-Mubdi", englishTranslation: "The Originator, The Initiator" },
      { id: "58", arabicText: "الْمُعِيد", transliteration: "Al-Muíd", englishTranslation: "The Restorer, The Reproducer" },
      { id: "59", arabicText: "الْمُحْيِي", transliteration: "Al-Muhyi", englishTranslation: "The Giver of Life" },
      { id: "60", arabicText: "الْمُمِيت", transliteration: "Al-Mumit", englishTranslation: "The Bringer of Death" },
      { id: "61", arabicText: "الْحَيّ", transliteration: "Al-Hayy", englishTranslation: "The Ever-Living, The Always Living" },
      { id: "62", arabicText: "الْقَيُّوم", transliteration: "Al-Qayyum", englishTranslation: "The Self-Sustaining, The Self-Existent" },
      { id: "63", arabicText: "الْوَاجِد", transliteration: "Al-Wajid", englishTranslation: "The Finder, The Wealthy" },
      { id: "64", arabicText: "الْمَاجِد", transliteration: "Al-Majid", englishTranslation: "The Illustrious, The Glorious" },
      { id: "65", arabicText: "الْوَاحِد", transliteration: "Al-Wahid", englishTranslation: "The Unique, The Only One" },
      { id: "66", arabicText: "الصَّمَد", transliteration: "As-Samad", englishTranslation: "The Eternal, The Absolute" },
      { id: "67", arabicText: "الْقَادِر", transliteration: "Al-Qadir", englishTranslation: "The Capable, The All-Powerful" },
      { id: "68", arabicText: "الْمُقْتَدِر", transliteration: "Al-Muqtadir", englishTranslation: "The All-Mighty, The Authoritative" },
      { id: "69", arabicText: "الْمُقَدِّم", transliteration: "Al-Muqaddim", englishTranslation: "The Expediter, The Promoter" },
      { id: "70", arabicText: "الْمُؤَخِّر", transliteration: "Al-Mu'akhkhir", englishTranslation: "The Delayer, The Retarder" },
      { id: "71", arabicText: "الأَوَّل", transliteration: "Al-Awwal", englishTranslation: "The First" },
      { id: "72", arabicText: "الآخِر", transliteration: "Al-Akhir", englishTranslation: "The Last" },
      { id: "73", arabicText: "الظَّاهِر", transliteration: "Az-Zahir", englishTranslation: "The Manifest, The Obvious" },
      { id: "74", arabicText: "الْبَاطِن", transliteration: "Al-Batin", englishTranslation: "The Hidden, The Innermost" },
      { id: "75", arabicText: "الْوَالِي", transliteration: "Al-Wali", englishTranslation: "The Governor, The Master" },
      { id: "76", arabicText: "الْمُتَعَالِي", transliteration: "Al-Muta'ali", englishTranslation: "The Exalted, The Supremely Great" },
      { id: "77", arabicText: "الْبَرّ", transliteration: "Al-Barr", englishTranslation: "The Doer of Good, The Beneficent" },
      { id: "78", arabicText: "التَّوَّاب", transliteration: "At-Tawwab", englishTranslation: "The Pardoner, The Ever-Returning" },
      { id: "79", arabicText: "الْمُنْتَقِم", transliteration: "Al-Muntaqim", englishTranslation: "The Avenger, The Punisher" },
      { id: "80", arabicText: "العَفُوّ", transliteration: "Al-Afu", englishTranslation: "The Pardoner, The Forgiver" },
      { id: "81", arabicText: "الرَّؤُوف", transliteration: "Ar-Rauf", englishTranslation: "The Clement, The Compassionate" },
      { id: "82", arabicText: "مَالِك الْمُلْك", transliteration: "Malik-ul-Mulk", englishTranslation: "The Owner of All Sovereignty" },
      { id: "83", arabicText: "ذُو الْجَلَال وَالإِكْرَام", transliteration: "Dhu-l-Jalal wa-l-Ikram", englishTranslation: "The Lord of Majesty and Honour" },
      { id: "84", arabicText: "الْمُقْسِط", transliteration: "Al-Muqsit", englishTranslation: "The Just, The Equitable" },
      { id: "85", arabicText: "الْجَمِيع", transliteration: "Al-Jami", englishTranslation: "The Unifier, The Gatherer" },
      { id: "86", arabicText: "الْغَنِيّ", transliteration: "Al-Ghani", englishTranslation: "The Rich, The Self-Sufficient" },
      { id: "87", arabicText: "الْمُغْنِي", transliteration: "Al-Mughni", englishTranslation: "The Enricher" },
      { id: "88", arabicText: "الْمَانِع", transliteration: "Al-Mani", englishTranslation: "The Preventer, The Withholder" },
      { id: "89", arabicText: "الضَّارّ", transliteration: "Ad-Darr", englishTranslation: "The Harmful, The Distresser" },
      { id: "90", arabicText: "النَّافِع", transliteration: "An-Nafi", englishTranslation: "The Beneficial, The Profiter" },
      { id: "91", arabicText: "النُّور", transliteration: "An-Nur", englishTranslation: "The Light" },
      { id: "92", arabicText: "الْهَادِي", transliteration: "Al-Hadi", englishTranslation: "The Guide, The Guider" },
      { id: "93", arabicText: "بَدِيع", transliteration: "Badi", englishTranslation: "The Originator, The Innovator" },
      { id: "94", arabicText: "الْبَاقِي", transliteration: "Al-Baqi", englishTranslation: "The Eternal, The Everlasting" },
      { id: "95", arabicText: "الْوَارِث", transliteration: "Al-Warith", englishTranslation: "The Inheritor, The Ultimate Heir" },
      { id: "96", arabicText: "الرَّشِيد", transliteration: "Ar-Rashid", englishTranslation: "The Guide, The Rightly-Guided" },
      { id: "97", arabicText: "الصَّبُور", transliteration: "As-Sabur", englishTranslation: "The Patient, The All-Patient" },
      { id: "98", arabicText: "التَّقِيّ", transliteration: "At-Taqi", englishTranslation: "The Pious" },
      { id: "99", arabicText: "التَّوَكُّل", transliteration: "At-Tawakkul", englishTranslation: "The Worthy of Trust" }
    ]
  },
  {
    id: "personal-duas",
    title: "Personal Duas",
    titleArabic: "الدعاء الشخصي",
    description: "Sincere personal supplications for various needs and situations throughout your life",
    duas: [
      {
        id: "forgiveness",
        arabicText: "اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ",
        transliteration: "Allāhumma innī ẓalamtu nafsī ẓulman kathīran, wa lā yaghfirudhdhunūba illā anta, faghfir lī maghfiratan min 'indika warḥamnī, innaka antal-Ghafūrur-Raḥīm",
        englishTranslation: "O Allah, I have wronged myself greatly, and none forgives sins but You. So grant me forgiveness from You and have mercy on me — indeed You are the Most Forgiving, Most Merciful.",
        source: "Sahih al-Bukhari",
        reference: "834 • Sahih Muslim 2705"
      },
      {
        id: "guidance",
        arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَىٰ وَالتُّقَىٰ وَالْعَفَافَ وَالْغِنَىٰ",
        transliteration: "Allāhumma innī as'alukal-hudā wat-tuqā wal-'afāfa wal-ghinā",
        englishTranslation: "O Allah, I ask You for guidance, piety, chastity and self-sufficiency.",
        source: "Sahih Muslim",
        reference: "2721"
      },
      {
        id: "deen-dunya-akhirah",
        arabicText: "اللَّهُمَّ أَصْلِحْ لِي دِينِيَ الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَاي الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي",
        transliteration: "Allāhumma aṣliḥ lī dīniya-lladhī huwa 'iṣmatu amrī, wa aṣliḥ lī dunyāya-llatī fīhā ma'āshī, wa aṣliḥ lī ākhiratiya-llatī fīhā ma'ādī",
        englishTranslation: "O Allah, set right my religion which is the safeguard of my affairs; set right my world in which is my living; and set right my Hereafter to which is my return.",
        source: "Sahih Muslim",
        reference: "2720"
      },
      {
        id: "heart-steadfast",
        arabicText: "يَا مُقَلِّبَ الْقُلُوبِ، ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ",
        transliteration: "Yā Muqallibal-qulūb, thabbit qalbī 'alā dīnik",
        englishTranslation: "O Turner of the hearts, keep my heart firm upon Your religion.",
        source: "Jami' at-Tirmidhi",
        reference: "2140 (sound)"
      },
      {
        id: "paradise-refuge",
        arabicText: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ، وَأَعُوذُ بِكَ مِنَ النَّارِ",
        transliteration: "Allāhumma innī as'alukal-Jannah, wa a'ūdhu bika minan-Nār",
        englishTranslation: "O Allah, I ask You for Paradise and seek refuge in You from the Fire.",
        source: "Sunan Abi Dawud",
        reference: "792 (sound)"
      },
      {
        id: "parents",
        arabicText: "رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا",
        transliteration: "Rabbir-ḥamhumā kamā rabbayānī ṣaghīrā",
        englishTranslation: "My Lord, have mercy on them both as they raised me when I was small.",
        source: "Qur'an",
        reference: "17:24"
      },
      {
        id: "spouse-children",
        arabicText: "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ، وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا",
        transliteration: "Rabbanā hab lanā min azwājinā wa dhurriyyātinā qurrata a'yun, waj'alnā lil-muttaqīna imāmā",
        englishTranslation: "Our Lord, grant us from our spouses and offspring comfort to our eyes, and make us leaders for the righteous.",
        source: "Qur'an",
        reference: "25:74"
      },
      {
        id: "good-in-both-worlds",
        arabicText: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّار",
        transliteration: "Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā 'adhāban-nār",
        englishTranslation: "Our Lord, give us good in this world and good in the Hereafter, and save us from the punishment of the Fire.",
        source: "Qur'an",
        reference: "2:201"
      },
      {
        id: "firmness-compassion",
        arabicText: "رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا وَهَبْ لَنَا مِنْ لَدُنْكَ رَحْمَةً إِنَّكَ أَنْتَ الْوَهَّابُ",
        transliteration: "Rabbanā lā tuzigh qulūbanā ba'da idh hadaytanā wa hab lanā min ladunka raḥmatan innaka antal-Wahhāb",
        englishTranslation: "Our Lord, let not our hearts deviate after You have guided us, and grant us mercy from You. Indeed, You are the Bestower.",
        source: "Qur'an",
        reference: "3:8"
      },
      {
        id: "trust-reliance",
        arabicText: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        transliteration: "Ḥasbunallāhu wa ni'mal-wakīl",
        englishTranslation: "Allah is sufficient for us, and He is the best Trustee.",
        source: "Qur'an",
        reference: "3:173"
      }
    ]
  }
];

export const getDuaById = (id: string): Dua | undefined => {
  return duasData.find((dua) => dua.id === id);
};

export const getAllDuas = (): Dua[] => {
  return duasData;
};
