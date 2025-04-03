
import { format, addHours } from 'date-fns';
import { arEG, enUS } from 'date-fns/locale';

// وظيفة لاسترجاع وقت القاهرة الحالي (UTC+2)
export function getCairoTime(): Date {
  const now = new Date();
  // تعديل الوقت لمنطقة القاهرة (UTC+2)
  // هذه طريقة مبسطة، للتطبيق الحقيقي يفضل استخدام مكتبة مثل date-fns-tz
  return addHours(now, 2);
}

// تنسيق الوقت بحسب اللغة
export function formatTime(date: Date, language: 'ar' | 'en'): string {
  const locale = language === 'ar' ? arEG : enUS;
  return format(date, 'h:mm a', { locale });
}

// تنسيق التاريخ الميلادي
export function formatGregorianDate(date: Date, language: 'ar' | 'en'): string {
  const locale = language === 'ar' ? arEG : enUS;
  return format(date, 'EEEE, d MMMM yyyy', { locale });
}

// تحويل تقريبي للتاريخ الهجري
// ملاحظة: هذه صيغة تقريبية جدًا، لتطبيق حقيقي يفضل استخدام مكتبة متخصصة للتقويم الهجري
export function getHijriDate(date: Date, language: 'ar' | 'en'): string {
  // معامل تحويل تقريبي (السنة الهجرية أقصر من السنة الميلادية بحوالي 11 يوم)
  const gregorianDate = new Date(date);
  
  // حساب عدد الأيام منذ بداية التقويم الهجري (تقريبي)
  const hijriEpoch = new Date(622, 6, 16);
  const daysSinceEpoch = Math.floor((gregorianDate.getTime() - hijriEpoch.getTime()) / (1000 * 60 * 60 * 24));
  
  // تحويل لسنوات وأشهر وأيام هجرية (تقريبي)
  const hijriYear = Math.floor(daysSinceEpoch / 354.367) + 1;
  const daysInCurrentYear = daysSinceEpoch % 354.367;
  
  // تقدير الشهر الهجري
  const hijriMonthLength = 29.5; // متوسط طول الشهر الهجري
  const hijriMonth = Math.min(Math.floor(daysInCurrentYear / hijriMonthLength) + 1, 12);
  const hijriDay = Math.floor(daysInCurrentYear % hijriMonthLength) + 1;
  
  // أسماء الأشهر الهجرية
  const hijriMonthsAr = [
    'محرم', 'صفر', 'ربيع الأول', 'ربيع الثاني',
    'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان',
    'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'
  ];
  
  const hijriMonthsEn = [
    'Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Shaban',
    'Ramadan', 'Shawwal', 'Dhu al-Qadah', 'Dhu al-Hijjah'
  ];
  
  if (language === 'ar') {
    return `${hijriDay} ${hijriMonthsAr[hijriMonth - 1]} ${hijriYear} هـ`;
  } else {
    return `${hijriDay} ${hijriMonthsEn[hijriMonth - 1]}, ${hijriYear} AH`;
  }
}
