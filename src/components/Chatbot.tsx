import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle,
  TrendingUp, 
  BookOpen, 
  Coins, 
  Info 
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Simple custom Markdown-to-JSX parser to render lists, bolding, and headings beautifully
const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  let inList = false;
  const listItems: string[] = [];
  const renderedElements: React.ReactNode[] = [];

  const flushList = (key: number) => {
    if (listItems.length > 0) {
      renderedElements.push(
        <ul key={`list-${key}`} className="list-disc pl-5 my-2.5 space-y-1 text-slate-700 font-sans text-xs sm:text-sm">
          {listItems.map((item, id) => (
            <li key={id} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item) }} />
          ))}
        </ul>
      );
      listItems.length = 0;
    }
  };

  const formatInlineMarkdown = (raw: string) => {
    // Bold **text**
    let formatted = raw.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>');
    // Italic *text*
    formatted = formatted.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
    // Code blocks
    formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-slate-100 text-rose-600 px-1 py-0.5 rounded text-xs font-mono">$1</code>');
    return formatted;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    // Headers: e.g., ### Title or ## Title
    if (trimmed.startsWith('###')) {
      flushList(index);
      inList = false;
      const content = trimmed.substring(3).trim();
      renderedElements.push(
        <h4 key={index} className="text-xs sm:text-sm font-extrabold text-slate-900 mt-3.5 mb-1 tracking-tight font-sans" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
      );
    } else if (trimmed.startsWith('##')) {
      flushList(index);
      inList = false;
      const content = trimmed.substring(2).trim();
      renderedElements.push(
        <h3 key={index} className="text-sm sm:text-base font-extrabold text-slate-950 mt-4 mb-1.5 tracking-tight font-sans border-b border-gray-100 pb-1" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(content) }} />
      );
    }
    // Bullet points: starts with - or * or numbered list "1. " or "2. "
    else if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
      inList = true;
      const content = trimmed.substring(trimmed.startsWith('-') ? 1 : 1).trim();
      listItems.push(content);
    } 
    // Numbered List Items
    else if (/^\d+\.\s/.test(trimmed)) {
      flushList(index);
      inList = false;
      renderedElements.push(
        <div key={index} className="pl-4 my-1.5 font-sans text-xs sm:text-sm text-slate-700 flex gap-2">
          <span className="font-bold text-emerald-800 shrink-0">{trimmed.match(/^\d+\./)?.[0]}</span>
          <p dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed.replace(/^\d+\.\s/, '')) }} />
        </div>
      );
    }
    // Standard paragraphs / blank spaces
    else {
      if (trimmed === '') {
        flushList(index);
        inList = false;
      } else {
        if (inList) {
          // Continue list or break it
          flushList(index);
          inList = false;
        }
        renderedElements.push(
          <p key={index} className="text-xs sm:text-sm text-slate-700 font-sans leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }} />
        );
      }
    }
  });

  // Final flush in case file ends while still in bullet state
  flushList(lines.length);

  return <div className="space-y-0.5">{renderedElements}</div>;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Vanakkam! I am the **Thoothukudi CSR Desk AI Assistant**. How can I assist you today? I can help you explore available CSR project blueprints, guide you through our online sponsorship desk, clarify legal rules under Section 135, or provide details about the District administration society.',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the absolute bottom of dialogue on new logs
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Frequently Asked Questions / Suggestion prompts
  const suggestionStarters = [
    { label: 'How to use Projects section?', text: 'How do I view and select active welfare blueprints in the Projects section?', icon: BookOpen },
    { label: 'How to sponsor projects?', text: 'How do I fill out details and submit my sponsorship interest in the Sponsorship section?', icon: HelpCircle },
    { label: 'Who are the Board members?', text: 'Where can I find information about the administration society and board members?', icon: Info },
    { label: 'Where is the Gallery and Contact?', text: 'Where can I see photos of ongoing works and find direct PMU contact coordinates?', icon: TrendingUp },
  ];

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    setErrorText(null);
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content: userText,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        setMessages(prev => [...prev, {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: new Date(),
        }]);
      } else {
        // Handle error details elegantly
        const details = data.details || data.error || 'Server returned an invalid state.';
        setErrorText(details);
        setMessages(prev => [...prev, {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: `⚠️ **System Integration Notice:** \n\n${details}`,
          timestamp: new Date(),
        }]);
      }
    } catch (err) {
      console.error(err);
      setErrorText('Could not communicate with the backend.');
      setMessages(prev => [...prev, {
        id: `ai-err-${Date.now()}`,
        role: 'assistant',
        content: `❌ **Network Timeout:** The active agent workspace server could not be reached. Make sure your local Express server script is active or retry.`,
        timestamp: new Date(),
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. Floating Action Toggle Button */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center h-14 w-14 rounded-full bg-emerald-700 text-white shadow-2xl hover:bg-emerald-800 transition-colors cursor-pointer pointer-events-auto border border-white/20 select-none relative group"
          aria-label="Open CSR AI Assistant"
          id="btn-chatbot-toggle"
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <MessageSquare className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
              </span>
            </div>
          )}
          
          {/* Subtle tooltip on hover */}
          <span className="absolute right-16 top-3 bg-slate-900 text-white text-xs px-2.5 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none font-sans font-medium">
            CSR Assistant
          </span>
        </motion.button>
      </div>

      {/* 2. Chat Widget Window container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.92 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[100] w-[calc(100vw-32px)] sm:w-[410px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-slate-150 overflow-hidden flex flex-col pointer-events-auto"
            id="chatbot-window"
          >
            {/* Header portion */}
            <div className="bg-emerald-700 p-4 shrink-0 flex items-center justify-between text-white border-b border-emerald-820">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-white/10 rounded-lg flex items-center justify-center border border-white/15">
                  <Sparkles className="h-5 w-5 text-teal-300" />
                </div>
                <div>
                  <h3 className="font-sans font-extrabold text-[14px] leading-tight tracking-tight flex items-center gap-1.5 text-white">
                    Thoothukudi CSR Desk AI
                  </h3>
                  <p className="text-[10px] text-emerald-100 font-sans tracking-wide font-medium flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-300 animate-pulse inline-block" />
                    Official administration assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 transition-colors text-emerald-100 hover:text-white cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Warning bar for Missing Secret API Key inside AI frame */}
            {errorText && (
              <div className="bg-rose-50 border-b border-rose-100 p-2 text-[10.5px] text-rose-800 font-medium font-sans px-3 shrink-0 flex gap-2 items-start">
                <span className="font-bold shrink-0">Secret Status:</span>
                <p className="line-clamp-2">Ensure your GEMINI_API_KEY is configured in the AI Studio platformsecrets panel.</p>
              </div>
            )}

            {/* Conversation Area */}
            <div className="flex-grow p-4 overflow-y-auto bg-slate-50 space-y-4 select-text">
              {/* Cute Cartoon Mascot Greeting Panel */}
              <div className="bg-emerald-50/70 rounded-2xl p-3 border border-emerald-100 flex items-center gap-3 shadow-[0_2px_10px_rgba(4,120,87,0.03)]">
                <img 
                  src="/assets/images/pmu_mascot_1781699177557.jpg" 
                  alt="Thoothukudi PMU Mascot" 
                  className="h-14 w-14 rounded-full border-2 border-emerald-200 shadow-sm shrink-0 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-sans">Official AI Helper</h4>
                  <p className="text-[11px] text-slate-600 font-sans leading-relaxed">
                    Hello! Ask me about our <strong>Projects</strong>, how to <strong>Sponsor</strong>, or any other website sections here.
                  </p>
                </div>
              </div>

              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Avatar left for system using our cartoon mascot */}
                  {m.role === 'assistant' && (
                    <div className="h-7 w-7 rounded-lg overflow-hidden border border-emerald-150 flex items-center justify-center shrink-0 self-start">
                      <img 
                        src="/assets/images/pmu_mascot_1781699177557.jpg" 
                        alt="Bot Avatar" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div
                    className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 shadow-xs font-sans text-xs sm:text-sm ${
                      m.role === 'user'
                        ? 'bg-emerald-700 text-white rounded-tr-none'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-150'
                    }`}
                  >
                    {m.role === 'user' ? (
                      <p className="whitespace-pre-wrap leading-relaxed select-text">{m.content}</p>
                    ) : (
                      <MarkdownRenderer text={m.content} />
                    )}
                    <span className={`block text-[8.5px] mt-1.5 text-right font-mono ${
                      m.role === 'user' ? 'text-emerald-200' : 'text-slate-400'
                    }`}>
                      {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Avatar right for user */}
                  {m.role === 'user' && (
                    <div className="h-7 w-7 rounded-lg bg-slate-200 text-slate-700 border border-slate-300 flex items-center justify-center shrink-0 self-start">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Shimmer loading logic */}
              {isLoading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="h-7 w-7 rounded-lg overflow-hidden border border-emerald-150 flex items-center justify-center shrink-0 self-start">
                    <img 
                      src="/assets/images/pmu_mascot_1781699177557.jpg" 
                      alt="Bot Loading Avatar" 
                      className="w-full h-full object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-white border border-slate-150 rounded-tl-none shadow-xs">
                    <div className="flex space-x-1.5 items-center justify-start py-1">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies block - only shown if loading state is empty */}
            {!isLoading && messages.length <= 2 && (
              <div className="px-4 py-2 shrink-0 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-1.5">
                <p className="text-[10px] text-slate-500 font-sans font-bold flex items-center gap-1 uppercase tracking-wider">
                  <HelpCircle className="h-3.5 w-3.5 text-emerald-700" />
                  Suggested Questions
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-[85px] overflow-y-auto pb-1">
                  {suggestionStarters.map((s, idx) => {
                    const SvgIcon = s.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(s.text)}
                        className="text-[10.5px] font-sans font-medium text-slate-700 bg-white hover:bg-emerald-50 hover:text-emerald-800 px-2.5 py-1 rounded-lg border border-slate-200 hover:border-emerald-200 transition-all text-left truncate max-w-full cursor-pointer flex items-center gap-1.5 shrink-0"
                      >
                        <SvgIcon className="h-3 w-3 shrink-0 text-slate-400" />
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input keyboard area portion */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputMessage);
              }}
              className="p-3 bg-white border-t border-slate-200 shrink-0 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask our CSR Assistant..."
                disabled={isLoading}
                className="flex-grow text-xs sm:text-sm font-sans focus:outline-none border border-slate-200 focus:border-emerald-600 rounded-xl px-3 py-2.5 text-slate-800 placeholder-slate-400 bg-slate-50/50 disabled:bg-slate-100 disabled:cursor-not-allowed"
                id="input-chatbot-message"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="h-9 w-9 bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-200 text-white disabled:text-slate-400 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0"
                id="btn-chatbot-send"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
