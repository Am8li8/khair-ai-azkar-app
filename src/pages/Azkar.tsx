
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';
import { BookOpen, ChevronDown, ChevronUp, Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface FavoriteItem {
  type: "zikr" | "hadith";
  id: number;
  text: string;
  source?: string;
}

const Azkar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("khair-favorites", []);
  
  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };
  
  const isInFavorites = (zikr: { text: string }) => {
    return favorites.some(item => item.type === "zikr" && item.text === zikr.text);
  };
  
  const handleToggleFavorite = (e: React.MouseEvent, zikr: any, categoryId: string) => {
    e.stopPropagation();
    
    if (isInFavorites(zikr)) {
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
          id: zikr.id || Math.floor(Math.random() * 10000),
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
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">الأذكار</h1>
      
      <div className="space-y-4">
        {allAzkarCategories.map(category => (
          <Card key={category.id} className="overflow-hidden">
            <CardHeader 
              className="bg-muted/30 cursor-pointer"
              onClick={() => toggleCategory(category.id)}
            >
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-ibm-plex-arabic">{category.title}</CardTitle>
                {expandedCategory === category.id ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </div>
            </CardHeader>
            
            {expandedCategory === category.id && (
              <CardContent className="pt-4 space-y-4">
                {category.azkar.map((zikr, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="bg-muted/20 pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg font-ibm-plex-arabic">{zikr.text.split('\n')[0]}</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 p-0"
                          onClick={(e) => handleToggleFavorite(e, zikr, category.id)}
                        >
                          {isInFavorites(zikr) ? (
                            <BookmarkCheck className="h-4 w-4 text-khair-accent" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="line-clamp-3 text-muted-foreground font-ibm-plex-arabic">
                        {zikr.text}
                      </p>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <span className="bg-khair-secondary/20 px-2 py-1 rounded-full">
                          {zikr.count} مرات
                        </span>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-1 pb-4 flex justify-between">
                      <Button 
                        variant="outline"
                        className="w-full font-ibm-plex-arabic"
                        onClick={() => navigate(`/azkar/${category.id}/${index}`)}
                      >
                        <BookOpen className="ml-2" size={18} />
                        عرض الذكر
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Azkar;
