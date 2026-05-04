import { Home, Briefcase, Languages, Gavel, ShieldCheck, GraduationCap, FileText, AlertTriangle, MessageSquare } from "lucide-react";
import { AppMode } from "@/src/types";
import { cn } from "@/src/lib/utils";

interface NavigationProps {
  currentMode: AppMode;
  setMode: (mode: AppMode) => void;
}

export function Navigation({ currentMode, setMode }: NavigationProps) {
  const navItems = [
    { mode: 'HOME' as AppMode, label: 'Home', icon: Home },
    { mode: 'JOBS' as AppMode, label: 'Jobs', icon: Briefcase },
    { mode: 'LANGUAGE' as AppMode, label: 'Learn', icon: Languages },
    { mode: 'TRAINING' as AppMode, label: 'Skills', icon: GraduationCap },
    { mode: 'FRAUD' as AppMode, label: 'Safety', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 lg:left-0 lg:top-0 lg:w-20 bg-white border-t lg:border-t-0 lg:border-r border-neutral-200 z-50 flex lg:flex-col items-center justify-around lg:justify-start lg:py-8">
      <div className="hidden lg:block mb-10 text-emerald-600 font-bold text-2xl">B.</div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentMode === item.mode;
        return (
          <button
            key={item.mode}
            onClick={() => setMode(item.mode)}
            className={cn(
              "flex flex-col items-center gap-1 p-3 transition-all relative group lg:w-full lg:mb-4",
              isActive ? "text-emerald-600" : "text-neutral-400 hover:text-neutral-600"
            )}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-[10px] font-medium uppercase tracking-wider">{item.label}</span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-t-full lg:hidden" />
            )}
            {isActive && (
              <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-emerald-600 rounded-r-full hidden lg:block" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
