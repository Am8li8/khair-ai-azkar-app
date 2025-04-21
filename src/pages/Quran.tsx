
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const quranSurahs = [
  {
    id: 1,
    name: "الفاتحة",
    content: `
    بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ
    ١. الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
    ٢. الرَّحْمَٰنِ الرَّحِيمِ
    ٣. مَالِكِ يَوْمِ الدِّينِ
    ٤. إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ
    ٥. اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
    ٦. صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ
    `
  },
  {
    id: 2,
    name: "البقرة",
    content: `
    الم
    ١. ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِّلْمُتَّقِينَ
    ٢. الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ
    ٣. وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ
    ٤. أُو۟لَئِكَ عَلَىٰ هُدًۭى مِّن رَّبِّهِمْ وَأُو۟لَئِكَ هُمُ ٱلْمُفْلِحُونَ
    `
  },
  {
    id: 3,
    name: "الكوثر",
    content: `
    بِسْمِ اللّٰهِ الرَّحْمَٰنِ الرَّحِيمِ
    ١. إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ
    ٢. فَصَلِّ لِرَبِّكَ وَانْحَرْ
    ٣. إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ
    `
  }
];

const Quran: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number>(1);

  return (
    <div className="khair-container">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">{t("القرآن الكريم")}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="font-ibm-plex-arabic">{t("السور")}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {quranSurahs.map((surah) => (
                  <li key={surah.id}>
                    <button
                      className={`w-full text-right px-3 py-2 rounded font-ibm-plex-arabic hover:bg-khair-accent/20 transition ${
                        selectedSurah === surah.id ? "bg-khair-accent/40 text-black" : ""
                      }`}
                      onClick={() => setSelectedSurah(surah.id)}
                    >
                      {surah.name}
                    </button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="font-ibm-plex-arabic text-xl">{quranSurahs.find(s => s.id === selectedSurah)?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl text-center leading-loose font-ibm-plex-arabic"
                dir="rtl"
                style={{
                  fontFamily: "'Amiri', 'IBM Plex Sans Arabic', serif"
                }}
              >
                {(quranSurahs.find(s => s.id === selectedSurah)?.content || "").trim()}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="text-sm text-gray-400 mt-10 text-center font-ibm-plex-arabic">
        حقوق الخط © مجمع الملك فهد لطباعة المصحف الشريف. <br />
        هذا مجرد عرض تجريبي لبعض السور ويمكنك إضافة المزيد من السور لاحقًا.
      </div>
    </div>
  );
};

export default Quran;
