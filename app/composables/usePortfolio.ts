import { personalInfo, skills, projects, experience, socialLinks } from "~~/shared/data/portfolio";

export function usePortfolio() {
  return {
    personalInfo: computed(() => personalInfo),
    skills: computed(() => skills),
    projects: computed(() => projects),
    experience: computed(() => experience),
    socialLinks: computed(() => socialLinks),
  };
}
