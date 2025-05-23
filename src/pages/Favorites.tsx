
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useNavigate } from 'react-router-dom';

interface FavoriteItem {
  type: "zikr" | "hadith";
  id: number;
  text: string;
  source?: string;
}

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useLocalStorage<FavoriteItem[]>("khair-favorites", []);
  const navigate = useNavigate();

  const handleRemoveFavorite = (index: number) => {
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  };

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">المفضلة</h1>
      
      {favorites.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg">
          <h2 className="text-xl mb-2 font-ibm-plex-arabic">لا توجد عناصر مفضلة</h2>
          <p className="text-muted-foreground mb-4 font-ibm-plex-arabic">
            يمكنك إضافة الأذكار والأحاديث إلى المفضلة لتظهر هنا
          </p>
          <Button variant="outline" className="font-ibm-plex-arabic" onClick={() => navigate('/azkar')}>
            استعرض الأذكار
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {favorites.map((item, idx) => (
            <Card key={idx} className="font-ibm-plex-arabic">
              <CardHeader className="flex flex-row justify-between items-center">
                <div className="text-sm text-khair-primary font-bold">
                  {item.type === 'zikr' ? 'ذكر' : 'حديث'}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={() => handleRemoveFavorite(idx)}
                >
                  ×
                </Button>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{item.text}</p>
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
