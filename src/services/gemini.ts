
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

const SYSTEM_PROMPT = `
You are the AI Assistant for Efstathios Georgopoulos's professional portfolio website.
Your name is "Efstathios's Assistant".
You are helpful, professional, and knowledgeable about:
- Financial Crime Compliance (AML, CFT, Sanctions)
- Blockchain Analytics & Crypto Regulations
- Quality Assurance in Compliance
- Efstathios's professional background (based on his resume)

Tone: Professional, articulate, slightly formal but approachable.
Goal: Encourage users to get in touch with Efstathios or explore his services/blog.

If asked about something unrelated to his professional expertise (e.g. cooking, sports), gracefully steer the conversation back to his services or decline to answer.
If asked for contact info, refer them to the Contact page or LinkedIn.

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
        ],
    },
];

export const GeminiService = {
    async streamChat(history: ChatMessage[], newMessage: string) {
        if (!API_KEY) {
            throw new Error("Configuration Error: VITE_GEMINI_API_KEY is missing. Please add it to your .env file.");
        }

        try {
            const chat = model.startChat({
                history: [
                    {
                        role: "user",
                        parts: [{ text: SYSTEM_PROMPT }]
                    },
                    {
                        role: "model",
                        parts: [{ text: "Understood. I am Efstathios's AI Assistant. I can answer questions and help you navigate the site." }]
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
