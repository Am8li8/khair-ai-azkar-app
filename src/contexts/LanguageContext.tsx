
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// قاموس الترجمات
const translations: Record<Language, Record<string, string>> = {
  ar: {
    appName: 'خير',
    home: 'الرئيسية',
    morningAzkar: 'أذكار الصباح',
    eveningAzkar: 'أذكار المساء',
    tasbih: 'السبحة الإلكترونية',
    quran: 'القرآن الكريم',
    prayerTimes: 'مواقيت الصلاة',
    settings: 'الإعدادات',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    language: 'اللغة',
    currentTime: 'الوقت الحالي',
    hijriDate: 'التاريخ الهجري',
    gregorianDate: 'التاريخ الميلادي',
    reset: 'إعادة تعيين',
    save: 'حفظ',
    totalRounds: 'عدد الجولات',
    tasbihCount: 'عدد التسبيحات',
    chooseZikr: 'اختر الذكر',
    customZikr: 'ذكر مخصص',
    startTasbih: 'ابدأ التسبيح',
    completed: 'مكتمل',
    target: 'الهدف',
    subhanAllah: 'سبحان الله',
    alhamdulillah: 'الحمد لله',
    allahuAkbar: 'الله أكبر',
    lailahaillaAllah: 'لا إله إلا الله',
    astaghfirullah: 'أستغفر الله',
    // المزيد من الترجمات...
  },
  en: {
    appName: 'Khair',
    home: 'Home',
    morningAzkar: 'Morning Azkar',
    eveningAzkar: 'Evening Azkar',
    tasbih: 'Digital Tasbih',
    quran: 'Quran',
    prayerTimes: 'Prayer Times',
    settings: 'Settings',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    language: 'Language',
    currentTime: 'Current Time',
    hijriDate: 'Hijri Date',
    gregorianDate: 'Gregorian Date',
    reset: 'Reset',
    save: 'Save',
    totalRounds: 'Total Rounds',
    tasbihCount: 'Tasbih Count',
    chooseZikr: 'Choose Zikr',
    customZikr: 'Custom Zikr',
    startTasbih: 'Start Tasbih',
    completed: 'Completed',
    target: 'Target',
    subhanAllah: 'Subhan Allah',
    alhamdulillah: 'Alhamdulillah',
    allahuAkbar: 'Allahu Akbar',
    lailahaillaAllah: 'La ilaha illa Allah',
    astaghfirullah: 'Astaghfirullah',
    // More translations...
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  useEffect(() => {
    // تحقق من اللغة المحفوظة في المتصفح
    const savedLanguage = localStorage.getItem('khair-language') as Language | null;
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  useEffect(() => {
    // تحديث اتجاه النص وسمة اللغة في HTML
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', language);
    htmlElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('khair-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // دالة الترجمة
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
