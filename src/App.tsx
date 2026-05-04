/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { AppMode } from "./types";
import { Navigation } from "./components/layout/Navigation";
import { HomeView } from "./components/views/HomeView";
import { JobView } from "./components/views/JobView";
import { SkillView } from "./components/views/SkillView";
import { SafetyView } from "./components/views/SafetyView";
import { AIChatAssistant } from "./components/shared/AIChatAssistant";
import { motion, AnimatePresence } from "motion/react";
import { Scale, Heart, Bell, User } from "lucide-react";
import { cn } from "./lib/utils";

export default function App() {
  const [mode, setMode] = useState<AppMode>('HOME');

  const renderContent = () => {
    switch (mode) {
      case 'HOME': return <HomeView setMode={setMode} />;
      case 'JOBS': return <JobView />;
      case 'TRAINING': return <SkillView />;
      case 'FRAUD': return <SafetyView />;
      case 'LANGUAGE': 
        return (
          <div className="flex flex-col items-center justify-center p-20 text-center space-y-6">
             <div className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
               <Scale size={48} />
             </div>
             <div className="space-y-2">
               <h2 className="text-2xl font-bold">Language Learning</h2>
               <p className="text-neutral-500 max-w-xs mx-auto text-sm leading-relaxed">
                 Communicative English, Arabic & Malay voice modules arriving in August 2024.
               </p>
             </div>
             <button 
               onClick={() => setMode('HOME')}
               className="text-emerald-600 font-bold text-sm hover:underline"
             >
               Go Back Home
             </button>
          </div>
        );
      default: return <HomeView setMode={setMode} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col lg:flex-row pb-24 lg:pb-0 lg:pl-20">
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-white border-b border-neutral-100">
        <h1 className="text-2xl font-black text-emerald-600 tracking-tighter">BIPLOB.</h1>
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-neutral-400" />
          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <User size={16} />
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navigation currentMode={mode} setMode={setMode} />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 lg:px-12 lg:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
        
        {/* Footnotes / Trust Marks */}
        <footer className="mt-24 pt-10 border-t border-neutral-200">
           <div className="grid grid-cols-2 gap-8 mb-12">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-400 uppercase">Emergency</h4>
                <p className="text-sm font-medium text-red-600">Probashi Helpline: 16135</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-neutral-400 uppercase">Legal Aid</h4>
                <p className="text-sm font-medium text-emerald-600">Free Consultations</p>
              </div>
           </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 opacity-40 grayscale group hover:grayscale-0 hover:opacity-100 transition-all">
             <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-neutral-400 rounded-sm" />
                <span className="text-[10px] font-bold">GOVT. APPROVED</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="h-6 w-12 bg-neutral-400 rounded-sm" />
                <span className="text-[10px] font-bold">UNICEF PARTNER</span>
             </div>
          </div>

          <p className="mt-12 text-center text-[10px] text-neutral-400 font-medium flex items-center justify-center gap-1">
            Built with <Heart size={10} className="text-red-400 fill-red-400 animate-pulse" /> for the workforce of Bangladesh. © 2024 Biplob Worker System.
          </p>
        </footer>
      </main>

      {/* AI Chat Layer */}
      <AIChatAssistant />
    </div>
  );
}
