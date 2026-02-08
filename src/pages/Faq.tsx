
import React from 'react';
import { SEO } from "@/components/SEO";
import { motion } from 'framer-motion';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, Search, Shield, Zap, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/ContactForm";
import { SubscriptionActions } from "@/components/SubscriptionActions";
import { useState } from "react";

const Faq = () => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    // Helper: group by section for rendering accordion sections on /faqs
    const faqSections = [
        { key: "General", title: "General", icon: HelpCircle },
        { key: "Services", title: "Services", icon: Shield },
        { key: "Getting Started", title: "Getting Started", icon: Zap },
        { key: "Legal & Compliance", title: "Legal & Compliance", icon: Search },
    ] as const;

    const faqsData = [
        {
            id: 1,
            question: "What services do you offer?",
            answer: "I offer 8 professional services across financial crime compliance, blockchain, training, and advisory: AML/CFT Compliance Consulting, KYC/CDD & Transaction Monitoring, Blockchain & Crypto Asset Compliance, Compliance Training & Development, Regulatory Advisory & Risk Assessment, Fraud Investigation & Forensic Analysis, Compliance Quality Assurance & Auditing, and Dispute & Chargeback Management.",
            section: "General",
        },
        {
            id: 2,
            question: "Which industries do you work with?",
            answer: "I primarily work with banks, fintechs, payment processors, crypto exchanges, DeFi projects, VASPs, neobanks, and other regulated financial institutions across the EU and internationally. My experience spans traditional banking (Piraeus Bank, National Bank of Greece, Eurobank), global payments (American Express, Ebury), and blockchain/crypto (Decubate).",
            section: "General",
        },
        {
            id: 3,
            question: "What is your experience with regulatory bodies?",
            answer: "I have direct experience working with and aligning to the requirements of 7+ regulators: BoG (Greece), FinCEN (USA), SEPBLAC (Spain), CSSF (Luxembourg), BaFin (Germany), FIU-IND (India), and SHCP (Mexico). This multi-jurisdictional expertise allows me to help clients navigate complex cross-border compliance landscapes.",
            section: "General",
        },
        {
            id: 4,
            question: "What does an AML/CFT compliance engagement look like?",
            answer: "A typical AML/CFT engagement starts with a compliance gap analysis of your current framework. I then develop or refine your AML/CFT policies, assist with regulatory reporting (SAR/STR), prepare for regulatory audits, and deliver a remediation roadmap. Engagements are project-based, usually lasting 2–12 weeks depending on scope and complexity.",
            section: "Services",
        },
        {
            id: 5,
            question: "Can you help with crypto-asset registration in Spain?",
            answer: "Yes. I provide end-to-end support for crypto-asset registration with the Bank of Spain, including preparing the full application package, building your compliance framework, Travel Rule (MiCA/TFR) compliance, VASP policy documentation, and on-chain risk assessment. My hands-on Chainalysis experience and blockchain compliance background at Decubate directly inform this service.",
            section: "Services",
        },
        {
            id: 6,
            question: "How does the KYC/CDD & Transaction Monitoring service work?",
            answer: "I design and implement your KYC/CDD framework from scratch or optimize an existing one. This includes Enhanced Due Diligence (EDD) for PEPs and high-risk clients, sanctions and watchlist screening optimization, transaction monitoring rule tuning to reduce false positives, and risk scoring methodology development. Typical duration is 4–8 weeks.",
            section: "Services",
        },
        {
            id: 7,
            question: "Do you offer compliance training for teams?",
            answer: "Yes. I design and deliver tailored compliance training programs covering AML/CFT fundamentals, blockchain compliance, KYC/CDD best practices, and regulatory updates. Formats include live workshops, webinars, e-learning modules, and case study-based learning. Programs typically run 1–5 days and include training materials, recordings, assessments, and completion certificates.",
            section: "Services",
        },
        {
            id: 10,
            question: "How do I get started working with you?",
            answer: "Simply reach out via the Contact form on this website, or email me at stgeorgo141@gmail.com. I'll schedule a free initial consultation to understand your needs, assess scope, and propose a tailored engagement plan. From there, we formalize the agreement and kick off the project.",
            section: "Getting Started",
        },
        {
            id: 11,
            question: "How is pricing structured?",
            answer: "Pricing depends on the service and scope. I offer three models: Custom (project-based, scoped to your specific needs), Fixed (set price for defined deliverables like training programs), and Retainer (ongoing monthly advisory or QA services). I provide a detailed proposal with transparent pricing after the initial consultation.",
            section: "Getting Started",
        },
        {
            id: 12,
            question: "Do you offer a free initial consultation?",
            answer: "Yes. The first consultation is free and typically lasts 30–45 minutes. We discuss your compliance challenges, assess scope, and I outline how I can help. There is no obligation to proceed after the consultation.",
            section: "Getting Started",
        },
        {
            id: 15,
            question: "How do you handle confidential information?",
            answer: "All client information is treated with strict confidentiality. I sign NDAs before every engagement. My work complies with GDPR and applicable data protection regulations. Sensitive documents are handled through secure channels and are never shared with third parties.",
            section: "Legal & Compliance",
        },
        {
            id: 16,
            question: "Are your services compliant with EU regulations?",
            answer: "Yes. All services are designed with full alignment to EU regulatory frameworks including AMLD (Anti-Money Laundering Directives), MiCA (Markets in Crypto-Assets Regulation), GDPR, ePrivacy Directive, and local transpositions such as SEPBLAC in Spain. I stay current with regulatory changes across multiple jurisdictions.",
            section: "Legal & Compliance",
        }
    ];

    // Transform to old structure for rendering compatibility
    const categories = faqSections.map(section => ({
        title: section.title,
        icon: section.icon,
        questions: faqsData.filter(faq => faq.section === section.key).map(faq => ({
            q: faq.question,
            a: faq.answer
        }))
    }));

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-transparent py-24 relative overflow-hidden">
            <SEO
                title="FAQ"
                description="Frequently Asked Questions about Compliance services, Blockchain consulting, and collaboration."
                url="/faqs"
            />
            <div className="container mx-auto px-4 relative z-10 max-w-4xl">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-1">
                            <Search className="w-3 h-3 mr-2" />
                            Knowledge Base
                        </Badge>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold tracking-tight">
                            Frequently Asked <span className="text-gradient">Questions</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Answers to common questions about my expertise, services, and the complex world of financial compliance.
                        </p>
                    </div>

                    {/* FAQ Sections */}
                    <div className="grid gap-8">
                        {categories.map((category, idx) => (
                            <motion.div key={idx} variants={itemVariants}>
                                <Card className="glass-panel border-white/5 overflow-hidden hover:border-primary/20 transition-colors duration-300">
                                    <CardHeader className="bg-white/5 border-b border-white/5 backdrop-blur-md">
                                        <h2 className="flex items-center text-xl font-bold font-playfair leading-none tracking-tight">
                                            <category.icon className="w-5 h-5 mr-3 text-primary" />
                                            {category.title}
                                        </h2>
                                    </CardHeader>
                                    <CardContent className="p-0">
                                        <Accordion type="single" collapsible className="w-full">
                                            {category.questions.map((item, qIdx) => (
                                                <AccordionItem value={`item-${idx}-${qIdx}`} key={qIdx} className="border-b border-white/5 last:border-0 px-6">
                                                    <AccordionTrigger className="hover:text-primary transition-colors text-left text-base py-5">
                                                        {item.q}
                                                    </AccordionTrigger>
                                                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                                                        {item.a}
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div variants={itemVariants} className="text-center pt-8 space-y-8">
                        <div>
                            <p className="text-muted-foreground mb-6">
                                Didn't find what you were looking for?
                            </p>
                            <Button size="lg" onClick={() => setIsContactOpen(true)} className="h-14 px-8 rounded-full shadow-premium">
                                Ask me directly
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        <div className="pt-8 border-t border-white/5 max-w-sm mx-auto">
                            <p className="text-sm text-muted-foreground mb-4">
                                Stay up to date with the latest compliance news
                            </p>
                            <div className="flex justify-center">
                                <SubscriptionActions variant="outline" />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <ContactForm isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </div>
    );
};

export default Faq;
