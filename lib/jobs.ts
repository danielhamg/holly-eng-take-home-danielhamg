import path from "path";
import { promises as fs } from "fs";

export type JobDescription = {
  jurisdiction: string;
  code: string;
  title: string;
  description: string;
};

export async function loadJobs(): Promise<JobDescription[]> {
  const filePath = path.join(process.cwd(), "data", "job-descriptions.json");
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data) as JobDescription[];
}

export function findJobFromQuery(
  jobs: JobDescription[],
  query: string
): JobDescription | null {
//   console.log(`jobs: ${JSON.stringify(jobs)}.... query: ${query}`)
  const lowerQuery = query.toLowerCase();
  // Try to match both title and jurisdiction in the query
  for (const job of jobs) {
    if (
      lowerQuery.includes(job.title.toLowerCase()) &&
      lowerQuery.includes(job.jurisdiction.toLowerCase())
    ) {
      return job;
    }
  }
  // Try to match just the title if jurisdiction not found
  for (const job of jobs) {
    if (lowerQuery.includes(job.title.toLowerCase())) {
      return job;
    }
  }
  return null;
}