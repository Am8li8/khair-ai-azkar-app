
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

// Import the simplified Quran data
import { quranSurahs } from "@/data/quran";

const Quran: React.FC = () => {
  const { t } = useLanguage();
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  
  // Get the currently selected surah
  const currentSurah = quranSurahs.find(s => s.id === selectedSurah);
  
  return (
    <div className="khair-container">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">{t("القرآن الكريم")}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="font-ibm-plex-arabic">{t("السور")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[70vh] pr-4">
                <ul className="p-4 space-y-1">
                  {quranSurahs.map((surah) => (
                    <li key={surah.id}>
                      <button
                        className={`w-full text-right px-3 py-2 rounded font-ibm-plex-arabic hover:bg-khair-accent/20 transition ${
                          selectedSurah === surah.id ? "bg-khair-accent/40 text-black" : ""
                        }`}
                        onClick={() => setSelectedSurah(surah.id)}
                      >
                        {surah.id}. {surah.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1 min-w-0">
          <Card>
            <CardHeader>
              <CardTitle className="font-ibm-plex-arabic text-xl">
                {currentSurah?.id}. {currentSurah?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="text-2xl leading-loose font-ibm-plex-arabic"
                dir="rtl"
                style={{
                  fontFamily: "'Amiri', 'IBM Plex Sans Arabic', serif"
                }}
              >
                {currentSurah?.verses?.map((verse, index) => (
                  <HoverCard key={index} openDelay={300} closeDelay={200}>
                    <HoverCardTrigger asChild>
                      <span className="cursor-help hover:bg-khair-accent/20 p-1 rounded transition-colors inline-block mb-2">
                        {verse.text} <span className="inline-block mr-1 text-sm">﴿{verse.number}﴾</span>
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 font-ibm-plex-arabic text-right p-4" dir="rtl">
                      <h4 className="font-bold mb-2">تفسير الآية {verse.number}:</h4>
                      <p className="text-sm">{verse.tafsir || "لا يوجد تفسير متاح لهذه الآية."}</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      <div className="text-sm text-center mt-6">
        <p className="font-ibm-plex-arabic text-gray-500">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>
      </div>
    </div>
  );
};

export default Quran;
