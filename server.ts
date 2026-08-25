import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { PRESETS } from "./src/presets.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "20mb" }));

const PORT = 3000;

// Lazy initialiser for Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not defined.");
  }
  return new GoogleGenAI({
    apiKey: apiKey || "",
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API: Get preloaded benchmark presets
app.get("/api/presets", (req, res) => {
  res.json({ status: "success", presets: PRESETS });
});

// API: Health status and key evaluation checks
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString(),
  });
});

// API: Core Search Quality Rater and NLP Analysis endpoint
app.post("/api/analyze", async (req, res) => {
  const { query, serp_content } = req.body;

  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ error: "Search query is required." });
  }

  // Check if query is a preset ID
  if (PRESETS[query]) {
    console.log(`[API] Serving cached audit preset for query: "${query}"`);
    return res.json(PRESETS[query].data);
  }

  try {
    const ai = getGeminiClient();
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing on the server. Please check the Secrets panel inside AI Studio.");
    }

    console.log(`[API] Initiating Search Quality Audit & NLP analysis of query: "${query}"`);

    const userMessage = serp_content && serp_content.trim()
      ? `User Search Query: "${query}"\n\nProvided SERP Raw Content/HTML/Elements for analysis:\n${serp_content}`
      : `User Search Query: "${query}"\n\nNo raw SERP HTML was pasted. Please simulate/reconstruct a high-realism Search Engine Results Page (SERP) layout under 2025 search characteristics, including top 6-10 highly citable and commercial organic listings with their titles, URLs, and snippets, then execute the full NLP and trust guidelines audit on it.`;

    const systemInstruction = `You are a Senior Search Quality Architect and NLP Engine. Your job is to analyze search queries and real or simulated search engine results pages (SERPs) and top organic results according to the September 2025 Google Search Quality Rater Guidelines and modern Generative Engine Optimization (GEO) standards.

You must output a highly granular JSON object matching the TypeScript interface \`SERPAnalysisResponse\` (do not wrap with any other top-level keys).

Below is the layout of the required JSON schema you must strict follow:

{
  "serp_map": {
    "query": "The exact original search query",
    "ai_overview": {
      "present": true,
      "summary": "Detailed Generative AI summary text answering the query based on organic search results",
      "citations": ["Array of citable source URLs in the summary"]
    },
    "sponsored_count": 0,
    "sponsored_ads": [
      { "title": "Ad headline title", "url": "https://...", "snippet": "Ad copy content" }
    ],
    "scrbs": [
      { "type": "Carousel" | "Local Map" | "Video" | "Product Shelf" | "Other SCRB", "description": "Specific visual block layout description details" }
    ],
    "intent_exploration": {
      "paa": ["List of typical People Also Ask questions with user intent focus"],
      "related_searches": ["List of relevant search keyword variations"]
    },
    "organic_results": [
      { "position": 1, "url": "https://...", "title": "Listing Page Title", "snippet": "A relevant page metadata snippet" }
    ]
  },
  "nlp_audit": {
    "entities": [
      {
        "name": "Exact matching word or entity text",
        "type": "Person" | "Organization" | "Product" | "Event" | "Location" | "Other",
        "salience": 0.85,
        "wikipedia_url": "Valid Wikipedia URL or empty string if unlisted",
        "knowledge_graph_id": "Freebase or Knowledge Graph standard alphanumeric ID (e.g. /m/04z_v1) or empty",
        "urls_present_in": ["List of URLs from organic_results that prominently mention this entity"]
      }
    ],
    "ngrams": {
      "bigrams": [
        { "phrase": "2-word phrase", "count": 5 }
      ],
      "trigrams": [
        { "phrase": "3-word phrase", "count": 2 }
      ]
    },
    "logic_tree": {
      "word": "root-word",
      "pos": "Grammar part of speech",
      "relation": "Syntax connection role like root/nsubj/obj",
      "children": [
        {
          "word": "dependent-word",
          "pos": "POS",
          "relation": "Syntactic dependency relation name",
          "children": []
        }
      ]
    },
    "triples": [
      { "subject": "Who/What acts", "predicate": "verb-based relation", "object": "What is acted upon" }
    ],
    "raw_tokens": [
      { "token": "Individual keyword split from search query", "pos": "Explicit English Part of Speech" }
    ]
  },
  "geo_insights": {
    "predicted_prompts": [
      { "prompt": "Conversational prompt used in LLMs or chat apps to trigger this listing", "intent": "RAG query classification", "target_url": "https://..." }
    ],
    "citable_rewrites": [
      {
        "original_sentence": "Marketing snippet sentence or poor declaration from the result",
        "citable_rewrite": "Fact-dense, absolute, highly citable declarative rewrite sentence",
        "reason": "Why the citable rewrite attracts generative engine references (mention numbers, guidelines, or factual authority factors)",
        "target_url": "https://..."
      }
    ],
    "eeat_scorecard": [
      {
        "url": "Listing URL matching organic results",
        "title": "Listing title",
        "experience": 8,
        "expertise": 9,
        "authoritativeness": 8,
        "trustworthiness": 9,
        "reputation_verified_via": "How reputation was checked (e.g. Wikipedia search, review clusters, credential databases)",
        "justification": "E-E-A-T score detail justification under September 2025 rules. Remember the Trust Mandate: if a listing is deceptive, lacks accountability, or has no verified author/publisher reputation on YMYL topics, it MUST get lowest quality marks."
      }
    ],
    "anti_spam_check": [
      {
        "url": "Listing URL",
        "title": "Listing title",
        "is_scaled_content": false,
        "flags": ["List of flags if any, like Low effort, Mass generated AI filler, etc."],
        "details": "Explanation of whether this represents scaled content abuse or is a genuine unique value addition."
      }
    ]
  }
}

Be extremely analytical, deep, and granular. Do not use generic answers or placeholders. Always populate all values thoroughly. Do not wrap the JSON inside a markdown wrapper like \`\`\`json. Return only pure JSON starting with { and ending with }.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: userMessage,
      config: {
        responseMimeType: "application/json",
        systemInstruction,
        temperature: 0.1, // Keep it precise and structured
      },
    });

    const parsedJson = JSON.parse(response.text || "{}");
    return res.json(parsedJson);

  } catch (error: any) {
    console.error("[API Error] Failed to execute SERP & NLP audit:", error);
    const errorMessage = error.message || String(error);
    let userFriendlyDetails = errorMessage;
    if (errorMessage.includes("RESOURCE_EXHAUSTED") || errorMessage.includes("quota")) {
      userFriendlyDetails = "Gemini API rate limit or quota exceeded. Please check your project billing or quota limits in Google AI Studio / Cloud Console, or switch to one of the rich built-in benchmark presets below to continue auditing immediately.";
    }
    return res.status(500).json({
      error: "Failed to perform Search Quality Audit",
      details: userFriendlyDetails,
    });
  }
});

// Configure Vite or Static Assets depending on Environment
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("[Server] Mounting Vite Middleware for Development (HMR is off)...");
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[Server] Serving production static files from dist/ directory...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Senior Search Quality & NLP Engine listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
