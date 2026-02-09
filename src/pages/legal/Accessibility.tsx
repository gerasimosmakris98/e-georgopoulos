import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Accessibility as AccessIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SubscriptionActions } from "@/components/SubscriptionActions";

const Accessibility = () => {
    return (
        <div className="container mx-auto px-4 py-12 md:py-24 max-w-4xl">
            <Button variant="ghost" asChild className="mb-8 hover:bg-transparent hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <AccessIcon className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground tracking-tight">
                        Accessibility Statement
                    </h1>
                    <p className="text-muted-foreground mt-2">v1.1 | Effective: 8 February 2026</p>
                </div>
            </div>

            <Card className="glass-panel border-white/5 hover:border-primary/20 transition-colors duration-300">
                <CardContent className="p-8 space-y-8 text-muted-foreground leading-relaxed">

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                        <p className="text-sm">
                            ♿ <strong>Standard:</strong> WCAG 2.1 Level AA | <strong>Last Review:</strong> 8 February 2026
                        </p>
                    </div>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">1. Commitment</h2>
                        <p>
                            Efstathios Georgopoulos is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards as outlined in the <strong>EU Web Accessibility Directive</strong> and <strong>WCAG 2.1</strong>.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">2. Conformance Status</h2>
                        <p>
                            This website is <strong>partially conformant</strong> with WCAG 2.1 Level AA. "Partially conformant" means that some parts of the content may not fully conform to the accessibility standard, though we strive for full compliance.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">3. Accessibility Features</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Semantic HTML structure for screen reader compatibility</li>
                            <li>Keyboard navigation support across all pages</li>
                            <li>Skip navigation links for main content</li>
                            <li>Alt text for images and media elements</li>
                            <li>Sufficient color contrast (minimum 4.5:1 ratio)</li>
                            <li>Responsive design for all screen sizes</li>
                            <li>Focus indicators for interactive elements</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">4. Known Limitations</h2>
                        <p className="mb-4">Despite our best efforts, some areas may have limited accessibility:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="py-2 pr-4 font-semibold text-foreground">Area</th>
                                        <th className="py-2 font-semibold text-foreground">Limitation</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Dynamic content</td>
                                        <td className="py-2">Some dynamic loading may not be fully announced by screen readers.</td>
                                    </tr>
                                    <tr className="border-b border-white/10">
                                        <td className="py-2 pr-4">Embedded Forms</td>
                                        <td className="py-2">Third-party Notion embeds may have limited keyboard navigation.</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2 pr-4">PDFs</td>
                                        <td className="py-2">Some linked PDFs may not be fully accessible.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">5. Feedback & Contact</h2>
                        <p>
                            We welcome feedback on the accessibility of this website. Please let us know if you encounter accessibility barriers via the <Link to="/contact" className="text-primary hover:underline">Contact Form</Link> with subject "Accessibility Feedback".
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">6. How We Test</h2>
                        <p className="mb-4">
                            We regularly evaluate the accessibility of our website using a combination of manual and automated testing methods:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Automated testing with <strong>Google Lighthouse</strong> and <strong>axe-core</strong>.</li>
                            <li>Manual navigation testing using only a keyboard.</li>
                            <li>Screen reader testing with <strong>NVDA</strong> (Windows) and <strong>VoiceOver</strong> (iOS/macOS).</li>
                            <li>Color contrast verification using professional design tools.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-foreground mb-4">7. Enforcement Procedure</h2>
                        <p>
                            If you are not satisfied with our response or find our efforts insufficient, you may contact the <strong>Ministerio de Asuntos Económicos y Transformación Digital</strong> in Spain or your local equality body for further assistance.
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

export default Accessibility;
