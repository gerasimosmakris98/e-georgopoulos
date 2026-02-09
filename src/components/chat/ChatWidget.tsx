
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { GeminiService, ChatMessage } from '@/services/gemini';
import { useUI } from "@/contexts/UIContext";
import { useLocation, useNavigate } from "react-router-dom";

const ChatWidget = () => {
  const { openContact, openSubscribe, openLiveCV } = useUI();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([
    { role: 'assistant', content: "Hi there! I'm Efstathios's AI assistant. Ask me anything about Compliance, Blockchain, or my services! ⚡" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      // Convert messages to Gemini format
      const history: ChatMessage[] = messages.slice(1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const stream = await GeminiService.streamChat(history, input.trim(), `Current Path: ${location.pathname}`);

      let assistantContent = "";
      setMessages(prev => [...prev, { role: 'assistant', content: "" }]);

      for await (const chunk of stream) {
        // Handle Function Calls
        const functionCalls = chunk.functionCalls();
        if (functionCalls && functionCalls.length > 0) {
          for (const call of functionCalls) {
            const { name, args } = call;
            if (name === "open_contact") {
              openContact();
              assistantContent += "\n\n*(Opening Contact Form...)*";
            } else if (name === "open_subscribe") {
              openSubscribe();
              assistantContent += "\n\n*(Opening Subscription Form...)*";
            } else if (name === "open_live_cv") {
              openLiveCV();
              assistantContent += "\n\n*(Opening Live CV...)*";
            } else if (name === "navigate_to") {
              const navigationArgs = args as { path?: string };
              if (navigationArgs && navigationArgs.path) {
                navigate(navigationArgs.path);
                assistantContent += `\n\n*(Navigating to ${navigationArgs.path}...)*`;
              }
            }
          }
        }

        const chunkText = chunk.text();
        if (chunkText) {
          assistantContent += chunkText;
        }

        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
          return updated;
        });
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: error.message || 'Sorry, I encountered an error. Please try again later.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleMinimize = () => setIsOpen(false);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setMessages([
        { role: 'assistant', content: "Hi there! I'm Efstathios's AI assistant. Ask me anything about Compliance, Blockchain, or my services! ⚡" }
      ]);
    }, 300);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
            className={cn(
              "fixed z-50 flex flex-col overflow-hidden shadow-2xl border border-white/10 bg-black/80 backdrop-blur-xl",
              // Mobile: Full screen minus nav
              "inset-0 top-[0px] w-full h-full rounded-none",
              // Desktop: Compact floating window
              "sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[500px] sm:h-[700px] sm:max-h-[85vh] sm:rounded-[2rem]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg ring-1 ring-white/20">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg text-white leading-none mb-1">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-zinc-400 font-medium tracking-wide uppercase">Compliance Expert</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleMinimize}
                  className="rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors w-8 h-8"
                >
                  <span className="sr-only">Minimize</span>
                  <div className="w-3 h-0.5 bg-current rounded-full" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={handleClose}
                  className="rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors w-8 h-8"
                >
                  <span className="sr-only">Close</span>
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((message, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index}
                  className={cn(
                    "flex flex-col gap-1 max-w-[85%]",
                    message.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <span className="text-[10px] text-zinc-500 font-medium px-1">
                    {message.role === 'user' ? 'You' : 'Atlas AI'}
                  </span>
                  <div
                    className={cn(
                      "p-4 rounded-2xl text-sm leading-relaxed shadow-sm relative",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground rounded-tr-sm"
                        : "bg-zinc-800/80 border border-white/5 text-zinc-100 rounded-tl-sm backdrop-blur-sm"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 text-primary/60" />
                  </div>
                  <div className="bg-zinc-800/50 border border-white/5 rounded-2xl rounded-tl-none px-4 py-3 backdrop-blur-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/20 backdrop-blur-md border-t border-white/5 shrink-0">
              <div className="relative flex items-center gap-2 bg-zinc-900/50 rounded-3xl border border-white/10 px-1 py-1 focus-within:ring-1 focus-within:ring-primary/50 transition-all">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask a compliance question..."
                  className="flex-1 bg-transparent border-none pl-4 pr-2 py-3 text-sm text-foreground placeholder:text-zinc-500 focus:outline-none focus:ring-0"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className={cn(
                    "h-10 w-10 rounded-full transition-all duration-300 shadow-md",
                    input.trim()
                      ? "bg-primary text-white hover:bg-primary/90 hover:scale-105"
                      : "bg-zinc-800 text-zinc-600"
                  )}
                >
                  <Send className={cn("w-4 h-4", input.trim() && "ml-0.5")} />
                </Button>
              </div>
              <div className="text-center mt-3 space-y-1">
                <p className="text-[10px] text-zinc-500">
                  By messaging, you agree to our <a href="/legal/terms" className="underline hover:text-zinc-300">Terms & Conditions</a>.
                </p>
                <p className="text-[10px] text-zinc-600">AI can make mistakes. Verify important info.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button - Floating Pill style */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-6 z-50 group",
          isOpen ? "hidden" : "flex"
        )}
      >
        <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-gradient-to-r from-zinc-900 to-black border border-white/10 shadow-2xl hover:shadow-primary/20 transition-all">
          <div className="relative">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse absolute -top-1 -right-1 border-2 border-black" />
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-medium text-sm pr-1">Ask AI Assistant</span>
        </div>
      </motion.button>
    </>
  );
};

export default ChatWidget;
