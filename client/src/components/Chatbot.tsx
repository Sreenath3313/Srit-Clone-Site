import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Send, MessageCircle, Minimize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

const faqs: FAQ[] = [
  {
    question: "How do I mark attendance?",
    answer: "To mark attendance:\n1. Login as faculty\n2. Navigate to 'Attendance' from the sidebar\n3. Select your class (Subject - Section) from the dropdown\n4. Select today's date\n5. Click Present/Absent for each student\n6. Click 'Save Attendance' button\n\nYou can also use 'All Present' or 'All Absent' buttons for quick marking!",
    keywords: ['attendance', 'mark', 'present', 'absent', 'how to mark']
  },
  {
    question: "How do I enter marks?",
    answer: "To enter marks:\n1. Login as faculty\n2. Go to 'Marks' page\n3. Select your class and exam type (Internal 1, Internal 2, or External)\n4. Enter marks for each student in the input fields\n5. Marks are auto-saved as you type!\n\nNote: Internal exams are out of 20, External is out of 100.",
    keywords: ['marks', 'enter', 'grades', 'internal', 'external', 'exam']
  },
  {
    question: "How do I view my timetable?",
    answer: "Students can view their timetable by:\n1. Login to your student account\n2. Click 'Timetable' in the sidebar\n3. View your weekly class schedule with day, time, subject, and faculty\n\nFaculty can view their assigned classes on the Dashboard or Attendance page.",
    keywords: ['timetable', 'schedule', 'classes', 'view', 'weekly']
  },
  {
    question: "How do I add students?",
    answer: "Only administrators can add students:\n1. Login as admin\n2. Go to 'Students' page\n3. Click 'Add Student' button\n4. Fill in: Roll No, Name, Email, Password, Section, Admission Year\n5. Click 'Submit'\n\nThe system automatically creates a user account for the student!",
    keywords: ['add student', 'create student', 'new student', 'register']
  },
  {
    question: "How do I add faculty?",
    answer: "Only administrators can add faculty:\n1. Login as admin\n2. Go to 'Faculty' page\n3. Click 'Add Faculty' button\n4. Fill in: Employee ID, Name, Email, Password, Department\n5. Click 'Submit'\n\nThen assign them to classes in the 'Assignments' page!",
    keywords: ['add faculty', 'create faculty', 'new teacher', 'professor']
  },
  {
    question: "How do I assign faculty to classes?",
    answer: "To create timetable assignments:\n1. Login as admin\n2. Go to 'Assignments' page (Timetable)\n3. Click 'Add Assignment'\n4. Select: Section, Subject, Faculty, Day, Period\n5. Click 'Submit'\n\nThis links faculty to their teaching sections!",
    keywords: ['assign', 'timetable', 'schedule', 'faculty assignment', 'teaching']
  },
  {
    question: "What are the default passwords?",
    answer: "Default passwords:\n- Admin: Set manually when creating admin user\n- Faculty: 'faculty123' (created by admin)\n- Student: 'student123' (created by admin)\n\nAll users can change their password from Settings → Change Password.",
    keywords: ['password', 'default', 'login', 'credentials']
  },
  {
    question: "How do I change my password?",
    answer: "To change your password:\n1. Login to your account\n2. Click your profile icon (top right)\n3. Select 'Change Password'\n4. Enter your new password\n5. Confirm and click 'Update Password'\n\nYou'll be logged out and need to login with the new password.",
    keywords: ['change password', 'update password', 'reset password']
  },
  {
    question: "What features does the system have?",
    answer: "College ERP Features:\n\n📊 For Admin:\n- Manage departments, sections, subjects\n- Add/edit students and faculty\n- Create timetable assignments\n- View system statistics\n\n👨‍🏫 For Faculty:\n- Mark student attendance\n- Enter and manage marks\n- View assigned classes\n- Dashboard with teaching stats\n\n🎓 For Students:\n- View attendance records\n- View marks and grades\n- Check weekly timetable\n- Update profile",
    keywords: ['features', 'what can', 'functions', 'capabilities', 'system']
  },
  {
    question: "How do I navigate the system?",
    answer: "Navigation:\n- Use the sidebar menu on the left for main sections\n- Top bar shows your profile and logout option\n- Breadcrumbs show your current location\n- Use the back button in your browser if needed\n\nEach role (Admin/Faculty/Student) sees different menu options based on their permissions.",
    keywords: ['navigate', 'menu', 'sidebar', 'how to use', 'interface']
  }
];

const greetings = [
  "Hello! I'm your SRIT assistant. How can I help you today?",
  "Hi there! Ask me anything about the College SRIT system.",
  "Welcome! I'm here to help you with the SRIT system."
];

function getBotResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();
  
  // Check for greetings
  if (/^(hi|hello|hey|greetings)/i.test(userMessage)) {
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Check for thanks
  if (/thank|thanks/i.test(userMessage)) {
    return "You're welcome! Feel free to ask if you have more questions.";
  }
  
  // Search FAQs for matching keywords
  for (const faq of faqs) {
    for (const keyword of faq.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return faq.answer;
      }
    }
  }
  
  // Default response with FAQ list
  return "I'm not sure about that specific question, but here are some topics I can help with:\n\n" +
    "• Marking attendance\n" +
    "• Entering marks\n" +
    "• Viewing timetables\n" +
    "• Adding students/faculty\n" +
    "• Assigning classes\n" +
    "• Passwords and login\n" +
    "• System features\n" +
    "• Navigation help\n\n" +
    "Try asking about any of these!";
}

// Utility function for generating unique IDs
function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('srit-chat-history');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp)
        })));
      } catch (e) {
        console.error('Error loading chat history:', e);
      }
    } else {
      // Welcome message
      setMessages([{
        id: '1',
        text: greetings[0],
        sender: 'bot',
        timestamp: new Date()
      }]);
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('srit-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

    const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: generateId(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "How do I mark attendance?",
    "How do I enter marks?",
    "How do I add students?",
    "What are the default passwords?"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ 
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="relative w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg flex items-center justify-center transition-all hover:shadow-2xl"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
          {/* Notification Badge with Pulse */}
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white"
          >
            1
          </motion.span>
          {/* Pulse Ring Animation */}
          <motion.span
            animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-primary rounded-full"
          />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className={`bg-background border border-border rounded-2xl shadow-2xl transition-all ${
        isMinimized ? 'w-80 h-14' : 'w-96 h-[600px]'
      } flex flex-col`}>
        {/* Header */}
        <div className="bg-primary text-primary-foreground px-4 py-3 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">SRIT Assistant</h3>
              <p className="text-xs opacity-90">Always here to help</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-primary-foreground/20 p-1.5 rounded transition-colors"
              aria-label={isMinimized ? "Expand" : "Minimize"}
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-primary-foreground/20 p-1.5 rounded transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-border bg-background/50">
                <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setInputValue(action);
                        setTimeout(() => handleSend(), 100);
                      }}
                      className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-background rounded-b-2xl">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 border border-border rounded-full bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:cursor-not-allowed text-primary-foreground rounded-full flex items-center justify-center transition-colors"
                  aria-label="Send message"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
