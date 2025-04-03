
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getCairoTime, formatTime, formatGregorianDate, getHijriDate } from '@/utils/time';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [currentTime, setCurrentTime] = React.useState<Date>(getCairoTime());
  
  // تحديث الوقت كل دقيقة
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCairoTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-khair-primary">
              {t('appName')}
            </h1>
          </Link>
        </div>
        
        <div className="hidden md:flex text-muted-foreground text-sm ml-8 mr-auto">
          <div className="mr-4 flex flex-col">
            <span>{t('currentTime')}: {formatTime(currentTime, language)}</span>
            <span>{t('hijriDate')}: {getHijriDate(currentTime, language)}</span>
          </div>
          <div className="flex flex-col">
            <span>{t('gregorianDate')}: {formatGregorianDate(currentTime, language)}</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-4 space-x-reverse rtl:space-x-reverse">
          <Link 
            to="/" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/' 
                ? 'text-primary bg-secondary/50' 
                : 'text-foreground hover:bg-secondary/20'
            }`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/tasbih" 
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              location.pathname === '/tasbih' 
                ? 'text-primary bg-secondary/50' 
                : 'text-foreground hover:bg-secondary/20'
            }`}
          >
            {t('tasbih')}
          </Link>
        </nav>
        
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={t('language')}>
                <Languages size={20} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('ar')}>
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('en')}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
