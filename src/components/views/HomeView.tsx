import { Briefcase, GraduationCap, Languages, ShieldCheck, TrendingUp, AlertCircle, Phone, ArrowRight } from "lucide-react";
import { AppMode } from "@/src/types";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface HomeViewProps {
  setMode: (mode: AppMode) => void;
}

export function HomeView({ setMode }: HomeViewProps) {
  const stats = [
    { label: "Verified Salaries", count: "1,240+", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Safe Agencies", count: "85", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Daily Learners", count: "4.2k", icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const categories = [
    { mode: 'JOBS' as AppMode, title: "Jobs & Salaries", desc: "Find work & check earnings", icon: Briefcase, color: "bg-emerald-500" },
    { mode: 'TRAINING' as AppMode, title: "Learn Skills", desc: "Plumbing, Electrician, etc.", icon: GraduationCap, color: "bg-blue-500" },
    { mode: 'FRAUD' as AppMode, title: "Fraud Safety", desc: "Safe agencies & scam alerts", icon: ShieldCheck, color: "bg-red-500" },
    { mode: 'LANGUAGE' as AppMode, title: "Languages", desc: "English, Arabic, Malay", icon: Languages, color: "bg-amber-500" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-neutral-900">Hello, Biplob! 👋</h1>
        <p className="text-neutral-500">Your trusted partner for work and migration.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, i) => (
          <Card key={i} className="p-3 text-center border-none shadow-none bg-neutral-50">
            <stat.icon size={20} className={cn("mx-auto mb-1", stat.color)} />
            <div className="text-lg font-bold text-neutral-900">{stat.count}</div>
            <div className="text-[10px] text-neutral-500 uppercase tracking-tight">{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Urgent Alert */}
      <Card className="bg-red-50 border-red-100 p-4 flex items-start gap-4">
        <div className="p-2 bg-red-100 rounded-full text-red-600 shrink-0">
          <AlertCircle size={24} />
        </div>
        <div className="space-y-1">
          <h3 className="font-bold text-red-900">Fraud Warning!</h3>
          <p className="text-sm text-red-800/80">3 agencies in Dhaka blacklisted this week. Check the safe list before paying any money.</p>
          <Button variant="danger" size="sm" className="mt-2" onClick={() => setMode('FRAUD')}>
            View Safe List
          </Button>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card 
              onClick={() => setMode(cat.mode)}
              className="p-5 flex items-center gap-5 group h-full"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg", cat.color)}>
                <cat.icon size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg text-neutral-900 group-hover:text-emerald-600 transition-colors">{cat.title}</h3>
                <p className="text-sm text-neutral-500">{cat.desc}</p>
              </div>
              <ArrowRight size={20} className="text-neutral-300 group-hover:text-emerald-500 transition-all group-hover:translate-x-1" />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Support Section */}
      <div className="bg-neutral-900 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <h2 className="text-xl font-bold">Need Help Right Now?</h2>
          <p className="text-neutral-400 text-sm">Our agents are available 24/7 for legal and emergency support.</p>
          <div className="flex gap-3">
            <Button className="bg-white text-neutral-900 hover:bg-neutral-100 flex gap-2 font-bold">
              <Phone size={18} /> Call Support
            </Button>
            <Button variant="ghost" className="text-white border border-neutral-700 hover:bg-neutral-800">
              Message Us
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
