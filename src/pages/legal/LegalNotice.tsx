import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Scale, Info, Gavel, Globe, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from "@/components/SEO";
import { SubscriptionActions } from "@/components/SubscriptionActions";

const LegalNotice = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
            <SEO
                title="Legal Notice"
                description="Official legal information and business details for Efstathios Georgopoulos."
                keywords="Legal Notice, Terms, Business Information"
                url="/legal/notice"
            />
            <Button variant="ghost" asChild className="mb-8 hover:bg-transparent hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Scale className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground tracking-tight">
                        Legal Notice (Aviso Legal)
                    </h1>
                    <p className="text-muted-foreground mt-2">v1.1 | Effective: 8 February 2026</p>
                </div>
            </div>

            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-8 space-y-8 text-muted-foreground leading-relaxed">

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">1. Information Society Services Law (LSSI)</h2>
                        <p className="mb-4">
                            In compliance with <strong>Article 10 of Law 34/2002</strong>, of July 11, on Information Society Services and Electronic Commerce (LSSI-CE), the following identification data of the owner of this website is provided:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Owner</th>
                                        <td className="py-2">Efstathios Georgopoulos</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Activity</th>
                                        <td className="py-2">Personal Portfolio & Professional Services</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Location</th>
                                        <td className="py-2">Madrid, Spain</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Contact</th>
                                        <td className="py-2">Available via the <Link to="/contact" className="text-primary hover:underline">Contact Form</Link></td>
                                    </tr>
                                    <tr>
                                        <th className="py-2 pr-4 font-semibold text-foreground">Website</th>
                                        <td className="py-2"><a href="https://e-georgopoulos.lovable.app" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">e-georgopoulos.lovable.app</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">2. Professional Disclaimer</h2>
                        <p>
                            The content provided on this website (including blog posts, project descriptions, compliance resources, and AI-generated summaries) is for <strong>informational and educational purposes only</strong>. It does not constitute professional legal, financial, or compliance advice.
                        </p>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 my-4">
                            <p className="text-sm">
                                🤖 <strong>AI-Generated Content Notice:</strong> Certain content on this website may be generated or assisted by artificial intelligence tools (including Google Gemini). While the owner reviews AI-generated content for accuracy, users should verify critical information independently. AI-generated content does not constitute professional advice.
                            </p>
                        </div>
                        <p>
                            While the owner strives to keep the information up to date and correct, no representations or warranties of any kind are made about the completeness, accuracy, reliability, suitability, or availability of the website or the information contained therein.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">3. Terms of Use</h2>
                        <p>
                            Access to this website implies the status of USER and acceptance of the General Conditions of Use listed here. The USER assumes responsibility for the use of the portal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
                        <p>
                            Efstathios Georgopoulos is the owner of all intellectual and industrial property rights of this website, as well as the elements contained therein (images, sound, audio, video, software, texts, trademarks, logos, color combinations, structure, and design). <strong>All rights reserved.</strong>
                        </p>
                        <p className="mt-2">
                            Reproduction, distribution, public communication, or transformation of any content without express written authorization is prohibited, except for personal, non-commercial use.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">5. Liability Exclusion</h2>
                        <p>The owner is not responsible for:</p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li>Damages of any kind caused by errors or omissions in the content</li>
                            <li>Unavailability of the portal</li>
                            <li>Transmission of viruses or malicious programs, despite having adopted all necessary technological measures to prevent it</li>
                            <li>Actions of third parties who may access or use the information on this website</li>
                            <li>Interruptions, failures, or defects in telecommunications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">6. Modifications</h2>
                        <p>
                            The owner reserves the right to make unannounced changes deemed appropriate, including modifying, deleting, or adding both the content and services provided through the portal and the way in which they are presented or located.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">7. Third-Party Services & Technology</h2>
                        <p className="mb-4">This website uses the following third-party services and technologies:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Service</th>
                                        <th className="py-2 pr-4 font-semibold text-foreground">Purpose</th>
                                        <th className="py-2 font-semibold text-foreground">Provider</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Lovable.dev</strong></td>
                                        <td className="py-2 pr-4">Website hosting and development platform</td>
                                        <td className="py-2">Lovable (GPT Engineer AB)</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Notion</strong></td>
                                        <td className="py-2 pr-4">Content management, CRM, and backend operations</td>
                                        <td className="py-2">Notion Labs, Inc.</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Google Analytics</strong></td>
                                        <td className="py-2 pr-4">Website analytics (with IP anonymization)</td>
                                        <td className="py-2">Google LLC</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Google Gemini AI</strong></td>
                                        <td className="py-2 pr-4">AI-assisted content generation and analysis</td>
                                        <td className="py-2">Google LLC</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Supabase</strong></td>
                                        <td className="py-2 pr-4">Backend services and database (select features)</td>
                                        <td className="py-2">Supabase, Inc.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4"><strong>GitHub</strong></td>
                                        <td className="py-2 pr-4">Source code repository and version control</td>
                                        <td className="py-2">GitHub, Inc. (Microsoft)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-sm">
                            Each third-party service operates under its own terms of service and privacy policy. The website owner is not responsible for the practices of these third-party providers. Users are encouraged to review the respective privacy policies of these services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">8. Applicable Law & Jurisdiction</h2>
                        <p>
                            The relationship between the owner and the USER shall be governed by <strong>current Spanish regulations</strong>. Any controversy shall be submitted to the <strong>Courts and Tribunals of the city of Madrid</strong>, with both parties expressly waiving any other jurisdiction that may correspond to them.
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

export default LegalNotice;
