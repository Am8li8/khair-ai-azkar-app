
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface HistoryEntry {
  zikr: string;
  count: number;
  date: string;
}

interface TasbihHistoryProps {
  history: HistoryEntry[];
}

const TasbihHistory: React.FC<TasbihHistoryProps> = ({ history }) => {
  const { t } = useLanguage();

  if (!history || history.length === 0) {
    return null;
  }

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="font-ibm-plex-arabic">
          {t('dhikrHistory')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {history.slice(-5).reverse().map((entry, index) => (
            <div key={index} className="flex justify-between items-center p-2 border-b">
              <div className="flex-1">
                <span className="font-medium font-ibm-plex-arabic">{entry.zikr}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Badge variant="outline" className="font-ibm-plex-arabic">
                  {`${entry.count} مرة`}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {new Date(entry.date).toLocaleString('ar-EG')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TasbihHistory;
