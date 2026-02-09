import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

const LiveCV = () => {
    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col">
            <SEO
                title="Live CV"
                description="View my interactive and up-to-date professional curriculum vitae."
                keywords="Efstathios Georgopoulos CV, Professional Resume, Compliance Expert CV"
                url="/cv-live"
            />
            <div className="flex justify-between items-center mb-6">
                <Button variant="ghost" asChild className="gap-2">
                    <Link to="/">
                        <ArrowLeft className="w-4 h-4" /> Back to Home
                    </Link>
                </Button>
                <div className="flex gap-3">
                    <Button variant="outline" asChild>
                        <a href="https://g-makris.notion.site/ebd//a6a6a743788247fdb0edd32efc61565d" target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 w-4 h-4" /> Open in Notion
                        </a>
                    </Button>
                </div>
            </div>

            <div className="flex-1 w-full bg-white rounded-xl overflow-hidden shadow-2xl border border-white/10 h-[800px]">
                <iframe
                    src="https://g-makris.notion.site/ebd//a6a6a743788247fdb0edd32efc61565d"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    className="w-full h-full"
                    title="Live CV"
                />
            </div>
        </div>
    );
};

export default LiveCV;
