
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';
import { BookOpen } from 'lucide-react';

const Azkar: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = React.useState(allAzkarCategories[0].id);
  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">الأذكار</h1>
      
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6 overflow-x-auto">
          {allAzkarCategories.slice(0, 3).map(category => (
            <TabsTrigger key={category.id} value={category.id} className="font-ibm-plex-arabic">
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {allAzkarCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.azkar.map((zikr, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="bg-muted/30 pb-2">
                    <CardTitle className="text-lg font-ibm-plex-arabic">{zikr.text.split('\n')[0]}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <p className="line-clamp-3 text-muted-foreground font-ibm-plex-arabic">
                      {zikr.text}
                    </p>
                    <div className="mt-2 text-sm text-muted-foreground">
                      <span className="bg-khair-secondary/20 px-2 py-1 rounded-full">
                        {zikr.count} مرات
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-1 pb-4 flex justify-between">
                    <Button 
                      variant="outline"
                      className="w-full font-ibm-plex-arabic"
                      onClick={() => navigate(`/azkar/${category.id}/${index}`)}
                    >
                      <BookOpen className="ml-2" size={18} />
                      عرض الذكر
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Azkar;
