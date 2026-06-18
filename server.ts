import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

// Load environment variables
dotenv.config();

// Lazily load data from src/data to avoid early typescript resolution/import issues at module-load
// We can parse or import from ./src/data directly since esbuild bundles it.
import { 
  PROJECTS_STATIC, 
  BOARD_MEMBERS, 
  CONTRIBUTORS, 
  CSR_BOXES, 
  ABOUT_SOCIETY_PARAGRAPHS, 
  JOURNEY_STATS 
} from "./src/data";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy Google GenAI Client Initialization
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured in the environment secrets.");
    }
    genAIClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return genAIClient;
}

// 1. Core API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Endpoint to list photos uploaded in the workspace "public/gallery" folder
app.get("/api/gallery-images", (req, res) => {
  const galleryDir = path.join(process.cwd(), "public", "gallery");
  
  // Auto-verify/create target directory
  if (!fs.existsSync(galleryDir)) {
    fs.mkdirSync(galleryDir, { recursive: true });
  }

  try {
    const files = fs.readdirSync(galleryDir);
    const images = files
      .filter((file: string) => {
        const ext = path.extname(file).toLowerCase();
        return [".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext);
      })
      .map((file: string) => `/gallery/${file}`);
    
    res.json({ images });
  } catch (err: any) {
    console.error("Error reading live public/gallery folder:", err);
    res.status(500).json({ error: "Failed to list live gallery files", details: err.message });
  }
});

// Statically mount the live uploads folder so images are instantly accessible
app.use("/gallery", express.static(path.join(process.cwd(), "public/gallery")));


// Endpoint to fetch current project blueprints (allows chatbot to get up-to-date lists programmatically if needed)
app.get("/api/projects", (req, res) => {
  res.json({ projects: PROJECTS_STATIC });
});

// 2. Chatbot Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid body. Provide a 'messages' array." });
    }

    // Lazy load and get client
    let ai;
    try {
      ai = getGeminiClient();
    } catch (err: any) {
      console.error(err);
      return res.status(503).json({ 
        error: "Gemini client is not initialized.", 
        details: err.message || "Missing GEMINI_API_KEY. Please set your Gemini key in the Settings > Secrets menu."
      });
    }

    // Map conversation history to Gemini parts schema
    // Role matching: user -> user, assistant -> model
    const contents = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content || "" }]
    }));

    // Construct highly structured system instructions using our district's actual data
    const boardMembersText = BOARD_MEMBERS.map(m => `- ${m.role}: ${m.name} (${m.title})`).join("\n");
    const statsText = JOURNEY_STATS.map(s => `- ${s.label}: ${s.value}`).join("\n");
    const contributorsText = CONTRIBUTORS.map(c => `- ${c.name}: ${c.description}`).join("\n");
    
    const projectsText = PROJECTS_STATIC.map((p, idx) => {
      return `${idx + 1}. Department: ${p.department}
   Title: ${p.title}
   Description: ${p.description}
   Value / Outlay: ${p.financialOutlay}
   Current Status: ${p.status}
   Contributor: ${p.contributor === 'none' ? 'Not Sponsored yet (Available for sponsorship)' : p.contributor}`;
    }).join("\n\n");

    const csrRulesText = CSR_BOXES.map(b => {
      const listStr = b.list ? "\n   " + b.list.join("\n   ") : "";
      return `### ${b.title}\n${b.content}${listStr}`;
    }).join("\n\n");

    const systemInstruction = `You are the "Thoothukudi CSR Desk AI Assistant" (தூத்துக்குடி சி.எஸ்.ஆர் உதவி), a polite, extremely concise AI guide representing the Thoothukudi District Administration Society (TDAS).

YOUR PRIMARY MISSION:
1. Provide extremely brief, clear answers (maximum 1-2 simple sentences or very short bullet points) using ONLY the website's factual content below. Short answers generate instantly!
2. Help users navigate the portal if they have any doubts on where to find information.
3. Zero tolerance for external query requests. Politely refuse to answer ANY topics unrelated to this website.

---
### WEBSITE PAGES & HOW TO NAVIGATE (GUIDE THE USER DIRECTLY TO THESE CURRENT SECTIONS):
- **Home**: Welcome introduction to our CSR desk and regional goals.
- **About Us**: Information about our Society, its objectives, and key board officials.
- **Join Us**: Guidelines on how to register and become a CSR contributor.
- **Projects**: Our active welfare infrastructure database where you can filter by department and choose which projects to sponsor.
  - *How to select projects*: Click the **Submit Interest** button at the bottom of the section to activate selection mode, then click the checkboxes on the specific projects you wish to support.
- **Sponsorship**: Fill in your contact info (Name, Organisation, Official EmailID, Phone Number, Remarks) to submit your chosen project proposals to our Live safe Database and get an official automated backup email from the Office of the District Collector.
- **Our Contributors**: Spotlighting companies, blocks, and corporate partners already coordinating active social development plans with us.
- **Gallery**: Dynamic pictures and visuals of ongoing works.
- **Contact us**: Direct operational coordinates of our Project Management Unit (PMU) desk.

### DETAILED SOCIETY KNOWLEDGE:
${ABOUT_SOCIETY_PARAGRAPHS.join("\n\n")}

### KEY BOARD OFFICIALS:
${boardMembersText}
*Note: Society President is District Collector Shri Vishu Mahajan IAS.*

### REGIONAL SOCIAL IMPACT STATS:
${statsText}

### ACTIVE CONTRIBUTORS:
${contributorsText}

### ACTIVE DEPARTMENTS & PROJECT BLUEPRINTS AVAILABLE IN THE "Projects" TAB:
${projectsText}

---
### CRITICAL RESPONSE RULES (ACCURACY, NAVIGATION & SPEED):
1. **NO OUTSIDE INFORMATION**: If asked about unrelated matters (general programming, other states, sports, search requests, recipe, etc.), immediately reply: "I can only assist you with questions and navigation for this Thoothukudi CSR Portal. Please ask a question related to our Projects, Sponsorship, or leaders."
2. **ULTRA CONCISE (SPEED)**: Keep responses exceptionally brief. Generate at most 2 sentences of simple plain wording, using the exact tab names (**Projects**, **Sponsorship**, **Our Contributors**, **About Us**, **Home**, **Join Us**, **Gallery**, **Contact us**). Do not give long corporate welcomes or filler lines.
3. **NAVIGATION ASSISTANCE FIRST**: If the user has doubts on how to use or explore the site, direct them explicitly to the correct tab (e.g., "Projects" or "Sponsorship").
4. **TAMIL / BILINGUAL MODE**: Support simple Tamil when asked. KEEP IT BRIEF.`;

    // Define standard website sections and clean answers to handle requests instantly with absolute accuracy
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const cleanQuery = lastUserMessage.toLowerCase().trim();

    let matchedReply = "";

    // 1. High-Speed Local Router for Portal Questions & Guidelines
    if (cleanQuery.includes("project") || cleanQuery.includes("blueprint") || cleanQuery.includes("list") || cleanQuery.includes("active") || cleanQuery.includes("education") || cleanQuery.includes("health") || cleanQuery.includes("department") || cleanQuery.includes("school") || cleanQuery.includes("hospital") || cleanQuery.includes("water") || cleanQuery.includes("toilet")) {
      matchedReply = "You can browse all active welfare needs under the **Projects** section. Click the **Submit Interest** button to highlight checkboxes, select projects, and then save them directly to configure your proposal.";
    } else if (cleanQuery.includes("sponsor") || cleanQuery.includes("support") || cleanQuery.includes("register") || cleanQuery.includes("interest") || cleanQuery.includes("submit") || cleanQuery.includes("form") || cleanQuery.includes("proposal") || cleanQuery.includes("desk")) {
      matchedReply = "Go to the **Sponsorship** section to inspect your chosen blueprints, fill in your corporate/organisation contact details, and click **Submit Request** to safely submit.";
    } else if (cleanQuery.includes("board") || cleanQuery.includes("society") || cleanQuery.includes("leader") || cleanQuery.includes("collector") || cleanQuery.includes("vishu") || cleanQuery.includes("official") || cleanQuery.includes("president") || cleanQuery.includes("pmu")) {
      matchedReply = "Our society is presided over by District Collector **Shri Vishu Mahajan IAS**. You can read about him and other directors under the **About Us** section.";
    } else if (cleanQuery.includes("contributor") || cleanQuery.includes("partner") || cleanQuery.includes("who helped") || cleanQuery.includes("companies")) {
      matchedReply = "View our active supporters and corporate partners under the **Our Contributors** section.";
    } else if (cleanQuery.includes("gallery") || cleanQuery.includes("photo") || cleanQuery.includes("image") || cleanQuery.includes("picture") || cleanQuery.includes("work")) {
      matchedReply = "See actual pictures of ongoing social progress in the **Gallery** section of our portal!";
    } else if (cleanQuery.includes("contact") || cleanQuery.includes("email") || cleanQuery.includes("phone") || cleanQuery.includes("address") || cleanQuery.includes("office") || cleanQuery.includes("pmu") || cleanQuery.includes("phone number")) {
      matchedReply = "You can find contact emails, phone numbers, and location coordinates for our Project Management Unit on the **Contact us** page.";
    } else if (cleanQuery.includes("join") || cleanQuery.includes("contribute")) {
      matchedReply = "To get started as a corporate sponsor, check the guidelines in the **Join Us** section or head to **Projects** to select active needs.";
    } else if (cleanQuery.includes("hello") || cleanQuery.includes("hi") || cleanQuery.includes("hey") || cleanQuery.includes("helper") || cleanQuery.includes("assistant")) {
      matchedReply = "Hello! I am your official CSR Portals assistant. Ask me questions about our **Projects**, **Sponsorship**, or how to navigate our sections!";
    } else if (cleanQuery.includes("tamil") || cleanQuery.includes("தமிழ்") || cleanQuery.includes("பக்கம்") || cleanQuery.includes("திட்டம்") || cleanQuery.includes("வணக்கம்")) {
      matchedReply = "வணக்கம்! நமது இணையதளத்தின் **Projects** பக்கத்தில் திட்டங்களின் விவரங்களைக் காணலாம். பங்களிக்க **Sponsorship** பக்கத்தில் விவரங்களை சமர்ப்பிக்கவும்.";
    } else if (
      // Filter out non-website and unrelated topics to strictly prevent answer hallucination of outside worlds.
      cleanQuery.includes("code") || cleanQuery.includes("programming") || cleanQuery.includes("weather") || cleanQuery.includes("recipe") || cleanQuery.includes("sport") || cleanQuery.includes("joke") || cleanQuery.includes("create") || cleanQuery.includes("write") || cleanQuery.includes("make a") || cleanQuery.includes("how to build") || cleanQuery.includes("capital of") || cleanQuery.includes("who is president of america") || cleanQuery.includes("other state") || cleanQuery.includes("other country")
    ) {
      matchedReply = "I can only assist you with questions and navigation for this Thoothukudi CSR Portal. Please ask a question related to our **Projects**, **Sponsorship**, our leaders, or website tabs.";
    }

    if (matchedReply) {
      console.log(`[CSR LOCAL ROUTER] Instantly resolved response for query "${cleanQuery}"`);
      return res.json({ reply: matchedReply });
    }

    // 2. Fast single-try call for other unique website questions
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });
    } catch (err: any) {
      console.warn("[GEMINI API 503 / Limit Warning] Switched to immediate fallback reply.", err.message || err);
    }

    const reply = response?.text || "Please look at the top navigation tabs to browse our **Projects**, view our leader list in **About Us**, or submit your project cart via the **Sponsorship** desk!";
    return res.json({ reply });

  } catch (err: any) {
    console.error("Error calling Gemini API:", err);
    return res.status(500).json({ 
      error: "Internal server error during assistant processing.",
      details: err.message || "Unknown error"
    });
  }
});

// 3. Vite and Static Asset Serving Setup
async function serveApp() {
  if (process.env.NODE_ENV !== "production") {
    // Development Mode
    const viteInstance = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(viteInstance.middlewares);
    console.log("Vite development server mounted as middleware");
  } else {
    // Production Mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log("Static client bundle mounted from dist/");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Express custom server running on http://0.0.0.0:${PORT}`);
  });
}

serveApp();
