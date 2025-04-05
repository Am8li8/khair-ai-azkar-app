
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Home } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  return (
    <footer className="border-t mt-auto py-6 bg-background">
      <div className="container flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-4 rtl:space-x-reverse">
          {location.pathname !== '/' && (
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 font-ibm-plex-arabic"
              asChild
            >
              <Link to="/">
                <Home size={16} />
                {t('backToHome')}
              </Link>
            </Button>
          )}
          
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
        
        <p className="text-center text-muted-foreground text-sm">
          {t('appName')} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
