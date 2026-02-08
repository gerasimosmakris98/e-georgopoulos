
import React from 'react';
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
import { Link } from 'react-router-dom';

const Faq = () => {
    const categories = [
        {
            title: "Compliance & Regulations",
            icon: Shield,
            questions: [
                {
                    q: "What specific AML/CFT services do you offer?",
                    a: "I provide comprehensive risk assessments, transaction monitoring strategies, and regulatory reporting (SARs) tailored to EU (AMLD5/6) and Spanish (SEPBLAC) regulations."
                },
                {
                    q: "Can you help with crypto-asset registration in Spain?",
                    a: "Yes. I can guide you through the Bank of Spain's VASP registration process, helping prepare the necessary manual of procedures and risk control frameworks."
                }
            ]
        },
        {
            title: "Blockchain & Tech",
            icon: Zap,
            questions: [
                {
                    q: "How do you assess blockchain transaction risk?",
                    a: "I utilize on-chain analytics tools (like Chainalysis or Elliptic) combined with proprietary heuristics to identify high-risk counterparties, mixers, and sanctioned entities."
                },
                {
                    q: "What is 'Travel Rule' compliance?",
                    a: "The Travel Rule requires VASPs to share originator and beneficiary information during transactions. I help implement protocols like IVMS101 to ensure seamless compliance."
                }
            ]
        },
        {
            title: "Services & Collaboration",
            icon: HelpCircle,
            questions: [
                {
                    q: "Are you open to full-time roles?",
                    a: "Yes! I am currently open to full-time opportunities in Madrid or remote roles within the EU, specifically in QA, Compliance, or Fraud Prevention."
                },
                {
                    q: "Do you offer consulting for startups?",
                    a: "Absolutely. I specialize in helping FinTech and Crypto startups build their compliance MVP—doing 'just enough' to be safe and legal without stifling growth."
                }
            ]
        }
    ];

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
        <div className="min-h-screen bg-background py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none" />
            <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

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
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold">
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
                                <Card className="glass-card-elevated border-white/5 overflow-hidden">
                                    <CardHeader className="bg-white/5 border-b border-white/5">
                                        <CardTitle className="flex items-center text-xl">
                                            <category.icon className="w-5 h-5 mr-3 text-primary" />
                                            {category.title}
                                        </CardTitle>
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
                    <motion.div variants={itemVariants} className="text-center pt-8">
                        <p className="text-muted-foreground mb-6">
                            Didn't find what you were looking for?
                        </p>
                        <Button size="lg" asChild className="h-14 px-8 rounded-full shadow-premium">
                            <Link to="/contact">
                                Ask me directly
                                <Send className="w-4 h-4 ml-2" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default Faq;
