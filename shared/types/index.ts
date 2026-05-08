export interface PersonalInfo {
  name: string;
  firstName: string;
  title: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  avatar: string;
  bio: string;
  resumeUrl: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number;
  yearsOfExperience: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  imageUrl: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  startDate: string;
  endDate: string;
  achievements: string[];
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
  logo: string;
  website: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  socialLinks: SocialLink[];
}
