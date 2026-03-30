

const OPENROUTER_API_KEY = "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"; // Replace with your OpenRouter API key
const PEXELS_API_KEY = "KjjCjZ1KFyBPadRVE1lJyxx5DWK6Qe4XEfySdudtHuqHXyfcKWryWHJ7"; // Replace with your Pexels API key
// src/utils/fetchAsanaRecommendations.js
async function fetchImageForAsana(asanaName) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(asanaName + " yoga pose")}&per_page=1`,
      {
        headers: {
          Authorization: PEXELS_API_KEY,
        },
      }
    );
    const data = await response.json();
    return data.photos[0]?.src?.medium || "/asana-images/default.jpg";
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
    return "/asana-images/default.jpg";
  }
}

export default async function fetchAsanaRecommendations(conditions = []) {
  if (!Array.isArray(conditions) || conditions.length === 0) {
    throw new Error("Health conditions must be a non-empty array");
  }

  const prompt = `Suggest 3 yoga asanas for someone with: ${conditions.join(", ")}.
For each asana, include:
1. Name
2. Benefits
3. 3-step instructions (short)
Return JSON array format like:
[
  {
    "name": "Tadasana",
    "benefits": "Improves posture and balance.",
    "steps": [
      "1. Stand straight with feet together",
      "2. Raise arms overhead",
      "3. Stretch upwards and hold for 10 seconds"
    ]
  }
]`;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a certified yoga therapist." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await res.json();
    let content = data?.choices?.[0]?.message?.content?.trim() || "";

    if (content.startsWith("```")) {
      content = content.replace(/```(?:json)?/gi, "").replace(/```/g, "").trim();
    }

    const asanas = JSON.parse(content);
    console.log(asanas)

    // Fetch images for each asana
    const enrichedAsanas = await Promise.all(
      asanas.map(async (asana) => ({
        ...asana,
        image: await fetchImageForAsana(asana.name),
      }))
    );

    return enrichedAsanas;
  } catch (error) {
    console.error("API fetch error:", error);
    return [];
  }
}