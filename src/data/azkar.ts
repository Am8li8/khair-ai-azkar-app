
export interface Zikr {
  id: number;
  text: string;
  textEn: string; // النص الإنجليزي أو الترجمة
  count: number;
  source: string;
  sourceEn: string;
}

export interface AzkarCategory {
  id: string;
  title: string;
  titleEn: string;
  azkar: Zikr[];
}

export const morningAzkar: AzkarCategory = {
  id: 'morning',
  title: 'أذكار الصباح',
  titleEn: 'Morning Azkar',
  azkar: [
    {
      id: 1,
      text: 'أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
      textEn: 'I seek refuge in Allah from Satan, the rejected one.\nAllah! There is no god but He, the Living, the Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what is before or after or behind them. Nor shall they compass any of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them for He is the Most High, the Supreme.',
      count: 1,
      source: 'البقرة: 255، فضلها: «من قالها حين يصبح أجير من الجن حتى يمسي، ومن قالها حين يمسي أجير من الجن حتى يصبح» [صححه الألباني].',
      sourceEn: 'Al-Baqarah: 255, Its virtue: "Whoever recites it in the morning will be protected from the jinn until evening, and whoever recites it in the evening will be protected from the jinn until morning" [Authenticated by Al-Albani].'
    },
    {
      id: 2,
      text: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ.',
      textEn: 'In the name of Allah, the Most Gracious, the Most Merciful.\nSay: He is Allah, the One; Allah, the Eternal, Absolute; He begets not, nor is He begotten; And there is none like unto Him.',
      count: 3,
      source: 'سورة الإخلاص، فضلها: «من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء» [رواه أبو داود والترمذي].',
      sourceEn: 'Surah Al-Ikhlas, Its virtue: "Whoever recites it three times in the morning and evening, it will suffice him from everything" [Narrated by Abu Dawud and Tirmidhi].'
    },
    {
      id: 3,
      text: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
      textEn: 'In the name of Allah, the Most Gracious, the Most Merciful.\nSay: I seek refuge with the Lord of the Dawn, from the mischief of created things; from the mischief of darkness as it spreads; from the mischief of those who blow on knots; and from the mischief of the envious one as he practices envy.',
      count: 3,
      source: 'سورة الفلق، فضلها: «من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء» [رواه أبو داود والترمذي].',
      sourceEn: 'Surah Al-Falaq, Its virtue: "Whoever recites it three times in the morning and evening, it will suffice him from everything" [Narrated by Abu Dawud and Tirmidhi].'
    },
    {
      id: 4,
      text: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَ النَّاسِ.',
      textEn: 'In the name of Allah, the Most Gracious, the Most Merciful.\nSay: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the mischief of the retreating whisperer, who whispers into the hearts of mankind, among jinn and among mankind.',
      count: 3,
      source: 'سورة الناس، فضلها: «من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء» [رواه أبو داود والترمذي].',
      sourceEn: 'Surah An-Nas, Its virtue: "Whoever recites it three times in the morning and evening, it will suffice him from everything" [Narrated by Abu Dawud and Tirmidhi].'
    },
    {
      id: 5,
      text: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذَا الْيَوْمِ وَخَيْرَ مَا بَعْدَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذَا الْيَوْمِ وَشَرِّ مَا بَعْدَهُ، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
      textEn: 'We have reached the morning and the kingdom belongs to Allah. Praise be to Allah. There is no god but Allah alone, Who has no partner. To Him belongs the dominion, to Him belongs all praise, and He has power over all things. My Lord, I ask You for the good of this day and the good of what follows it, and I seek refuge in You from the evil of this day and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from the torment of Hell-fire and the punishment of the grave.',
      count: 1,
      source: 'رواه مسلم.',
      sourceEn: 'Narrated by Muslim.'
    }
  ]
};

export const eveningAzkar: AzkarCategory = {
  id: 'evening',
  title: 'أذكار المساء',
  titleEn: 'Evening Azkar',
  azkar: [
    {
      id: 1,
      text: 'أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ.',
      textEn: 'I seek refuge in Allah from Satan, the rejected one.\nAllah! There is no god but He, the Living, the Self-subsisting, Eternal. No slumber can seize Him nor sleep. His are all things in the heavens and on earth. Who is there can intercede in His presence except as He permits? He knows what is before or after or behind them. Nor shall they compass any of His knowledge except as He wills. His Throne extends over the heavens and the earth, and He feels no fatigue in guarding and preserving them for He is the Most High, the Supreme.',
      count: 1,
      source: 'البقرة: 255، فضلها: «من قالها حين يصبح أجير من الجن حتى يمسي، ومن قالها حين يمسي أجير من الجن حتى يصبح» [صححه الألباني].',
      sourceEn: 'Al-Baqarah: 255, Its virtue: "Whoever recites it in the morning will be protected from the jinn until evening, and whoever recites it in the evening will be protected from the jinn until morning" [Authenticated by Al-Albani].'
    },
    {
      id: 2,
      text: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ.',
      textEn: 'In the name of Allah, the Most Gracious, the Most Merciful.\nSay: He is Allah, the One; Allah, the Eternal, Absolute; He begets not, nor is He begotten; And there is none like unto Him.',
      count: 3,
      source: 'سورة الإخلاص، فضلها: «من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء» [رواه أبو داود والترمذي].',
      sourceEn: 'Surah Al-Ikhlas, Its virtue: "Whoever recites it three times in the morning and evening, it will suffice him from everything" [Narrated by Abu Dawud and Tirmidhi].'
    },
    {
      id: 3,
      text: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِن شَرِّ مَا خَلَقَ ۝ وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.',
      textEn: 'In the name of Allah, the Most Gracious, the Most Merciful.\nSay: I seek refuge with the Lord of the Dawn, from the mischief of created things; from the mischief of darkness as it spreads; from the mischief of those who blow on knots; and from the mischief of the envious one as he practices envy.',
      count: 3,
      source: 'سورة الفلق، فضلها: «من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء» [رواه أبو داود والترمذي].',
      sourceEn: 'Surah Al-Falaq, Its virtue: "Whoever recites it three times in the morning and evening, it will suffice him from everything" [Narrated by Abu Dawud and Tirmidhi].'
    },
    {
      id: 4,
      text: 'بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَهِ النَّاسِ ۝ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَ النَّاسِ.',
      textEn: 'In the name of Allah, the Most Gracious, the Most Merciful.\nSay: I seek refuge with the Lord of mankind, the King of mankind, the God of mankind, from the mischief of the retreating whisperer, who whispers into the hearts of mankind, among jinn and among mankind.',
      count: 3,
      source: 'سورة الناس، فضلها: «من قالها حين يصبح وحين يمسي ثلاث مرات كفته من كل شيء» [رواه أبو داود والترمذي].',
      sourceEn: 'Surah An-Nas, Its virtue: "Whoever recites it three times in the morning and evening, it will suffice him from everything" [Narrated by Abu Dawud and Tirmidhi].'
    },
    {
      id: 5,
      text: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، رَبِّ أَسْأَلُكَ خَيْرَ مَا فِي هَذِهِ اللَّيْلَةِ وَخَيْرَ مَا بَعْدَهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِي هَذِهِ اللَّيْلةِ وَشَرِّ مَا بَعْدَهَا، رَبِّ أَعُوذُ بِكَ مِنَ الْكَسَلِ وَسُوءِ الْكِبَرِ، رَبِّ أَعُوذُ بِكَ مِنْ عَذَابٍ فِي النَّارِ وَعَذَابٍ فِي الْقَبْرِ.',
      textEn: 'We have reached the evening and the kingdom belongs to Allah. Praise be to Allah. There is no god but Allah alone, Who has no partner. To Him belongs the dominion, to Him belongs all praise, and He has power over all things. My Lord, I ask You for the good of this night and the good of what follows it, and I seek refuge in You from the evil of this night and the evil of what follows it. My Lord, I seek refuge in You from laziness and the misery of old age. My Lord, I seek refuge in You from the torment of Hell-fire and the punishment of the grave.',
      count: 1,
      source: 'رواه مسلم.',
      sourceEn: 'Narrated by Muslim.'
    }
  ]
};

export const sleepAzkar: AzkarCategory = {
  id: 'sleep',
  title: 'أذكار النوم',
  titleEn: 'Sleep Azkar',
  azkar: [
    {
      id: 1,
      text: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      textEn: 'In Your name, O Allah, I die and I live.',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    },
    {
      id: 2,
      text: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ',
      textEn: 'O Allah, protect me from Your punishment on the Day when You resurrect Your servants.',
      count: 3,
      source: 'رواه أبو داود وصححه الألباني.',
      sourceEn: 'Narrated by Abu Dawud and authenticated by Al-Albani.'
    },
    {
      id: 3,
      text: 'اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لَا مَلْجَأَ وَلَا مَنْجَا مِنْكَ إِلَّا إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ',
      textEn: 'O Allah, I submit my soul to You, and I entrust my affair to You, and I turn my face to You, and I totally rely on You, in hope and fear of You. There is no refuge nor safe haven from You except with You. I believe in Your Book which You have revealed, and in Your Prophet whom You have sent.',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    }
  ]
};

export const wakeupAzkar: AzkarCategory = {
  id: 'wakeup',
  title: 'أذكار الاستيقاظ',
  titleEn: 'Waking Up Azkar',
  azkar: [
    {
      id: 1,
      text: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      textEn: 'Praise be to Allah Who gives us life after He has caused us to die and to Him is the resurrection.',
      count: 1,
      source: 'رواه البخاري.',
      sourceEn: 'Narrated by Bukhari.'
    },
    {
      id: 2,
      text: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي',
      textEn: "There is no god but Allah alone, Who has no partner, His is the dominion and to Him belongs all praise, and He is able to do all things. Glory is to Allah. Praise is to Allah. There is no god but Allah. Allah is the Most Great. There is no might and no power except by Allah's leave, the Exalted, the Mighty. My Lord, forgive me.",
      count: 1,
      source: 'رواه البخاري.',
      sourceEn: 'Narrated by Bukhari.'
    }
  ]
};

export const prayerOpeningAzkar: AzkarCategory = {
  id: 'prayer-opening',
  title: 'دعاء الاستفتاح للصلاة',
  titleEn: 'Prayer Opening Supplication',
  azkar: [
    {
      id: 1,
      text: 'اللَّهُمَّ بَاعِدْ بَيْنِي وَبَيْنَ خَطَايَايَ كَمَا بَاعَدْتَ بَيْنَ الْمَشْرِقِ وَالْمَغْرِبِ، اللَّهُمَّ نَقِّنِي مِنْ خَطَايَايَ كَمَا يُنَقَّى الثَّوْبُ الْأَبْيَضُ مِنَ الدَّنَسِ، اللَّهُمَّ اغْسِلْنِي مِنْ خَطَايَايَ بِالثَّلْجِ وَالْمَاءِ وَالْبَرَدِ',
      textEn: 'O Allah, distance me from my sins as You have distanced the East from the West. O Allah, cleanse me of my sins as a white garment is cleansed from dirt. O Allah, wash away my sins with snow, water, and hail.',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    },
    {
      id: 2,
      text: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
      textEn: 'Glory is to You, O Allah, and praise. Blessed is Your name, and exalted is Your majesty. There is no god but You.',
      count: 1,
      source: 'رواه أبو داود والترمذي وصححه الألباني.',
      sourceEn: 'Narrated by Abu Dawud and Tirmidhi, authenticated by Al-Albani.'
    }
  ]
};

export const afterTashahhudAzkar: AzkarCategory = {
  id: 'after-tashahhud',
  title: 'أذكار بعد التشهد',
  titleEn: 'After Tashahhud Azkar',
  azkar: [
    {
      id: 1,
      text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ جَهَنَّمَ، وَمِنْ عَذَابِ الْقَبْرِ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
      textEn: 'O Allah, I seek refuge in You from the punishment of Hell, from the punishment of the grave, from the trials of living and dying, and from the evil of the trial of the False Messiah.',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    },
    {
      id: 2,
      text: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي، إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
      textEn: 'O Allah, I have greatly wronged myself, and none forgives sins but You. So grant me forgiveness from You and have mercy on me. Surely, You are the Most Forgiving, the Most Merciful.',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    }
  ]
};

export const rukuSujudAzkar: AzkarCategory = {
  id: 'ruku-sujud',
  title: 'أذكار الركوع والسجود',
  titleEn: 'Ruku and Sujud Azkar',
  azkar: [
    {
      id: 1,
      text: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      textEn: 'Glory be to my Lord, the Magnificent.',
      count: 3,
      source: 'رواه أبو داود والترمذي.',
      sourceEn: 'Narrated by Abu Dawud and Tirmidhi.'
    },
    {
      id: 2,
      text: 'سُبْحَانَكَ اللَّهُمَّ رَبَّنَا وَبِحَمْدِكَ، اللَّهُمَّ اغْفِرْ لِي',
      textEn: 'Glory be to You, O Allah, our Lord, and praise be to You. O Allah, forgive me.',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    },
    {
      id: 3,
      text: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
      textEn: 'Glory be to my Lord, the Most High.',
      count: 3,
      source: 'رواه أبو داود والترمذي.',
      sourceEn: 'Narrated by Abu Dawud and Tirmidhi.'
    }
  ]
};

export const azanAzkar: AzkarCategory = {
  id: 'azan',
  title: 'أذكار سماع الأذان',
  titleEn: 'Azan Azkar',
  azkar: [
    {
      id: 1,
      text: 'يقول مثل ما يقول المؤذن إلا في "حي على الصلاة" و"حي على الفلاح" فيقول: "لا حول ولا قوة إلا بالله"',
      textEn: 'Repeat what the muezzin says, except for "Come to prayer" and "Come to success" where you say: "There is no might and no power except by Allah".',
      count: 1,
      source: 'رواه البخاري ومسلم.',
      sourceEn: 'Narrated by Bukhari and Muslim.'
    },
    {
      id: 2,
      text: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
      textEn: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and favor, and raise him to the praiseworthy station You have promised him.',
      count: 1,
      source: 'رواه البخاري.',
      sourceEn: 'Narrated by Bukhari.'
    }
  ]
};

export const betweenSujudAzkar: AzkarCategory = {
  id: 'between-sujud',
  title: 'أذكار الجلسة بين السجدتين',
  titleEn: 'Between Sujud Azkar',
  azkar: [
    {
      id: 1,
      text: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
      textEn: 'My Lord, forgive me. My Lord, forgive me.',
      count: 1,
      source: 'رواه أبو داود وابن ماجه.',
      sourceEn: 'Narrated by Abu Dawud and Ibn Majah.'
    },
    {
      id: 2,
      text: 'اللَّهُمَّ اغْفِرْ لِي، وَارْحَمْنِي، وَاهْدِنِي، وَاجْبُرْنِي، وَعَافِنِي، وَارْزُقْنِي، وَارْفَعْنِي',
      textEn: 'O Allah, forgive me, have mercy on me, guide me, support me, protect me, provide for me, and elevate me.',
      count: 1,
      source: 'رواه أبو داود والترمذي وابن ماجه.',
      sourceEn: 'Narrated by Abu Dawud, Tirmidhi, and Ibn Majah.'
    }
  ]
};

export const mosqueAzkar: AzkarCategory = {
  id: 'mosque',
  title: 'أذكار دخول المسجد والخروج منه',
  titleEn: 'Mosque Entry and Exit Azkar',
  azkar: [
    {
      id: 1,
      text: 'بِسْمِ اللهِ، وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
      textEn: 'In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, open for me the gates of Your mercy.',
      count: 1,
      source: 'رواه مسلم.',
      sourceEn: 'Narrated by Muslim.'
    },
    {
      id: 2,
      text: 'بِسْمِ اللهِ، وَالصَّلاَةُ وَالسَّلاَمُ عَلَى رَسُولِ اللهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
      textEn: 'In the name of Allah, and peace and blessings be upon the Messenger of Allah. O Allah, I ask You for Your favor.',
      count: 1,
      source: 'رواه مسلم.',
      sourceEn: 'Narrated by Muslim.'
    }
  ]
};

export const wuduAzkar: AzkarCategory = {
  id: 'wudu',
  title: 'أذكار الوضوء',
  titleEn: 'Wudu Azkar',
  azkar: [
    {
      id: 1,
      text: 'بِسْمِ اللَّهِ',
      textEn: 'In the name of Allah.',
      count: 1,
      source: 'رواه أبو داود وابن ماجه.',
      sourceEn: 'Narrated by Abu Dawud and Ibn Majah.'
    },
    {
      id: 2,
      text: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ. اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
      textEn: 'I bear witness that there is no god but Allah alone, with no partner, and I bear witness that Muhammad is His servant and Messenger. O Allah, make me among those who turn to You in repentance and make me among those who purify themselves.',
      count: 1,
      source: 'رواه الترمذي.',
      sourceEn: 'Narrated by Tirmidhi.'
    }
  ]
};

export const afterFoodAzkar: AzkarCategory = {
  id: 'after-food',
  title: 'الدعاء بعد الطعام والشراب',
  titleEn: 'After Food and Drink Supplication',
  azkar: [
    {
      id: 1,
      text: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ، مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      textEn: 'Praise be to Allah who has fed me this and provided it for me without any might or power on my part.',
      count: 1,
      source: 'رواه أبو داود والترمذي.',
      sourceEn: 'Narrated by Abu Dawud and Tirmidhi.'
    },
    {
      id: 2,
      text: 'الْحَمْدُ لِلَّهِ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ، غَيْرَ مَكْفِيٍّ وَلَا مُوَدَّعٍ، وَلَا مُسْتَغْنًى عَنْهُ رَبَّنَا',
      textEn: 'Praise be to Allah, much good and blessed praise. Our Lord is not in need of anyone, and we cannot do without Him.',
      count: 1,
      source: 'رواه البخاري.',
      sourceEn: 'Narrated by Bukhari.'
    }
  ]
};

export const beforeFoodAzkar: AzkarCategory = {
  id: 'before-food',
  title: 'الدعاء قبل الطعام والشراب',
  titleEn: 'Before Food and Drink Supplication',
  azkar: [
    {
      id: 1,
      text: 'بِسْمِ اللَّهِ',
      textEn: 'In the name of Allah.',
      count: 1,
      source: 'رواه أبو داود والترمذي.',
      sourceEn: 'Narrated by Abu Dawud and Tirmidhi.'
    },
    {
      id: 2,
      text: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا، وَقِنَا عَذَابَ النَّارِ. بِسْمِ اللَّهِ',
      textEn: 'O Allah, bless us in what You have provided for us and protect us from the punishment of the Fire. In the name of Allah.',
      count: 1,
      source: 'رواه ابن ماجه.',
      sourceEn: 'Narrated by Ibn Majah.'
    }
  ]
};

export const travelAzkar: AzkarCategory = {
  id: 'travel',
  title: 'دعاء السفر',
  titleEn: 'Travel Supplication',
  azkar: [
    {
      id: 1,
      text: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَذَا الْبِرَّ وَالتَّقْوَى، وَمِنَ الْعَمَلِ مَا تَرْضَى، اللَّهُمَّ هَوِّنْ عَلَيْنَا سَفَرَنَا هَذَا، وَاطْوِ عَنَّا بُعْدَهُ، اللَّهُمَّ أَنْتَ الصَّاحِبُ فِي السَّفَرِ، وَالْخَلِيفَةُ فِي الْأَهْلِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ وَعْثَاءِ السَّفَرِ، وَكَآبَةِ الْمَنْظَرِ، وَسُوءِ الْمُنْقَلَبِ فِي الْمَالِ وَالْأَهْلِ',
      textEn: "Allah is the Greatest, Allah is the Greatest, Allah is the Greatest. Glory is to Him Who has provided this for us though we could never have had it by our efforts. Surely, unto our Lord we are returning. O Allah, we ask You on this our journey for goodness and piety, and for works that are pleasing to You. O Allah, lighten this journey for us and make its distance easy for us. O Allah, You are our Companion during the journey and the Guardian of our family. O Allah, I seek refuge in You from the hardships of travel, from having a change of hearts and from being regarded with an evil eye regarding our wealth and family.",
      count: 1,
      source: 'رواه مسلم.',
      sourceEn: 'Narrated by Muslim.'
    }
  ]
};

// Export the array of all Azkar categories
export const allAzkarCategories: AzkarCategory[] = [
  morningAzkar,
  eveningAzkar,
  sleepAzkar,
  wakeupAzkar,
  prayerOpeningAzkar,
  afterTashahhudAzkar,
  rukuSujudAzkar,
  azanAzkar,
  betweenSujudAzkar,
  mosqueAzkar,
  wuduAzkar,
  afterFoodAzkar,
  beforeFoodAzkar,
  travelAzkar
];

// Add defaultTasbihOptions for the Tasbih component
export interface TasbihOption {
  id: string;
  text: string;
  textEn: string;
  count: number;
}

export const defaultTasbihOptions: TasbihOption[] = [
  {
    id: 'subhanAllah',
    text: 'سبحان الله',
    textEn: 'Glory be to Allah',
    count: 33
  },
  {
    id: 'alhamdulillah',
    text: 'الحمد لله',
    textEn: 'Praise be to Allah',
    count: 33
  },
  {
    id: 'allahuAkbar',
    text: 'الله أكبر',
    textEn: 'Allah is the Greatest',
    count: 34
  },
  {
    id: 'lailahaillallah',
    text: 'لا إله إلا الله',
    textEn: 'There is no god but Allah',
    count: 100
  },
  {
    id: 'astaghfirullah',
    text: 'أستغفر الله',
    textEn: 'I seek forgiveness from Allah',
    count: 100
  }
];
