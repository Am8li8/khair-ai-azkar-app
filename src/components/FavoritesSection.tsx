
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FavoriteItem } from './HadithDisplay';

interface FavoritesSectionProps {
  favorites: FavoriteItem[];
  onRemoveFromFavorites: (index: number) => void;
  onAddCustomFavorite: (type: "zikr" | "hadith", text: string) => void;
}

const FavoritesSection: React.FC<FavoritesSectionProps> = ({ 
  favorites, 
  onRemoveFromFavorites,
  onAddCustomFavorite
}) => {
  const [customFavInput, setCustomFavInput] = useState("");
  const [customFavType, setCustomFavType] = useState<"zikr" | "hadith">("zikr");

  const handleCustomFavAdd = () => {
    if (!customFavInput.trim()) return;
    onAddCustomFavorite(customFavType, customFavInput.trim());
    setCustomFavInput("");
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-3">المفضلة لديك</h2>
      <div className="flex gap-2 mb-4">
        <Select
          value={customFavType}
          onValueChange={(value) => setCustomFavType(value as "zikr" | "hadith")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="نوع الإضافة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="zikr">ذكر مخصص</SelectItem>
            <SelectItem value="hadith">حديث مخصص</SelectItem>
          </SelectContent>
        </Select>
        <Input
          value={customFavInput}
          onChange={e => setCustomFavInput(e.target.value)}
          className="font-ibm-plex-arabic flex-1"
          placeholder="أضف ذكر/حديث مخصص"
        />
        <Button variant="default" onClick={handleCustomFavAdd}>
          أضف
        </Button>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        {favorites.length === 0 && (
          <div className="text-center p-4 border rounded">لم تقم بحفظ أي أذكار أو أحاديث بعد.</div>
        )}
        {favorites.map((item, idx) => (
          <Card key={`${item.id}_${idx}`} className="relative font-ibm-plex-arabic">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="font-bold text-khair-primary">
                  {item.type === "hadith" ? "حديث" : "ذكر"}
                </span>
                <Button 
                  size="icon" 
                  className="ml-auto" 
                  variant="ghost" 
                  onClick={() => onRemoveFromFavorites(idx)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div>{item.text}</div>
            </CardContent>
            {item.source && (
              <CardFooter>
                <div className="text-muted-foreground text-xs">{item.source}</div>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesSection;
