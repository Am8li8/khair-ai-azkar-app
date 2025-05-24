
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import BottomNavBar from "@/components/layout/BottomNavBar";
import Home from "@/pages/Home";
import Azkar from "@/pages/Azkar";
import Settings from "@/pages/Settings";
import Favorites from "@/pages/Favorites";
import NotFound from "@/pages/NotFound";
import ZikrDetail from "@/pages/ZikrDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <main className="flex-1 pb-16">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/azkar" element={<Azkar />} />
                  <Route path="/azkar/:categoryId/:zikrIndex" element={<ZikrDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <BottomNavBar />
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
