
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

const Favorites: React.FC = () => {
  // This would be replaced with real data from localStorage or context
  const [favorites, setFavorites] = React.useState<any[]>([]);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">المفضلة</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <h2 className="text-xl mb-2 font-ibm-plex-arabic">لا توجد عناصر مفضلة</h2>
          <p className="text-muted-foreground mb-4 font-ibm-plex-arabic">
            يمكنك إضافة الأذكار والأحاديث إلى المفضلة لتظهر هنا
          </p>
          <Button variant="outline" className="font-ibm-plex-arabic">
            استعرض الأذكار
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {favorites.map((item, idx) => (
            <Card key={idx} className="font-ibm-plex-arabic">
              <CardHeader>
                <div className="text-sm text-muted-foreground">
                  {item.type === 'zikr' ? 'ذكر' : 'حديث'}
                </div>
              </CardHeader>
              <CardContent>
                <p>{item.text}</p>
              </CardContent>
              {item.source && (
                <CardFooter className="text-xs text-muted-foreground flex items-start">
                  <BookOpen size={14} className="ml-2 mt-0.5" />
                  <span>{item.source}</span>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
