
import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { allAhadith, FavoriteItem } from './HadithDisplay';

interface HadithsSectionProps {
  favorites: FavoriteItem[];
  onAddToFavorites: (item: FavoriteItem) => void;
}

const HadithsSection: React.FC<HadithsSectionProps> = ({ favorites, onAddToFavorites }) => {
  const isInFavorites = (hadith: { id: number }) => {
    return favorites.some(item => item.type === "hadith" && item.id === hadith.id);
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">أحاديث نبوية</h2>
      </div>
      {allAhadith.map(hadith => (
        <Card key={hadith.id} className="mb-4 relative">
          <CardHeader className="pb-2">
            <div className="font-ibm-plex-arabic text-lg">{hadith.text}</div>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm">{hadith.source}</div>
          </CardContent>
          <CardFooter>
            <Button
              variant={isInFavorites(hadith) ? "secondary" : "outline"}
              size="sm"
              className="flex items-center gap-2"
              onClick={() =>
                onAddToFavorites({
                  type: "hadith",
                  id: hadith.id,
                  text: hadith.text,
                  source: hadith.source,
                })
              }
            >
              {isInFavorites(hadith) ? (
                <>
                  <BookmarkCheck className="h-4 w-4" /> 
                  تمت الإضافة للمفضلة
                </>
              ) : (
                <>
                  <Bookmark className="h-4 w-4" /> 
                  أضف للمفضلة
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default HadithsSection;
