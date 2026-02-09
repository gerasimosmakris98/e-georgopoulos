import { trackEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Mail, MailMinus } from "lucide-react";
import { useUI } from "@/contexts/UIContext";

interface SubscriptionActionsProps {
    variant?: "default" | "outline" | "ghost" | "link";
    size?: "default" | "sm" | "lg" | "icon";
    className?: string;
}

export const SubscriptionActions = ({ variant = "outline", size = "sm", className }: SubscriptionActionsProps) => {
    const { openSubscribe, openUnsubscribe } = useUI();

    return (
        <div className={`flex flex-wrap gap-2 ${className}`}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant={variant}
                            size={size}
                            onClick={() => {
                                trackEvent(ANALYTICS_EVENTS.SUBSCRIBE, { location: 'subscription_manager' });
                                openSubscribe();
                            }}
                            className="gap-2"
                        >
                            <Mail className="h-4 w-4" />
                            Subscribe
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Opens subscription form in Notion</p>
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size={size}
                            onClick={() => {
                                trackEvent(ANALYTICS_EVENTS.UNSUBSCRIBE, { location: 'subscription_manager' });
                                openUnsubscribe();
                            }}
                            className="gap-2 text-muted-foreground hover:text-destructive"
                        >
                            <MailMinus className="h-4 w-4" />
                            Unsubscribe
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Opens unsubscription form in Notion</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
