
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Bookmark, BookmarkCheck } from 'lucide-react';

// Expanded list of hadiths
const allAhadith = [
  {
    id: 1,
    text: "إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى.",
    source: "رواه البخاري ومسلم"
  },
  {
    id: 2,
    text: "الدين النصيحة.",
    source: "رواه مسلم"
  },
  {
    id: 3,
    text: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه.",
    source: "رواه البخاري ومسلم"
  },
  {
    id: 4,
    text: "من لا يشكر الناس لا يشكر الله.",
    source: "رواه أحمد"
  },
  {
    id: 5,
    text: "من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت.",
    source: "رواه البخاري ومسلم"
  },
  {
    id: 6,
    text: "خيركم من تعلم القرآن وعلمه.",
    source: "رواه البخاري"
  },
  {
    id: 7,
    text: "إن الله رفيق يحب الرفق في الأمر كله.",
    source: "رواه البخاري ومسلم"
  },
  {
    id: 8,
    text: "من حسن إسلام المرء تركه ما لا يعنيه.",
    source: "رواه الترمذي"
  },
  {
    id: 9,
    text: "المسلم من سلم المسلمون من لسانه ويده.",
    source: "رواه البخاري ومسلم"
  },
  {
    id: 10,
    text: "لا تدخلون الجنة حتى تؤمنوا، ولا تؤمنوا حتى تحابوا.",
    source: "رواه مسلم"
  },
  {
    id: 11,
    text: "الطهور شطر الإيمان.",
    source: "رواه مسلم"
  },
  {
    id: 12,
    text: "من بطأ به عمله لم يسرع به نسبه.",
    source: "رواه مسلم"
  }
];

export interface FavoriteItem {
  type: "zikr" | "hadith";
  id: number;
  text: string;
  source?: string;
}

interface HadithDisplayProps {
  favorites: FavoriteItem[];
  onAddToFavorites: (item: FavoriteItem) => void;
}

const HadithDisplay: React.FC<HadithDisplayProps> = ({ favorites, onAddToFavorites }) => {
  const [randomHadith, setRandomHadith] = useState(() => {
    return allAhadith[Math.floor(Math.random() * allAhadith.length)];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomHadith(allAhadith[Math.floor(Math.random() * allAhadith.length)]);
    }, 60 * 1000); // Change every minute
    return () => clearInterval(interval);
  }, []);

  const isInFavorites = (hadith: typeof randomHadith) => {
    return favorites.some(item => item.type === "hadith" && item.id === hadith.id);
  };

  return (
    <div className="bg-soft-purple/60 rounded-lg shadow mb-5 p-4 text-center">
      <div className="text-xl font-bold font-ibm-plex-arabic mb-2">حديث نبوي</div>
      <div className="font-ibm-plex-arabic text-lg mb-1">
        "{randomHadith.text}"
      </div>
      <div className="text-muted-foreground text-sm">{randomHadith.source}</div>
      <div className="flex justify-center space-x-2 mt-2">
        <Button
          variant="ghost"
          onClick={() => setRandomHadith(allAhadith[Math.floor(Math.random() * allAhadith.length)])}
        >
          تحديث الحديث الآن
        </Button>
        <Button
          variant="secondary"
          className="flex items-center gap-2"
          onClick={() =>
            onAddToFavorites({
              type: "hadith",
              id: randomHadith.id,
              text: randomHadith.text,
              source: randomHadith.source,
            })
          }
        >
          {isInFavorites(randomHadith) ? (
            <>
              <BookmarkCheck className="h-4 w-4" />
              تمت الإضافة للمفضلة
            </>
          ) : (
            <>
              <Bookmark className="h-4 w-4" />
              أضف للمفضلة
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export { HadithDisplay, allAhadith };
