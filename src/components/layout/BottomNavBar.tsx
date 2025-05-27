
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Bookmark, Settings, BookOpen, Bot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const BottomNavBar: React.FC = () => {
  const { t } = useLanguage();
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'الرئيسية', 
      path: '/', 
      icon: Home 
    },
    { 
      name: 'الأذكار', 
      path: '/azkar', 
      icon: BookOpen 
    },
    { 
      name: 'المساعد الذكي', 
      path: '/ai-assistant', 
      icon: Bot 
    },
    { 
      name: 'المفضلة', 
      path: '/favorites', 
      icon: Bookmark 
    },
    { 
      name: 'الإعدادات', 
      path: '/settings', 
      icon: Settings 
    }
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || 
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          return (
            <Link 
              to={item.path} 
              key={item.name} 
              className={cn(
                "flex flex-col items-center justify-center text-xs gap-1 transition-colors",
                isActive 
                  ? "text-khair-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              <span className="font-ibm-plex-arabic text-[10px]">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNavBar;
