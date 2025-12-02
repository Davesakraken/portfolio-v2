import ProjectCard from "../components/ProjectsPage/ProjectCard";
import type { Project } from "../types/project";

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with cart functionality, payment integration, and admin dashboard. Built with modern web technologies for optimal performance.",
    image: "/vite.svg",
    imageAlt: "E-Commerce Platform Screenshot",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
    githubUrl: "https://github.com/yourusername/ecommerce",
    liveUrl: "https://example.com",
  },
  {
    id: "2",
    title: "Weather Dashboard",
    description:
      "Real-time weather application with location search, 5-day forecast, and interactive maps. Features responsive design and dark mode support.",
    image: "/vite.svg",
    imageAlt: "Weather Dashboard Screenshot",
    technologies: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
    githubUrl: "https://github.com/yourusername/weather-app",
  },
  {
    id: "3",
    title: "Task Management App",
    description:
      "Collaborative task management tool with drag-and-drop interface, real-time updates, and team collaboration features.",
    image: "/vite.svg",
    imageAlt: "Task Management App Screenshot",
    technologies: ["React", "Redux", "Firebase", "Material-UI"],
    githubUrl: "https://github.com/yourusername/task-manager",
    liveUrl: "https://tasks.example.com",
  },
];

function ProjectsPage() {
  return (
    <div className="w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">My Projects</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 mb-12 max-w-2xl">
        Here are some of my recent projects showcasing my skills in web
        development, UI/UX design, and problem-solving.
      </p>

      <div className="flex flex-col gap-8">
        {sampleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

export default ProjectsPage;
