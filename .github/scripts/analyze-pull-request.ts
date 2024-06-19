import { PullRequestDetails } from "models";

export async function analyzePullRequest(
  styleGuide: string,
  PullRequestDetails: PullRequestDetails
): Promise<string> {
  const prompt = createBasePullRequestPrompt(styleGuide, PullRequestDetails);
  // const aiResponse = await getAIResponse(prompt);
  const aiResponse = "";
  return aiResponse;
}

export function createBasePullRequestPrompt(
  styleGuide: string,
  pullRequestDetails: PullRequestDetails
): string {
  return `Your task is to check pull request follows style-guide. Instructions:
  - Provide the response in following JSON format:  "Style guide: <violated_rule_with_status> new line for each rule."
  - Go through each rule strictly and carefully.
  - Provide a list of violated rules as a bullet point exactly as it appears in the Style Guide, followed by the status 'false' if it is violated or 'true' if it is not violated or  'not sure' if you are unsure
  - Be especially careful when checking the branch and commit rules, as you have made mistakes in this area before.
  - IMPORTANT: NEVER provide any explanations or code in your response.

  Style guide:
  <style-guide>
  ${styleGuide}
  </style-guide>

  Pull request details:
  Pull request title: ${pullRequestDetails.title}
  Source branch: ${pullRequestDetails.sourceBranch}
  Target branch: ${pullRequestDetails.targetBranch}
  Commit message: ${pullRequestDetails.commitMessages}
  Pull request description: ${pullRequestDetails.description}
  `;
}
