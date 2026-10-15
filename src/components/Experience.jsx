import { experience } from "../data.js";

export default function Experience() {
  return (
    <section>
      <h2>Experience</h2>
      {experience.map((job) => (
        <div className="card" key={job.company + job.start}>
          <h3>
            {job.role} · {job.company}
          </h3>
          <p className="muted">
            {job.start} – {job.end}
          </p>
          <p>{job.description}</p>
        </div>
      ))}
    </section>
  );
}