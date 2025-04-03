
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

const Footer: React.FC = () => {
  const { language, t, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <footer className="border-t mt-auto py-6 bg-background">
      <div className="container flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-4 rtl:space-x-reverse">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
            onClick={toggleTheme}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            {theme === 'light' ? t('darkMode') : t('lightMode')}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          >
            {language === 'ar' ? 'English' : 'العربية'}
          </Button>
        </div>
        
        <p className="text-center text-muted-foreground text-sm">
          {t('appName')} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
