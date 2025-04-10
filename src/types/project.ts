export interface Project {
  id?: string;
  name: string;
  url: string;
  sector: string;
  image: string;
  stack: string[];
  description?: string;
  createdAt?: Date | string | number;
  updatedAt?: Date | string | number;
}

export const PROJECT_SECTORS = [
  "Web Development",
  "Mobile App Development",
  "AI Solutions",
  "Cybersecurity",
  "Digital Marketing",
  "Software Development",
  "UI/UX Design",
  "Other"
];

export const TECH_STACK_OPTIONS = [
  "React",
  "Angular",
  "Vue.js",
  "TypeScript", 
  "JavaScript",
  "Node.js",
  "Python",
  "Django",
  "Flask",
  "Express.js",
  "Next.js",
  "Firebase",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "TensorFlow",
  "React Native",
  "Flutter",
  "Swift",
  "Kotlin",
  "PHP",
  "Laravel",
  "GraphQL",
  "Docker",
  "Kubernetes",
  ".NET",
  "C#",
  "Java",
  "Go",
  "Ruby on Rails"
];
