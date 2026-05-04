import { Globe, MapPin, DollarSign, Users, Info, ExternalLink, PlaneTakeoff } from "lucide-react";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { COUNTRIES } from "@/src/types";

export function CountryGuideView() {
  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 leading-tight">Country Guide 🌍</h1>
        <p className="text-neutral-500">Know where you are going. Visa costs, rules, and living conditions.</p>
      </header>

      <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 scrollbar-hide">
        {COUNTRIES.map((country) => (
          <Card key={country.id} className="min-w-[280px] p-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-neutral-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{country.flag}</span>
                <div>
                  <h3 className="font-bold text-lg">{country.name}</h3>
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-black">Popular Choice</p>
                </div>
              </div>
              <PlaneTakeoff className="text-neutral-600" />
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] text-neutral-400 font-black uppercase">Visa Cost</p>
                  <p className="text-sm font-bold text-neutral-900">{country.visaCost}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-neutral-400 font-black uppercase">Min. Wage</p>
                  <p className="text-sm font-bold text-emerald-600">{country.minWage}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-[10px] text-neutral-400 font-black uppercase">Culture & Rules</p>
                <p className="text-xs text-neutral-600 line-clamp-2">{country.culture}</p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex gap-2">
                <Button size="sm" variant="secondary" className="flex-1 text-[10px] font-bold">FULL GUIDE</Button>
                <Button size="sm" variant="secondary" className="px-3 border-emerald-100"><ExternalLink size={14} className="text-emerald-500" /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Before You Fly ✈️</h2>
        <div className="grid grid-cols-1 gap-3">
          {[
            { title: "BMET Registration", desc: "Mandatory for all Bangladeshi workers.", status: "Required" },
            { title: "GAMCA Medical", desc: "Fitness certificate for Gulf countries.", status: "Required" },
            { title: "PDO Training", desc: "3-day mandatory orientation course.", status: "Required" }
          ].map((item, i) => (
            <Card key={i} className="p-4 flex items-center gap-4">
              <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm">{item.title}</h4>
                <p className="text-[10px] text-neutral-500">{item.desc}</p>
              </div>
              <Badge className="bg-neutral-100 text-neutral-600 border-none">{item.status}</Badge>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-5 bg-neutral-900 text-white rounded-3xl">
        <div className="flex gap-4">
          <div className="bg-emerald-500 p-3 rounded-2xl h-fit">
            <Users size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-lg leading-tight text-balance">Migrant Worker Community</h3>
            <p className="text-xs text-neutral-400">Ask real people already living there. Verified insights only.</p>
            <Button size="sm" className="bg-white text-neutral-900 hover:bg-neutral-100 font-bold">Join Community</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
