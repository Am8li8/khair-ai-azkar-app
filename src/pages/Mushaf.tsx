
import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";

// مصحف الملك فهد – جزء تجريبي (اكتب باقي السور لاحقًا)
const mushaf = [
  {
    id: 1,
    name: "الفاتحة",
    ayat: [
      { number: 1, 
        text: "ﭐلۡحَمۡدُ لِلَّهِ رَبِّ ﭐلۡعَـٰلَمِينَ", 
        tafsir: "الثناء على الله رب العالمين." 
      },
      { number: 2, 
        text: "ﭐلرَّحۡمَـٰنِ ﭐلرَّحِيمِ", 
        tafsir: "ذو الرحمة العامة والخاصة." 
      },
      { number: 3, 
        text: "مَـٰلِكِ يَوۡمِ ﭐلدِّينِ", 
        tafsir: "مالك يوم الجزاء والحساب." 
      },
      { number: 4, 
        text: "إِيَّاكَ نَعۡبُدُ وَإِيَّاكَ نَسۡتَعِينُ", 
        tafsir: "نخصك وحدك بالعبادة والاستعانة." 
      },
      { number: 5, 
        text: "ﭐهۡدِنَا ﭐلصِّرَٰطَ ﭐلۡمُسۡتَقِيمَ", 
        tafsir: "أرشدنا إلى الطريق المستقيم." 
      },
      { number: 6, 
        text: "صِرَٰطَ ﭐلَّذِينَ أَنۡعَمۡتَ عَلَيۡهِمۡۖ غَيۡرِ ﭐلۡمَغۡضُوبِ عَلَيۡهِمۡ وَلَا ﭐلضَّآلِّينَ", 
        tafsir: "طريق المنعَم عليهم وليس المغضوب أو الضالين." 
      },
    ]
  },
  {
    id: 2,
    name: "البقرة",
    ayat: [
      { number: 1, text: "ﮋﭑ ﭒ ﭓﮊ", tafsir: "حروف مقطعة (الم)" },
      { number: 2, text: "ﮋذَٰلِكَ ﭐلۡكِتَـٰبُ لَا رَيۡبَ فِيهِ هُدٗى لِّلۡمُتَّقِينَﮊ", tafsir: "هو القرآن هدى للمتقين." },
      // ... أكمل باقي آيات البقرة هنا ...
    ]
  },
  // يمكنك متابعة جميع السور لاحقًا...
];

const Mushaf: React.FC = () => {
  // إضافة الخط العثماني المخصص عند الدخول على الصفحة فقط
  useEffect(() => {
    const id = "mushafFont";
    if (!document.getElementById(id)) {
      const linkTag = document.createElement("link");
      linkTag.id = id;
      linkTag.rel = "stylesheet";
      // تحميل الخط من الرابط الذي زودتني به
      linkTag.href = "https://drive.google.com/uc?export=download&id=1qAEZf0YdX8GCHpwJMgwipYpQBnfuzXst";
      document.head.appendChild(linkTag);
    }
    // إزالة الخط عند مغادرة الصفحة
    return () => {
      const linkTag = document.getElementById(id);
      if (linkTag) linkTag.remove();
    };
  }, []);
  
  return (
    <div className="khair-container">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">مصحف الملك فهد (حفص)</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <aside className="md:w-1/4 w-full">
          <Card>
            <CardHeader>
              <CardTitle className="font-ibm-plex-arabic">السور</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[70vh] pr-4">
                <ul className="p-4 space-y-1">
                  {mushaf.map((surah) => (
                    <li key={surah.id}>
                      <a
                        href={`#surah-${surah.id}`}
                        className="w-full text-right px-3 py-2 rounded font-ibm-plex-arabic hover:bg-khair-accent/20 transition block"
                      >
                        {surah.id}. {surah.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1 min-w-0">
          <ScrollArea className="h-[70vh] pr-2">
            {mushaf.map((surah) => (
              <Card key={surah.id} id={`surah-${surah.id}`} className="mb-8 shadow-lg">
                <CardHeader>
                  <CardTitle className="font-ibm-plex-arabic text-xl">
                    {surah.id}. {surah.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="text-3xl leading-loose mushaf-quran-text select-text"
                    dir="rtl"
                  >
                    {surah.ayat.map((ayah, idx) => (
                      <HoverCard key={idx} openDelay={200} closeDelay={150}>
                        <HoverCardTrigger asChild>
                          <span className="cursor-help hover:bg-khair-accent/20 px-1 rounded transition-colors inline-block mb-4">
                            {ayah.text}
                            <span className="inline-block mr-2 text-lg align-super select-none">﴿{ayah.number}﴾</span>
                          </span>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-96 font-ibm-plex-arabic text-right p-4" dir="rtl">
                          <h4 className="font-bold mb-2">تفسير الآية {ayah.number}:</h4>
                          <p className="text-base">{ayah.tafsir || "لا يوجد تفسير متاح."}</p>
                        </HoverCardContent>
                      </HoverCard>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </main>
      </div>
      <div className="text-xs text-center mt-6">
        <span className="font-ibm-plex-arabic text-gray-400">تم إعداد النص بالرسم العثماني وخط المصحف.</span>
      </div>
      <style>{`
        @font-face {
          font-family: 'KFGQPC Uthmanic Script HAFS';
          src: url('https://drive.google.com/uc?export=download&id=1qAEZf0YdX8GCHpwJMgwipYpQBnfuzXst') format('truetype');
          font-display: swap;
        }
        .mushaf-quran-text {
          font-family: 'KFGQPC Uthmanic Script HAFS', 'IBM Plex Sans Arabic', serif;
          letter-spacing: 0.02em;
          line-height: 2.3;
          background: none;
        }
      `}</style>
    </div>
  );
};

export default Mushaf;

