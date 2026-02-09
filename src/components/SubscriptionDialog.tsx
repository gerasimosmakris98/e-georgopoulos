
import { useUI } from "@/contexts/UIContext";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NotionEmbed from "./NotionEmbed";

const SUBSCRIBE_URL = "https://g-makris.notion.site/ebd//6e6794ace6cf4299b1fcacb5a20b9ace";
const UNSUBSCRIBE_URL = "https://g-makris.notion.site/ebd//62712591f75e43ab958486be913ef9d8";

export const SubscriptionDialog = () => {
    const { subscribeState, closeSubscribe } = useUI();

    return (
        <Dialog open={subscribeState !== null} onOpenChange={(open) => !open && closeSubscribe()}>
            <DialogContent className="max-w-4xl h-[80vh] flex flex-col p-0 overflow-hidden glass-effect border-white/10 shadow-premium">
                <div className="absolute top-4 left-4 z-50">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={closeSubscribe}
                        className="h-8 px-3 text-xs rounded-full bg-black/20 hover:bg-black/40 text-black hover:text-black dark:text-white dark:hover:text-white transition-colors backdrop-blur-sm"
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
                            className="w-3 h-3 mr-1"
                        >
                            <path d="m15 18-6-6 6-6" />
                        </svg>
                        Back
                    </Button>
                    <span className="ml-4 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded-md mb-2 inline-block">
                        Opens in Notion
                    </span>
                </div>
                <div className="flex-1 overflow-auto bg-white">
                    {subscribeState === "subscribe" && (
                        <NotionEmbed
                            url={SUBSCRIBE_URL}
                            title="Subscription Form"
                            height="100%"
                            className="h-full min-h-[500px]"
                        />
                    )}
                    {subscribeState === "unsubscribe" && (
                        <NotionEmbed
                            url={UNSUBSCRIBE_URL}
                            title="Unsubscription Form"
                            height="100%"
                            className="h-full min-h-[500px]"
                        />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
