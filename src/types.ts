export type AppMode = 'HOME' | 'JOBS' | 'LANGUAGE' | 'LEGAL' | 'SAFETY' | 'TRAINING' | 'DOCS' | 'FRAUD' | 'COUNTRY_GUIDE';

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
  category: 'Plumbing' | 'Electrician' | 'Construction' | 'General';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  videoUrl?: string;
  isPremium?: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  trade: string;
  rating: number;
  experience: string;
  location: string;
  fee: string;
  isVerified: boolean;
}

export interface CountryInfo {
  id: string;
  name: string;
  flag: string;
  visaCost: string;
  minWage: string;
  culture: string;
}

export const SALARY_DATA: SalaryData[] = [
  { jobTitle: 'Construction Worker', location: 'Saudi Arabia', range: '900 – 1200 SAR', verified: true, updatedAt: 'April 2024' },
  { jobTitle: 'Plumber', location: 'UAE', range: '1500 – 2200 AED', verified: true, updatedAt: 'May 2024' },
  { jobTitle: 'Electrician', location: 'Qatar', range: '1800 – 2500 QAR', verified: true, updatedAt: 'March 2024' },
  { jobTitle: 'Garment Worker', location: 'Dhaka, Bangladesh', range: '12500 – 15000 BDT', verified: true, updatedAt: 'January 2024' },
  { jobTitle: 'Heavy Driver', location: 'Saudi Arabia', range: '2200 – 3500 SAR', verified: true, updatedAt: 'May 2024' },
  { jobTitle: 'Security Guard', location: 'UAE', range: '1800 – 2400 AED', verified: false, updatedAt: 'Feb 2024' },
  { jobTitle: 'Housekeeper', location: 'Maldives', range: '350 – 550 USD', verified: true, updatedAt: 'May 2024' },
  { jobTitle: 'Chef', location: 'Malaysia', range: '2500 – 4000 MYR', verified: true, updatedAt: 'April 2024' },
];

export const TRAINING_COURSES: TrainingCourse[] = [
  { id: '1', title: 'Pipe Fixing & Leak Repair', category: 'Plumbing', difficulty: 'Beginner', duration: '2 hours' },
  { id: '2', title: 'Switch & Socket Installation', category: 'Electrician', difficulty: 'Beginner', duration: '1.5 hours' },
  { id: '3', title: 'Cement Mixing Basics', category: 'Construction', difficulty: 'Beginner', duration: '3 hours' },
];

export const TRAINERS: Trainer[] = [
  { id: 't1', name: 'Jasim Uddin', trade: 'Plumbing', rating: 4.9, experience: '12 Years', location: 'Mirpur, Dhaka', fee: 'Free for Learners', isVerified: true },
  { id: 't2', name: 'Md. Karim', trade: 'Electrician', rating: 4.7, experience: '8 Years', location: 'Uttara, Dhaka', fee: '৳ 500 / Session', isVerified: true },
];

export const COUNTRIES: CountryInfo[] = [
  { id: 'sa', name: 'Saudi Arabia', flag: '🇸🇦', visaCost: '৳ 4,00,000 - 5,00,000', minWage: '900 SAR', culture: 'Conservative, Religious focus' },
  { id: 'uae', name: 'UAE', flag: '🇦🇪', visaCost: '৳ 3,50,000 - 4,50,000', minWage: '1200 AED', culture: 'Diverse, Modern cities' },
  { id: 'my', name: 'Malaysia', flag: '🇲🇾', visaCost: '৳ 2,50,000 - 3,50,000', minWage: '1500 MYR', culture: 'Tropical, Multicultural' },
];
