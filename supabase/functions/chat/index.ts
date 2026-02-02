import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const systemPrompt = `You are the AI assistant for Efstathios Georgopoulos's professional portfolio website. You help visitors learn about his background and expertise.

About Efstathios:
- Current Role: QA Analyst at Ebury (Madrid, Spain) since July 2024
- Previous Experience: 
  - Senior Credit & Fraud Analyst at American Express (Madrid) - 2022-2024
  - Anti-Money Laundering Analyst at Eurobank (Athens) - 2020-2022
  - Various compliance roles at Alpha Bank, Piraeus Bank, Santander

- Expertise Areas:
  - AML/CFT (Anti-Money Laundering / Counter-Terrorist Financing)
  - Financial Crime Investigation & Fraud Detection
  - Blockchain Analysis & Digital Asset Compliance (Chainalysis certified)
  - KYC/CDD Operations & Enhanced Due Diligence
  - Regulatory Compliance across multiple jurisdictions

- Certifications:
  - CAMS (Certified Anti-Money Laundering Specialist)
  - Chainalysis Cryptocurrency Fundamentals
  - Various ACAMS certifications in sanctions, fraud, KYC

- Languages: Greek (Native), English (Fluent), Spanish (Fluent)

- Education: 
  - Master in Anti Money Laundering (In Progress) - IEB
  - MSc Financial Technology (FinTech) - Athens University
  - BSc International & European Economics - Athens University

Guidelines:
- Be professional, helpful, and concise
- Answer questions about Efstathios's background, skills, and experience
- For professional connections or job opportunities, direct visitors to LinkedIn
- For detailed inquiries, suggest using the contact form
- If asked about topics outside Efstathios's expertise, politely redirect
- Keep responses focused and informative`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        stream: true,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), 
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable." }), 
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }), 
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
