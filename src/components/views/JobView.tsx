import { Search, MapPin, CheckCircle2, TrendingUp, Info, ArrowUpRight, DollarSign, Briefcase, Filter, ChevronDown, Check, X } from "lucide-react";
import { Card, Badge, Button } from "@/src/components/shared/UI";
import { SALARY_DATA, SalaryData } from "@/src/types";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState, useMemo } from "react";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

export function JobView() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<"none" | "pay-asc" | "pay-desc">("none");

  // Helper to parse salary range for sorting (using the first number)
  const parseSalary = (range: string) => {
    const match = range.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  // Extract unique locations
  const locations = useMemo(() => {
    const locs = Array.from(new Set(SALARY_DATA.map(s => s.location)));
    return ["All", ...locs];
  }, []);

  const filteredJobs = useMemo(() => {
    let result = SALARY_DATA.filter(job => {
      const matchesSearch = job.jobTitle.toLowerCase().includes(search.toLowerCase()) || 
                            job.location.toLowerCase().includes(search.toLowerCase());
      const matchesLocation = selectedLocation === "All" || job.location === selectedLocation;
      const matchesVerified = !verifiedOnly || job.verified;
      
      return matchesSearch && matchesLocation && matchesVerified;
    });

    if (sortBy === "pay-asc") {
      result.sort((a, b) => parseSalary(a.range) - parseSalary(b.range));
    } else if (sortBy === "pay-desc") {
      result.sort((a, b) => parseSalary(b.range) - parseSalary(a.range));
    }

    return result;
  }, [search, selectedLocation, verifiedOnly, sortBy]);
  return (
    <div className="space-y-6 pb-20">
      <header className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 leading-tight tracking-tight">Verified Job Market 👷</h1>
        <p className="text-neutral-500">Real salary data from real workers. Don't let agents lie to you.</p>
      </header>

      {/* Search & Filter Bar */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <VoiceInput 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search job (e.g. Plumber, Driver...)"
              icon={<Search size={20} />}
            />
          </div>
          <Button 
            variant="outline" 
            className={cn(
              "rounded-2xl h-14 w-14 p-0 shrink-0 border-neutral-200",
              showFilters && "bg-emerald-50 border-emerald-200 text-emerald-600"
            )}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
          </Button>
        </div>

        {showFilters && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-4"
          >
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Location</label>
              <div className="flex flex-wrap gap-2">
                {locations.map(loc => (
                  <Badge 
                    key={loc}
                    onClick={() => setSelectedLocation(loc)}
                    className={cn(
                      "cursor-pointer px-4 py-2 rounded-xl transition-all",
                      selectedLocation === loc 
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200" 
                        : "bg-white text-neutral-600 hover:bg-neutral-100 border-neutral-200"
                    )}
                  >
                    {loc}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-dotted border-neutral-200">
              <span className="text-xs font-bold text-neutral-600">Only Verified Salaries</span>
              <button 
                onClick={() => setVerifiedOnly(!verifiedOnly)}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative flex items-center px-1",
                  verifiedOnly ? "bg-emerald-600" : "bg-neutral-200"
                )}
              >
                <div className={cn(
                  "w-4 h-4 bg-white rounded-full transition-all shadow-sm",
                  verifiedOnly ? "translate-x-6" : "translate-x-0"
                )} />
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-dotted border-neutral-200">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Sort By Salary</label>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSortBy(sortBy === "pay-asc" ? "none" : "pay-asc")}
                  className={cn(
                    "flex-1 rounded-xl text-[10px] font-bold h-10",
                    sortBy === "pay-asc" && "bg-emerald-600 text-white border-emerald-600"
                  )}
                >
                  Low to High
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSortBy(sortBy === "pay-desc" ? "none" : "pay-desc")}
                  className={cn(
                    "flex-1 rounded-xl text-[10px] font-bold h-10",
                    sortBy === "pay-desc" && "bg-emerald-600 text-white border-emerald-600"
                  )}
                >
                  High to Low
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Trust Banner */}
      <Card className="bg-emerald-950 text-white p-5 border-none rounded-3xl relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-emerald-500 rounded-full">
              <CheckCircle2 size={16} className="text-white" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Verified by Biplob</span>
          </div>
          <h2 className="text-xl font-bold leading-snug">Average Construction Salary in Saudi Arabia decreased by 5% this month.</h2>
          <Button variant="secondary" className="bg-white text-emerald-950 font-black text-xs h-10 px-6 rounded-xl">View Details</Button>
        </div>
        <TrendingUp className="absolute -bottom-6 -right-6 text-white/5 w-40 h-40" />
      </Card>

      {/* Salary Overview Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-neutral-900 uppercase text-sm tracking-widest">Verified Salaries 💰</h3>
          <Badge className="bg-neutral-100 text-neutral-600 border-none">Updated May 2024</Badge>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, i) => (
              <Card key={i} className="p-4 flex items-center justify-between group hover:border-emerald-200 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="p-3 bg-neutral-50 border border-neutral-100 rounded-2xl text-neutral-400 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-colors">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-neutral-900">{job.jobTitle}</h4>
                    <p className="text-xs text-neutral-500 flex items-center gap-1">
                      <MapPin size={12} /> {job.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-emerald-600">{job.range}</p>
                  {job.verified ? (
                    <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-500 font-bold uppercase">
                      VERIFIED <CheckCircle2 size={10} />
                    </div>
                  ) : (
                    <div className="flex items-center justify-end gap-1 text-[10px] text-neutral-300 font-bold uppercase">
                      UNVERIFIED <Info size={10} />
                    </div>
                  )}
                </div>
              </Card>
            ))
          ) : (
            <div className="text-center py-10 space-y-3">
              <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto text-neutral-300">
                <Search size={32} />
              </div>
              <p className="text-neutral-400 font-medium italic">No salaries found for your search. (আপনার অনুসন্ধানের জন্য কোন বেতন পাওয়া যায়নি।)</p>
              <Button variant="ghost" onClick={() => { setSearch(""); setSelectedLocation("All"); setVerifiedOnly(false); }} className="text-emerald-600 font-bold">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>

      {/* Comparisons */}
      <section className="space-y-4">
        <h3 className="font-black text-neutral-900 uppercase text-sm tracking-widest">Location Comparison</h3>
        <Card className="p-0 border-neutral-100 overflow-hidden shadow-sm">
          <div className="p-4 bg-neutral-50 border-b border-neutral-100 flex items-center justify-between">
            <span className="text-xs font-bold text-neutral-700">Driver (Basic)</span>
            <ArrowUpRight size={16} className="text-neutral-400" />
          </div>
          <div className="p-4 space-y-3">
            {[
              { loc: "Dhaka, BD", pay: "৳ 15,000", progress: 30 },
              { loc: "Riyadh, KSA", pay: "৳ 45,000", progress: 70 },
              { loc: "Dubai, UAE", pay: "৳ 55,000", progress: 90 },
            ].map((row, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-neutral-500">{row.loc}</span>
                  <span className="text-neutral-900 font-bold">{row.pay}</span>
                </div>
                <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${row.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* Contribution Call */}
      <Card className="bg-emerald-900 text-white p-6 border-none text-center space-y-4 rounded-3xl">
        <TrendingUp className="mx-auto text-emerald-400" size={32} />
        <h3 className="text-lg font-bold">Help your brothers!</h3>
        <p className="text-emerald-100/70 text-sm">Share your salary info anonymously to help others get fair pay. We verify it with current field data.</p>
        
        <div className="space-y-3 pt-2">
           <VoiceInput 
             placeholder="Job, Location, and Salary... (e.g. Electrician, Qatar, 1500 QAR)"
             className="bg-emerald-800 border-neutral-700 text-white placeholder:text-emerald-400"
           />
           <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white font-black h-12 rounded-2xl shadow-xl shadow-emerald-900/40">
            Submit My Salary info
          </Button>
        </div>
      </Card>
    </div>
  );
}
