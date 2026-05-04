import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, User, Mic, MessageSquare, Volume2, Square } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { VoiceButton } from "@/src/components/shared/VoiceButton";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { AppMode } from "@/src/types";

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hello! I am Biplob (বিপ্লব). I am here to help you find jobs, learn skills, and stay safe. (আমি বিপ্লব। আপনাকে কাজ খুঁজতে, দক্ষতা শিখতে এবং নিরাপদ থাকতে সাহায্য করতে এসেছি।)" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    
    const userMsg = { role: 'user' as const, text: text.trim() };
    const currentMessages = [...messages, userMsg];
    setMessages(currentMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          history: messages.map(m => ({
            role: m.role,
            text: m.text
          }))
        })
      });

      if (!response.ok) throw new Error("Server error");
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I am having trouble connecting to the network. Please check your internet and try again. (আপনার ইন্টারনেটে সমস্যা হচ্ছে, অনুগ্রহ করে আবার চেষ্টা করুন।)" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Centered Floating Voice/Chat Trigger */}
      <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-3">
           <VoiceButton onTranscript={(t) => {
             setIsOpen(true);
             handleSend(t);
           }} />
           
           <button 
             onClick={() => setIsOpen(true)}
             className="bg-neutral-900 text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-xl border-2 border-white hover:bg-neutral-800 transition-all font-bold"
           >
             <MessageSquare size={20} className="text-emerald-400" />
             Help
           </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 lg:inset-auto lg:bottom-28 lg:right-4 lg:w-[450px] lg:h-[600px] bg-white z-[60] lg:rounded-3xl shadow-2xl flex flex-col border border-neutral-100"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center lg:rounded-t-3xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-black text-lg leading-tight uppercase tracking-tighter">BIPLOB Assistant 🤖</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-[9px] font-bold text-emerald-100 uppercase tracking-widest">Voice Interaction Enabled</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                title="Close"
              >
                <X size={24} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-50 scrollbar-hide">
              {messages.map((m, i) => (
                <div key={i} className={cn(
                  "flex items-end gap-2",
                  m.role === 'user' ? "flex-row-reverse" : "flex-row"
                )}>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border",
                    m.role === 'user' ? "bg-emerald-100 border-emerald-200 text-emerald-600" : "bg-neutral-100 border-neutral-200 text-neutral-400"
                  )}>
                    {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "max-w-[80%] p-3 text-sm leading-relaxed relative group",
                    m.role === 'user' 
                      ? "bg-emerald-600 text-white rounded-2xl rounded-tr-none shadow-sm" 
                      : "bg-white text-neutral-800 rounded-2xl rounded-tl-none border border-neutral-200 shadow-sm"
                  )}>
                    {m.text}
                    
                    <button
                      onClick={() => speak(m.text, i)}
                      className={cn(
                        "absolute -top-2 transition-all p-1.5 rounded-full shadow-lg border",
                        m.role === 'user' ? "right-2 bg-emerald-500 border-emerald-400" : "left-2 bg-white border-neutral-100",
                        speakingIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                      )}
                      title={speakingIndex === i ? "Stop" : "Read Aloud"}
                    >
                      {speakingIndex === i ? (
                        <Square size={10} className={cn(m.role === 'user' ? "text-white" : "text-emerald-600")} fill="currentColor" />
                      ) : (
                        <Volume2 size={10} className={cn(m.role === 'user' ? "text-white" : "text-emerald-600")} />
                      )}
                    </button>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 text-neutral-400 text-xs italic p-2">
                  <div className="flex gap-1">
                    <span className="w-1 h-1 bg-neutral-300 rounded-full animate-bounce" />
                    <span className="w-1 h-1 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1 h-1 bg-neutral-300 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                  Biplob is thinking...
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-neutral-100 flex items-center gap-2 lg:rounded-b-3xl">
              <VoiceInput 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                onVoiceResult={(t) => handleSend(t)}
                placeholder="Ask Biplob anything... (যাই হোক প্রশ্ন করুন)"
                className="bg-neutral-100 border-none"
              />
              <button 
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-md"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
