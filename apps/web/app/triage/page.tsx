"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Send, Bot, User, AlertTriangle } from "lucide-react";

// Define the shape of a chat message
type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function TriagePage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      content: "Hello Ekjot. I am the Sanjeevani AI Health Proxy. Please describe your symptoms or the emergency situation briefly.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate Go -> Groq API network latency (1.5 seconds)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content: "Based on your description, this requires immediate attention. If you are experiencing severe chest pain or difficulty breathing, please tap the red 'SOS' button on the Command Center immediately to dispatch Warriors.",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex-1 p-4 md:p-8 pt-6 max-w-5xl mx-auto w-full h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-3 mb-6 shrink-0">
        <Bot className="w-8 h-8 text-blue-600" />
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Triage</h2>
          <p className="text-muted-foreground">Groq-powered edge inference via Go Proxy.</p>
        </div>
      </div>

      <Alert variant="destructive" className="mb-6 shrink-0 bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/50">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle className="font-bold">Medical Disclaimer</AlertTitle>
        <AlertDescription>
          This AI is a triage assistant, not a doctor. It can hallucinate. In life-threatening scenarios, bypass this chat and trigger an SOS immediately.
        </AlertDescription>
      </Alert>

      <Card className="flex-1 flex flex-col overflow-hidden shadow-lg border-border/50">
        <CardHeader className="bg-muted/30 border-b border-border shrink-0 py-4">
          <CardTitle className="text-lg">Encrypted Session</CardTitle>
          <CardDescription>Latency: ~12ms | Model: Llama-3-8B-Instruct</CardDescription>
        </CardHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-6 flex flex-col pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "self-end flex-row-reverse" : "self-start"}`}
              >
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className={msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-blue-600 text-white"}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-tr-none"
                      : "bg-muted border border-border rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[85%] self-start">
                <Avatar className="w-8 h-8 shrink-0">
                  <AvatarFallback className="bg-blue-600 text-white">
                    <Bot size={16} />
                  </AvatarFallback>
                </Avatar>
                <div className="rounded-2xl rounded-tl-none px-4 py-3 bg-muted border border-border flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-600/50 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-blue-600/50 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-blue-600/50 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <CardFooter className="p-4 bg-background border-t border-border shrink-0">
          <form onSubmit={handleSend} className="flex w-full gap-2">
            <Input
              placeholder="Describe symptoms (e.g., tight chest, sudden weakness)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
              disabled={isTyping}
            />
            <Button type="submit" size="icon" disabled={!input.trim() || isTyping} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
