import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Mic, MessageSquare, Volume2, Square } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { VoiceButton } from "@/src/components/shared/VoiceButton";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hello! I am Biplob (বিপ্লব). I am here to help you find jobs, learn skills, and stay safe. (আমি বিপ্লব। আপনাকে কাজ খুঁজতে, দক্ষতা শিখতে এবং নিরাপদ থাকতে সাহায্য করতে এসেছি।)" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const [knowledgeContext, setKnowledgeContext] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load grounding context from server
    fetch("/api/knowledge")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const context = data.map((d: any) => d.content).join("\n\n");
          setKnowledgeContext(context);
        }
      })
      .catch(err => console.error("Knowledge load failed", err));
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text: string, index: number) => {
    if (speakingIndex === index) {
      window.speechSynthesis.cancel();
      setSpeakingIndex(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Detect if text contains Bangla characters
    const hasBangla = /[\u0980-\u09FF]/.test(text);
    utterance.lang = hasBangla ? 'bn-BD' : 'en-GB';

    utterance.onend = () => setSpeakingIndex(null);
    utterance.onerror = () => setSpeakingIndex(null);
    
    setSpeakingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text: string = input) => {
    if (!text.trim() || isLoading) return;
    
    const userPrompt = text.trim();
    const userMsg = { role: 'user' as const, text: userPrompt };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const systemInstruction = `You are Biplob (বিপ্লব), the ultimate Digital Companion for Bangladeshi Migrant Workers. 
      Your mission is to protect, guide, and empower workers throughout their journey.

      CRITICAL GUIDELINES:
      1. KNOWLEDGE GROUNDING: Use the provided Knowledge Base below as your primary source of truth.
      2. BILINGUAL RESPONSE: Respond in a mix of simple English and clear Bangla (Unicode). 
      3. PROTECTIVE TONE: Always warn workers against scams, middlemen (Dalals), and unauthorized payments.
      4. COMPREHENSIVE ANSWERS: Provide detailed, broad, and deep explanations for labor rights, visa processes, and safety. Don't provide short one-liners.
      5. EMERGENCY: If a worker is in danger or hasn't been paid, give specific steps (Contact Embassy, BMET, or Legal Aid).

      KNOWLEDGE BASE:
      ---
      ${knowledgeContext}
      ---
      
      Begin your response addressing the worker as "Bhai" (Brother).`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: "user", parts: [{ text: userPrompt }] }],
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const aiText = response.text || "I apologize, but I am unable to generate a response at this time. (আমি দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না।)";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I am having trouble connecting to my brain right now. Please check your internet and try again. (আমার মস্তিষ্কের সাথে সংযোগ করতে সমস্যা হচ্ছে। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।)" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Sophisticated Floating Trigger */}
      <div className="fixed bottom-24 right-6 lg:right-10 z-50">
        <motion.div 
          className="flex flex-col items-end gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
           <button 
             onClick={() => setIsOpen(true)}
             className={cn(
               "group relative flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-2xl transition-all duration-500",
               isOpen ? "bg-white text-emerald-600 rotate-90" : "bg-emerald-600 text-white hover:scale-110 active:scale-95"
             )}
           >
             {isOpen ? <X size={28} /> : (
               <div className="relative">
                 <Bot size={28} className="group-hover:animate-pulse" />
                 <span className="absolute -top-1 -right-1 flex h-3 w-3">
                   <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                   <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white"></span>
                 </span>
               </div>
             )}
             
             {/* Text tooltip that appears on hover */}
             {!isOpen && (
               <div className="absolute right-full mr-4 whitespace-nowrap bg-neutral-900 text-white px-4 py-2 rounded-xl text-sm font-bold opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none translate-x-2 group-hover:translate-x-0">
                 Ask Biplob 👋
               </div>
             )}
           </button>
           
           <VoiceButton 
             onTranscript={(t) => {
               setIsOpen(true);
               handleSend(t);
             }} 
             className="w-12 h-12 shadow-lg"
           />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 40, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 lg:inset-auto lg:bottom-44 lg:right-10 lg:w-[420px] lg:h-[650px] bg-white z-[60] lg:rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col border border-neutral-100 overflow-hidden"
          >
            {/* Header - Premium Glassmorphism style */}
            <div className="bg-white/80 backdrop-blur-xl p-6 text-neutral-900 border-b border-neutral-100 flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Bot size={120} />
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-xl leading-tight tracking-tight">Biplob AI</h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="relative flex h-2 w-2">
                       <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                       <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Active & Secure</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 hover:bg-neutral-100 rounded-2xl transition-colors text-neutral-400 lg:hidden"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-white scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex flex-col group",
                  m.role === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "flex items-center gap-3 w-full",
                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}>
                    <div className={cn(
                      "max-w-[85%] p-4 text-sm leading-relaxed relative shadow-sm transition-all animate-in fade-in slide-in-from-bottom-2",
                      m.role === 'user' 
                        ? "bg-neutral-900 text-white rounded-3xl rounded-tr-none px-5 py-3.5" 
                        : "bg-neutral-50 text-neutral-800 rounded-3xl rounded-tl-none border border-neutral-100"
                    )}>
                      {m.text}
                    </div>
                    
                    {m.role === 'model' && (
                      <button
                        onClick={() => speak(m.text, i)}
                        className={cn(
                          "transition-all p-2.5 rounded-2xl border bg-white shadow-sm hover:shadow-md hover:scale-110 active:scale-95 shrink-0",
                          speakingIndex === i 
                            ? "opacity-100 scale-100 text-emerald-600 border-emerald-200 bg-emerald-50 ring-4 ring-emerald-50" 
                            : "opacity-40 group-hover:opacity-100 text-neutral-400 border-neutral-100"
                        )}
                        title={speakingIndex === i ? "Stop" : "Read Aloud"}
                      >
                        {speakingIndex === i ? (
                          <Square size={14} fill="currentColor" />
                        ) : (
                          <Volume2 size={14} />
                        )}
                      </button>
                    )}
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-neutral-300 mt-2 px-2">
                    {m.role === 'user' ? "You" : "Biplob AI"}
                  </span>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-3 text-neutral-400 text-[10px] font-bold uppercase tracking-widest p-2">
                  <div className="flex gap-1.5">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-duration:0.6s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s] [animation-duration:0.6s]" />
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s] [animation-duration:0.6s]" />
                  </div>
                  Thinking...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 bg-white border-t border-neutral-100 lg:rounded-b-[2.5rem]">
              <div className="bg-neutral-50 rounded-[2rem] p-2 flex items-center gap-1 border border-neutral-100 focus-within:border-emerald-200 focus-within:ring-4 focus-within:ring-emerald-50 transition-all shadow-inner">
                <VoiceInput 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  onVoiceResult={(t) => handleSend(t)}
                  placeholder="Ask anything..."
                  className="bg-transparent border-none flex-1 shadow-none"
                />
                <button 
                  onClick={() => handleSend()}
                  disabled={isLoading || !input.trim()}
                  className="p-3.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-all shadow-lg active:scale-95 shrink-0"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[9px] text-center text-neutral-300 mt-4 font-bold uppercase tracking-tighter">
                Biplob AI is optimized for Bangladeshi Worker Guides
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
