import { Search, Mic, MicOff } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useVoiceRecognition } from "@/src/hooks/useVoiceRecognition";

interface VoiceInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onVoiceResult?: (text: string) => void;
  icon?: React.ReactNode;
}

export function VoiceInput({ onVoiceResult, className, icon, value, onChange, ...props }: VoiceInputProps) {
  const { isListening, isSupported, startListening } = useVoiceRecognition();

  const handleVoiceClick = () => {
    startListening((transcript) => {
      if (onVoiceResult) {
        onVoiceResult(transcript);
      } else if (onChange) {
        // Create a synthetic event
        const event = {
          target: { value: transcript }
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    });
  };

  return (
    <div className="relative flex-1 group">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-emerald-500 transition-colors">
          {icon}
        </div>
      )}
      <input
        {...props}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full bg-white border border-neutral-200 rounded-xl py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm",
          icon ? "pl-10" : "pl-4",
          "pr-12",
          className
        )}
      />
      {isSupported && (
        <button
          type="button"
          onClick={handleVoiceClick}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all",
            isListening 
              ? "bg-red-500 text-white shadow-lg animate-pulse" 
              : "text-neutral-400 hover:bg-neutral-100 hover:text-emerald-600"
          )}
          title={isListening ? "Listening..." : "Click to speak"}
        >
          {isListening ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
      )}
      {isListening && (
        <div className="absolute -top-10 right-0 bg-neutral-900 text-white text-[10px] px-2 py-1 rounded shadow-xl whitespace-nowrap animate-bounce">
          Listening... (বলুন...)
        </div>
      )}
    </div>
  );
}
