import { Search, MapPin, CheckCircle2, TrendingUp, Info } from "lucide-react";
import { Card, Badge, Button } from "@/src/components/shared/UI";
import { SALARY_DATA } from "@/src/types";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState } from "react";

export function JobView() {
  const [search, setSearch] = useState("");
  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-neutral-900 underline decoration-emerald-500 decoration-4 underline-offset-4">Verified Salaries</h1>
        <p className="text-neutral-500">Real data from real workers. Updated May 2024.</p>
      </header>

      {/* Search/Filter Bar */}
      <VoiceInput 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search job (e.g. Plumber, Driver...)"
        icon={<Search size={20} />}
      />

      {/* Verified Banner */}
      <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center gap-3">
        <div className="p-2 bg-emerald-100 rounded-full text-emerald-600">
          <CheckCircle2 size={24} />
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-900">Real Worker Data Guaranteed</p>
          <p className="text-xs text-emerald-800/70">All salary ranges are verified via field surveys and worker submissions.</p>
        </div>
      </div>

      {/* Salary List */}
      <div className="space-y-4">
        {SALARY_DATA.map((job, i) => (
          <Card key={i} className="p-4 flex items-center justify-between group cursor-default">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-neutral-900">{job.jobTitle}</h3>
                {job.verified && (
                  <Badge variant="success" className="flex gap-1 items-center">
                    <CheckCircle2 size={10} /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <div className="flex items-center gap-1">
                  <MapPin size={14} /> {job.location}
                </div>
                <div>•</div>
                <div>Updated {job.updatedAt}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-black text-emerald-600">{job.range}</div>
              <div className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">Monthly Range</div>
            </div>
          </Card>
        ))}
      </div>

      {/* Contribution Call & Form */}
      <Card className="bg-neutral-900 text-white p-6 border-none text-center space-y-4">
        <div className="space-y-2">
          <TrendingUp className="mx-auto text-emerald-400" size={32} />
          <h3 className="text-lg font-bold">Help your brothers!</h3>
          <p className="text-neutral-400 text-sm">Share your salary info anonymously to help others get fair pay.</p>
        </div>
        
        <div className="space-y-3 pb-2 pt-2">
           <VoiceInput 
             placeholder="Job, Location, and Salary... (e.g. Electrician, Qatar, 1500 QAR)"
             className="bg-neutral-800 border-neutral-700 text-white"
           />
           <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold">
            Submit My Salary info
          </Button>
        </div>
      </Card>
    </div>
  );
}
