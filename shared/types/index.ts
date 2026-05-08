export type SkillCategory = "mobile" | "frontend" | "backend" | "database" | "devops" | "tools";
export type ProjectCategory = "mobile" | "web";
export type SocialPlatform = "LinkedIn" | "GitHub" | "Upwork" | "X" | "Email";
export type SocialIcon = "linkedin" | "github" | "upwork" | "twitter" | "mail";

export interface PersonInfo {
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
  category: SkillCategory;
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
  category: ProjectCategory;
  startDate: string;
  endDate: string | "current";
  achievements: string[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string; // optional — current job has no endDate
  description: string;
  technologies: string[];
  logo: string;
  website: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  icon: SocialIcon;
  username: string;
}

export interface PortfolioData {
  info: PersonInfo;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  socialLinks: SocialLink[];
}
