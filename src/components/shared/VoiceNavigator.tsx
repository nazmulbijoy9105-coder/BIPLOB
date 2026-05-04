import { useEffect, useState } from "react";
import { useVoiceRecognition } from "@/src/hooks/useVoiceRecognition";
import { AppMode } from "@/src/types";

interface VoiceNavigatorProps {
  setMode: (mode: AppMode) => void;
  trigger?: boolean;
  onComplete?: () => void;
}

export function VoiceNavigator({ setMode, trigger, onComplete }: VoiceNavigatorProps) {
  const { isListening, isSupported, startListening } = useVoiceRecognition();
  const [lastCommand, setLastCommand] = useState("");

  const handleCommand = (text: string) => {
    const cmd = text.toLowerCase();
    setLastCommand(text);
    
    if (cmd.includes("job") || cmd.includes("salary") || cmd.includes("work")) {
      setMode("JOBS");
    } else if (cmd.includes("safety") || cmd.includes("fraud") || cmd.includes("scam") || cmd.includes("warning")) {
      setMode("FRAUD");
    } else if (cmd.includes("skill") || cmd.includes("train") || cmd.includes("learn")) {
      setMode("TRAINING");
    } else if (cmd.includes("language") || cmd.includes("english") || cmd.includes("arabic") || cmd.includes("speak")) {
      setMode("LANGUAGE");
    } else if (cmd.includes("guide") || cmd.includes("country") || cmd.includes("dest")) {
      setMode("COUNTRY_GUIDE");
    } else if (cmd.includes("legal") || cmd.includes("right") || cmd.includes("law") || cmd.includes("help")) {
      setMode("LEGAL");
    } else if (cmd.includes("doc") || cmd.includes("paper") || cmd.includes("visa") || cmd.includes("passport")) {
      setMode("DOCS");
    } else if (cmd.includes("home") || cmd.includes("start") || cmd.includes("back")) {
      setMode("HOME");
    }

    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (trigger && isSupported && !isListening) {
      startListening(handleCommand);
    }
  }, [trigger, isSupported]);

  if (!isListening && !lastCommand) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-none">
      {isListening ? (
        <div className="bg-emerald-900 text-white px-6 py-2 rounded-full shadow-2xl flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
          <span className="text-sm font-black uppercase tracking-widest">Listening for command...</span>
        </div>
      ) : (
        <div className="bg-neutral-800 text-white px-6 py-1.5 rounded-full shadow-xl text-xs font-medium">
          Detected: "{lastCommand}"
        </div>
      )}
    </div>
  );
}
