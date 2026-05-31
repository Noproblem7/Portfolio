export interface Project {
  id: string;
  title: string;
  description: string;
  imagePlaceholder: string; // Describes what vector illustration/graphic to draw
  techTags: string[];
  githubUrl: string;
  details: string; // Long details for click-to-expand or modal
}

export interface SkillItem {
  name: string;
  level: number; // percentage (e.g. 85 for 85%)
  details?: string;
}

export interface SkillCategory {
  title: string;
  icon: string; // Lucide icon string name
  items: SkillItem[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
