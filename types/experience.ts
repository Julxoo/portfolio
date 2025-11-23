export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  period: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  current: boolean;
}
