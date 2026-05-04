export type AppMode = 'HOME' | 'JOBS' | 'LANGUAGE' | 'LEGAL' | 'SAFETY' | 'TRAINING' | 'DOCS' | 'FRAUD' | 'SKILLS';

export interface SalaryData {
  jobTitle: string;
  location: string;
  range: string;
  verified: boolean;
  updatedAt: string;
}

export interface TrainingCourse {
  id: string;
  title: string;
  category: 'Plumbing' | 'Electrician' | 'Construction' | 'Other';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  videoUrl?: string;
}

export const SALARY_DATA: SalaryData[] = [
  { jobTitle: 'Construction Worker', location: 'Saudi Arabia', range: '900 – 1200 SAR', verified: true, updatedAt: 'April 2024' },
  { jobTitle: 'Plumber', location: 'UAE', range: '1500 – 2200 AED', verified: true, updatedAt: 'May 2024' },
  { jobTitle: 'Electrician', location: 'Qatar', range: '1800 – 2500 QAR', verified: true, updatedAt: 'March 2024' },
  { jobTitle: 'Garment Worker', location: 'Dhaka, Bangladesh', range: '12500 – 15000 BDT', verified: true, updatedAt: 'January 2024' },
];

export const TRAINING_COURSES: TrainingCourse[] = [
  { id: '1', title: 'Pipe Fixing & Leak Repair', category: 'Plumbing', difficulty: 'Beginner', duration: '2 hours' },
  { id: '2', title: 'Switch & Socket Installation', category: 'Electrician', difficulty: 'Beginner', duration: '1.5 hours' },
  { id: '3', title: 'Cement Mixing & Measurement', category: 'Construction', difficulty: 'Beginner', duration: '3 hours' },
];
