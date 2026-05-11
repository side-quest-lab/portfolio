import {
  BOOKMARKS,
  CERTIFICATIONS,
  EXPERIENCES,
  PROJECTS,
  SOCIAL_LINKS,
  TECH_STACK,
  USER,
} from "#shared/data/portfolio";

export function usePortfolio() {
  return {
    user: computed(() => USER),
    techStack: computed(() => TECH_STACK),
    projects: computed(() => PROJECTS),
    experiences: computed(() => EXPERIENCES),
    socialLinks: computed(() => SOCIAL_LINKS),
    certifications: computed(() => CERTIFICATIONS),
    bookmarks: computed(() => BOOKMARKS),
  };
}
