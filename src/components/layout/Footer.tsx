
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="border-t mt-auto py-6 bg-background">
      <div className="container flex flex-col items-center justify-center">
        <p className="text-center text-muted-foreground text-sm">
          {t('appName')} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
