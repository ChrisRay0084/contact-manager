const BASE_URL = "https://api.github.com";

export async function getFileFromGitHub() {
  const res = await fetch(
    `${BASE_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch file");

  const data = await res.json();

  const content = Buffer.from(data.content, "base64").toString("utf-8");

  return {
    json: JSON.parse(content),
    sha: data.sha,
  };
}

export async function updateFileOnGitHub(newJson: any, sha: string) {
  const content = Buffer.from(JSON.stringify(newJson, null, 2)).toString("base64");

  const res = await fetch(
    `${BASE_URL}/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${process.env.GITHUB_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "Update contacts via app",
        content,
        sha,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}