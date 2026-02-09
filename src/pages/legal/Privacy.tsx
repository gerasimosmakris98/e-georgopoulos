import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Lock, Eye, Clock, UserCheck, Scale, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from "@/components/SEO";
import { SubscriptionActions } from "@/components/SubscriptionActions";

const Privacy = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
            <SEO
                title="Privacy Policy"
                description="How we collect, use, and protect your personal data in compliance with GDPR."
                keywords="Privacy Policy, Data Protection, GDPR Compliance"
                url="/legal/privacy"
            />
            <Button variant="ghost" asChild className="mb-8 hover:bg-transparent hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Shield className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-muted-foreground mt-2">v1.1 | Effective: 8 February 2026</p>
                </div>
            </div>

            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-8 space-y-8 text-muted-foreground leading-relaxed">

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm">
                            🔒 <strong>Applicable Law:</strong> Regulation (EU) 2016/679 (GDPR), Spanish Organic Law 3/2018 (LOPDGDD)
                        </p>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">1. Data Controller</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Identity</th>
                                        <td className="py-2">Efstathios Georgopoulos</td>
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
                                        <th className="py-2 pr-4 font-semibold text-foreground">Authority</th>
                                        <td className="py-2">Agencia Española de Protección de Datos (AEPD) — <a href="http://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">2. Data We Collect</h2>
                        <p className="font-semibold text-foreground mb-2">Data provided directly by you:</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                            <li>Name, email address, phone number (via contact form)</li>
                            <li>Email address, name (via newsletter subscription form)</li>
                            <li>Unsubscribe requests</li>
                            <li>Any information you voluntarily include in messages</li>
                        </ul>
                        <p className="font-semibold text-foreground mb-2">Data collected automatically:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>IP address (anonymized via Google Analytics)</li>
                            <li>Browser type and version, device type</li>
                            <li>Pages visited, time spent, referral source</li>
                            <li>Cookies and similar tracking technologies (see <Link to="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link>)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">3. Purpose of Processing</h2>
                        <p className="mb-4">We process your information to:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Purpose</th>
                                        <th className="py-2 font-semibold text-foreground">Legal Basis (GDPR)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Respond to inquiries via contact form</td>
                                        <td className="py-2">Consent (Art. 6.1.a)</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Send newsletters and professional updates</td>
                                        <td className="py-2">Consent (Art. 6.1.a)</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Maintain professional communication</td>
                                        <td className="py-2">Legitimate interest (Art. 6.1.f)</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Website analytics and improvement</td>
                                        <td className="py-2">Legitimate interest (Art. 6.1.f)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">Comply with legal obligations</td>
                                        <td className="py-2">Legal obligation (Art. 6.1.c)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Data Retention</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Data Type</th>
                                        <th className="py-2 font-semibold text-foreground">Retention Period</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Contact form submissions</td>
                                        <td className="py-2">Until inquiry is resolved + 2 years</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Newsletter subscriptions</td>
                                        <td className="py-2">Until unsubscribe + 30 days</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Analytics data</td>
                                        <td className="py-2">14 months (Google Analytics default)</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">Legal/contractual records</td>
                                        <td className="py-2">Duration of relationship + years required by law</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">5. Data Processors & Third-Party Services</h2>
                        <p className="mb-4">We use the following third-party services that may process your data:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Processor</th>
                                        <th className="py-2 pr-4 font-semibold text-foreground">Purpose</th>
                                        <th className="py-2 pr-4 font-semibold text-foreground">Location</th>
                                        <th className="py-2 font-semibold text-foreground">Safeguards</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Notion Labs, Inc.</strong></td>
                                        <td className="py-2 pr-4">CRM, form submissions</td>
                                        <td className="py-2 pr-4">USA</td>
                                        <td className="py-2">EU SCCs</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Lovable (GPT Engineer AB)</strong></td>
                                        <td className="py-2 pr-4">Website hosting</td>
                                        <td className="py-2 pr-4">Sweden (EU)</td>
                                        <td className="py-2">GDPR-native</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Google LLC</strong></td>
                                        <td className="py-2 pr-4">Analytics, Gemini AI</td>
                                        <td className="py-2 pr-4">USA</td>
                                        <td className="py-2">Data Privacy Framework</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4"><strong>Supabase, Inc.</strong></td>
                                        <td className="py-2 pr-4">Backend services</td>
                                        <td className="py-2 pr-4">USA</td>
                                        <td className="py-2">EU SCCs</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4"><strong>GitHub, Inc.</strong></td>
                                        <td className="py-2 pr-4">Source code hosting</td>
                                        <td className="py-2 pr-4">USA</td>
                                        <td className="py-2">Data Privacy Framework</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">6. International Data Transfers</h2>
                        <p>
                            Some of our data processors are located outside the European Economic Area (EEA). We ensure appropriate safeguards are in place, such as EU Standard Contractual Clauses (SCCs) and adherence to the EU-US Data Privacy Framework where applicable.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">7. Your Rights (GDPR)</h2>
                        <p className="mb-4">You have rights regarding your personal data (Access, Rectification, Erasure, Restriction, Portability, Objection). To exercise your rights:</p>
                        <ul className="list-disc pl-6 space-y-2 mb-4">
                            <li>Contact us through the <Link to="/contact" className="text-primary hover:underline">Contact Form</Link> with the subject "Data Protection Request."</li>
                            <li>We will respond within <strong>30 days</strong>.</li>
                        </ul>
                        <p>
                            If you are unsatisfied with our response, you may file a complaint with the AEPD at <a href="http://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.aepd.es</a>.
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

export default Privacy;
