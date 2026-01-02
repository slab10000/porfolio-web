export interface Role {
  title: string;
  period: string;
  description: string;
  type: 'work' | 'research';
}

export interface Experience {
  company: string;
  totalPeriod?: string;
  roles: Role[];
}

export interface Project {
  title: string;
  techStack: string[];
  description: string;
  modalDescription?: string;
  links?: {
    url: string;
    label: string;
    icon?: any;
  }[];
  imagePlaceholder?: string; // URL for picsum
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
}

export interface SocialMedia {
  name: string;
  url: string;
  followers: number;
  description?: string;
  icon?: string;
}