
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';
import { Clock, BookOpen, Bookmark } from 'lucide-react';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [completedZikrs, setCompletedZikrs] = useState<Record<string, Set<number>>>({});
  
  // عرض الوقت بتوقيت القاهرة
  const [currentTime, setCurrentTime] = useState<string>(
    new Date().toLocaleTimeString('ar-EG', {
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  );
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', {
          timeZone: 'Africa/Cairo',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    }, 1000);
    
    return () => clearInterval(timer);
  }, [language]);
  
  // التعامل مع النقر على الذكر
  const handleZikrClick = (categoryId: string, zikrId: number, maxCount: number) => {
    setCompletedZikrs(prev => {
      const categoryZikrs = prev[categoryId] || new Set<number>();
      const newCategoryZikrs = new Set(categoryZikrs);
      
      if (!newCategoryZikrs.has(zikrId)) {
        newCategoryZikrs.add(zikrId);
      } else {
        newCategoryZikrs.delete(zikrId);
      }
      
      return {
        ...prev,
        [categoryId]: newCategoryZikrs
      };
    });
  };
  
  return (
    <div className="khair-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">
          {t('appName')}
        </h1>
        <div className="flex items-center text-khair-primary">
          <Clock className="mr-2" size={18} />
          <span dir="ltr">{currentTime}</span>
        </div>
      </div>
      
      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8 overflow-x-auto">
          {allAzkarCategories.slice(0, 5).map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {language === 'ar' ? category.title : category.titleEn}
            </TabsTrigger>
          ))}
          <TabsTrigger value="more">
            {language === 'ar' ? 'المزيد...' : 'More...'}
          </TabsTrigger>
        </TabsList>
        
        {allAzkarCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="mt-0">
            <div className="space-y-4">
              {category.azkar.map((zikr) => {
                const isCompleted = completedZikrs[category.id]?.has(zikr.id);
                
                return (
                  <Card 
                    key={zikr.id} 
                    className={`prayer-card overflow-hidden ${isCompleted ? 'border-khair-accent bg-opacity-10' : ''}`}
                    onClick={() => handleZikrClick(category.id, zikr.id, zikr.count)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant={isCompleted ? "outline" : "default"} className="mb-2">
                          {language === 'ar' ? `التكرار: ${zikr.count}` : `Repeat: ${zikr.count}`}
                        </Badge>
                        {isCompleted && (
                          <Badge variant="secondary" className="bg-khair-accent text-black">
                            {language === 'ar' ? 'تم' : 'Done'}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="whitespace-pre-line text-lg">
                        {language === 'ar' ? zikr.text : zikr.textEn}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-3 text-xs text-muted-foreground border-t flex items-start">
                      <BookOpen size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                      <p className="whitespace-pre-line">
                        {language === 'ar' ? zikr.source : zikr.sourceEn}
                      </p>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        ))}
        
        <TabsContent value="more" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allAzkarCategories.slice(5).map(category => (
              <Card key={category.id} className="cursor-pointer hover:border-khair-accent transition-colors">
                <CardHeader>
                  <CardTitle>{language === 'ar' ? category.title : category.titleEn}</CardTitle>
                  <CardDescription>
                    {language === 'ar' 
                      ? `عدد الأذكار: ${category.azkar.length}` 
                      : `Number of azkar: ${category.azkar.length}`
                    }
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Tabs defaultValue={category.id}>
                    <TabsList className="w-full">
                      <TabsTrigger value={category.id} className="w-full">
                        {language === 'ar' ? 'عرض' : 'View'}
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Home;
