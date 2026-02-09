import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Map, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from "@/components/SEO";

const Sitemap = () => {
    const sections = [
        {
            title: "Main",
            links: [
                { name: "Home", path: "/" },
                { name: "About Me", path: "/about" },
                { name: "Resume & Experience", path: "/resume" },
                { name: "Skills & Expertise", path: "/skills" },
                { name: "Services", path: "/services" },
                { name: "Blog & Insights", path: "/blog" },
                { name: "Contact", path: "/contact" },
                { name: "Frequently Asked Questions", path: "/faqs" },
            ]
        },
        {
            title: "Legal & Compliance",
            links: [
                { name: "Legal Notice", path: "/legal/notice" },
                { name: "Privacy Policy", path: "/legal/privacy" },
                { name: "Terms of Use", path: "/legal/terms" },
                { name: "Cookies Policy", path: "/legal/cookies" },
                { name: "Accessibility Statement", path: "/legal/accessibility" },
            ]
        },
        {
            title: "Socials",
            links: [
                { name: "LinkedIn", path: "https://www.linkedin.com/in/efstathios-georgopoulos/", external: true },
                // Add more social links here if available
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-8 md:py-20 mt-16 max-w-6xl">
            <SEO
                title="Sitemap"
                description="Overview of the website structure and quick navigation to all sections."
                keywords="Sitemap, Navigation, Website Structure"
                url="/sitemap"
            />
            <Button variant="ghost" asChild className="mb-8 hover:bg-transparent hover:text-primary">
                <Link to="/" className="flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </Button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                    <Map className="w-8 h-8 text-primary" />
                </div>
                <div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-foreground tracking-tight">
                        Sitemap
                    </h1>
                    <p className="text-muted-foreground mt-2">Overview of website structure and available pages.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section, idx) => (
                    <div key={idx} className="glass-panel border-white/5 hover:border-primary/20 rounded-xl p-6 transition-colors duration-300">
                        <h2 className="text-xl font-playfair font-semibold mb-4 text-foreground border-b border-white/10 pb-2">
                            {section.title}
                        </h2>
                        <ul className="space-y-3">
                            {section.links.map((link, linkIdx) => (
                                <li key={linkIdx}>
                                    {link.external ? (
                                        <a
                                            href={link.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
                                        >
                                            {link.name}
                                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </a>
                                    ) : (
                                        <Link
                                            to={link.path}
                                            className="text-muted-foreground hover:text-primary transition-colors block"
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sitemap;
