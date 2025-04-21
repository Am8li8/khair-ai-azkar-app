
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/5e9287d5-3df0-4ce9-b1ac-af90ac38383a.png" 
              alt={t('appName')} 
              className="h-28 w-auto"
              title={t('appName')}
            />
          </Link>
        </div>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* رابط لقسم المصحف الجديد */}
          <Link
            to="/mushaf"
            className={`font-ibm-plex-arabic px-4 py-2 rounded transition bg-gradient-to-r from-khair-accent/30 to-khair-accent/50 hover:from-khair-accent/40 hover:to-khair-accent/70 text-black font-bold text-lg
              ${location.pathname.startsWith("/mushaf") ? "border-b-2 border-khair-accent" : ""}
            `}
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.08)"
            }}
          >
            مصحف الملك فهد
          </Link>
          {/* رابط القرآن السابق */}
          <Link
            to="/quran"
            className={`font-ibm-plex-arabic px-4 py-2 rounded transition bg-gradient-to-r from-khair-accent/30 to-khair-accent/50 hover:from-khair-accent/40 hover:to-khair-accent/70 text-black font-bold text-lg
              ${location.pathname.startsWith("/quran") ? "border-b-2 border-khair-accent" : ""}
            `}
            style={{
              textShadow: "0 1px 2px rgba(0,0,0,0.08)"
            }}
          >
            القرآن الكريم
          </Link>
          {location.pathname !== '/' && (
            <Button
              variant="default"
              className="font-ibm-plex-arabic"
              asChild
            >
              <Link to="/">
                <Home size={18} className="ml-2" />
                {t('backToHome')}
              </Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t('lightMode') : t('darkMode')}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
