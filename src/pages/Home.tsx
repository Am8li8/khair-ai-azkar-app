
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { morningAzkar, eveningAzkar } from '@/data/azkar';

const Home: React.FC = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="khair-container">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {t('appName')}
      </h1>
      
      <Tabs defaultValue="morning" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="morning">{t('morningAzkar')}</TabsTrigger>
          <TabsTrigger value="evening">{t('eveningAzkar')}</TabsTrigger>
        </TabsList>
        
        <TabsContent value="morning" className="mt-0">
          <div className="space-y-4">
            {morningAzkar.azkar.map((zikr) => (
              <Card key={zikr.id} className="prayer-card overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      {language === 'ar' ? `التكرار: ${zikr.count}` : `Repeat: ${zikr.count}`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="whitespace-pre-line text-lg">
                    {language === 'ar' ? zikr.text : zikr.textEn}
                  </div>
                </CardContent>
                <CardFooter className="pt-3 text-xs text-muted-foreground border-t">
                  <p className="whitespace-pre-line">
                    {language === 'ar' ? zikr.source : zikr.sourceEn}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="evening" className="mt-0">
          <div className="space-y-4">
            {eveningAzkar.azkar.map((zikr) => (
              <Card key={zikr.id} className="prayer-card overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="mb-2">
                      {language === 'ar' ? `التكرار: ${zikr.count}` : `Repeat: ${zikr.count}`}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="whitespace-pre-line text-lg">
                    {language === 'ar' ? zikr.text : zikr.textEn}
                  </div>
                </CardContent>
                <CardFooter className="pt-3 text-xs text-muted-foreground border-t">
                  <p className="whitespace-pre-line">
                    {language === 'ar' ? zikr.source : zikr.sourceEn}
                  </p>
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
