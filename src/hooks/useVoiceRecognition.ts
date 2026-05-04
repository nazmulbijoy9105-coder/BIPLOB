import { useState, useEffect, useCallback } from "react";

export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && ('WebkitSpeechRecognition' in window || 'speechRecognition' in window)) {
      setIsSupported(true);
    }
  }, []);

  const startListening = useCallback((onResult: (text: string) => void) => {
    if (!isSupported) return;

    const recognition = new ((window as any).SpeechRecognition || (window as any).WebkitSpeechRecognition)();
    recognition.lang = 'en-US'; // Future: Support 'bn-BD'
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
    return recognition;
  }, [isSupported]);

  return { isListening, isSupported, startListening, setIsListening };
}
