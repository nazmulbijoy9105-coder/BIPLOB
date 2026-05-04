import { Globe, BookOpen, PlayCircle, Star, MessageCircle, Mic } from "lucide-react";
import { Card, Badge, Button } from "@/src/components/shared/UI";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState } from "react";

export function LanguageView() {
  const [search, setSearch] = useState("");
  const languages = [
    { name: "Basic English", flag: "🇬🇧", count: "12 Lessons", priority: true },
    { name: "Arabic", flag: "🇸🇦", count: "8 Lessons", priority: false },
    { name: "Malay", flag: "🇲🇾", count: "6 Lessons", priority: false },
    { name: "Korean", flag: "🇰🇷", count: "10 Lessons", priority: false },
  ];

  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 leading-tight">Biplob Language Center 🗣️</h1>
        <p className="text-neutral-500">Communication-focused lessons for real-world worker situations.</p>
      </header>

      <VoiceInput 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search for a phrase (e.g. Asking for water...)"
        icon={<Search className="text-neutral-400" size={18} />}
      />

      <div className="grid grid-cols-2 gap-4">
        {languages.map((lang) => (
          <Card key={lang.name} className="p-4 flex flex-col items-center text-center gap-3 relative overflow-hidden group hover:border-emerald-500 transition-colors">
            {lang.priority && (
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg">
                PRIORITY
              </div>
            )}
            <span className="text-4xl">{lang.flag}</span>
            <div className="space-y-1">
              <h3 className="font-bold text-neutral-900">{lang.name}</h3>
              <p className="text-xs text-neutral-500">{lang.count}</p>
            </div>
            <Button size="sm" variant="secondary" className="w-full mt-2">Start Learning</Button>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900">Communication Modules</h2>
          <Button variant="link" className="text-emerald-600 font-bold p-0">View All</Button>
        </div>
        
        <Card className="p-0 border-none bg-emerald-900 text-white overflow-hidden">
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-800 rounded-lg">
                <Mic size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Voice-Based Lessons</h3>
                <p className="text-emerald-400 text-xs text-balance">Tap to listen and repeat. No reading required.</p>
              </div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] text-emerald-300 uppercase font-black">Latest Topic</p>
                <p className="font-medium italic">"I am feeling unwell, I need rest."</p>
              </div>
              <PlayCircle className="text-emerald-400" size={32} />
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Country-Specific Communication</h2>
        <Card className="p-4 border-dashed border-2 border-neutral-200 bg-neutral-50 flex items-center gap-4">
          <div className="flex-1">
            <h3 className="font-bold">Going to Korea? (EPS-TOPIK)</h3>
            <p className="text-xs text-neutral-500">Intensive Korean for work permits and factory vocabulary.</p>
          </div>
          <Badge className="bg-blue-100 text-blue-700">Premium</Badge>
        </Card>
      </div>
    </div>
  );
}

import { Search } from "lucide-react";
