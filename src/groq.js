import { profile, skills, experience } from "./data.js";

const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "openai/gpt-oss-20b";
const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

export async function askGroq(question) {
  const jobs = experience
    .map((job) => `${job.role} at ${job.company}`)
    .join(", ");
  const systemPrompt =
    `You rate how well ${profile.name} fits a job. ` +
    `Their skills are: ${skills.join(", ")}. Their experience: ${jobs}. ` +
    `Reply in this format only: "Score: X/10. Reason: one short sentence."`;
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: question },
      ],
    }),
  });
  console.log(response.status, await response.clone().text());
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("That model is not on your account. Try another MODEL.");
    }
    if (response.status === 429) {
      throw new Error("Too many requests. Wait a minute and try again.");
    }
    throw new Error("Something went wrong. Check your API key in .env.");
  }
  const data = await response.json();
  return data.choices[0].message.content;
}
