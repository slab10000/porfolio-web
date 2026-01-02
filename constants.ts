import { Experience, Project, SkillCategory, Education, SocialMedia } from './types';
import { Layers, Rocket, Code, Database, Cpu, BrainCircuit } from 'lucide-react';
import project1Image from './project images/project 1 image.png';
import project2Image from './project images/project 2 - Roman empire counter.png';
import project3Image from './project images/project 3 - GPT from scratch.png';
import project4Image from './project images/project 4 - ML algorithms.png';
import project5Image from './project images/project 5 - Star uc3m.png';
import project6Image from './project images/project 6 - Sophra.png';

export const PERSONAL_INFO = {
  name: "Blas Moreno Laguna",
  role: "Computer Engineer | AI Engineer",
  email: "me@blasmoreno.dev",
  phone: "+1 219 385 8170",
  linkedin: "linkedin.com/in/blas-moreno-laguna",
  github: "github.com/slab10000",
  bio: `Passionate Computer Engineer specializing in AI, pursuing a Master's at Purdue University Northwest. ` +
    `Experienced in Android development, robotic systems, and distributed 5G edge computing. ` +
    `Driven by innovation and a desire to contribute to impactful technologies that shape the future.`
};

export const EXPERIENCES: Experience[] = [
  {
    company: "Santander - Openbank",
    totalPeriod: "Sep 2022 - Aug 2025",
    roles: [
      {
        title: "Android Team Leader",
        period: "Sep 2023 - Aug 2025",
        description: `Managed team personnel, delivered technical training sessions, ` +
          `and ensured the successful completion of projects on time and within scope.`,
        type: 'work'
      },
      {
        title: "Android Engineer",
        period: "Sep 2022 - Sep 2023",
        description: `Responsible for developing Android mobile applications using Kotlin, ` +
          `implementing CLEAN architecture, and applying agile methodologies.`,
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
        description: `Worked on software development for robotics and network systems, ` +
          `focusing on distributed systems and 5G edge computing. ` +
          `Contributed to one of the first implementations of distributed robotic systems using ROS2.`,
        type: 'research'
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "ROS & Edge Computing Research",
    techStack: ["Docker", "ROS", "Edge Computing", "ROS2", "5G"],
    description: "Designed and implemented a distributed robotic testbed over 5G edge computing.",
    modalDescription: `This research project focused on optimizing distributed robotic systems using 5G edge computing. ` +
      `By offloading heavy computational tasks to the edge, we achieved significant performance improvements ` +
      `in both energy efficiency and processing speed. The system was validated using a Gazebo Turtlebot robot. ` +
      `Done in collaboration with NEC Labs and IMDEA Networks Institute.`,
    links: [
      { url: "https://e-archivo.uc3m.es/entities/publication/d9696267-9eb0-4d26-9a59-e417bbc87ee6", label: "View publication" },
      { url: "https://networks.imdea.org/", label: "IMDEA NETWORKS" }
    ],
    imagePlaceholder: project1Image
  },
  {
    title: "Build and trained a GPT from scratch",
    techStack: ["Python", "Pytorch"],
    description: "Built a GPT from scratch using Pytorch and trained it on a dataset scraped from the offical IETF's RFC website.",
    modalDescription: `A complete implementation of a GPT (Generative Pre-trained Transformer) model from scratch using PyTorch. ` +
      `This project demonstrates how to build, train, and deploy a transformer-based language model similar to OpenAI's GPT architecture. ` +
      `The implementation includes all core components: multi-head self-attention mechanism, positional encoding, ` +
      `feed-forward networks, layer normalization, residual connections, and dropout regularization. ` +
      `The model supports both character-level and subword tokenization (using tiktoken), and includes a full training ` +
      `infrastructure with checkpointing, mixed precision training, and learning rate scheduling. ` +
      `Trained on RFC (Request for Comments) documents scraped from the official IETF website, ` +
      `the model can generate text in a similar technical style. The architecture features 512 embedding dimensions, ` +
      `8 attention heads, 6 transformer layers, and a context window of 512 tokens, ` +
      `optimized for GPU training with gradient accumulation and efficient batch generation.`,
    links: [
      { url: "https://github.com/slab10000/GPT-from-scratch", label: "View Code" }
    ],
    imagePlaceholder: project3Image
  },
  {
    title: "Roman Empire Counter (Android App)",
    techStack: ["Kotlin", "Jetpack Compose", "Android"],
    description: "Designed and deployed an Android App independently, available on the App Store.",
    modalDescription: `A fun Android app that helps you track how many times you think about the Roman Empire each day! ` +
      `Built with modern Android development practices, this app demonstrates Clean Architecture principles ` +
      `and provides a delightful user experience. The app features a daily counter with Roman numeral display, ` +
      `weekly statistics and summaries, complete history tracking with filtering options (7 Days, Month, Year, or All), ` +
      `and a beautiful Material Design 3 interface with Roman Empire-themed aesthetics. ` +
      `Additional features include a home widget for quick access, inspirational Latin quotes with translations, ` +
      `and complete data privacy with all data stored locally on the device. ` +
      `The project follows Clean Architecture with three distinct layers: ` +
      `Presentation (Jetpack Compose UI with MVVM pattern), Domain (business logic and use cases), ` +
      `and Data (Room database for local persistence). Built using Kotlin, Jetpack Compose, ` +
      `Hilt for dependency injection, Room database, Navigation Compose, and Glance AppWidget for widgets. ` +
      `The app is available on Google Play Store and has been downloaded by 300+ users.`,
    links: [
      { url: "https://github.com/slab10000/Android_App_Clean_Architecture-RomanEmpireCounter", label: "View Code" },
      { url: "https://play.google.com/store/apps/details?id=com.blas.romanempirecounter&hl=en", label: "Play Store" },
      { url: "https://www.tiktok.com/@blas.ml/video/7417778347104685345", label: "Watch Video" }
    ],
    imagePlaceholder: project2Image
  },
  {
    title: "AI & Image Recognition",
    techStack: ["Python", "PyTorch", "TensorFlow", "Computer Vision", "Machine Learning"],
    description: "Created small-scale models and tools for image recognition and text processing.",
    modalDescription: `A comprehensive repository for Deep Learning and Machine Learning algorithms serving as a personal ` +
      `playground and portfolio for practicing, experimenting with, and mastering various algorithms and frameworks. ` +
      `The project includes multiple implementations: Generative Adversarial Networks (GANs) with Conditional GANs ` +
      `for generating MNIST images conditioned on class labels, Classification and Regression projects including ` +
      `a Multi-Layer Perceptron (MLP) model for pet adoption profile classification and XGBoost regression for ` +
      `song popularity prediction, Neural Input Optimization (NIO) for movie optimization using a ResNet architecture ` +
      `to reverse-engineer optimal movie blueprints that maximize ROI while maintaining high IMDB scores, ` +
      `and Convolutional Neural Networks (CNNs) for geometric shape classification achieving 97.1% precision, ` +
      `recall, and F1 score. ` +
      `The CNN project classifies geometric shapes by counting sides (triangles, squares, pentagons, hexagons) ` +
      `using a custom architecture with 3 convolutional layers, fully connected layers with dropout regularization, ` +
      `trained on 10,000 images. The NIO project uses the IMDB 5000 Movie Dataset to find optimal movie characteristics ` +
      `that yield 9.09x ROI while maintaining critical acclaim. ` +
      `Built using Python, PyTorch, XGBoost, NumPy, Pandas, and ONNX for model exchange. ` +
      `All implementations are in Jupyter Notebooks and the project is under active development with plans for ` +
      `Computer Vision models (ViTs, advanced CNNs), NLP architectures (Transformers, RNNs), ` +
      `Reinforcement Learning algorithms, and more advanced GAN architectures.`,
    links: [
      { url: "https://github.com/slab10000/deep-learning-algorithms", label: "View Code" }
    ],
    imagePlaceholder: project4Image
  },
  {
    title: "Rocket Software (STAR UC3M)",
    techStack: ["C++", "Embedded Systems", "Telemetry"],
    description: "Developed embedded flight software and telemetry visualization tools for university rocketry.",
    modalDescription: `Developed embedded flight software and telemetry visualization tools for the Astrea C project ` +
      `as part of STAR (Student Team for Aerospace and Rocketry) at Carlos III University of Madrid. ` +
      `STAR is a rocketry association formed by 80 students who use their knowledge, creativity, and engineering skills ` +
      `to design, develop, and manufacture innovative reusable rockets. The team members come from various engineering ` +
      `degrees including Aerospace, Mechanical, Telecommunications, Industry, Electronics, and Energy. ` +
      `My contribution involved developing critical embedded systems software for flight control and creating ` +
      `telemetry visualization tools to monitor and analyze rocket performance data during launches. ` +
      `This work was essential for the team's mission to develop reusable rockets and achieve successful launches.`,
    links: [
      { url: "https://staruc3m.com/", label: "View Project" }
    ],
    imagePlaceholder: project5Image
  },
  {
    title: "Sophra App",
    techStack: ["React", "TypeScript", "Vite", "OpenAI API", "Tailwind CSS"],
    description: "Created a web app that allows users to improve their writing skills using OpenAI's API.",
    modalDescription: `Sophra is a full-stack AI-powered writing correction platform that helps users ` +
      `improve their writing through advanced text analysis and correction. The application allows users to upload ` +
      `images of handwritten or typed text, receive instant transcriptions using AI vision, and get detailed grammar, ` +
      `spelling, and style corrections with visual error highlighting. ` +
      `Key features include image transcription using OpenAI's vision models, parallel text correction that processes ` +
      `large texts in concurrent chunks for faster results, side-by-side visual comparison showing original text with ` +
      `errors highlighted in red and corrected text with fixes in green, detailed explanations for each correction ` +
      `including category, rule, and explanation, and automatic exercise generation that creates personalized ` +
      `multiple-choice exercises based on the user's mistakes. ` +
      `Built with React 18 and TypeScript on the frontend using Vite as the build tool, Radix UI for accessible ` +
      `components, Tailwind CSS for styling, and Framer Motion for animations. The backend is built on Node.js with ` +
      `Vercel Serverless Functions, leveraging OpenAI's GPT models for transcription, correction, and exercise ` +
      `generation. The architecture implements parallel processing for efficient text correction, maintains original ` +
      `formatting by preserving paragraph breaks, and includes JSON repair logic for robust AI response handling. ` +
      `The platform is fully deployed on Vercel and provides a seamless user experience from image upload to ` +
      `personalized learning exercises.`,
    links: [
      { url: "https://github.com/slab10000", label: "View Code" }
    ],
    imagePlaceholder: project6Image
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Kotlin", "Python", "Java", "C++", "JavaScript"]
  },
  {
    name: "Frameworks & Tools",
    skills: ["Jetpack Compose", "TensorFlow", "ROS", "ROS2", "Git", "Docker"]
  },
  {
    name: "AI & Data",
    skills: ["Python", "PyTorch", "TensorFlow", "Machine Learning", "Neural Networks", "Data Analysis"]
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

export const SOCIAL_MEDIA: SocialMedia[] = [
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@blas.ml',
    followers: 0, // Update with actual follower count
    description: 'Spanish account teaching AI and talking about technology.',
  },
  {
    name: 'X (Twitter)',
    url: 'https://x.com/Blasml_11',
    followers: 0, // Update with actual follower count
    description: 'Talking about projects and technology news',
  },
  {
    name: 'YouTube',
    url: 'https://www.youtube.com/@BlasMorenoLaguna',
    followers: 0, // Update with actual follower count
    description: 'Coming soon: long tutorials and videos teaching AI and engineering',
  },
];