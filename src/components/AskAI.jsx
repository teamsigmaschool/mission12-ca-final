import { useState } from "react";
import { askGroq } from "../groq.js";
const MAX_LENGTH = 500;

export default function AskAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleAsk() {
    const text = question.trim();
    if (text === "") {
      setAnswer("Please paste a job description first.");
      return;
    }
    if (text.length > MAX_LENGTH) {
      setAnswer(`Keep it under ${MAX_LENGTH} characters.`);
      return;
    }
    try {
      const reply = await askGroq(text);
      setAnswer(reply);
    } catch (error) {
      setAnswer(error.message);
    }
  }

  return (
    <section>
      <h2>Ask the AI about me</h2>
      <div className="ask">
        <input
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          placeholder="e.g. What is this person good at?"
        />
        <button onClick={handleAsk}>Ask</button>
      </div>
      <p className="answer">{answer}</p>
    </section>
  );
}
