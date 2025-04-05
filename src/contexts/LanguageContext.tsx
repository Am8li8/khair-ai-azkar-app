
import React, { createContext, useState, useContext, useEffect } from 'react';

type Language = 'ar';

interface LanguageContextType {
  language: Language;
  t: (key: string) => string;
}

// قاموس الترجمات
const translations: Record<Language, Record<string, string>> = {
  ar: {
    appName: 'خير',
    home: 'الرئيسية',
    morningAzkar: 'أذكار الصباح',
    eveningAzkar: 'أذكار المساء',
    sleepAzkar: 'أذكار النوم',
    wakeupAzkar: 'أذكار الاستيقاظ',
    prayerOpeningAzkar: 'دعاء الاستفتاح',
    afterTashahhudAzkar: 'أذكار بعد التشهد',
    rukuSujudAzkar: 'أذكار الركوع والسجود',
    azanAzkar: 'أذكار سماع الأذان',
    betweenSujudAzkar: 'أذكار بين السجدتين',
    mosqueAzkar: 'أذكار المسجد',
    wuduAzkar: 'أذكار الوضوء',
    afterFoodAzkar: 'دعاء بعد الطعام',
    beforeFoodAzkar: 'دعاء قبل الطعام',
    travelAzkar: 'دعاء السفر',
    istikhaaraAzkar: 'دعاء الاستخارة',
    homeAzkar: 'أذكار المنزل',
    clothesAzkar: 'دعاء لبس الثوب الجديد',
    wearingClothesAzkar: 'دعاء لبس الثوب',
    removingClothesAzkar: 'دعاء وضع الثوب',
    bathroomAzkar: 'أذكار دخول الخلاء',
    tasbih: 'السبحة الإلكترونية',
    quran: 'القرآن الكريم',
    prayerTimes: 'مواقيت الصلاة',
    settings: 'الإعدادات',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    language: 'اللغة',
    currentTime: 'الوقت الحالي',
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
    view: 'عرض',
    numberOfAzkar: 'عدد الأذكار',
    more: 'المزيد...',
    backToHome: 'العودة للرئيسية',
    tasbihSettings: 'إعدادات السبحة',
    tasbihHistory: 'سجل التسبيحات',
    repeat: 'التكرار',
    done: 'تم',
    rounds: 'جولات',
    congratulations: 'مبارك!',
    completedAllRounds: 'تم إكمال جميع الجولات'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language] = useState<Language>('ar');

  useEffect(() => {
    // تحديث اتجاه النص وسمة اللغة في HTML
    const htmlElement = document.documentElement;
    htmlElement.setAttribute('lang', language);
    htmlElement.setAttribute('dir', 'rtl');
  }, [language]);

  // دالة الترجمة
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, t }}>
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
