import { 
  ShieldAlert, CheckCircle, Search, AlertTriangle, ShieldCheck, 
  ExternalLink, Scale, Star, ThumbsUp, MessageSquareWarning 
} from "lucide-react";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState } from "react";

export function SafetyView() {
  const [search, setSearch] = useState("");
  const safeAgencies = [
    { name: "Global Migration BD", license: "RL-1234", rating: 4.8, status: 'Verified', reviews: 240 },
    { name: "Progressive Recruiting", license: "RL-5678", rating: 4.5, status: 'Verified', reviews: 156 },
    { name: "SafeHands Overseas", license: "RL-9012", rating: 4.9, status: 'Top Rated', reviews: 412 },
  ];

  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 leading-tight">Fraud Detection & Safety 🛡️</h1>
        <p className="text-neutral-500 font-medium">Protect yourself. Check licenses, report scams, and find safe agencies.</p>
      </header>

      {/* Fraud Alert System */}
      <Card className="bg-red-500 text-white p-6 border-none rounded-3xl relative overflow-hidden shadow-xl shadow-red-200">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquareWarning className="text-red-200" />
            <h2 className="text-lg font-black uppercase tracking-tight">Recent Scam Alerts</h2>
          </div>
          <div className="space-y-3">
             <div className="bg-white/10 p-3 rounded-2xl flex gap-3 items-center">
                <Badge className="bg-red-600 text-white border-red-400">🚨 WARNING</Badge>
                <p className="text-xs font-bold">RL-442 Agent asking for 50k bKash fee upfront.</p>
             </div>
             <div className="bg-white/10 p-3 rounded-2xl flex gap-3 items-center">
                <Badge className="bg-red-600 text-white border-red-400">🚨 WARNING</Badge>
                <p className="text-xs font-bold">Fake Facebook page "Saudi Work 2024" reported.</p>
             </div>
          </div>
        </div>
        <ShieldAlert className="absolute -bottom-6 -right-6 text-white/5 w-32 h-32" />
      </Card>

      {/* Agency Discovery Layer */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-neutral-400 uppercase tracking-widest">Safe Agency List ✅</h2>
          <Badge className="bg-emerald-500 text-white border-none italic">License Checked</Badge>
        </div>
        
        <div className="space-y-3">
          {safeAgencies.map((agency, i) => (
            <Card key={i} className="p-4 flex items-center justify-between group hover:border-emerald-500 transition-colors">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-neutral-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                     <h4 className="font-bold text-neutral-900 group-hover:text-emerald-700">{agency.name}</h4>
                     <Badge variant="success" className="text-[8px] py-0 px-1">{agency.status}</Badge>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-bold uppercase">License: {agency.license}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-emerald-600 font-black text-sm">
                  <Star size={12} fill="currentColor" /> {agency.rating}
                </div>
                <p className="text-[10px] text-neutral-400 font-medium">{agency.reviews} user reviews</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest pl-1">Check Agency License</label>
        <div className="flex gap-2">
          <VoiceInput 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter RL Number or Name"
            icon={<Search size={18} />}
          />
          <Button variant="secondary" className="bg-neutral-900 text-white shadow-lg h-12 px-6 rounded-2xl font-bold">Check</Button>
        </div>
      </div>

      {/* Report Form */}
      <Card className="bg-neutral-50 border-neutral-200 p-6 space-y-4 rounded-3xl border-dashed">
        <div className="text-center space-y-2">
          <ShieldAlert className="mx-auto text-red-500" size={32} />
          <h3 className="font-bold text-lg">See something suspicious?</h3>
          <p className="text-xs text-neutral-500 px-4">Report scams anonymously to protect other workers. We verify all reports before blacklisting.</p>
        </div>
        
        <div className="space-y-3 pt-2">
          <VoiceInput 
            placeholder="Describe the scam... (e.g. Agency RL-123 asked for money)"
            className="bg-white border-neutral-200 focus:ring-red-500"
          />
          <Button variant="danger" className="w-full font-black h-12 rounded-2xl shadow-lg shadow-red-100">Submit Report</Button>
        </div>
      </Card>
    </div>
  );
}
