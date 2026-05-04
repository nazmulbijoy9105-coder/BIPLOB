import { PlayCircle, Award, Users, Search, BookOpen, Clock } from "lucide-react";
import { Card, Button, Badge } from "@/src/components/shared/UI";
import { TRAINING_COURSES } from "@/src/types";
import { VoiceInput } from "@/src/components/shared/VoiceInput";
import { useState } from "react";

export function SkillView() {
  const [search, setSearch] = useState("");
  const categories = ["All", "Plumbing", "Electrician", "Construction"];

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold text-neutral-900">On-the-Job Learning 🎓</h1>
        <p className="text-neutral-500">Learn from real workers. Practical skills, no complex theory.</p>
      </header>

      {/* Search Bar */}
      <VoiceInput 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Find a skill or trainer..."
        icon={<Search size={18} />}
      />

      {/* Categories Horizontal Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 scrollbar-hide">
        {categories.map((cat) => (
          <button 
            key={cat}
            className="px-4 py-2 rounded-full border border-neutral-200 text-sm font-medium whitespace-nowrap hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white shadow-sm"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Featured: Find a Trainer */}
      <Card className="bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 border-none relative overflow-hidden">
        <div className="relative z-10 space-y-4">
          <Badge className="bg-emerald-400/20 text-white border border-emerald-400/30">Connect & Learn</Badge>
          <h2 className="text-2xl font-black">Find Local Trainers</h2>
          <p className="text-emerald-50/80 text-sm leading-relaxed">Connect with skilled workers near you for hands-on apprenticeship. "Learn by doing, not by reading."</p>
          <Button variant="secondary" className="bg-white text-emerald-900 hover:bg-emerald-50">
            Search Nearby Trainers
          </Button>
        </div>
        <Users className="absolute -bottom-4 -right-4 text-white/10" size={120} />
      </Card>

      <section className="space-y-4">
        <h3 className="font-bold text-lg">Top Skills Paths</h3>
        <div className="grid grid-cols-1 gap-4">
          {TRAINING_COURSES.map((course) => (
            <Card key={course.id} className="p-4 flex gap-4 items-center">
              <div className="w-20 h-20 bg-neutral-100 rounded-xl flex items-center justify-center text-neutral-400 relative overflow-hidden group">
                <PlayCircle size={32} className="relative z-10 group-hover:text-emerald-500 transition-colors" />
                <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/5 transition-all" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-neutral-900 leading-tight">{course.title}</h4>
                  <Badge variant="success">{course.category}</Badge>
                </div>
                <div className="flex items-center gap-4 text-xs text-neutral-500">
                  <div className="flex items-center gap-1">
                    <Clock size={12} /> {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} /> 12 Lessons
                  </div>
                </div>
                <div className="h-1.5 w-full bg-neutral-100 rounded-full mt-2">
                  <div className="h-full w-1/3 bg-emerald-500 rounded-full" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Certification Section */}
      <Card className="p-5 border-dashed border-2 border-emerald-200 bg-emerald-50/30">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-amber-100 rounded-full text-amber-600">
            <Award size={28} />
          </div>
          <div>
            <h4 className="font-bold text-neutral-900">Get Biplob Certified</h4>
            <p className="text-xs text-neutral-500">Complete a trade path and get a verified badge for your job profile.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
