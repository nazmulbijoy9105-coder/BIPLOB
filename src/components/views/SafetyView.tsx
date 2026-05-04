import { ShieldAlert, CheckCircle, Search, AlertTriangle, ShieldCheck, ExternalLink, Scale } from "lucide-react";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState } from "react";

export function SafetyView() {
  const [search, setSearch] = useState("");
  const safeAgencies = [
    { name: "Global Migration BD", license: "RL-1234", rating: 4.8, status: 'Verified' },
    { name: "Progressive Recruiting", license: "RL-5678", rating: 4.5, status: 'Verified' },
    { name: "Trust Link Overseas", license: "RL-9012", rating: 4.9, status: 'Verified' },
  ];

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-neutral-900">Fraud & Safety 🛡️</h1>
        <p className="text-neutral-500">Don't be a victim. Check before you pay.</p>
      </header>

      {/* Search Agency */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-neutral-700">Check Agency License</label>
        <div className="flex gap-2">
          <VoiceInput 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Enter RL Number or Name"
            icon={<Search size={18} />}
          />
          <Button variant="secondary" className="bg-neutral-900 shadow-lg">Check</Button>
        </div>
      </div>

      {/* Urgent Warning & Report Form */}
      <Card className="bg-red-50 border-red-200 p-5 space-y-4 shadow-sm">
        <div className="flex items-center gap-3 text-red-600">
          <ShieldAlert size={24} />
          <h3 className="text-lg font-bold">5 Signs of a Scam</h3>
        </div>
        <ul className="space-y-2 text-sm text-red-900/80">
          <li className="flex gap-2 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            Asking for money via bKash/Nagad before any documents.
          </li>
          <li className="flex gap-2 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            No official office address or working from home.
          </li>
          <li className="flex gap-2 items-start">
            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
            Promising "High Salary" with "No Experience" or "Visit Visa".
          </li>
        </ul>
        
        <div className="pt-4 border-t border-red-100 space-y-3">
          <p className="text-xs font-bold text-red-800 uppercase">Report a Scam Anonymously</p>
          <VoiceInput 
            placeholder="Describe the scam... (e.g. Agency RL-123 asked for 50k bKash)"
            className="border-red-200 focus:ring-red-500"
          />
          <Button variant="danger" className="w-full font-bold">Submit Report</Button>
        </div>
      </Card>

      {/* Safe Agency List */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg flex gap-2 items-center">
            <ShieldCheck className="text-emerald-600" size={20} /> Safe Agency List
          </h3>
          <span className="text-xs text-emerald-600 font-bold hover:underline cursor-pointer">See All</span>
        </div>
        <div className="space-y-3">
          {safeAgencies.map((agency, i) => (
            <Card key={i} className="p-4 flex items-center justify-between hover:border-emerald-500 transition-all border-l-4 border-l-emerald-500">
              <div className="space-y-1">
                <h4 className="font-bold text-neutral-900">{agency.name}</h4>
                <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
                  <code>ID: {agency.license}</code>
                  <span className="text-emerald-500">★ {agency.rating}</span>
                </div>
              </div>
              <Badge variant="success">Safe</Badge>
            </Card>
          ))}
        </div>
      </section>

      {/* Legal Support */}
      <Card className="bg-neutral-900 border-none p-6 text-white text-center space-y-4 relative overflow-hidden group">
        <Scale className="mx-auto text-emerald-400" size={32} />
        <div className="space-y-1">
          <h3 className="text-lg font-bold">Know Your Rights</h3>
          <p className="text-neutral-400 text-sm">Contract reviews and legal aid for workers abroad.</p>
        </div>
        <Button className="w-full bg-white text-neutral-900 font-bold hover:bg-neutral-100 relative z-10">
          Free Legal Consult
        </Button>
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Scale size={80} />
        </div>
      </Card>
    </div>
  );
}
