import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VoiceInput, TextToSpeech } from "@/components/VoiceInput";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const VoiceChatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("voice-chat", {
        body: {
          message: text,
          conversationHistory: messages,
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.reply,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast.error(error.message || "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="min-h-screen bg-background md:pt-20 pb-24 md:pb-8">
      <div className="container mx-auto px-4 py-8 max-w-4xl h-[calc(100vh-8rem)] flex flex-col">
        <Button
          variant="ghost"
          onClick={() => navigate("/g-assist")}
          className="mb-6 self-start"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to G-Assist
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Voice Chatbot</h1>
          <p className="text-muted-foreground">
            Talk to our AI assistant in multiple Indian languages
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.length === 0 && (
            <div className="p-6 rounded-2xl bg-gradient-card text-white shadow-glow text-center">
              <h3 className="text-lg font-semibold mb-2">
                नमस्ते! Hello! How can I help you today?
              </h3>
              <p className="text-sm text-white/80">
                Ask me about government schemes, health information, or any public services
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`p-4 rounded-2xl animate-fade-in ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
                  : "bg-secondary max-w-[80%]"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="whitespace-pre-wrap">{message.content}</p>
                {message.role === "assistant" && (
                  <TextToSpeech text={message.content} />
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 p-4 rounded-2xl bg-secondary max-w-[80%]">
              <Loader2 className="w-4 h-4 animate-spin" />
              <p className="text-sm text-muted-foreground">Thinking...</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <VoiceInput
            onTranscript={(text) => sendMessage(text)}
            disabled={isLoading}
          />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default VoiceChatbot;
