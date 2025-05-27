
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Send, Bot, BookOpen, Heart, Star, Moon, Sun } from 'lucide-react';

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
  responses: { [key: string]: string };
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: 'السلام عليكم ورحمة الله وبركاته. أنا مساعدك الذكي الإسلامي. يمكنني مساعدتك في الأذكار، الأدعية، أحكام الشريعة، والإرشاد الديني. كيف يمكنني خدمتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const islamicKnowledge: IslamicKnowledge[] = [
    {
      category: 'الأذكار والأدعية',
      icon: BookOpen,
      questions: [
        'ما هي أذكار الصباح؟',
        'ما هي أذكار المساء؟',
        'دعاء النوم',
        'أذكار بعد الصلاة'
      ],
      responses: {
        'ما هي أذكار الصباح؟': 'أذكار الصباح تشمل: آية الكرسي، المعوذات (الإخلاص والفلق والناس)، سبحان الله وبحمده 100 مرة، لا إله إلا الله وحده لا شريك له، أستغفر الله العظيم، والعديد من الأذكار الأخرى المأثورة عن النبي صلى الله عليه وسلم.',
        'ما هي أذكار المساء؟': 'أذكار المساء مشابهة لأذكار الصباح وتشمل: آية الكرسي، المعوذات، سبحان الله وبحمده، أستغفر الله، ودعاء المساء "اللهم أمسينا وأمسى الملك لله".',
        'دعاء النوم': '"باسمك اللهم أموت وأحيا" و "اللهم أسلمت نفسي إليك، وفوضت أمري إليك، وألجأت ظهري إليك، رغبة ورهبة إليك".',
        'أذكار بعد الصلاة': 'تشمل: أستغفر الله ثلاثاً، اللهم أنت السلام ومنك السلام، سبحان الله 33 مرة، الحمد لله 33 مرة، الله أكبر 34 مرة.'
      }
    },
    {
      category: 'الأحكام الشرعية',
      icon: Star,
      questions: [
        'أحكام الوضوء',
        'شروط الصلاة',
        'أحكام الصيام',
        'آداب المسجد'
      ],
      responses: {
        'أحكام الوضوء': 'الوضوء له فروض وسنن. الفروض: النية، غسل الوجه، غسل اليدين إلى المرفقين، مسح الرأس، غسل الرجلين إلى الكعبين، والترتيب والموالاة.',
        'شروط الصلاة': 'شروط الصلاة تشمل: الطهارة، ستر العورة، استقبال القبلة، دخول الوقت، والنية.',
        'أحكام الصيام': 'الصيام له أركان وشروط. من أركانه: النية والإمساك عن المفطرات من الفجر إلى المغرب.',
        'آداب المسجد': 'من آداب المسجد: الدخول بالقدم اليمنى، الخروج بالقدم اليسرى، صلاة تحية المسجد، عدم رفع الصوت، والمحافظة على النظافة.'
      }
    },
    {
      category: 'الأخلاق والآداب',
      icon: Heart,
      questions: [
        'آداب التعامل مع الوالدين',
        'حقوق الجار',
        'آداب الطعام',
        'أخلاق المسلم'
      ],
      responses: {
        'آداب التعامل مع الوالدين': 'برّ الوالدين واجب، ويشمل: الطاعة في المعروف، الإحسان إليهما، خفض الجناح لهما، وعدم قول "أف" لهما.',
        'حقوق الجار': 'للجار حقوق عديدة منها: عدم إيذائه، الإحسان إليه، تفقد أحواله، كف الأذى عنه، وتحمل أذاه.',
        'آداب الطعام': 'من آداب الطعام: التسمية قبل الأكل، الأكل باليمين، الأكل مما يلي الآكل، عدم الإسراف، والحمد بعد الانتهاء.',
        'أخلاق المسلم': 'المسلم يتحلى بالصدق، الأمانة، الصبر، التواضع، الرحمة، العدل، والإحسان إلى الخلق.'
      }
    }
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response based on Islamic knowledge
    setTimeout(() => {
      const response = getIslamicResponse(inputText);
      const aiMessage: Message = {
        id: messages.length + 2,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);

    setInputText('');
  };

  const getIslamicResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Search through Islamic knowledge base
    for (const category of islamicKnowledge) {
      for (const [key, response] of Object.entries(category.responses)) {
        if (lowerQuestion.includes(key.toLowerCase()) || 
            key.toLowerCase().includes(lowerQuestion)) {
          return response;
        }
      }
    }

    // Default responses for common Islamic greetings and questions
    if (lowerQuestion.includes('سلام') || lowerQuestion.includes('مرحبا')) {
      return 'وعليكم السلام ورحمة الله وبركاته. أهلاً وسهلاً بك. كيف يمكنني مساعدتك في أمور دينك؟';
    }
    
    if (lowerQuestion.includes('شكر') || lowerQuestion.includes('جزاك الله')) {
      return 'وإياكم، بارك الله فيكم. أسأل الله أن ينفعنا وإياكم بما نتعلم.';
    }

    if (lowerQuestion.includes('قرآن') || lowerQuestion.includes('آية')) {
      return 'القرآن الكريم هو كلام الله المنزل على سيدنا محمد صلى الله عليه وسلم. يمكنك سؤالي عن تفسير آيات معينة أو أحكام قرآنية محددة.';
    }

    if (lowerQuestion.includes('حديث') || lowerQuestion.includes('سنة')) {
      return 'السنة النبوية هي المصدر الثاني للتشريع الإسلامي. يمكنني مساعدتك في فهم الأحاديث النبوية وتطبيقها في الحياة اليومية.';
    }

    return 'أعتذر، لم أتمكن من فهم سؤالك بوضوح. يمكنك سؤالي عن الأذكار، الأدعية، الأحكام الشرعية، الأخلاق الإسلامية، أو أي موضوع ديني آخر. حاول إعادة صياغة السؤال بشكل أوضح.';
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="khair-container min-h-screen pb-20">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center font-ibm-plex-arabic mb-2">
          المساعد الذكي الإسلامي
        </h1>
        <p className="text-center text-muted-foreground font-ibm-plex-arabic">
          مساعدك في الأذكار والأحكام الشرعية والإرشاد الديني
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
                    <p className="font-ibm-plex-arabic text-sm leading-relaxed">
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
                  <span className="font-ibm-plex-arabic">جاري الكتابة...</span>
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
              placeholder="اكتب سؤالك هنا..."
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
