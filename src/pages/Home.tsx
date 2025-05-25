import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { BookOpen, Check, Bookmark, BookmarkCheck } from 'lucide-react';

interface FavoriteItem {
  type: "zikr" | "hadith";
  id: number;
  text: string;
  source?: string;
}

const Home: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [completedZikrs, setCompletedZikrs] = useState<Record<string, Set<number>>>({});
  
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString('ar-EG', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  );
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    const favRaw = localStorage.getItem("khair-favorites");
    return favRaw ? JSON.parse(favRaw) : [];
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('ar-EG', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  React.useEffect(() => {
    const savedCompletedZikrs = localStorage.getItem('khair-completed-zikrs');
    if (savedCompletedZikrs) {
      const parsedCompletedZikrs = JSON.parse(savedCompletedZikrs);
      const reconvertedCompletedZikrs: Record<string, Set<number>> = {};
      
      for (const categoryId in parsedCompletedZikrs) {
        reconvertedCompletedZikrs[categoryId] = new Set(parsedCompletedZikrs[categoryId]);
      }
      
      setCompletedZikrs(reconvertedCompletedZikrs);
    }
  }, []);
  
  React.useEffect(() => {
    localStorage.setItem("khair-favorites", JSON.stringify(favorites));
  }, [favorites]);
  
  const handleZikrClick = (categoryId: string, zikrId: number) => {
    setCompletedZikrs(prev => {
      const categoryZikrs = prev[categoryId] || new Set<number>();
      
      if (categoryZikrs.has(zikrId)) {
        const newCategoryZikrs = new Set(categoryZikrs);
        newCategoryZikrs.delete(zikrId);
        
        toast({
          title: 'تم إلغاء تسجيل الذكر',
          description: `تم إلغاء تسجيل هذا الذكر`,
          duration: 3000,
        });
        
        return {
          ...prev,
          [categoryId]: newCategoryZikrs
        };
      }
      
      const newCategoryZikrs = new Set(categoryZikrs);
      newCategoryZikrs.add(zikrId);
      
      toast({
        title: 'تم تسجيل الذكر',
        description: `تم تسجيل هذا الذكر بنجاح`,
        duration: 3000,
      });
      
      return {
        ...prev,
        [categoryId]: newCategoryZikrs
      };
    });
  };

  const resetAllCompletedZikrs = () => {
    setCompletedZikrs({});
    toast({
      title: 'تم إعادة التعيين',
      description: 'تم إعادة تعيين جميع الأذكار المكتملة',
      duration: 2000,
    });
  };
  
  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => {
      if (prev.some(f => f.type === item.type && f.id === item.id && f.text === item.text)) {
        toast({
          title: "موجود بالفعل في المفضلة",
          description: "هذا العنصر موجود بالفعل في المفضلة"
        });
        return prev;
      }
      
      toast({
        title: "تمت الإضافة إلى المفضلة",
        description: item.type === "hadith" ? "تم حفظ الحديث في المفضلة" : "تم حفظ الذكر في المفضلة"
      });
      return [...prev, item];
    });
  };

  const isZikrInFavorites = (categoryId: string, zikrId: number, text: string) => {
    return favorites.some(item => 
      item.type === "zikr" && 
      (item.id === zikrId || item.text === text)
    );
  };

  const handleZikrCardClick = (categoryId: string, zikrIndex: number) => {
    navigate(`/azkar/${categoryId}/${zikrIndex}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate('/azkar');
  };

  // Show only the first category (wake-up remembrances)
  const selectedCategory = allAzkarCategories[0];

  return (
    <div className="khair-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center font-ibm-plex-arabic">
          {t('appName')}
        </h1>
        <div className="flex items-center text-khair-primary">
          <span className="ml-2">{t('currentTime')}:</span>
          <span dir="ltr" className="mr-2">{currentTime}</span>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-khair-primary/20 to-khair-accent/20 p-6 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4 font-ibm-plex-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</h2>
          <p className="text-xl mb-4 font-ibm-plex-arabic">أهلاً بك في تطبيق خير للأذكار والأدعية</p>
        </div>
        
        {/* Single Selected Category */}
        <div>
          <h2 className="text-2xl font-bold mb-4 font-ibm-plex-arabic">القسم المختار</h2>
          <div className="flex justify-center">
            <Card 
              className="cursor-pointer hover:border-khair-accent transition-colors border-khair-accent bg-khair-accent/10 max-w-sm"
              onClick={() => handleCategoryClick(selectedCategory.id)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-ibm-plex-arabic">{selectedCategory.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  مجموعة من {selectedCategory.title}
                </p>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <Badge variant="outline">{selectedCategory.azkar.length} ذكر</Badge>
                {(completedZikrs[selectedCategory.id]?.size || 0) > 0 && (
                  <Badge className="bg-khair-accent text-black">
                    {completedZikrs[selectedCategory.id]?.size || 0} مكتمل
                  </Badge>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
        
        {/* Recent Azkar */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold font-ibm-plex-arabic">أذكار مختارة</h2>
            <Button 
              variant="outline" 
              size="sm"
              className="font-ibm-plex-arabic"
              onClick={resetAllCompletedZikrs}
            >
              {t('reset')}
            </Button>
          </div>
          
          <div className="space-y-4">
            {selectedCategory.azkar.slice(0, 3).map((zikr, index) => {
              const isCompleted = completedZikrs[selectedCategory.id]?.has(zikr.id);
              const isFavorite = isZikrInFavorites(selectedCategory.id, zikr.id, zikr.text);
              
              return (
                <Card 
                  key={zikr.id} 
                  className={`prayer-card overflow-hidden cursor-pointer ${isCompleted ? 'border-khair-accent bg-opacity-10' : ''}`}
                  onClick={() => handleZikrCardClick(selectedCategory.id, index)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <Badge variant={isCompleted ? "outline" : "default"} className="mb-2 flex items-center gap-1">
                        <span className="material-icons text-sm">repeat</span>
                        {`${t('repeat')}: ${zikr.count}`}
                      </Badge>
                      <div className="flex gap-2">
                        {isCompleted && (
                          <Badge variant="secondary" className="bg-khair-accent text-black flex items-center gap-1">
                            <Check size={14} />
                            {t('done')}
                          </Badge>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex h-7 p-0 items-center gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToFavorites({
                              type: "zikr",
                              id: zikr.id,
                              text: zikr.text,
                              source: zikr.source
                            });
                          }}
                        >
                          {isFavorite ? (
                            <BookmarkCheck className="h-4 w-4 text-khair-accent" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div 
                      className="whitespace-pre-line text-lg font-ibm-plex-arabic"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleZikrClick(selectedCategory.id, zikr.id);
                      }}
                    >
                      {zikr.text}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-3 text-xs text-muted-foreground border-t flex items-start">
                    <BookOpen size={14} className="ml-2 mt-0.5 flex-shrink-0" />
                    <p className="whitespace-pre-line">
                      {zikr.source}
                    </p>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
