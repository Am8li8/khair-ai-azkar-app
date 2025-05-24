import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useForm } from 'react-hook-form';
import { Moon, Sun, MessageCircle, Save, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  name: string;
  email: string;
}

const Settings: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [profileData, setProfileData] = useLocalStorage<ProfileData>('userProfile', {
    name: '',
    email: ''
  });
  
  const [isEditing, setIsEditing] = React.useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileData>({
    defaultValues: profileData
  });
  
  const onSubmit = (data: ProfileData) => {
    setProfileData(data);
    setIsEditing(false);
    toast({
      title: "تم الحفظ بنجاح",
      description: "تم حفظ معلوماتك الشخصية",
    });
  };
  
  const handleSupportClick = () => {
    window.open('https://t.me/Am8li8', '_blank');
  };
  
  React.useEffect(() => {
    reset(profileData);
  }, [profileData, reset]);

  const hasProfileData = profileData.name && profileData.email;
  const showForm = !hasProfileData || isEditing;
  
  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6 text-center font-ibm-plex-arabic">الإعدادات</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-ibm-plex-arabic">المعلومات الشخصية</CardTitle>
            <CardDescription className="font-ibm-plex-arabic">
              {showForm ? "أضف اسمك والبريد الإلكتروني" : "معلوماتك الشخصية"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {showForm ? (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-ibm-plex-arabic">الاسم</Label>
                  <Input
                    id="name"
                    placeholder="أدخل اسمك"
                    className="font-ibm-plex-arabic"
                    {...register('name', { required: 'الاسم مطلوب' })}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive font-ibm-plex-arabic">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-ibm-plex-arabic">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    {...register('email', { 
                      required: 'البريد الإلكتروني مطلوب',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'البريد الإلكتروني غير صحيح'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive font-ibm-plex-arabic">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                
                <Button type="submit" className="w-full font-ibm-plex-arabic flex items-center gap-2">
                  <Save size={18} />
                  حفظ المعلومات
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="text-center p-6 bg-muted/50 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2 font-ibm-plex-arabic">
                    أهلاً وسهلاً {profileData.name}!
                  </h3>
                  <p className="text-muted-foreground font-ibm-plex-arabic">
                    نرحب بك في تطبيق الأذكار
                  </p>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <p className="font-ibm-plex-arabic">البريد الإلكتروني: {profileData.email}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full font-ibm-plex-arabic flex items-center gap-2"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit size={18} />
                  تعديل المعلومات
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
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
