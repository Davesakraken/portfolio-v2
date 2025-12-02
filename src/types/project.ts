export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
}
