
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';
import { Clock, BookOpen, Bookmark, Check } from 'lucide-react';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  const [completedZikrs, setCompletedZikrs] = useState<Record<string, Set<number>>>({});
  const [activeTab, setActiveTab] = useState<string>('morning');
  
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

  // التعامل مع النقر على "عرض"
  const handleViewCategory = (categoryId: string) => {
    setActiveTab(categoryId);
  };
  
  return (
    <div className="khair-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center font-ibm-plex-arabic">
          {t('appName')}
        </h1>
        <div className="flex items-center text-khair-primary">
          <Clock className="mr-2" size={18} />
          <span dir="ltr">{currentTime}</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
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
                    onClick={() => !isCompleted && handleZikrClick(category.id, zikr.id, zikr.count)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge variant={isCompleted ? "outline" : "default"} className="mb-2 flex items-center gap-1">
                          <span className="material-icons text-sm">repeat</span>
                          {language === 'ar' ? `التكرار: ${zikr.count}` : `Repeat: ${zikr.count}`}
                        </Badge>
                        {isCompleted && (
                          <Badge variant="secondary" className="bg-khair-accent text-black flex items-center gap-1">
                            <Check size={14} />
                            {language === 'ar' ? 'تم' : 'Done'}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="whitespace-pre-line text-lg font-ibm-plex-arabic">
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
                  <Button 
                    variant="default" 
                    className="w-full"
                    onClick={() => handleViewCategory(category.id)}
                  >
                    <span className="material-icons mr-2">visibility</span>
                    {language === 'ar' ? 'عرض' : 'View'}
                  </Button>
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
