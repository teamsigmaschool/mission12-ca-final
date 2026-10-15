import { education } from "../data.js";

export default function Education() {
  return (
    <section>
      <h2>Education</h2>
      {education.map((item) => (
        <div className="card" key={item.school + item.start}>
          <h3>{item.school}</h3>
          <p className="muted">
            {item.start} – {item.end}
          </p>
          <p>{item.course}</p>
        </div>
      ))}
    </section>
  );
}