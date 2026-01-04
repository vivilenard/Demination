import { useState, useRef, useEffect } from "react";
import { Send, Bot, /*User, */ Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

interface Message {
  role: "user" | "ai";
  content: string;
}

export function AIPrompt() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  //   console.log("API Key exists:", !!import.meta.env.VITE_GEMINI_API_KEY);
  //   console.log(import.meta.env.VITE_GEMINI_API_KEY);
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      const result = await model.generateContent(input);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = { role: "ai", content: text };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setIsLoading(false);
    }
    // --- MOCK RESPONSE LOGIC ---
    // setTimeout(() => {
    // const aiMessage: Message = {
    //     role: "ai",
    //     content: `This is a mock response to: "${input}". Once you connect the Gemini API, I will be able to answer your fitness and logic questions for real!`
    // }
    // setMessages((prev) => [...prev, aiMessage])
    // setIsLoading(false)
    // }, 1500)
  };

  return (
    <div className="max-w-3xl mx-auto h-[80vh] flex flex-col gap-4">
      <div className="flex items-center gap-2 px-2">
        <Bot className="text-primary h-6 w-6" />
        <h2 className="text-2xl font-bold">AI Fitness Assistant</h2>
      </div>

      <ScrollArea
        className="flex-1 border rounded-lg p-4 bg-muted/30"
        ref={scrollRef}
      >
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 flex gap-3 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border"
                }`}
              >
                {msg.role === "ai" && <Bot className="h-5 w-5 shrink-0" />}
                <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                  {msg.role === "ai" ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    <p>{msg.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg p-3 bg-card border flex gap-3 w-full">
                <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-[90%]" />
                  <Skeleton className="h-4 w-[60%]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="flex gap-2">
        <Textarea
          placeholder="Ask me anything about your workout..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInput(e.target.value)
          }
          className="resize-none"
          onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button onClick={handleSend} disabled={isLoading} className="h-auto">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
