import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceRecognition } from "@/src/hooks/useVoiceRecognition";

interface VoiceButtonProps {
  onTranscript?: (text: string) => void;
  className?: string;
  isListening?: boolean;
}

export function VoiceButton({ onTranscript, className, isListening: externalIsListening }: VoiceButtonProps) {
  const { isListening, isSupported, startListening } = useVoiceRecognition();

  const toggleListening = () => {
    if (!isSupported) {
      alert("Voice recognition is not supported in your browser.");
      return;
    }

    if (!isListening) {
      startListening((transcript) => {
        if (onTranscript) onTranscript(transcript);
      });
    }
  };

  return (
    <div className={cn("relative", className)}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleListening}
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-colors border-4 border-white",
          isListening ? "bg-red-500 text-white" : "bg-emerald-600 text-white",
          !isSupported && "opacity-50 cursor-not-allowed"
        )}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <MicOff size={28} />
          </motion.div>
        ) : (
          <Mic size={28} />
        )}
      </motion.button>
      
      {isListening && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white px-3 py-1 rounded-lg text-xs whitespace-nowrap">
          Listening... (বলুন...)
        </div>
      )}
    </div>
  );
}

export function AudioFeedback({ text, playing }: { text: string, playing: boolean }) {
  return (
    <AnimatePresence>
      {playing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="flex items-center gap-2 text-emerald-600 font-medium text-sm"
        >
          <Volume2 size={16} className="animate-pulse" />
          <span>Speaking... (কথা বলছে...)</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
