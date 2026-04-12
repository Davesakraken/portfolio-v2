import ProjectCard from "../components/ProjectsPage/ProjectCard";
import type { Project } from "../types/project";

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Movie Night",
    description:
      "A real-time movie polling app where users search, submit, and vote on movies, with live vote updates, poster previews, and auto-suggestions.",
    image: "/movie-night.png",
    imageAlt: "E-Commerce Platform Screenshot",
    technologies: ["Nextjs", "TypeScript", "Node.js", "Tailwind CSS", "Redis"],
    liveUrl: "https://movie-night-orpin.vercel.app/",
  },
];

function ProjectsPage() {
  return (
    <div className="w-full">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">My Projects</h1>
      <p className="text-lg text-slate-700 dark:text-slate-300 mb-12 max-w-2xl">
        Here are some of my recent projects showcasing my skills in web development, UI/UX design,
        and problem-solving.
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
