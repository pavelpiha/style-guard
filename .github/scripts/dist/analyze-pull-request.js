import { createAPIMessage } from "./get-ai-response.js";
export async function analyzePullRequest(styleGuide, PullRequestDetails) {
    const prompt = createBasePullRequestPrompt(styleGuide, PullRequestDetails);
    const aiResponse = await getAICommentResponse(prompt);
    console.log("analyze PR response: ", aiResponse);
    return aiResponse;
}
function createBasePullRequestPrompt(styleGuide, pullRequestDetails) {
    return `Your task is to check pull request follows style-guide. Instructions:
  - Provide the response in following JSON format:  "Style guide: <violated_rule_with_status> new line for each rule."
  - Go through each rule strictly and carefully.
  - Provide a list of violated rules as a bullet point exactly as it appears in the Style Guide, followed by the status ':x:' if it is violated or ':white_check_mark:' if it is not violated or ':confused:' if you are unsure
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
async function getAICommentResponse(prompt) {
    try {
        const result = await createAPIMessage([{ role: "user", content: prompt }]);
        if (result.content.length) {
            console.log("------------", result.content[0].text);
            console.log("------------");
            return result.content[0].text;
        }
        else {
            console.error("Error: In result content ", result.content);
            return null;
        }
    }
    catch (error) {
        console.error("Error:", error);
        return null;
    }
}
