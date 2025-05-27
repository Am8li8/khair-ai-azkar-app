import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Send, Bot, BookOpen, Heart, Star, Moon, Sun, Key } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface IslamicKnowledge {
  category: string;
  icon: React.ElementType;
  questions: string[];
}

const AIAssistant: React.FC = () => {
  const defaultApiKey = 'b209ea36322d218947e91936cfd3a013ac767b166ddec077166463063ca32698';
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'السلام عليكم ورحمة الله وبركاته. أنا مساعدك الذكي الإسلامي المدعوم بالذكاء الاصطناعي المتقدم. يمكنني مساعدتك في جميع الأمور الإسلامية بدقة عالية. كيف يمكنني خدمتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || defaultApiKey);
  const [showApiInput, setShowApiInput] = useState(false);

  const islamicKnowledge: IslamicKnowledge[] = [
    {
      category: 'الأذكار والأدعية',
      icon: BookOpen,
      questions: [
        'ما هي أذكار الصباح؟',
        'ما هي أذكار المساء؟',
        'دعاء النوم',
        'أذكار بعد الصلاة'
      ]
    },
    {
      category: 'الأحكام الشرعية',
      icon: Star,
      questions: [
        'أحكام الوضوء',
        'شروط الصلاة',
        'أحكام الصيام',
        'آداب المسجد'
      ]
    },
    {
      category: 'الأخلاق والآداب',
      icon: Heart,
      questions: [
        'آداب التعامل مع الوالدين',
        'حقوق الجار',
        'آداب الطعام',
        'أخلاق المسلم'
      ]
    }
  ];

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('openai_api_key', apiKey);
      setShowApiInput(false);
      toast({
        title: "تم حفظ مفتاح API",
        description: "يمكنك الآن استخدام المساعد الذكي المتقدم"
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    if (!apiKey) {
      toast({
        title: "مفتاح API مطلوب",
        description: "يرجى إدخال مفتاح OpenAI API أولاً",
        variant: "destructive"
      });
      setShowApiInput(true);
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(inputText);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      toast({
        title: "خطأ في الاتصال",
        description: "حدث خطأ أثناء الحصول على الإجابة. تحقق من مفتاح API وحاول مرة أخرى.",
        variant: "destructive"
      });
    }

    setIsLoading(false);
    setInputText('');
  };

  const getAIResponse = async (question: string): Promise<string> => {
    const systemPrompt = `أنت مساعد ذكي إسلامي متخصص. لديك معرفة عميقة بالقرآن الكريم والسنة النبوية والفقه الإسلامي. 
    
    مهمتك:
    - تقديم إجابات دقيقة ومفصلة باللغة العربية
    - الاستشهاد بالآيات القرآنية والأحاديث النبوية عند الإمكان
    - تقديم الأحكام الشرعية وفقاً لمذاهب أهل السنة والجماعة
    - الرد بأسلوب واضح ومهذب
    - في حالة عدم التأكد من إجابة معينة، اذكر ذلك وانصح بالرجوع للعلماء
    
    اجب على السؤال التالي بطريقة شاملة ومفيدة:`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: question
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get AI response');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  if (showApiInput) {
    return (
      <div className="khair-container min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center font-ibm-plex-arabic">
              إعداد مفتاح OpenAI API
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-ibm-plex-arabic text-center">
              لاستخدام المساعد الذكي المتقدم، يرجى إدخال مفتاح OpenAI API الخاص بك
            </p>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground font-ibm-plex-arabic">
                سيتم حفظ المفتاح محلياً في متصفحك
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={saveApiKey} className="flex-1">
                <Key className="h-4 w-4 ml-2" />
                حفظ المفتاح
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowApiInput(false)}
                className="flex-1"
              >
                استخدام المفتاح الافتراضي
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="khair-container min-h-screen pb-20">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-center font-ibm-plex-arabic mb-2 flex-1">
            المساعد الذكي الإسلامي
          </h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowApiInput(true)}
            className="p-2"
          >
            <Key className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-center text-muted-foreground font-ibm-plex-arabic">
          مساعدك المدعوم بالذكاء الاصطناعي في الأذكار والأحكام الشرعية والإرشاد الديني
        </p>
      </div>

      {/* Quick Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {islamicKnowledge.map((category, index) => (
          <Card key={index} className="cursor-pointer hover:border-khair-accent transition-colors">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-ibm-plex-arabic">
                <category.icon className="h-5 w-5 text-khair-primary" />
                {category.category}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {category.questions.slice(0, 2).map((question, qIndex) => (
                  <Button
                    key={qIndex}
                    variant="ghost"
                    size="sm"
                    className="w-full text-right justify-start font-ibm-plex-arabic text-sm"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Messages */}
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-khair-primary text-white'
                      : 'bg-muted'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.type === 'ai' && (
                      <Bot className="h-4 w-4 mt-1 text-khair-primary" />
                    )}
                    <p className="font-ibm-plex-arabic text-sm leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted p-3 rounded-lg flex items-center gap-2">
                  <Bot className="h-4 w-4 text-khair-primary animate-pulse" />
                  <span className="font-ibm-plex-arabic">جاري الحصول على الإجابة...</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Input Area */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اسأل عن أي موضوع إسلامي..."
              className="font-ibm-plex-arabic resize-none"
              rows={2}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isLoading}
              className="self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <Badge 
          variant="outline" 
          className="cursor-pointer font-ibm-plex-arabic"
          onClick={() => handleQuickQuestion('ما هي أذكار الصباح؟')}
        >
          <Sun className="h-3 w-3 ml-1" />
          أذكار الصباح
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer font-ibm-plex-arabic"
          onClick={() => handleQuickQuestion('ما هي أذكار المساء؟')}
        >
          <Moon className="h-3 w-3 ml-1" />
          أذكار المساء
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer font-ibm-plex-arabic"
          onClick={() => handleQuickQuestion('أحكام الوضوء')}
        >
          <BookOpen className="h-3 w-3 ml-1" />
          أحكام الوضوء
        </Badge>
      </div>
    </div>
  );
};

export default AIAssistant;
