import { Gavel, Scale, FileWarning, ShieldCheck, HeartPulse, Send, PhoneCall } from "lucide-react";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { VoiceInput } from "@/src/components/shared/VoiceInput";

export function LegalView() {
  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 leading-tight">Legal Support & Rights ⚖️</h1>
        <p className="text-neutral-500">Know your rights. We help with contracts, injury cases, and unpaid salaries.</p>
      </header>

      <div className="grid grid-cols-1 gap-4">
        <Card className="p-5 border-l-4 border-l-emerald-500 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-emerald-600">
            <ShieldCheck size={24} />
            <h3 className="font-bold text-lg text-neutral-900">Your Core Rights</h3>
          </div>
          <ul className="space-y-2">
            {[
              "Right to hold your own passport",
              "Right to regular rest hours",
              "Right to medical treatment",
              "Right to salary on time"
            ].map((right, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                <span className="text-emerald-500 mt-1">✓</span>
                {right}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5 space-y-4">
          <div className="flex items-center gap-3 text-red-600">
            <FileWarning size={24} />
            <h3 className="font-bold text-lg text-neutral-900">Common Problems</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Salary Delay", icon: Scale },
              { label: "Contract Breach", icon: Gavel },
              { label: "Med. Emergency", icon: HeartPulse },
              { label: "Agent Fraud", icon: FileWarning },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-neutral-50 rounded-xl flex flex-col items-center gap-2 border border-neutral-100">
                <item.icon size={20} className="text-neutral-500" />
                <span className="text-xs font-bold text-neutral-800">{item.label}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5 bg-neutral-900 text-white space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <PhoneCall size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Legal Consult</h3>
              <p className="text-emerald-400 text-xs text-balance">Direct help from expert lawyers.</p>
            </div>
            <Badge className="ml-auto bg-emerald-500/20 text-emerald-400 border-none italic">Premium</Badge>
          </div>
          
          <div className="space-y-3">
            <p className="text-xs text-neutral-400 uppercase font-black">Ask your question via Voice</p>
            <VoiceInput 
              placeholder="Describe your legal issue..."
              className="bg-neutral-800 border-neutral-700 text-white placeholder:text-neutral-500"
            />
            <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold flex gap-2 items-center justify-center">
              Submit Case <Send size={16} />
            </Button>
          </div>
        </Card>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center gap-3">
        <div className="flex-1">
          <h4 className="font-bold text-blue-900">Contract Analysis Tool</h4>
          <p className="text-[10px] text-blue-700">Upload your contract photo. We'll translate and explain it.</p>
        </div>
        <Button size="sm" variant="secondary" className="border-blue-200">Try Now</Button>
      </div>
    </div>
  );
}
