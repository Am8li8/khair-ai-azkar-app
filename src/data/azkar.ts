
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

export const defaultTasbihOptions = [
  { id: 'subhanAllah', text: 'سبحان الله', textEn: 'Subhan Allah', count: 33 },
  { id: 'alhamdulillah', text: 'الحمد لله', textEn: 'Alhamdulillah', count: 33 },
  { id: 'allahuAkbar', text: 'الله أكبر', textEn: 'Allahu Akbar', count: 34 },
  { id: 'lailahaillaAllah', text: 'لا إله إلا الله', textEn: 'La ilaha illa Allah', count: 100 },
  { id: 'astaghfirullah', text: 'أستغفر الله', textEn: 'Astaghfirullah', count: 100 }
];
