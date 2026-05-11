export interface SocialLink {
  icon: string;
  title: string;
  subtitle?: string;
  href: string;
}

export interface TechStack {
  key: string;
  icon: string;
  color: string;
  title: string;
  href: string;
  category: "Frontend" | "Backend" | "Mobile" | "Database" | "Tools";
}

export interface ExperiencePosition {
  id: string;
  title: string;
  employmentPeriod: {
    start: string;
    end?: string;
  };
  employmentType?: string;
  icon: string;
  description?: string;
  skills?: string[];
  isExpanded?: boolean;
}

export interface Experience {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  positions: ExperiencePosition[];
  isCurrentEmployer?: boolean;
}

export interface Project {
  id: string;
  title: string;
  period: {
    start: string;
    end?: string;
  };
  link?: string;
  repo: string;
  stacks: string[];
  description?: string;
  logo?: string;
  isExpanded?: boolean;
}

export interface Certification {
  title: string;
  issuer: string;
  issuerIconName?: string;
  issueDate: string;
  credentialID?: string;
  credentialURL: string;
}

export interface Bookmark {
  title: string;
  url: string;
  author?: string;
  iconName?: string;
  bookmarkedAt: string;
}

export interface User {
  firstName: string;
  lastName: string;
  displayName: string;
  username: string;
  gender: "male" | "female" | "non-binary";
  pronouns: string;
  bio: string;
  flipSentences: string[];
  address: string;
  /**base64 encoded */
  phoneNumbers: string[];
  /**base64 encoded */
  email: string;
  website: string;
  jobTitle: string;
  jobs: Array<{
    title: string;
    company: string;
    website: string;
    experienceId?: string;
  }>;
  about: string;
  avatar: string;
  timeZone: string;
  keywords: string[];
  dateCreated: string;
}
