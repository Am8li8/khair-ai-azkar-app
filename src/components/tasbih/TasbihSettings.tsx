
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RotateCcw } from 'lucide-react';
import { defaultTasbihOptions } from '@/data/azkar';
import { useLanguage } from '@/contexts/LanguageContext';

interface TasbihSettingsProps {
  selectedZikr: string;
  customZikr: string;
  targetCount: number;
  rounds: number;
  onZikrSelect: (value: string) => void;
  onCustomZikrChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTargetCountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRoundsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
}

const TasbihSettings: React.FC<TasbihSettingsProps> = ({
  selectedZikr,
  customZikr,
  targetCount,
  rounds,
  onZikrSelect,
  onCustomZikrChange,
  onTargetCountChange,
  onRoundsChange,
  onReset
}) => {
  const { t } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="font-ibm-plex-arabic">{t('chooseZikr')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="zikr-select" className="font-ibm-plex-arabic">{t('chooseZikr')}</Label>
          <Select 
            value={selectedZikr} 
            onValueChange={onZikrSelect}
          >
            <SelectTrigger id="zikr-select">
              <SelectValue placeholder={t('chooseZikr')} />
            </SelectTrigger>
            <SelectContent>
              {defaultTasbihOptions.map(option => (
                <SelectItem key={option.id} value={option.id} className="font-ibm-plex-arabic">
                  {option.text} ({option.count})
                </SelectItem>
              ))}
              <SelectItem value="custom" className="font-ibm-plex-arabic">{t('customZikr')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {selectedZikr === 'custom' && (
          <div className="space-y-2">
            <Label htmlFor="custom-zikr" className="font-ibm-plex-arabic">{t('customZikr')}</Label>
            <Input
              id="custom-zikr"
              value={customZikr}
              onChange={onCustomZikrChange}
              placeholder="أدخل الذكر المخصص"
              className="font-ibm-plex-arabic"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="target-count" className="font-ibm-plex-arabic">{t('target')}</Label>
          <Input
            id="target-count"
            type="number"
            value={targetCount}
            onChange={onTargetCountChange}
            min={1}
            max={1000}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="rounds" className="font-ibm-plex-arabic">{t('totalRounds')}</Label>
          <Input
            id="rounds"
            type="number"
            value={rounds}
            onChange={onRoundsChange}
            min={1}
            max={100}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full font-ibm-plex-arabic" onClick={onReset}>
          <RotateCcw className="mr-2 h-4 w-4" />
          {t('reset')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TasbihSettings;
