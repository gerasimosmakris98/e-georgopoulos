
import { GoogleGenerativeAI, SchemaType, type Tool } from "@google/generative-ai";

// Initialize Gemini
// Note: In a real production app, you should proxy this through a backend to hide the key.
// For this static portfolio, we'll use the environment variable directly.
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-3-flash-preview",
    generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
    }
});

// ... (System Prompt)
const FAQ_CONTENT = `
Frequently Asked Questions:

1. Services: 
- AML/CFT Compliance Consulting, KYC/CDD & Transaction Monitoring, Blockchain & Crypto Asset Compliance, Compliance Training, Regulatory Advisory, Fraud Investigation, QA & Auditing.
- Works with banks, fintechs, crypto exchanges, DeFi, VASPs.
- Experience with regulators: BoG, FinCEN, SEPBLAC, CSSF, BaFin, FIU-IND, SHCP.

2. Typical Engagements:
- AML/CFT: Gap analysis, policy development, SAR/STR reporting, remediation. 2-12 weeks.
- Crypto Registration (Spain): End-to-end support for Bank of Spain registration, VASP policy, MiCA compliance.
- KYC/CDD: Framework design, EDD for PEPs/high-risk, sanctions screening optimization. 4-8 weeks.
- Training: Tailored programs (AML/CFT, crypto, KYC). 1-5 days.

3. Engagement:
- Contact via form or stgeorgo141@gmail.com.
- First consultation (30-45 mins) is FREE.
- Pricing: Custom (project-based), Fixed (defined deliverables), or Retainer (ongoing).

4. Legal:
- Strict confidentiality (NDAs signed). GDPR compliant.
- Fully aligned with EU regulations (AMLD, MiCA, GDPR, SEPBLAC).
`;

const SYSTEM_PROMPT = `
You are the AI Assistant for Efstathios Georgopoulos's professional portfolio website.
Your name is "Atlas AI".

**CORE INSTRUCTIONS:**
1.  **BE CONCISE:** Answers must be short and direct. Avoid long paragraphs.
2.  **USE FORMATTING:** Use bullet points, bold text, and lists whenever possible.
3.  **NO WALLS OF TEXT:** Break up information into digestible chunks.
4.  **SUGGEST NEXT STEPS:** Always end with a short question or suggestion (e.g., "Would you like to see my CV?" or "Shall I open the contact form?").

**SPECIFIC SCENARIOS:**
- **"FAQs" Query:** Do NOT dump all questions. Instead, list the categories (Services, Pricing, Process) and ask what they want to know.
- **Tool Use:** When using a tool (like opening the Live CV), briefly mention it will *open in Notion*.
- **Contact/Sales:** Be helpful but strictly professional.

**TONE:**
Professional, articulate, efficient.

Key Knowledge Base:
${FAQ_CONTENT}

Briefly introduce yourself if asked who you are.
`;

export interface ChatMessage {
    role: "user" | "model";
    parts: { text: string }[];
}

// Function Definitions
const tools: Tool[] = [
    {
        functionDeclarations: [
            {
                name: "navigate_to",
                description: "Navigates the user to a specific page on the website.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        path: {
                            type: SchemaType.STRING,
                            description: "The path to navigate to (e.g., '/', '/about', '/resume', '/services', '/contact', '/blog').",
                        },
                    },
                    required: ["path"],
                },
            },
            {
                name: "open_contact",
                description: "Opens the contact form modal for the user to get in touch.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {},
                },
            },
            {
                name: "open_subscribe",
                description: "Opens the newsletter subscription modal.",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {},
                },
            },
            {
                name: "open_live_cv",
                description: "Opens the interactive Live CV modal (External Notion Page).",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {},
                },
            },
        ],
    },
];

export const GeminiService = {
    async streamChat(history: ChatMessage[], newMessage: string, context?: string) {
        if (!API_KEY) {
            throw new Error("Configuration Error: VITE_GEMINI_API_KEY is missing. Please add it to your .env file.");
        }

        try {
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT + (context ? `\n\nCurrent Page Context:\n${context}` : "") }]
                    },
                    {
                        role: "model",
                        parts: [{ text: "Understood. I am Efstathios's AI Assistant. I have access to the FAQ and site tools." }]
                    },
                    ...history
                ],
                tools: tools,
            });

            const result = await chat.sendMessageStream(newMessage);
            return result.stream;
        } catch (error) {
            console.error("Gemini Chat Error:", error);
            throw error;
        }
    }
};
