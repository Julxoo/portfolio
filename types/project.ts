export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  images: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  date: string;
  status?: "in-progress" | "completed" | "archived";
}
