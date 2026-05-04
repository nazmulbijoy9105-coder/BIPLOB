import { 
  Briefcase, GraduationCap, Languages, ShieldCheck, TrendingUp, 
  AlertCircle, Phone, ArrowRight, Gavel, Globe, FileText, 
  HeartPulse, ShieldAlert, BookOpen, TrendingDown, Coins, ChevronRight 
} from "lucide-react";
import { AppMode } from "@/src/types";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface HomeViewProps {
  setMode: (mode: AppMode) => void;
}

export function HomeView({ setMode }: HomeViewProps) {
  const stats = [
    { label: "Real Salaries", count: "1,240+", icon: TrendingUp, color: "text-blue-600" },
    { label: "Safe Agencies", count: "85", icon: ShieldCheck, color: "text-emerald-600" },
    { label: "Training Paths", count: "12", icon: BookOpen, color: "text-amber-600" },
  ];

  const services = [
    { mode: 'JOBS' as AppMode, title: "Jobs & Salaries", desc: "Verified pay & openings", icon: Briefcase, color: "bg-emerald-500" },
    { mode: 'LANGUAGE' as AppMode, title: "Language Learning", desc: "Basic English & Arabic", icon: Languages, color: "bg-blue-500" },
    { mode: 'COUNTRY_GUIDE' as AppMode, title: "Country Guide", desc: "Visa costs & rules", icon: Globe, color: "bg-purple-600" },
    { mode: 'LEGAL' as AppMode, title: "Legal Support", desc: "Worker rights & help", icon: Gavel, color: "bg-neutral-800" },
    { mode: 'TRAINING' as AppMode, title: "Training & Skills", desc: "Practical worker lessons", icon: GraduationCap, color: "bg-amber-500" },
    { mode: 'FRAUD' as AppMode, title: "Fraud Safety", desc: "Scam alerts & blacklists", icon: ShieldAlert, color: "bg-red-600" },
    { mode: 'DOCS' as AppMode, title: "Document Guide", desc: "Passport & paperwork", icon: FileText, color: "bg-indigo-500" },
  ];

  return (
    <div className="space-y-8 pb-20">
      <header className="space-y-1">
        <h1 className="text-3xl font-black text-neutral-900 tracking-tight">Probashi Life 👋</h1>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <Card key={i} className="p-3 text-center border-neutral-100 shadow-sm bg-white">
            <stat.icon size={18} className={cn("mx-auto mb-1", stat.color)} />
            <div className="text-lg font-black text-neutral-900 leading-none">{stat.count}</div>
            <div className="text-[8px] text-neutral-400 uppercase font-black tracking-widest mt-1">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Salary Alert Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-100 p-5 rounded-[2rem] flex items-start gap-4 shadow-sm"
      >
        <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-600 shrink-0">
          <TrendingDown size={24} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-red-900">Saudi Arabia Salary Alert</h3>
            <Badge className="bg-red-600 text-white border-none text-[10px]">-5% This Month</Badge>
          </div>
          <p className="text-sm text-red-700 leading-snug">Average Construction Salary in Saudi Arabia decreased by 5% this month due to new seasonal labor regulations.</p>
          <button className="text-xs font-black uppercase tracking-widest text-red-600 mt-2 hover:underline">View Details</button>
        </div>
      </motion.div>

      {/* Main Service Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-neutral-400 uppercase tracking-widest">Our Services 🛠️</h2>
        <div className="grid grid-cols-1 gap-3">
          {services.map((cat, i) => (
            <motion.div
              key={cat.title}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                onClick={() => setMode(cat.mode)}
                className="p-4 flex items-center gap-4 group cursor-pointer relative overflow-hidden"
              >
                <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg", cat.color)}>
                  <cat.icon size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors">{cat.title}</h3>
                  <p className="text-xs text-neutral-500 font-medium">{cat.desc}</p>
                </div>
                <div className="p-2 bg-neutral-100 rounded-full text-neutral-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  <ArrowRight size={16} />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Help Your Brothers Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-emerald-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
          <Coins size={120} />
        </div>
        
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black tracking-tight flex items-center gap-3">
              Help your brothers! 🤝
            </h2>
            <p className="text-emerald-100/80 text-sm leading-relaxed max-w-md">
              Share your salary info anonymously to help others get fair pay. We verify it with current field data to prevent exploitation.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="text" 
                placeholder="Job, Location, and Salary... (e.g. Electrician, Qatar, 1500 QAR)"
                className="w-full bg-white/10 border border-white/20 rounded-2xl p-4 text-white placeholder:text-white/40 focus:bg-white/20 transition-all outline-none"
              />
            </div>
            <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black py-4 rounded-2xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
              Submit My Salary Info
              <ChevronRight size={20} />
            </button>
          </div>
          
          <p className="text-[10px] text-emerald-300/50 font-bold uppercase tracking-widest text-center">
            Your identity remains 100% private. Always.
          </p>
        </div>
      </motion.section>

      {/* Support Section */}
      <Card className="bg-neutral-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <HeartPulse className="text-emerald-400" />
            <h2 className="text-xl font-black italic">Worker Lifecycle Support</h2>
          </div>
          <p className="text-neutral-400 text-xs leading-relaxed max-w-[80%]">
            From "Before you fly" to "While you work". We are here for every step of your journey.
          </p>
          <div className="flex gap-3 pt-2">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white flex gap-2 font-black rounded-xl h-11 px-6 shadow-lg shadow-emerald-900/50">
              <Phone size={18} /> Support Line
            </Button>
            <Button variant="ghost" className="text-white border border-neutral-800 hover:bg-neutral-800 rounded-xl h-11 px-6">
              Legal Aid
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl" />
      </Card>
    </div>
  );
}
