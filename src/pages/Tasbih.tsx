
import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/components/ui/use-toast';
import { Clock } from 'lucide-react';
import TasbihSettings from '@/components/tasbih/TasbihSettings';
import TasbihCounter from '@/components/tasbih/TasbihCounter';
import TasbihHistory from '@/components/tasbih/TasbihHistory';
import { defaultTasbihOptions } from '@/data/azkar';

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

const Tasbih: React.FC = () => {
  const { language, t } = useLanguage();
  const [tasbihState, setTasbihState] = useState<TasbihState>({
    selectedZikr: 'subhanAllah',
    customZikr: '',
    targetCount: 33,
    currentCount: 0,
    rounds: 3,
    completedRounds: 0,
    history: [],
  });
  
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
    if (tasbihState.completedRounds >= tasbihState.rounds) {
      // تم الانتهاء من جميع الجولات، لا يمكن التقدم أكثر
      toast({
        title: 'اكتملت السبحة',
        description: 'لقد أكملت جميع الجولات، يمكنك إعادة التعيين للبدء من جديد',
        duration: 3000,
      });
      return;
    }
    
    setTasbihState(prev => {
      const newCount = prev.currentCount + 1;
      
      // عرض رسالة تأكيد بعدد المرات
      const countMessage = `تم التكرار ${newCount} مرة`;
      
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
            title: 'مبارك!',
            description: `لقد أكملت ${prev.rounds} جولات من الذكر`,
            duration: 3000,
          });
        } else {
          toast({
            title: 'أحسنت!',
            description: `أكملت جولة ${newCompletedRounds} من ${prev.rounds}`,
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
      title: 'تم إعادة التعيين',
      description: 'تم إعادة تعيين العداد',
      duration: 1500,
    });
  };
  
  const getCurrentZikrText = () => {
    if (tasbihState.selectedZikr === 'custom') {
      return tasbihState.customZikr || 'ذكر مخصص';
    }
    
    const selected = defaultTasbihOptions.find(option => option.id === tasbihState.selectedZikr);
    return selected ? selected.text : '';
  };
  
  return (
    <div className="khair-container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-ibm-plex-arabic">
          {t('tasbih')}
        </h1>
        <div className="flex items-center text-khair-primary">
          <Clock className="mr-2" size={18} />
          <span dir="ltr">{currentTime}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TasbihSettings 
          selectedZikr={tasbihState.selectedZikr}
          customZikr={tasbihState.customZikr}
          targetCount={tasbihState.targetCount}
          rounds={tasbihState.rounds}
          onZikrSelect={handleZikrSelect}
          onCustomZikrChange={handleCustomZikrChange}
          onTargetCountChange={handleTargetCountChange}
          onRoundsChange={handleRoundsChange}
          onReset={resetTasbih}
        />
        
        <TasbihCounter 
          currentCount={tasbihState.currentCount}
          completedRounds={tasbihState.completedRounds}
          rounds={tasbihState.rounds}
          zikrText={getCurrentZikrText()}
          isCompleted={tasbihState.completedRounds >= tasbihState.rounds}
          onIncrement={incrementCount}
        />
      </div>
      
      <TasbihHistory history={tasbihState.history} />
    </div>
  );
};

export default Tasbih;
