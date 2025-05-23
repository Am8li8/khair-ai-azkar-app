
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { allAzkarCategories } from '@/data/azkar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface FavoriteItem {
  type: "zikr" | "hadith";
  id: number;
  text: string;
  source?: string;
}

const ZikrDetail: React.FC = () => {
  const { categoryId, zikrIndex } = useParams<{ categoryId: string; zikrIndex: string }>();
  const navigate = useNavigate();
  
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("khair-favorites", []);
  
  const category = allAzkarCategories.find(cat => cat.id === categoryId);
  const zikrIdx = zikrIndex ? parseInt(zikrIndex, 10) : 0;
  const zikr = category?.azkar[zikrIdx];
  
  if (!category || !zikr) {
    return (
      <div className="container py-6 text-center">
        <h1 className="text-2xl font-bold mb-4 font-ibm-plex-arabic">الذكر غير موجود</h1>
        <Button onClick={() => navigate('/azkar')} className="font-ibm-plex-arabic">
          العودة إلى الأذكار
        </Button>
      </div>
    );
  }
  
  const isInFavorites = favorites.some(
    item => item.type === "zikr" && item.text === zikr.text
  );
  
  const handleToggleFavorite = () => {
    if (isInFavorites) {
      const newFavorites = favorites.filter(
        item => !(item.type === "zikr" && item.text === zikr.text)
      );
      setFavorites(newFavorites);
      toast({
        title: "تم الحذف من المفضلة",
        description: "تم حذف الذكر من المفضلة"
      });
    } else {
      setFavorites([
        ...favorites,
        {
          type: "zikr",
          id: zikr.id || zikrIdx,
          text: zikr.text,
          source: zikr.source
        }
      ]);
      toast({
        title: "تمت الإضافة إلى المفضلة",
        description: "تم حفظ الذكر في المفضلة"
      });
    }
  };
  
  return (
    <div className="container py-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/azkar')}
        className="mb-4 font-ibm-plex-arabic flex items-center"
      >
        <ArrowRight className="ml-2" size={16} />
        العودة إلى الأذكار
      </Button>
      
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="bg-muted/30 pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-ibm-plex-arabic">{zikr.text.split('\n')[0]}</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex h-7 p-0 items-center gap-1"
              onClick={handleToggleFavorite}
            >
              {isInFavorites ? (
                <BookmarkCheck className="h-5 w-5 text-khair-accent" />
              ) : (
                <Bookmark className="h-5 w-5" />
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="whitespace-pre-wrap text-lg font-ibm-plex-arabic leading-relaxed">
            {zikr.text}
          </div>
          
          <div className="mt-6 mb-2">
            <div className="bg-khair-primary/10 p-4 rounded-md">
              <p className="font-ibm-plex-arabic">
                <span className="text-khair-primary font-bold">عدد المرات: </span>
                {zikr.count}
              </p>
              <p className="font-ibm-plex-arabic mt-2">
                <span className="text-khair-primary font-bold">المصدر: </span>
                {zikr.source}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZikrDetail;
