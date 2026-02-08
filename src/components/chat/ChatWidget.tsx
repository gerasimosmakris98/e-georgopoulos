
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare, X, Send, Sparkles, User, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
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

  const streamChat = async (userMessages: Message[]) => {
    // ... (Keep existing stream logic, omitted for brevity but would be included in full file)
    const resp = await fetch(CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (resp.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }
    if (resp.status === 402) {
      throw new Error('Service temporarily unavailable.');
    }
    if (!resp.ok || !resp.body) {
      throw new Error('Failed to start stream');
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = '';
    let assistantContent = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith('\r')) line = line.slice(0, -1);
        if (line.startsWith(':') || line.trim() === '') continue;
        if (!line.startsWith('data: ')) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === '[DONE]') break;

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantContent += content;
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last?.role === 'assistant' && prev.length > 1) {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantContent } : m
                );
              }
              return [...prev, { role: 'assistant', content: assistantContent }];
            });
          }
        } catch {
          textBuffer = line + '\n' + textBuffer;
          break;
        }
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
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
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className={cn(
              "fixed z-40 flex flex-col overflow-hidden shadow-2xl glass-card-elevated border border-white/10",
              // Mobile Styles: Fullscreen (minus header/cookies)
              "inset-0 top-[60px] bottom-0 rounded-none w-full h-auto",
              // Desktop Styles: Fixed widget
              "sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[500px] sm:max-h-[70vh] sm:rounded-3xl"
            )}
          >
            {/* Premium Header */}
            <div className="bg-white/5 backdrop-blur-md p-4 border-b border-white/5 flex justify-between items-center relative shrink-0">
              {/* Animated Gradient Border Bottom */}
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-playfair font-bold text-lg text-foreground leading-tight">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">Powering your compliance</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Minimize Chat"
                  className="h-8 w-8 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleMinimize}
                >
                  <span className="text-xl font-bold mb-3">_</span>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Close and Reset Chat"
                  className="h-8 w-8 rounded-full hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={handleClose}
                >
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
                    "flex gap-3 max-w-[85%]",
                    message.role === 'user' ? "ml-auto flex-row-reverse" : ""
                  )}
                >
                  {/* Messages */}
                  <div
                    className={cn(
                      "p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm relative group",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-white/5 border border-white/10 text-foreground rounded-tl-none backdrop-blur-sm"
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      message.content
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role === 'user' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none px-4 py-3 backdrop-blur-sm">
                    <div className="flex gap-1.5 items-center h-full">
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/40 backdrop-blur-md border-t border-white/5 shrink-0">
              <div className="relative flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about crypto compliance..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-full pl-5 pr-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 transition-all shadow-inner"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  size="icon"
                  className={cn(
                    "h-11 w-11 rounded-full text-white shadow-lg transition-all duration-300",
                    input.trim()
                      ? "bg-gradient-to-r from-primary to-accent hover:shadow-primary/25 hover:scale-105"
                      : "bg-white/5 text-muted-foreground"
                  )}
                >
                  <Send className={cn("w-5 h-5", input.trim() && "ml-0.5")} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (Pulse) */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-6 z-40 group",
          isOpen && "hidden sm:block"
        )}
      >
        <div className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 relative",
          isOpen
            ? "bg-destructive text-white rotate-90"
            : "bg-foreground text-background"
        )}>
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-white/20 animate-ping duration-1000" />
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
              </span>
            </>
          )}

          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageSquare className="w-6 h-6 fill-current" />
          )}
        </div>
      </motion.button>
    </>
  );
};

export default ChatWidget;
