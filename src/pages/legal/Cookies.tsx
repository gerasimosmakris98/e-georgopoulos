import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cookie, Shield, Info, Settings, Clock, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from "@/components/SEO";
import { SubscriptionActions } from "@/components/SubscriptionActions";

const Cookies = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
            <SEO
                title="Cookies Policy"
                description="Information on how we use cookies to enhance your browsing experience."
                keywords="Cookies Policy, Privacy, Data Protection"
                url="/legal/cookies"
            />
            <Button variant="ghost" asChild className="mb-8 hover:bg-transparent hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Cookie className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground tracking-tight">
                        Cookies Policy
                    </h1>
                    <p className="text-muted-foreground mt-2">v1.1 | Effective: 8 February 2026</p>
                </div>
            </div>

            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-8 space-y-8 text-muted-foreground leading-relaxed">

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm">
                            🍪 <strong>Applicable Law:</strong> GDPR, ePrivacy Directive 2002/58/EC, LSSI-CE Art. 22.2
                        </p>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">1. What Are Cookies?</h2>
                        <p>
                            A cookie is a small text file that a website stores on your computer or mobile device when you visit the site. It enables the website to remember your actions and preferences over a period of time, so you don't have to re-enter them each time you visit.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">2. Types of Cookies We Use</h2>

                        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">3.1 Strictly Necessary (Technical) Cookies</h3>
                        <p className="mb-2">Exempt from consent (essential for website functionality).</p>
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Name</th>
                                        <th className="py-2 pr-4 font-semibold text-foreground">Purpose</th>
                                        <th className="py-2 font-semibold text-foreground">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">cookie_consent</td>
                                        <td className="py-2 pr-4">Stores cookie preferences</td>
                                        <td className="py-2">1 year</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">session_id</td>
                                        <td className="py-2 pr-4">Maintains session state</td>
                                        <td className="py-2">Session</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">3.2 Analytics Cookies</h3>
                        <p className="mb-2">Legal basis: Consent (GDPR Art. 6.1.a)</p>
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Name</th>
                                        <th className="py-2 pr-4 font-semibold text-foreground">Purpose</th>
                                        <th className="py-2 font-semibold text-foreground">Duration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">_ga, _ga_*</td>
                                        <td className="py-2 pr-4">Google Analytics (IP anonymized)</td>
                                        <td className="py-2">2 years</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">_gid</td>
                                        <td className="py-2 pr-4">Distinguishes unique users</td>
                                        <td className="py-2">24 hours</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">3.3 Third-Party Cookies</h3>
                        <p className="mb-2">Cookies from Notion (embeds) and Supabase (functionality).</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Cookie Consent Mechanism</h2>
                        <p>
                            When you first visit this website, a <strong>cookie consent banner</strong> is displayed allowing you to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1 mt-2">
                            <li><strong>Accept All</strong> — enables all cookie categories</li>
                            <li><strong>Reject Non-Essential</strong> — only strictly necessary cookies are placed</li>
                        </ul>
                        <p className="mt-2">
                            You can change your preferences at any time by clearing your browser cookies or clicking the cookie settings options.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">5. How to Manage Cookies via Browser</h2>
                        <p>
                            You can control and delete cookies through your browser settings (Chrome, Firefox, Safari, Edge). Disabling cookies may affect the functionality of this website.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">6. Contact</h2>
                        <p>
                            For questions about our use of cookies, please contact us via the <Link to="/contact" className="text-primary hover:underline">Contact Form</Link>.
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

export default Cookies;
