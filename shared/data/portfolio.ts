import type {
  Bookmark,
  Certification,
  Experience,
  Project,
  SocialLink,
  TechStack,
  User,
} from "#shared/types";

export const SOCIAL_LINKS: SocialLink[] = [];

export const TECH_STACK: TechStack[] = [];

export const EXPERIENCES: Experience[] = [];

export const PROJECTS: Project[] = [];

export const CERTIFICATIONS: Certification[] = [];

export const BOOKMARKS: Bookmark[] = [];

export const USER: User = {
  firstName: "",
  lastName: "",
  displayName: "",
  username: "",
  gender: "non-binary",
  pronouns: "",
  bio: "",
  flipSentences: [],
  address: "",
  phoneNumbers: [],
  email: "",
  website: "",
  jobTitle: "",
  jobs: [
    {
      title: "",
      company: "",
      website: "",
    },
  ],
  about: "",
  avatar: "",
  timeZone: "",
  keywords: [],
  dateCreated: "",
};
