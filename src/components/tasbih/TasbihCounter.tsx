
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface TasbihCounterProps {
  currentCount: number;
  completedRounds: number;
  rounds: number;
  zikrText: string;
  isCompleted: boolean;
  onIncrement: () => void;
}

const TasbihCounter: React.FC<TasbihCounterProps> = ({
  currentCount,
  completedRounds,
  rounds,
  zikrText,
  isCompleted,
  onIncrement
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center">
      <div 
        className={`tasbih-counter ${isCompleted ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:shadow-lg'}`} 
        onClick={isCompleted ? undefined : onIncrement}
        style={{
          background: 'linear-gradient(135deg, #267c7f, #164e51)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="counter-text">{currentCount}</div>
        <div className="counter-label font-ibm-plex-arabic">
          {zikrText}
        </div>
        <div className="text-sm mt-2 font-ibm-plex-arabic">
          {`${completedRounds} / ${rounds} ${t('rounds')}`}
        </div>
      </div>
      
      <div className="flex justify-center mt-4 space-x-4 rtl:space-x-reverse">
        <div className="text-center">
          <div className="text-sm text-muted-foreground font-ibm-plex-arabic">{t('completed')}</div>
          <div className="text-2xl font-bold">{completedRounds}</div>
        </div>
        
        <div className="border-r mx-2"></div>
        
        <div className="text-center">
          <div className="text-sm text-muted-foreground font-ibm-plex-arabic">{t('target')}</div>
          <div className="text-2xl font-bold">{rounds}</div>
        </div>
      </div>
      
      {isCompleted && (
        <div className="mt-4 text-center">
          <Button variant="default" className="bg-khair-accent text-black hover:bg-khair-accent/90 font-ibm-plex-arabic">
            <Check className="mr-2 h-4 w-4" />
            {t('congratulations')}! {t('completedAllRounds')}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TasbihCounter;
