import { useState } from "react";
import { Mic, Phone, ShieldCheck, MapPin, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AppMode } from "@/src/types";
import { VoiceNavigator } from "@/src/components/shared/VoiceNavigator";

interface QuickToolbarProps {
  setMode: (mode: AppMode) => void;
}

export function QuickToolbar({ setMode }: QuickToolbarProps) {
  const [isVoiceNavActive, setIsVoiceNavActive] = useState(false);

  const tools = [
    { label: "Voice Help", icon: Mic, action: () => setIsVoiceNavActive(true), color: "text-emerald-500" },
    { label: "Emergency", icon: Phone, action: () => {}, color: "text-red-500" },
    { label: "Safety", icon: ShieldCheck, action: () => setMode('FRAUD'), color: "text-blue-500" },
    { label: "Salaries", icon: MapPin, action: () => setMode('JOBS'), color: "text-amber-500" },
  ];

  return (
    <>
      <VoiceNavigator 
        setMode={setMode} 
        trigger={isVoiceNavActive} 
        onComplete={() => setIsVoiceNavActive(false)} 
      />
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide py-2">
        {tools.map((tool, i) => (
          <button
            key={i}
            onClick={tool.action}
            className={cn(
              "flex items-center gap-2 bg-white px-3 py-2 rounded-xl border transition-all shrink-0",
              isVoiceNavActive && tool.label === "Voice Help" 
                ? "border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50" 
                : "border-neutral-100 shadow-sm hover:border-emerald-200"
            )}
          >
            <tool.icon size={16} className={cn(tool.color, isVoiceNavActive && tool.label === "Voice Help" && "animate-pulse")} />
            <span className="text-[10px] font-bold text-neutral-700 whitespace-nowrap uppercase tracking-tight">{tool.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
