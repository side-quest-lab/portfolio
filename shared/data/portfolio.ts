import type { PortfolioData } from "../types";

import info from "./info.json";

const data = info as PortfolioData;

export const personalInfo = data.personalInfo;
export const skills = data.skills;
export const projects = data.projects;
export const experience = data.experience;
export const socialLinks = data.socialLinks;
