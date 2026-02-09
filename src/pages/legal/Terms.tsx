import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale, Shield, AlertCircle, Clock, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from "@/components/SEO";
import { SubscriptionActions } from "@/components/SubscriptionActions";

const Terms = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
            <SEO
                title="Terms of Use"
                description="The terms and conditions for using this website and its services."
                keywords="Terms of Use, Legal Agreement, User Terms"
                url="/legal/terms"
            />
            <Button variant="ghost" asChild className="mb-8 hover:bg-transparent hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <FileText className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground tracking-tight">
                        Terms of Use
                    </h1>
                    <p className="text-muted-foreground mt-2">v1.1 | Effective: 8 February 2026</p>
                </div>
            </div>

            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-8 space-y-8 text-muted-foreground leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">1. Introduction & Acceptance</h2>
                        <p>
                            These Terms of Use ("Terms") govern the access and use of the website <strong>e-georgopoulos.lovable.app</strong> (the "Website"), owned and operated by <strong>Efstathios Georgopoulos</strong> (the "Owner"). By accessing or using the Website, you (the "User") accept these Terms in full. If you do not agree, please discontinue use immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">2. License & Intellectual Property</h2>
                        <p>
                            Unless otherwise stated, the Owner owns all intellectual property rights for all material on this Website. All rights are reserved. You may access content for <strong>personal, non-commercial use</strong> subject to these restrictions:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Do not redistribute, reproduce, duplicate, or copy material</li>
                            <li>Do not sell, rent, or sub-license material</li>
                            <li>Do not republish material without written attribution and permission</li>
                            <li>Do not modify or create derivative works from the content</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">3. User Obligations</h2>
                        <p>By using this Website, you agree to:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Provide accurate information when using contact forms or subscribing to newsletters</li>
                            <li>Not use the Website for any unlawful purpose or in violation of applicable laws</li>
                            <li>Not attempt to gain unauthorized access to any part of the Website or its systems</li>
                            <li>Not introduce malicious software, scripts, or any form of harmful code</li>
                            <li>Not impersonate any person or entity or misrepresent your affiliation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Third-Party Services & Technology</h2>
                        <p>
                            The Website utilizes third-party services including Lovable.dev, Notion, Google Analytics, Google Gemini AI, Supabase, and GitHub. The Owner is <strong>not responsible</strong> for the availability, performance, or content of third-party services. Each service operates under its own terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">5. AI-Generated Content Disclaimer</h2>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                            <p className="text-sm">
                                🤖 Certain content on this Website may be generated or assisted by artificial intelligence (including Google Gemini AI). While all AI-generated content is reviewed by the Owner for accuracy and relevance, the Owner does not guarantee its completeness or correctness. <strong>AI-generated content does not constitute professional, legal, or financial advice.</strong> Users should verify critical information independently and consult qualified professionals for specific needs.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                        <p>To the maximum extent permitted by applicable law:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>The Owner shall not be liable for any <strong>indirect, incidental, special, or consequential damages</strong>.</li>
                            <li>The Owner is not liable for damages arising from reliance on any content, including AI-generated content.</li>
                            <li>The Website is provided "as is" without warranties of any kind, express or implied.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">7. Indemnification</h2>
                        <p>
                            The User agrees to indemnify, defend, and hold harmless the Owner from any claims, damages, losses, liabilities, costs, or expenses arising from the User's use or misuse of the Website or violation of these Terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">8. Dispute Resolution</h2>
                        <ol className="list-decimal pl-6 space-y-1">
                            <li><strong>Negotiation:</strong> Disputes shall first be attempted to be resolved through good-faith negotiation.</li>
                            <li><strong>Mediation:</strong> If unresolved within 30 days, disputes shall be submitted to mediation in Madrid, Spain.</li>
                            <li><strong>Jurisdiction:</strong> If mediation fails, disputes shall be submitted to the <strong>Courts and Tribunals of Madrid, Spain</strong>.</li>
                        </ol>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">9. Contact</h2>
                        <p>
                            For legal inquiries regarding these Terms, please use the <Link to="/contact" className="text-primary hover:underline">Contact Form</Link> with the subject "Legal Inquiry."
                        </p>
                    </section>

                    <section className="pt-8 border-t border-white/10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <h3 className="font-semibold mb-1">Stay Informed</h3>
                                <p className="text-sm">Subscribe to receive updates on privacy and compliance.</p>
                            </div>
                            <SubscriptionActions />
                        </div>
                    </section>

                </CardContent>
            </Card>
        </div>
    );
};

export default Terms;
