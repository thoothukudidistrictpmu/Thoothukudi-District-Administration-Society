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
2. **ULTRA CONCISE (SPEED)**: Keep responses exceptionally brief. Generate at most 2 sentences of simple plain wording, using the exact tab names (**Projects**, **Sponsorship**, **Our Contributors**, **About Us**, **Home**, **Gallery**, **Contact us**). Do not give long corporate welcomes or filler lines.
3. **NAVIGATION ASSISTANCE FIRST**: If the user has doubts on how to use or explore the site, direct them explicitly to the correct tab (e.g., "Projects" or "Sponsorship").
4. **TAMIL / BILINGUAL MODE**: Support simple Tamil when asked. KEEP IT BRIEF.`;

    // Define standard website sections and clean answers to handle requests instantly with absolute accuracy
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const cleanQuery = lastUserMessage.toLowerCase().trim();

    const matchesWord = (text: string, kw: string): boolean => {
      if (kw.includes(" ") || kw.includes("தமிழ்") || kw.includes("பக்கம்") || kw.includes("திட்டம்") || kw.includes("வணக்கம்")) {
        return text.includes(kw);
      }
      return new RegExp(`\\b${kw}\\b`, "i").test(text);
    };

    const matchesAny = (text: string, kws: string[]): boolean => {
      return kws.some(kw => matchesWord(text, kw));
    };

    // Helper client-side & server-side twin fallback engine for absolute safety during high-traffic 503 limits
    const getIntelligentFallback = (queryText: string): string => {
      const q = queryText.toLowerCase().trim();

      // 1. About Us / Society Board of Directors info
      if (matchesAny(q, ["about us", "society", "governing board", "board of directors", "board", "board members", "director", "directors", "administration", "tdas", "leader", "leaders", "collector", "vishu", "mahajan", "president", "vice president", "secretary", "treasurer"])) {
        return "The **About Us** section details our official governance board and structure:\n\n" +
               "• **Main Function**: To articulate our state-audited governance, operational transparency, and institutional structure.\n" +
               "• **Key Features / Our Board**:\n" +
               "  1. **President**: Shri **Vishu Mahajan IAS** (District Collector, Thoothukudi)\n" +
               "  2. **Vice President**: Shri **K. Karthikeyan** (District Revenue Officer, Thoothukudi)\n" +
               "  3. **Secretary**: Smt **K. Sangamithra** (Project Director DRDA, Tiruppur)\n" +
               "  4. **Treasurer**: Shri **D.S. Duraimurugan** (Personal Assistant, Thoothukudi)\n" +
               "  5. **Zero-Overhead Policy**: TDAS serves as a transparent, state-audited bridge keeping funds in a single consolidated public-sector account layout, ensuring zero administrative deduction and fast-track vendor settlement.";
      }

      // 2. Projects Page info
      if (matchesAny(q, ["projects", "project", "blueprint", "blueprints", "education", "health", "infrastructure", "catalog", "school", "classroom", "hospital", "clinic", "water", "toilet", "toilets", "needs", "welfare", "list", "active", "department"])) {
        return "The **Projects** page is our portal's core state-verified catalog hub. It allows prospective sponsors to inspect developmental gaps needing corporate funding:\n\n" +
               "• **Main Function**: To list validated classroom, primary health, and rural water requirements, preventing resource duplication and channeling corporate funds accurately.\n" +
               "• **Key Features**:\n" +
               "  1. **Topic Filters**: Seamlessly filter blueprints across Education (school upgrades, classrooms), Health (clinical gear, newborn screeners), and Infrastructure (water tanks, community systems).\n" +
               "  2. **Detailed Blueprint Cards**: Each card details target beneficiary counts, absolute estimated budget configurations, and geographical execution blocks.\n" +
               "  3. **Interest Cart Selection**: Click 'Submit Interest' on various items to save blueprints directly to your localized proposal cart for configuration.";
      }

      // 3. Sponsorship Page info
      if (matchesAny(q, ["sponsorship", "sponsor", "interest cart", "submit request", "proposal form"])) {
        return "The **Sponsorship** page functions as the portal's integrated CSR desk, where selected projects are processed into custom corporate proposals:\n\n" +
               "• **Main Function**: To let prospective corporate partners compile selected blueprints, fill in logistics contact details, and submit formal proposals securely.\n" +
               "• **Key Features**:\n" +
               "  1. **Proposal Cost Calculator**: Aggregates the total budget estimation for all your chosen project blueprints.\n" +
               "  2. **Corporate Request Form**: Collects essential contact parameters (Contact Person Name, official email, telephone, organization name, and specific notes).\n" +
               "  3. **State Submission**: Press **Submit Request** to safely transmit details directly to the Project Management Unit (PMU) for fast-track MOU processing.";
      }

      // 4. Our Contributors Page info
      if (matchesAny(q, ["contributors", "contributor", "supporter", "supporters", "partners", "partner", "companies", "csr partner", "spic", "voc", "ntpl", "tcs", "hcl", "wipro", "ttps"])) {
        return "The **Our Contributors** page serves as our official digital 'Wall of Support' to honor the corporate partners backing Thoothukudi:\n\n" +
               "• **Main Function**: To maintain public transparency and acknowledge outstanding corporate leaders currently financing development under CSR.\n" +
               "• **Key Features**:\n" +
               "  1. **Corporate Spotlight Grid**: Display cards honoring partners like SPIC, VOC Port Trust, NTPL, TCS, HCL, and Wipro.\n" +
               "  2. **Project Acknowledgments**: Spotlights precise developmental tasks funded by each partner (e.g., procurement of critical UNHS infant screening devices, library renovations, or smart school classroom integrations).";
      }

      // 5. Gallery Page info
      if (matchesAny(q, ["gallery", "photos", "photo", "images", "image", "pictures", "picture"])) {
        return "The **Gallery** page acts as our live visual ledger showcasing real ground-level progress across active and completed CSR projects:\n\n" +
               "• **Main Function**: To exhibit complete visual evidence of your corporate contributions translating into tangible community benefits.\n" +
               "• **Key Features**:\n" +
               "  1. **Progress Photo Stream**: High-resolution, actual photographs showing physical construction progress, school classroom upgrades, and healthcare device handovers.\n" +
               "  2. **Geo-location & Sub-district Tags**: Every visual card features tags outlining its corresponding developmental theme and execution block.";
      }

      // 6. Contact Us Page info
      if (matchesAny(q, ["contact us", "contact", "email", "phone", "phone number", "numbers", "address", "office", "location"])) {
        return "The **Contact us** page coordinates communication between prospective corporate sponsors and our administrative team:\n\n" +
               "• **Main Function**: To offer direct communication channels to help partners customize, finalize, or route their CSR budgets.\n" +
               "• **Key Features**:\n" +
               "  1. **DRDA PMU Office Address**: Located inside the District Collectorate headquarters, Thoothukudi.\n" +
               "  2. **Direct Hotline & Email Coordinates**: Fast email access (`thoothukudidistrictpmu@gmail.com`) and helpline contacts for quick query resolution.\n" +
               "  3. **Interactive Map**: Centered Map component pinning the exact geolocation of our headquarters.";
      }

      // 7. Home Page info
      if (matchesAny(q, ["home", "homepage", "landing", "intro", "welcome"])) {
        return "The **Home** page serves as our portal's primary landing hub. It features several distinct sections and interactive elements:\n\n" +
               "• **Main Function**: To welcome potential sponsors, highlight Thoothukudi's key development objectives, and provide transparency regarding our administration's collective goals.\n" +
               "• **Key Features**:\n" +
               "  1. **Hero Sector**: Engaging call-to-action showcasing our vision for standardizing and boosting local welfare under CSR.\n" +
               "  2. **District Profile Map**: A fully interactive administrative block map of Thoothukudi. Clicking on blocks displays population statistics, literacy rates, and regional overview data.\n" +
               "  3. **Milestones Counter**: Live counter stats showing total projects listed, registered contributors, and execution divisions.\n" +
               "  4. **President's Message / About Us**: A dedicated workspace message from our society's President, District Collector **Shri Vishu Mahajan IAS**, explaining how TDAS serves as a state-audited bridge for sponsors.\n" +
               "  5. **Contributor Showcase**: A smoothly sliding reel displaying logos of prominent national and regional corporate partners representing our joint social efforts.";
      }

      // 8. General Navigation details (navbar layout) if no specific page matched
      if (matchesAny(q, ["navigation", "navbar", "navigation bar", "bar", "headings", "heading", "page", "pages", "tabs", "tab", "sections", "section", "menu", "menus", "structure", "features", "website", "what is on this site", "help me navigate"])) {
        return "Here is a complete guide to our **Navigation Bar** and the core functions of each section:\n\n" +
               "1. **Home** (*Landing Hub*): Features our welcome Hero, an interactive map of Thoothukudi district, key milestones, an official message from our President (District Collector Shri Vishu Mahajan IAS), and our active supporter list.\n" +
               "2. **Projects** (*Welfare Need Catalog*): Browse active, state-audited projects in Education, Health, and Infrastructure. You can select blueprints here to save them to your custom interest cart.\n" +
               "3. **Sponsorship** (*Integrated CSR Desk*): Review your saved blueprints, see cost guides, fill in corporate details, and click **Submit Request** to safely submit automated proposals.\n" +
               "4. **Our Contributors** (*Corporate Wall of Support*): View prominent corporate sponsors, public sector undertakings, and partners (like SPIC, VOC Port Trust, TCS, etc.) supporting our social works.\n" +
               "5. **Gallery** (*Visual Progress Stream*): Explore actual, geo-tracked photos of ongoing and completed developmental projects on the ground.\n" +
               "6. **Contact us** (*Support coordinates*): Find direct phone numbers, email addresses, and location coordinates for our Project Management Unit.";
      }

      if (matchesAny(q, ["join", "contribute"])) {
        return "To get started as a corporate sponsor, check the active welfare catalogs under the **Projects** section to choose where you want to sponsor.";
      }
      if (matchesAny(q, ["hello", "hi", "hey", "helper", "assistant"])) {
        return "Hello! I am your official CSR Portals assistant. Ask me questions about our **Projects**, **Sponsorship**, or how to navigate our sections!";
      }
      if (matchesAny(q, ["tamil", "தமிழ்", "பக்கம்", "திட்டம்", "வணக்கம்"])) {
        return "வணக்கம்! நமது இணையதளத்தின் **Projects** பக்கத்தில் திட்டங்களின் விவரங்களைக் காணலாம். பங்களிக்க **Sponsorship** பக்கத்தில் விவரங்களை சமர்ப்பிக்கவும்.";
      }
      if (
        matchesAny(q, [
          "code", "programming", "weather", "recipe", "sport", "joke", "create", "write", "make a",
          "how to build", "capital of", "who is president of america", "other state", "other country"
        ])
      ) {
        return "I can only assist you with questions and navigation for this Thoothukudi CSR Portal. Please ask a question related to our **Projects**, **Sponsorship**, our leaders, or website tabs.";
      }
      return "Please look at the top navigation tabs to browse our **Projects**, view our leader list in **About Us**, or submit your project cart via the **Sponsorship** desk!";
    };

    let matchedReply = "";

    // 1. High-Speed Local Router for Portal Questions & Guidelines
    if (matchesAny(cleanQuery, ["about us", "society", "governing board", "board of directors", "board", "board members", "director", "directors", "administration", "tdas", "leader", "leaders", "collector", "vishu", "mahajan", "president", "vice president", "secretary", "treasurer"])) {
      matchedReply = "The **About Us** section details our official governance board and structure:\n\n" +
                     "• **Main Function**: To articulate our state-audited governance, operational transparency, and institutional structure.\n" +
                     "• **Key Features / Our Board**:\n" +
                     "  1. **President**: Shri **Vishu Mahajan IAS** (District Collector, Thoothukudi)\n" +
                     "  2. **Vice President**: Shri **K. Karthikeyan** (District Revenue Officer, Thoothukudi)\n" +
                     "  3. **Secretary**: Smt **K. Sangamithra** (Project Director DRDA, Tiruppur)\n" +
                     "  4. **Treasurer**: Shri **D.S. Duraimurugan** (Personal Assistant, Thoothukudi)\n" +
                     "  5. **Zero-Overhead Policy**: TDAS serves as a transparent, state-audited bridge keeping funds in a single consolidated public-sector account layout, ensuring zero administrative deduction and fast-track vendor settlement.";
    } else if (matchesAny(cleanQuery, ["projects", "project", "blueprint", "blueprints", "education", "health", "infrastructure", "catalog", "school", "classroom", "hospital", "clinic", "water", "toilet", "toilets", "needs", "welfare", "list", "active", "department"])) {
      matchedReply = "The **Projects** page is our portal's core state-verified catalog hub. It allows prospective sponsors to inspect developmental gaps needing corporate funding:\n\n" +
                     "• **Main Function**: To list validated classroom, primary health, and rural water requirements, preventing resource duplication and channeling corporate funds accurately.\n" +
                     "• **Key Features**:\n" +
                     "  1. **Topic Filters**: Seamlessly filter blueprints across Education (school upgrades, classrooms), Health (clinical gear, newborn screeners), and Infrastructure (water tanks, community systems).\n" +
                     "  2. **Detailed Blueprint Cards**: Each card details target beneficiary counts, absolute estimated budget configurations, and geographical execution blocks.\n" +
                     "  3. **Interest Cart Selection**: Click 'Submit Interest' on various items to save blueprints directly to your localized proposal cart for configuration.";
    } else if (matchesAny(cleanQuery, ["sponsorship", "sponsor", "interest cart", "submit request", "proposal form"])) {
      matchedReply = "The **Sponsorship** page functions as the portal's integrated CSR desk, where selected projects are processed into custom corporate proposals:\n\n" +
                     "• **Main Function**: To let prospective corporate partners compile selected blueprints, fill in logistics contact details, and submit formal proposals securely.\n" +
                     "• **Key Features**:\n" +
                     "  1. **Proposal Cost Calculator**: Aggregates the total budget estimation for all your chosen project blueprints.\n" +
                     "  2. **Corporate Request Form**: Collects essential contact parameters (Contact Person Name, official email, telephone, organization name, and specific notes).\n" +
                     "  3. **State Submission**: Press **Submit Request** to safely transmit details directly to the Project Management Unit (PMU) for fast-track MOU processing.";
    } else if (matchesAny(cleanQuery, ["contributors", "contributor", "supporter", "supporters", "partners", "partner", "companies", "csr partner", "spic", "voc", "ntpl", "tcs", "hcl", "wipro", "ttps"])) {
      matchedReply = "The **Our Contributors** page serves as our official digital 'Wall of Support' to honor the corporate partners backing Thoothukudi:\n\n" +
                     "• **Main Function**: To maintain public transparency and acknowledge outstanding corporate leaders currently financing development under CSR.\n" +
                     "• **Key Features**:\n" +
                     "  1. **Corporate Spotlight Grid**: Display cards honoring partners like SPIC, VOC Port Trust, NTPL, TCS, HCL, and Wipro.\n" +
                     "  2. **Project Acknowledgments**: Spotlights precise developmental tasks funded by each partner (e.g., procurement of critical UNHS infant screening devices, library renovations, or smart school classroom integrations).";
    } else if (matchesAny(cleanQuery, ["gallery", "photos", "photo", "images", "image", "pictures", "picture"])) {
      matchedReply = "The **Gallery** page acts as our live visual ledger showcasing real ground-level progress across active and completed CSR projects:\n\n" +
                     "• **Main Function**: To exhibit complete visual evidence of your corporate contributions translating into tangible community benefits.\n" +
                     "• **Key Features**:\n" +
                     "  1. **Progress Photo Stream**: High-resolution, actual photographs showing physical construction progress, school classroom upgrades, and healthcare device handovers.\n" +
                     "  2. **Geo-location & Sub-district Tags**: Every visual card features tags outlining its corresponding developmental theme and execution block.";
    } else if (matchesAny(cleanQuery, ["contact us", "contact", "email", "phone", "phone number", "numbers", "address", "office", "location"])) {
      matchedReply = "The **Contact us** page coordinates communication between prospective corporate sponsors and our administrative team:\n\n" +
                     "• **Main Function**: To offer direct communication channels to help partners customize, finalize, or route their CSR budgets.\n" +
                     "• **Key Features**:\n" +
                     "  1. **DRDA PMU Office Address**: Located inside the District Collectorate headquarters, Thoothukudi.\n" +
                     "  2. **Direct Hotline & Email Coordinates**: Fast email access (`thoothukudidistrictpmu@gmail.com`) and helpline contacts for quick query resolution.\n" +
                     "  3. **Interactive Map**: Centered Map component pinning the exact geolocation of our headquarters.";
    } else if (matchesAny(cleanQuery, ["home", "homepage", "landing", "intro", "welcome"])) {
      matchedReply = "The **Home** page serves as our portal's primary landing hub. It features several distinct sections and interactive elements:\n\n" +
                     "• **Main Function**: To welcome potential sponsors, highlight Thoothukudi's key development objectives, and provide transparency regarding our administration's collective goals.\n" +
                     "• **Key Features**:\n" +
                     "  1. **Hero Sector**: Engaging call-to-action showcasing our vision for standardizing and boosting local welfare under CSR.\n" +
                     "  2. **District Profile Map**: A fully interactive administrative block map of Thoothukudi. Clicking on blocks displays population statistics, literacy rates, and regional overview data.\n" +
                     "  3. **Milestones Counter**: Live counter stats showing total projects listed, registered contributors, and execution divisions.\n" +
                     "  4. **President's Message / About Us**: A dedicated workspace message from our society's President, District Collector **Shri Vishu Mahajan IAS**, explaining how TDAS serves as a state-audited bridge for sponsors.\n" +
                     "  5. **Contributor Showcase**: A smoothly sliding reel displaying logos of prominent national and regional corporate partners representing our joint social efforts.";
    } else if (matchesAny(cleanQuery, ["navigation", "navbar", "navigation bar", "bar", "headings", "heading", "page", "pages", "tabs", "tab", "sections", "section", "menu", "menus", "structure", "features", "website", "what is on this site", "help me navigate"])) {
      matchedReply = "Here is a complete guide to our **Navigation Bar** and the core functions of each section:\n\n" +
                     "1. **Home** (*Landing Hub*): Features our welcome Hero, an interactive map of Thoothukudi district, key milestones, an official message from our President (District Collector Shri Vishu Mahajan IAS), and our active supporter list.\n" +
                     "2. **Projects** (*Welfare Need Catalog*): Browse active, state-audited projects in Education, Health, and Infrastructure. You can select blueprints here to save them to your custom interest cart.\n" +
                     "3. **Sponsorship** (*Integrated CSR Desk*): Review your saved blueprints, see cost guides, fill in corporate details, and click **Submit Request** to safely submit automated proposals.\n" +
                     "4. **Our Contributors** (*Corporate Wall of Support*): View prominent corporate sponsors, public sector undertakings, and partners (like SPIC, VOC Port Trust, TCS, etc.) supporting our social works.\n" +
                     "5. **Gallery** (*Visual Progress Stream*): Explore actual, geo-tracked photos of ongoing and completed developmental projects on the ground.\n" +
                     "6. **Contact us** (*Support coordinates*): Find direct phone numbers, email addresses, and location coordinates for our Project Management Unit.";
    } else if (matchesAny(cleanQuery, ["join", "contribute"])) {
      matchedReply = "To get started as a corporate sponsor, check the active welfare catalogs under the **Projects** section to choose where you want to sponsor.";
    } else if (matchesAny(cleanQuery, ["hello", "hi", "hey", "helper", "assistant"])) {
      matchedReply = "Hello! I am your official CSR Portals assistant. Ask me questions about our **Projects**, **Sponsorship**, or how to navigate our sections!";
    } else if (matchesAny(cleanQuery, ["tamil", "தமிழ்", "பக்கம்", "திட்டம்", "வணக்கம்"])) {
      matchedReply = "வணக்கம்! நமது இணையதளத்தின் **Projects** பக்கத்தில் திட்டங்களின் விவரங்களைக் காணலாம். பங்களிக்க **Sponsorship** பக்கத்தில் விவரங்களை சமர்ப்பிக்கவும்.";
    } else if (
      // Filter out non-website and unrelated topics to strictly prevent answer hallucination of outside worlds.
      matchesAny(cleanQuery, [
        "code", "programming", "weather", "recipe", "sport", "joke", "create", "write", "make a",
        "how to build", "capital of", "who is president of america", "other state", "other country"
      ])
    ) {
      matchedReply = "I can only assist you with questions and navigation for this Thoothukudi CSR Portal. Please ask a question related to our **Projects**, **Sponsorship**, our leaders, or website tabs.";
    }

    if (matchedReply) {
      console.log(`[CSR LOCAL ROUTER] Instantly resolved response for query "${cleanQuery}"`);
      return res.json({ reply: matchedReply });
    }

    // 2. Fast single-try call for other unique website questions
    let response;
    let fallbackNeeded = false;
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
      fallbackNeeded = true;
    }

    const reply = response?.text || getIntelligentFallback(lastUserMessage);
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
