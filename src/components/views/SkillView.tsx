import { PlayCircle, Award, Users, Search, BookOpen, Clock, Star, MapPin, CheckCircle2, Mic } from "lucide-react";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { TRAINING_COURSES, TRAINERS } from "@/src/types";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState } from "react";

export function SkillView() {
  const [search, setSearch] = useState("");
  const categories = ["All", "Plumbing", "Electrician", "Construction"];

  return (
    <div className="space-y-8 pb-20">
      <header className="space-y-2">
        <h1 className="text-2xl font-black text-neutral-900 leading-tight">Skill Learning 🎓</h1>
        <p className="text-neutral-500">Learn from real workers. Practical skills, trade-based paths.</p>
      </header>

      {/* Search Bar */}
      <VoiceInput 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Find a skill or trainer..."
        icon={<Search size={18} />}
      />

      {/* Practical Trade Paths */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-neutral-900 uppercase tracking-tight">Trade-Based Paths 🧱</h2>
          <Badge className="bg-emerald-100 text-emerald-700">Practical</Badge>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {TRAINING_COURSES.map((course) => (
            <Card key={course.id} className="p-0 overflow-hidden border-neutral-100 shadow-sm group">
              <div className="flex bg-white">
                <div className="w-24 bg-neutral-100 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                  <PlayCircle className="text-neutral-400 group-hover:text-emerald-500" size={32} />
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-[8px] py-0">{course.category}</Badge>
                    <span className="text-[10px] text-neutral-400 flex items-center gap-1"><Clock size={10} /> {course.duration}</span>
                  </div>
                  <h3 className="font-bold text-neutral-900 leading-tight mb-1">{course.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-neutral-500">
                    <BookOpen size={10} /> Practical Worker Demo
                  </div>
                </div>
                {course.isPremium && (
                  <Badge className="h-fit m-2 bg-blue-100 text-blue-600 border-none">Paid</Badge>
                )}
              </div>
              <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-100 flex items-center justify-between">
                <p className="text-[10px] font-bold text-neutral-500">Video + Voice Guide</p>
                <Button size="sm" variant="link" className="p-0 h-auto text-emerald-600 font-bold hover:no-underline">Watch & Learn</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Apprenticeship Model: Find Trainers */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-neutral-900 uppercase tracking-tight">Nearby Trainers 🤝</h2>
          <span className="text-xs text-neutral-500">Find local apprenticeships</span>
        </div>
        
        <Card className="p-6 bg-neutral-900 text-white rounded-3xl space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold italic leading-tight">"Learn from workers, not books."</h3>
            <p className="text-neutral-400 text-sm">Our apprenticeship model connects you with verified skilled workers in your area.</p>
          </div>
          
          <div className="space-y-4">
            {TRAINERS.map((trainer) => (
              <div key={trainer.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center font-bold text-lg">
                      {trainer.name[0]}
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="font-bold text-sm">{trainer.name}</h4>
                        {trainer.isVerified && <CheckCircle2 size={12} className="text-emerald-400" />}
                      </div>
                      <p className="text-[10px] text-neutral-400">{trainer.trade} • {trainer.experience} Exp.</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
                      <Star size={12} fill="currentColor" /> {trainer.rating}
                    </div>
                    <p className="text-[10px] text-neutral-500">{trainer.fee}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1 text-neutral-400"><MapPin size={12} /> {trainer.location}</span>
                  <Button size="sm" variant="secondary" className="bg-white/10 hover:bg-white/20 border-none text-white font-bold h-7 py-0">Message</Button>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold h-12 rounded-2xl shadow-lg ring-4 ring-emerald-500/20">
            Apply to be a Trainer
          </Button>
        </Card>
      </section>

      {/* Certification System */}
      <section className="bg-emerald-50 border border-emerald-100 rounded-3xl p-6 text-center space-y-4">
        <Award className="mx-auto text-emerald-600" size={48} />
        <div className="space-y-1">
          <h3 className="text-lg font-black text-neutral-900">Get Worker Badge</h3>
          <p className="text-xs text-neutral-600 text-balance">Complete practical assessments verified by trainers to get your placement badge.</p>
        </div>
        <div className="flex gap-2 justify-center">
          <Badge className="bg-white text-emerald-600 border-emerald-200">Plumbing Verified</Badge>
          <Badge className="bg-white text-emerald-600 border-emerald-200">Safety First</Badge>
        </div>
      </section>
    </div>
  );
}
