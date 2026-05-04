import { Mic, Phone, ShieldCheck, MapPin, Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { AppMode } from "@/src/types";

interface QuickToolbarProps {
  setMode: (mode: AppMode) => void;
}

export function QuickToolbar({ setMode }: QuickToolbarProps) {
  const tools = [
    { label: "Voice Help", icon: Mic, action: () => {}, color: "text-emerald-500" },
    { label: "Emergency", icon: Phone, action: () => {}, color: "text-red-500" },
    { label: "Safety", icon: ShieldCheck, action: () => setMode('FRAUD'), color: "text-blue-500" },
    { label: "Salaries", icon: MapPin, action: () => setMode('JOBS'), color: "text-amber-500" },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide py-2">
      {tools.map((tool, i) => (
        <button
          key={i}
          onClick={tool.action}
          className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-neutral-100 shadow-sm hover:border-emerald-200 transition-all shrink-0"
        >
          <tool.icon size={16} className={tool.color} />
          <span className="text-[10px] font-bold text-neutral-700 whitespace-nowrap uppercase tracking-tight">{tool.label}</span>
        </button>
      ))}
    </div>
  );
}
