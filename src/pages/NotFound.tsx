
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-khair-primary">404</h1>
        <p className="text-xl text-foreground mb-6">
          {t('language') === 'ar' 
            ? 'عذراً، الصفحة غير موجودة' 
            : 'Oops! Page not found'}
        </p>
        <Button asChild>
          <a href="/">
            {t('language') === 'ar' ? 'العودة للصفحة الرئيسية' : 'Return to Home'}
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
