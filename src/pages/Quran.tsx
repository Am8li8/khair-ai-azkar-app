
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { quranSurahs, surahNames } from "@/data/quran";
import { BookOpen, Check, Plus } from "lucide-react";

const Quran: React.FC = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedSurah, setSelectedSurah] = useState<number>(1);
  const [dhikrCount, setDhikrCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(33);
  const [completedRounds, setCompletedRounds] = useState<number>(0);
  
  // Load Uthmani font
  useEffect(() => {
    const id = "uthmaniFont";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = "https://drive.google.com/uc?export=download&id=1qAEZf0YdX8GCHpwJMgwipYpQBnfuzXst";
      document.head.appendChild(link);
    }
    return () => {
      const link = document.getElementById(id);
      if (link) link.remove();
    };
  }, []);

  const currentSurah = quranSurahs.find(s => s.id === selectedSurah);
  
  const incrementDhikr = () => {
    setDhikrCount(prev => {
      const newCount = prev + 1;
      if (newCount >= targetCount) {
        setCompletedRounds(r => r + 1);
        toast({
          title: "أحسنت!",
          description: "أكملت دورة من الذكر"
        });
        return 0;
      }
      return newCount;
    });
  };

  const resetDhikr = () => {
    setDhikrCount(0);
    setCompletedRounds(0);
    toast({
      title: "تم إعادة التعيين",
      description: "تم إعادة تعيين عداد الذكر"
    });
  };

  return (
    <div className="khair-container">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">{t("القرآن الكريم")}</h1>
      
      {/* Dhikr Counter */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center">
            <div 
              className="tasbih-counter cursor-pointer" 
              onClick={incrementDhikr}
            >
              <div className="counter-text">{dhikrCount}</div>
              <div className="counter-label font-ibm-plex-arabic">
                عدد مرات التكرار
              </div>
              <div className="text-sm mt-2">
                {completedRounds} دورات مكتملة
              </div>
              
              <div className="mt-4 w-4/5 bg-white/30 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-white h-full rounded-full transition-all duration-300" 
                  style={{ width: `${(dhikrCount / targetCount) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetDhikr} 
              className="mt-4"
            >
              إعادة التعيين
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Quran Content */}
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="font-ibm-plex-arabic">{t("السور")}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[70vh] pr-4">
                <ul className="p-4 space-y-1">
                  {surahNames.map((name, index) => (
                    <li key={index + 1}>
                      <button
                        className={`w-full text-right px-3 py-2 rounded font-ibm-plex-arabic hover:bg-khair-accent/20 transition ${
                          selectedSurah === index + 1 ? "bg-khair-accent/40 text-black" : ""
                        }`}
                        onClick={() => setSelectedSurah(index + 1)}
                      >
                        {index + 1}. {name}
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
                className="text-3xl leading-loose quran-uthmani-text select-text"
                dir="rtl"
              >
                {currentSurah?.verses?.map((verse, index) => (
                  <HoverCard key={index} openDelay={200} closeDelay={150}>
                    <HoverCardTrigger asChild>
                      <span className="cursor-help hover:bg-khair-accent/20 px-1 rounded transition-colors inline-block mb-4">
                        {verse.text}
                        <span className="inline-block mr-2 text-lg align-super select-none">﴿{verse.number}﴾</span>
                      </span>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-96 font-ibm-plex-arabic text-right p-4" dir="rtl">
                      <h4 className="font-bold mb-2">تفسير الآية {verse.number}:</h4>
                      <p className="text-base">{verse.tafsir || "لا يوجد تفسير متاح."}</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      
      <style>{`
        @font-face {
          font-family: 'KFGQPC Uthmanic Script HAFS';
          src: url('https://drive.google.com/uc?export=download&id=1qAEZf0YdX8GCHpwJMgwipYpQBnfuzXst') format('truetype');
          font-display: swap;
        }
        .quran-uthmani-text {
          font-family: 'KFGQPC Uthmanic Script HAFS', 'IBM Plex Sans Arabic', serif;
          letter-spacing: 0.02em;
          line-height: 2.3;
        }
      `}</style>
    </div>
  );
};

export default Quran;
