import { info, skills, projects, experience, socialLinks } from "#shared/data/portfolio";

export function usePortfolio() {
  return {
    info: computed(() => info),
    skills: computed(() => skills),
    projects: computed(() => projects),
    experience: computed(() => experience),
    socialLinks: computed(() => socialLinks),
  };
}
