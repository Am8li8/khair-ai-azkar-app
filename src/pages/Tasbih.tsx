
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { defaultTasbihOptions } from '@/data/azkar';
import { toast } from '@/components/ui/use-toast';
import { RotateCcw, Check } from 'lucide-react';

interface TasbihState {
  selectedZikr: string;
  customZikr: string;
  targetCount: number;
  currentCount: number;
  rounds: number;
  completedRounds: number;
}

const Tasbih: React.FC = () => {
  const { language, t } = useLanguage();
  const [tasbihState, setTasbihState] = useState<TasbihState>({
    selectedZikr: 'subhanAllah',
    customZikr: '',
    targetCount: 33,
    currentCount: 0,
    rounds: 3,
    completedRounds: 0,
  });
  
  // استعادة حالة السبحة من التخزين المحلي عند تحميل الصفحة
  useEffect(() => {
    const savedState = localStorage.getItem('khair-tasbih-state');
    if (savedState) {
      setTasbihState(JSON.parse(savedState));
    }
  }, []);
  
  // حفظ حالة السبحة في التخزين المحلي كلما تغيرت
  useEffect(() => {
    localStorage.setItem('khair-tasbih-state', JSON.stringify(tasbihState));
  }, [tasbihState]);
  
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
    setTasbihState(prev => {
      const newCount = prev.currentCount + 1;
      
      // إذا وصلنا للعدد المستهدف
      if (newCount >= prev.targetCount) {
        const newCompletedRounds = prev.completedRounds + 1;
        
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
  
  return (
    <div className="khair-container">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('tasbih')}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>{t('chooseZikr')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="zikr-select">{t('chooseZikr')}</Label>
              <Select 
                value={tasbihState.selectedZikr} 
                onValueChange={handleZikrSelect}
              >
                <SelectTrigger id="zikr-select">
                  <SelectValue placeholder={t('chooseZikr')} />
                </SelectTrigger>
                <SelectContent>
                  {defaultTasbihOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {language === 'ar' ? option.text : option.textEn} ({option.count})
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">{t('customZikr')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {tasbihState.selectedZikr === 'custom' && (
              <div className="space-y-2">
                <Label htmlFor="custom-zikr">{t('customZikr')}</Label>
                <Input
                  id="custom-zikr"
                  value={tasbihState.customZikr}
                  onChange={handleCustomZikrChange}
                  placeholder={language === 'ar' ? "أدخل الذكر المخصص" : "Enter custom dhikr"}
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="target-count">{t('target')}</Label>
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
              <Label htmlFor="rounds">{t('totalRounds')}</Label>
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
            <Button variant="outline" className="w-full" onClick={resetTasbih}>
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('reset')}
            </Button>
          </CardFooter>
        </Card>
        
        <div className="flex flex-col items-center justify-center">
          <div className="tasbih-counter" onClick={incrementCount}>
            <div className="counter-text">{tasbihState.currentCount}</div>
            <div className="counter-label">
              {getCurrentZikrText()}
            </div>
            <div className="text-sm mt-2">
              {language === 'ar' 
                ? `${tasbihState.completedRounds} / ${tasbihState.rounds} جولات` 
                : `${tasbihState.completedRounds} / ${tasbihState.rounds} rounds`}
            </div>
          </div>
          
          <div className="flex justify-center mt-4 space-x-4 rtl:space-x-reverse">
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{t('completed')}</div>
              <div className="text-2xl font-bold">{tasbihState.completedRounds}</div>
            </div>
            
            <div className="border-r mx-2"></div>
            
            <div className="text-center">
              <div className="text-sm text-muted-foreground">{t('target')}</div>
              <div className="text-2xl font-bold">{tasbihState.rounds}</div>
            </div>
          </div>
          
          {tasbihState.completedRounds >= tasbihState.rounds && (
            <div className="mt-4 text-center">
              <Button variant="default" className="bg-khair-accent text-black hover:bg-khair-accent/90">
                <Check className="mr-2 h-4 w-4" />
                {language === 'ar' ? 'مبارك! تم إكمال جميع الجولات' : 'Congratulations! All rounds completed'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tasbih;
