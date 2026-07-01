import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import pmuMascotImage from '../assets/images/pmu_mascot_1781699177557.jpg';
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

  // Client-Side intelligence fallback for serverless hosting like Vercel
  const getClientSideResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    const matchesWord = (text: string, kw: string): boolean => {
      // For Tamil or keywords that contain spaces/special formatting, do standard includes
      if (kw.includes(" ") || kw.includes("தமிழ்") || kw.includes("பக்கம்") || kw.includes("திட்டம்") || kw.includes("வணக்கம்")) {
        return text.includes(kw);
      }
      return new RegExp(`\\b${kw}\\b`, "i").test(text);
    };

    const matchesAny = (text: string, kws: string[]): boolean => {
      return kws.some(kw => matchesWord(text, kw));
    };

    // 1. About Us / Society Board of Directors info
    if (matchesAny(q, ["about us", "society", "governing board", "board of directors", "board", "board members", "director", "directors", "administration", "tdas", "leader", "leaders", "collector", "vishu", "mahajan", "president", "vice president", "secretary", "treasurer"])) {
      return "The **About Us** section details our official governance board and structure:\n\n" +
             "• **Main Function**: To articulate our state-audited governance, operational transparency, and institutional structure.\n" +
             "• **Key Features / Our Board**:\n" +
             "  1. **President**: Shri **Vishu Mahajan IAS** (District Collector, Thoothukudi)\n" +
             "  2. **Vice President**: Shri **M. Guruchandran** (District Revenue Officer, Thoothukudi)\n" +
             "  3. **Secretary**: Shri **Saravanan** (Joint Director/Project Director (DRDA), Thoothukudi)\n" +
             
             "  4. **Zero-Overhead Policy**: TDAS serves as a transparent, state-audited bridge keeping funds in a single consolidated public-sector account layout, ensuring zero administrative deduction and fast-track vendor settlement.";
    }

    // 2. Projects Page info
    if (matchesAny(q, ["projects", "project", "blueprint", "blueprints", "education", "health", "infrastructure", "catalog", "school", "classroom", "hospital", "clinic", "water", "toilet", "toilets", "needs", "welfare", "list", "active", "department"])) {
      return "The **Projects** page is our portal's core state-verified catalog hub. It allows prospective sponsors to inspect developmental gaps needing corporate funding:\n\n" +
             "• **Main Function**: To list validated classroom, primary health, and rural water requirements, preventing resource duplication and channeling corporate funds accurately.\n" +
             "• **Key Features**:\n" +
             "  1. **Topic Filters**: Seamlessly filter blueprints across Education (school upgrades, classrooms), Health (clinical gear, newborn screeners), and Infrastructure (water tanks, community systems).\n" +
             "  2. **Detailed Blueprint Cards**: Each card details target beneficiary counts, absolute estimated budget configurations, and geographical execution blocks.\n" +
             "  3. **Interest Cart Selection**: Click 'Submit Interest' to activate selection mode, then check individual checkboxes to save blueprints directly to your localized proposal cart.";
    } 
    
    // 3. Sponsorship Page info
    if (matchesAny(q, ["sponsorship", "sponsor", "interest cart", "submit request", "proposal form"])) {
      return "The **Sponsorship** page functions as the portal's integrated CSR desk, where selected projects are processed into custom corporate proposals:\n\n" +
             "• **Main Function**: To let prospective corporate partners compile selected blueprints, fill in logistics contact details, and submit formal proposals securely.\n" +
             "• **Key Features**:\n" +
             "  1. **Proposal Cost Calculator**: Aggregates the total budget estimation for all your chosen project blueprints.\n" +
             "  2. **Corporate Request Form**: Collects essential contact parameters (Contact Person Name, official email, telephone, organization name, and specific notes).\n" +
             "  3. **State Submission**: Press **Submit Request** to safely transmit details directly to the Project Management Unit (PMU) for fast-track MOU processing.";
    } 
    
    // 4. Our Contributors Page info
    if (matchesAny(q, ["contributors", "contributor", "supporter", "supporters", "partners", "partner", "companies", "csr partner", "spic", "voc", "ntpl", "tcs", "hcl", "wipro", "ttps"])) {
      return "The **Our Contributors** page serves as our official digital 'Wall of Support' to honor the corporate partners backing Thoothukudi:\n\n" +
             "• **Main Function**: To maintain public transparency and acknowledge outstanding corporate leaders currently financing development under CSR.\n" +
             "• **Key Features**:\n" +
             "  1. **Corporate Spotlight Grid**: Display cards honoring partners like SPIC, VOC Port Trust, NTPL, TCS, HCL, and Wipro.\n" +
             "  2. **Project Acknowledgments**: Spotlights precise developmental tasks funded by each partner (e.g., procurement of critical UNHS infant screening devices, library renovations, or smart school classroom integrations).";
    } 
    
    // 5. Gallery Page info
    if (matchesAny(q, ["gallery", "photos", "photo", "images", "image", "pictures", "picture"])) {
      return "The **Gallery** page acts as our live visual ledger showcasing real ground-level progress across active and completed CSR projects:\n\n" +
             "• **Main Function**: To exhibit complete visual evidence of your corporate contributions translating into tangible community benefits.\n" +
             "• **Key Features**:\n" +
             "  1. **Progress Photo Stream**: High-resolution, actual photographs showing physical construction progress, school classroom upgrades, and healthcare device handovers.\n" +
             "  2. **Geo-location & Sub-district Tags**: Every visual card features tags outlining its corresponding developmental theme and execution block.";
    } 
    
    // 6. Contact Us Page info
    if (matchesAny(q, ["contact us", "contact", "email", "phone", "phone number", "numbers", "address", "office", "location"])) {
      return "The **Contact us** page coordinates communication between prospective corporate sponsors and our administrative team:\n\n" +
             "• **Main Function**: To offer direct communication channels to help partners customize, finalize, or route their CSR budgets.\n" +
             "• **Key Features**:\n" +
             "  1. **DRDA PMU Office Address**: Located inside the District Collectorate headquarters, Thoothukudi.\n" +
             "  2. **Direct Hotline & Email Coordinates**: Fast email access (`thoothukudidistrictpmu@gmail.com`) and helpline contacts for quick query resolution.\n" +
             "  3. **Interactive Map**: Centered Map component pinning the exact geolocation of our headquarters.";
    } 
    
    // 7. Home Page info
    if (matchesAny(q, ["home", "homepage", "landing", "intro", "welcome"])) {
      return "The **Home** page serves as our portal's primary landing hub. It features several distinct sections and interactive elements:\n\n" +
             "• **Main Function**: To welcome potential sponsors, highlight Thoothukudi's key development objectives, and provide transparency regarding our administration's collective goals.\n" +
             "• **Key Features**:\n" +
             "  1. **Hero Sector**: Engaging call-to-action showcasing our vision for standardizing and boosting local welfare under CSR.\n" +
             "  2. **District Profile Map**: A fully interactive administrative block map of Thoothukudi. Clicking on blocks displays population statistics, literacy rates, and regional overview data.\n" +
             "  3. **Milestones Counter**: Live counter stats showing total projects listed, registered contributors, and execution divisions.\n" +
             "  4. **President's Message / About Us**: A dedicated workspace message from our society's President, District Collector **Shri Vishu Mahajan IAS**, explaining how TDAS serves as a state-audited bridge for sponsors.\n" +
             "  5. **Contributor Showcase**: A smoothly sliding reel displaying logos of prominent national and regional corporate partners representing our joint social efforts.";
    }

    // 8. General Navigation details (navbar layout) if no specific page matched
    if (matchesAny(q, ["navigation", "navbar", "navigation bar", "bar", "headings", "heading", "page", "pages", "tabs", "tab", "sections", "section", "menu", "menus", "structure", "features", "website", "what is on this site", "help me navigate"])) {
      return "Here is a complete guide to our **Navigation Bar** and the core functions of each section:\n\n" +
             "1. **Home** (*Landing Hub*): Features our welcome Hero, an interactive map of Thoothukudi district, key milestones, an official message from our President (District Collector Shri Vishu Mahajan IAS), and our active supporter list.\n" +
             "2. **Projects** (*Welfare Need Catalog*): Browse active, state-audited projects in Education, Health, and Infrastructure. You can select blueprints here to save them to your custom interest cart.\n" +
             "3. **Sponsorship** (*Integrated CSR Desk*): Review your saved blueprints, see cost guides, fill in corporate details, and click **Submit Request** to safely submit automated proposals.\n" +
             "4. **Our Contributors** (*Corporate Wall of Support*): View prominent corporate sponsors, public sector undertakings, and partners (like SPIC, VOC Port Trust, TCS, etc.) supporting our social works.\n" +
             "5. **Gallery** (*Visual Progress Stream*): Explore actual, geo-tracked photos of ongoing and completed developmental projects on the ground.\n" +
             "6. **Contact us** (*Support coordinates*): Find direct phone numbers, email addresses, and location coordinates for our Project Management Unit.";
    }
    
    if (matchesAny(q, ["hello", "hi", "hey", "helper", "assistant", "welcome", "வணக்கம்"])) {
      return "Vanakkam! I am your official Thoothukudi CSR assistant. Let me know if you would like me to help you navigate our available **Projects**, **Sponsorship** desks, check on **About Us**, read **Our Contributors**, or check our **Gallery**.";
    } 
    
    if (matchesAny(q, ["tamil", "தமிழ்", "பக்கம்", "திட்டம்"])) {
      return "வணக்கம்! நமது இணையதளத்தின் **Projects** பக்கத்தில் திட்டங்களின் விவரங்களைக் காணலாம். பங்களிக்க **Sponsorship** பக்கத்தில் விவரங்களை சமர்ப்பிக்கவும்.";
    } 
    
    if (
      matchesAny(q, [
        "code", "programming", "weather", "recipe", "sport", "joke", "create", "write", "make a",
        "how to build", "capital of", "who is president of america", "other state", "other country"
      ])
    ) {
      return "I can only assist you with questions and navigation for this Thoothukudi CSR Portal. Please ask a question related to our **Projects**, **Sponsorship**, our leaders, or website tabs.";
    }

    return "I am the official **Thoothukudi CSR Desk AI Assistant**. You can browse active developmental need catalogs under the **Projects** section, file sponsorship interest in the **Sponsorship** desk, or check recent CSR works in our **Gallery** tab! Let me know which section you need help with.";
  };

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

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages(prev => [...prev, {
            id: `ai-${Date.now()}`,
            role: 'assistant',
            content: data.reply,
            timestamp: new Date(),
          }]);
          setIsLoading(false);
          return;
        }
      }
      
      // If we got a non-ok response (like 404 on a static only deployment like Vercel)
      // Fallback seamlessly to the client-side intel engine
      const fallbackReply = getClientSideResponse(userText);
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: new Date(),
      }]);

    } catch (err) {
      console.warn("Express server unavailable. Utilizing client-side AI fallback router:", err);
      // Fallback seamlessly to client-side answers instead of exposing a network error
      const fallbackReply = getClientSideResponse(userText);
      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
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
                  src={pmuMascotImage} 
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
                        src={pmuMascotImage} 
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
                      src={pmuMascotImage} 
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
              autoComplete="off"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask our CSR Assistant..."
                disabled={isLoading}
                autoComplete="off"
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
