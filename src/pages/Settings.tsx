
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Moon, Sun, MessageCircle } from 'lucide-react';

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  
  const handleSupportClick = () => {
    window.open('https://t.me/Am8li8', '_blank');
  };
  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">الإعدادات</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-ibm-plex-arabic">المظهر</CardTitle>
            <CardDescription className="font-ibm-plex-arabic">
              تخصيص مظهر التطبيق
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-ibm-plex-arabic">الوضع المظلم</span>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={toggleTheme}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                {theme === 'light' ? t('darkMode') : t('lightMode')}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-ibm-plex-arabic">الدعم الفني</CardTitle>
            <CardDescription className="font-ibm-plex-arabic">
              تواصل معنا للمساعدة
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              variant="default" 
              className="w-full font-ibm-plex-arabic flex items-center gap-2 justify-center"
              onClick={handleSupportClick}
            >
              <MessageCircle size={18} />
              تواصل مع الدعم الفني
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="font-ibm-plex-arabic">معلومات التطبيق</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-ibm-plex-arabic">الإصدار</span>
              <span>1.0.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
