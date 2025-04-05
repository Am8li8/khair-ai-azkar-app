
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';
import { defaultTasbihOptions } from '@/data/azkar';
import { toast } from '@/components/ui/use-toast';
import { Clock, BookOpen, Check, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from 'react-router-dom';

interface TasbihState {
  selectedZikr: string;
  customZikr: string;
  targetCount: number;
  currentCount: number;
  rounds: number;
  completedRounds: number;
  history: Array<{
    zikr: string;
    count: number;
    date: string;
  }>;
}

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
  
  // حالة السبحة
  const [tasbihState, setTasbihState] = useState<TasbihState>({
    selectedZikr: 'subhanAllah',
    customZikr: '',
    targetCount: 33,
    currentCount: 0,
    rounds: 3,
    completedRounds: 0,
    history: [],
  });
  
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
  
  // استعادة حالة السبحة من التخزين المحلي عند تحميل الصفحة
  React.useEffect(() => {
    const savedState = localStorage.getItem('khair-tasbih-state');
    if (savedState) {
      setTasbihState(JSON.parse(savedState));
    }
  }, []);
  
  // حفظ حالة السبحة في التخزين المحلي كلما تغيرت
  React.useEffect(() => {
    localStorage.setItem('khair-tasbih-state', JSON.stringify(tasbihState));
  }, [tasbihState]);
  
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
  
  // وظائف السبحة
  const handleZikrSelect = (value: string) => {
    const selected = defaultTasbihOptions.find(option => option.id === value);
    setTasbihState(prev => ({
      ...prev,
      selectedZikr: value,
      targetCount: selected ? selected.count : prev.targetCount,
      currentCount: 0,
      completedRounds: 0,
    }));
  };
  
  const handleCustomZikrChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasbihState(prev => ({
      ...prev,
      customZikr: e.target.value,
      selectedZikr: 'custom',
    }));
  };
  
  const handleTargetCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasbihState(prev => ({
      ...prev,
      targetCount: parseInt(e.target.value) || 1,
      currentCount: 0,
      completedRounds: 0,
    }));
  };
  
  const handleRoundsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTasbihState(prev => ({
      ...prev,
      rounds: parseInt(e.target.value) || 1,
      completedRounds: 0,
    }));
  };
  
  const incrementCount = () => {
    if (tasbihState.completedRounds >= tasbihState.rounds) {
      // تم الانتهاء من جميع الجولات، لا يمكن التقدم أكثر
      toast({
        title: language === 'ar' ? 'اكتملت السبحة' : 'Tasbih Completed',
        description: language === 'ar' 
          ? 'لقد أكملت جميع الجولات، يمكنك إعادة التعيين للبدء من جديد' 
          : 'You have completed all rounds, reset to start again',
        duration: 3000,
      });
      return;
    }
    
    setTasbihState(prev => {
      const newCount = prev.currentCount + 1;
      
      // عرض رسالة تأكيد بعدد المرات
      const countMessage = language === 'ar' 
        ? `تم التكرار ${newCount} مرة` 
        : `Counted ${newCount} times`;
      
      toast({
        title: countMessage,
        duration: 1000,
      });
      
      // إذا وصلنا للعدد المستهدف
      if (newCount >= prev.targetCount) {
        const newCompletedRounds = prev.completedRounds + 1;
        const currentDate = new Date().toISOString();
        const currentZikr = prev.selectedZikr === 'custom' ? prev.customZikr : getCurrentZikrText();
        
        // إضافة إلى سجل الأذكار
        const newHistory = [...(prev.history || []), {
          zikr: currentZikr,
          count: prev.targetCount,
          date: currentDate
        }];
        
        // إذا أكملنا جميع الجولات
        if (newCompletedRounds >= prev.rounds) {
          toast({
            title: language === 'ar' ? 'مبارك!' : 'Congratulations!',
            description: language === 'ar' 
              ? `لقد أكملت ${prev.rounds} جولات من الذكر` 
              : `You have completed ${prev.rounds} rounds of dhikr`,
            duration: 3000,
          });
        } else {
          toast({
            title: language === 'ar' ? 'أحسنت!' : 'Well done!',
            description: language === 'ar' 
              ? `أكملت جولة ${newCompletedRounds} من ${prev.rounds}` 
              : `Completed round ${newCompletedRounds} of ${prev.rounds}`,
            duration: 1500,
          });
        }
        
        return {
          ...prev,
          currentCount: 0,
          completedRounds: newCompletedRounds,
          history: newHistory
        };
      }
      
      return {
        ...prev,
        currentCount: newCount,
      };
    });
  };
  
  const resetTasbih = () => {
    setTasbihState(prev => ({
      ...prev,
      currentCount: 0,
      completedRounds: 0,
    }));
    
    toast({
      title: language === 'ar' ? 'تم إعادة التعيين' : 'Reset Complete',
      description: language === 'ar' ? 'تم إعادة تعيين العداد' : 'The counter has been reset',
      duration: 1500,
    });
  };
  
  const getCurrentZikrText = () => {
    if (tasbihState.selectedZikr === 'custom') {
      return tasbihState.customZikr || (language === 'ar' ? 'ذكر مخصص' : 'Custom Dhikr');
    }
    
    const selected = defaultTasbihOptions.find(option => option.id === tasbihState.selectedZikr);
    return selected ? (language === 'ar' ? selected.text : selected.textEn) : '';
  };
  
  const getProgressPercentage = () => {
    return (tasbihState.currentCount / tasbihState.targetCount) * 100;
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
          <TabsTrigger value="tasbih">{language === 'ar' ? 'السبحة' : 'Tasbih'}</TabsTrigger>
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
        
        {/* تاب السبحة */}
        <TabsContent value="tasbih" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="font-ibm-plex-arabic">{language === 'ar' ? 'إعدادات السبحة' : 'Tasbih Settings'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="zikr-select" className="font-ibm-plex-arabic">{language === 'ar' ? 'اختر الذكر' : 'Choose Dhikr'}</Label>
                  <Select 
                    value={tasbihState.selectedZikr} 
                    onValueChange={handleZikrSelect}
                  >
                    <SelectTrigger id="zikr-select">
                      <SelectValue placeholder={language === 'ar' ? 'اختر الذكر' : 'Choose Dhikr'} />
                    </SelectTrigger>
                    <SelectContent>
                      {defaultTasbihOptions.map(option => (
                        <SelectItem key={option.id} value={option.id} className="font-ibm-plex-arabic">
                          {language === 'ar' ? option.text : option.textEn} ({option.count})
                        </SelectItem>
                      ))}
                      <SelectItem value="custom" className="font-ibm-plex-arabic">
                        {language === 'ar' ? 'ذكر مخصص' : 'Custom Dhikr'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {tasbihState.selectedZikr === 'custom' && (
                  <div className="space-y-2">
                    <Label htmlFor="custom-zikr" className="font-ibm-plex-arabic">
                      {language === 'ar' ? 'الذكر المخصص' : 'Custom Dhikr'}
                    </Label>
                    <Input
                      id="custom-zikr"
                      value={tasbihState.customZikr}
                      onChange={handleCustomZikrChange}
                      placeholder={language === 'ar' ? "أدخل الذكر المخصص" : "Enter custom dhikr"}
                      className="font-ibm-plex-arabic"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="target-count" className="font-ibm-plex-arabic">
                    {language === 'ar' ? 'عدد التكرار' : 'Target Count'}
                  </Label>
                  <Input
                    id="target-count"
                    type="number"
                    value={tasbihState.targetCount}
                    onChange={handleTargetCountChange}
                    min={1}
                    max={1000}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="rounds" className="font-ibm-plex-arabic">
                    {language === 'ar' ? 'عدد الجولات' : 'Number of Rounds'}
                  </Label>
                  <Input
                    id="rounds"
                    type="number"
                    value={tasbihState.rounds}
                    onChange={handleRoundsChange}
                    min={1}
                    max={100}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full font-ibm-plex-arabic" onClick={resetTasbih}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  {language === 'ar' ? 'إعادة التعيين' : 'Reset'}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="flex flex-col items-center justify-center">
              <div 
                className={`tasbih-counter ${tasbihState.completedRounds >= tasbihState.rounds ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`} 
                onClick={incrementCount}
              >
                <div className="counter-text">{tasbihState.currentCount}</div>
                <div className="counter-label font-ibm-plex-arabic">
                  {getCurrentZikrText()}
                </div>
                <div className="text-sm mt-2 font-ibm-plex-arabic">
                  {language === 'ar' 
                    ? `${tasbihState.completedRounds} / ${tasbihState.rounds} جولات` 
                    : `${tasbihState.completedRounds} / ${tasbihState.rounds} rounds`}
                </div>
                
                <div className="mt-4 w-4/5 bg-white/30 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-white h-full rounded-full transition-all duration-300" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-center mt-4 space-x-4 rtl:space-x-reverse">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-ibm-plex-arabic">
                    {language === 'ar' ? 'الجولات المكتملة' : 'Completed'}
                  </div>
                  <div className="text-2xl font-bold">{tasbihState.completedRounds}</div>
                </div>
                
                <div className="border-r mx-2"></div>
                
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-ibm-plex-arabic">
                    {language === 'ar' ? 'الهدف' : 'Target'}
                  </div>
                  <div className="text-2xl font-bold">{tasbihState.rounds}</div>
                </div>
              </div>
              
              {tasbihState.completedRounds >= tasbihState.rounds && (
                <div className="mt-4 text-center">
                  <Button variant="default" className="bg-khair-accent text-black hover:bg-khair-accent/90 font-ibm-plex-arabic">
                    <Check className="mr-2 h-4 w-4" />
                    {language === 'ar' ? 'مبارك! تم إكمال جميع الجولات' : 'Congratulations! All rounds completed'}
                  </Button>
                </div>
              )}
            </div>
          </div>
              
          {/* سجل التسبيحات */}
          {tasbihState.history && tasbihState.history.length > 0 && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="font-ibm-plex-arabic">
                  {language === 'ar' ? 'سجل التسبيحات' : 'Tasbih History'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tasbihState.history.slice(-5).reverse().map((entry, index) => (
                    <div key={index} className="flex justify-between items-center p-2 border-b">
                      <div className="flex-1">
                        <span className="font-medium font-ibm-plex-arabic">{entry.zikr}</span>
                      </div>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse">
                        <Badge variant="outline" className="font-ibm-plex-arabic">
                          {language === 'ar' ? `${entry.count} مرة` : `${entry.count} times`}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(entry.date).toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
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
