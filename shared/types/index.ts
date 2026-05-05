export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: "mobile" | "web" | "backend" | "fullstack";
  startDate: string;
  endDate?: string;
  achievements?: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: string;
  technologies: string[];
  logo?: string;
  website?: string;
  responsibilities?: string[];
}

export interface PortfolioData {
  personalInfo: {
    name: string;
    firstName: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    phone?: string;
    avatar: string;
    bio: string;
    resumeUrl?: string;
  };
  skills: Array<{
    id: string;
    name: string;
    category: string;
    level: number;
    yearsOfExperience: number;
  }>;
  projects: Project[];
  experience: Experience[];
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
    username: string;
  }>;
}
