import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { useUI } from '@/contexts/UIContext';

const LiveCVModal = () => {
    const { isLiveCVOpen, closeLiveCV } = useUI();

    return (
        <Dialog open={isLiveCVOpen} onOpenChange={closeLiveCV}>
            <DialogContent className="max-w-[95vw] w-full h-[90vh] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border-white/10 [&>button]:hidden">
                <div className="flex flex-col h-full">
                    <div className="absolute top-4 left-4 z-50 flex items-center">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={closeLiveCV}
                            className="rounded-full bg-white/10 hover:bg-white/20 text-white hover:text-white transition-colors backdrop-blur-sm px-3"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="w-4 h-4 mr-1"
                            >
                                <path d="m15 18-6-6 6-6" />
                            </svg>
                            Back
                        </Button>
                        <span className="ml-3 text-xs text-white/50 bg-black/20 px-2 py-1 rounded-md backdrop-blur-sm">
                            Powered by Notion
                        </span>
                    </div>
                    <div className="flex-1 w-full bg-white/5 h-full">
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
            </DialogContent>
        </Dialog>
    );
};

export default LiveCVModal;
