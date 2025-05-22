
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { allAzkarCategories } from '@/data/azkar';

const Azkar: React.FC = () => {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = React.useState(allAzkarCategories[0].id);
  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">الأذكار</h1>
      
      <Tabs value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList className="grid grid-cols-3 mb-6 overflow-x-auto">
          {allAzkarCategories.slice(0, 3).map(category => (
            <TabsTrigger key={category.id} value={category.id} className="font-ibm-plex-arabic">
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {allAzkarCategories.map(category => (
          <TabsContent key={category.id} value={category.id} className="space-y-4">
            <div className="bg-muted/20 p-4 rounded-lg">
              <h2 className="text-xl font-bold mb-2 font-ibm-plex-arabic">{category.title}</h2>
              <p className="text-muted-foreground">
                {category.azkar.length} أذكار في هذا القسم
              </p>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Azkar;
