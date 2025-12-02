import GlassContainer from "@/components/common/GlassContainer";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/types/project";

interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
}

function ProjectCard({ project, className = "", ...props }: ProjectCardProps) {
  return (
    <GlassContainer
      variant="card"
      blur="md"
      shadow="lg"
      rounded="xl"
      className={`p-6 ${className}`}
      {...props}
    >
      {/* Image Container */}
      <div className="w-full h-[20rem] rounded-lg overflow-hidden mb-4 bg-slate-200 dark:bg-slate-800">
        <img
          src={project.image}
          alt={project.imageAlt || project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-slate-100">
        {project.title}
      </h2>

      {/* Description */}
      <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
        {project.description}
      </p>

      {/* Technologies Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm rounded-full bg-slate-200/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 text-slate-700 dark:text-slate-300"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-700 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors font-medium"
        >
          <GitHubIcon className="w-5 h-5" />
          View Source
        </a>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors font-medium text-slate-700 dark:text-slate-300"
          >
            Live Demo
          </a>
        )}
      </div>
    </GlassContainer>
  );
}

export default ProjectCard;
