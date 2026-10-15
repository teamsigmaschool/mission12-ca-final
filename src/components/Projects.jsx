import { projects } from "../data.js";

export default function Projects() {
  return (
    <section>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div className="card" key={project.link}>
          <h3>
            <a href={project.link} target="_blank" rel="noreferrer">
              {project.name}
            </a>
          </h3>
          <p className="muted">
            {project.start}
          </p>
          <p>{project.description}</p>
        </div>
      ))}
    </section>
  );
}