import { Experience, Project, SkillCategory, Education } from './types';
import { Layers, Rocket, Code, Database, Cpu, BrainCircuit } from 'lucide-react';
import project1Image from './project images/project 1 image.png';
import project2Image from './project images/project 2 - Roman empire counter.png';

export const PERSONAL_INFO = {
  name: "Blas Moreno Laguna",
  role: "Computer Engineer | AI Engineer",
  email: "me@blasmoreno.dev",
  phone: "+1 219 385 8170",
  linkedin: "linkedin.com/in/blas-moreno-laguna",
  github: "github.com/slab10000",
  bio: "Passionate Computer Engineer specializing in AI, pursuing a Master's at Purdue University Northwest. Experienced in Android development, robotic systems, and distributed 5G edge computing. Driven by innovation and a desire to contribute to impactful technologies that shape the future."
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Santander - Openbank",
    totalPeriod: "Sep 2022 - Aug 2025",
    roles: [
      {
        title: "Android Team Leader",
        period: "Sep 2023 - Aug 2025",
        description: "Managed team personnel, delivered technical training sessions, and ensured the successful completion of projects on time and within scope.",
        type: 'work'
      },
      {
        title: "Android Engineer",
        period: "Sep 2022 - Sep 2023",
        description: "Responsible for developing Android mobile applications using Kotlin, implementing CLEAN architecture, and applying agile methodologies.",
        type: 'work'
      }
    ]
  },
  {
    company: "NEC Labs - IMDEA Networks Institute",
    totalPeriod: "Apr 2022 - Sep 2022",
    roles: [
      {
        title: "Distributed Robotic Systems Researcher",
        period: "Apr 2022 - Sep 2022",
        description: "Worked on software development for robotics and network systems, focusing on distributed systems and 5G edge computing. Contributed to one of the first implementations of distributed robotic systems using ROS2.",
        type: 'research'
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Rocket Software (STAR UC3M)",
    techStack: ["C++", "Embedded Systems", "Telemetry"],
    description: "Developed embedded flight software and telemetry visualization tools for university rocketry.",
    imagePlaceholder: project1Image
  },
  {
    title: "ROS & Edge Computing Research",
    techStack: ["Docker", "ROS2", "5G", "Edge Computing"],
    description: "Designed and implemented a distributed robotic testbed achieving up to 92% higher computational efficiency and 40% better energy performance.",
    imagePlaceholder: "https://picsum.photos/seed/robot/600/400"
  },
  {
    title: "Roman Empire Counter (App)",
    techStack: ["Kotlin", "Jetpack Compose", "Android"],
    description: "Designed and deployed an Android App independently, available on the App Store.",
    imagePlaceholder: project2Image
  },
  {
    title: "AI & Image Recognition",
    techStack: ["Python", "TensorFlow", "Computer Vision"],
    description: "Created small-scale models and tools for image recognition and text processing.",
    imagePlaceholder: "https://picsum.photos/seed/ai/600/400"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Kotlin", "Python", "Java", "C++", "JavaScript"]
  },
  {
    name: "Frameworks & Tools",
    skills: ["Jetpack Compose", "TensorFlow", "ROS2", "Git", "Docker"]
  },
  {
    name: "AI & Data",
    skills: ["Machine Learning", "Neural Networks", "Data Analysis"]
  },
  {
    name: "Soft Skills",
    skills: ["Leadership", "Mentoring", "Problem Solving", "Communication"]
  }
];

export const EDUCATION: Education[] = [
  {
    degree: "Master's in Applied Artificial Intelligence",
    institution: "Purdue University, Indiana",
    period: "2025 - 2027"
  },
  {
    degree: "Bachelor of Telematics Engineering",
    institution: "University Carlos III of Madrid, Spain",
    period: "2018 - 2022"
  }
];

export const NAVIGATION_LINKS = [
  { name: 'Mission Control', href: '#home', icon: Rocket },
  { name: 'Experience', href: '#experience', icon: Layers },
  { name: 'Projects', href: '#projects', icon: Code },
  { name: 'Capabilities', href: '#skills', icon: Cpu },
  { name: 'Education', href: '#education', icon: BrainCircuit },
];