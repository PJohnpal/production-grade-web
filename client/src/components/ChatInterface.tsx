import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  sql?: string;
  results?: any[];
}

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
}

export function ChatInterface({ onSendMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    
    if (onSendMessage) {
      onSendMessage(input);
    } else {
      //todo: remove mock functionality
      console.log('Message sent:', input);
      
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "I've analyzed your query and generated the SQL to retrieve the data.",
          sql: "SELECT vendor, SUM(amount) as total_spend\nFROM invoices\nWHERE date >= CURRENT_DATE - INTERVAL '90 days'\nGROUP BY vendor\nORDER BY total_spend DESC\nLIMIT 5;",
          results: [
            { vendor: "Acme Corp", total_spend: 245000 },
            { vendor: "Tech Solutions Inc", total_spend: 198000 },
            { vendor: "Global Supplies", total_spend: 167000 },
          ],
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }, 1000);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-muted-foreground py-12">
              <Bot className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">Ask me anything about your data</p>
              <p className="text-sm mt-2">
                Try asking: "What's the total spend in the last 90 days?" or "List top 5 vendors by spend"
              </p>
            </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              {message.type === "assistant" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
              <div
                className={`max-w-[80%] ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                } rounded-lg p-4`}
                data-testid={`message-${message.type}-${message.id}`}
              >
                <p className="text-sm">{message.content}</p>
                {message.sql && (
                  <Card className="mt-3 bg-background/50 border">
                    <div className="p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Generated SQL:</p>
                      <pre className="text-xs font-mono overflow-x-auto" data-testid="text-generated-sql">
                        {message.sql}
                      </pre>
                    </div>
                  </Card>
                )}
                {message.results && message.results.length > 0 && (
                  <Card className="mt-3 bg-background/50 border">
                    <div className="p-3">
                      <p className="text-xs font-medium text-muted-foreground mb-2">Results:</p>
                      <div className="overflow-x-auto">
                        <table className="text-xs w-full" data-testid="table-query-results">
                          <thead>
                            <tr className="border-b">
                              {Object.keys(message.results[0]).map((key) => (
                                <th key={key} className="text-left p-2 font-medium">
                                  {key}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {message.results.map((row, idx) => (
                              <tr key={idx} className="border-b last:border-0">
                                {Object.values(row).map((value, i) => (
                                  <td key={i} className="p-2">
                                    {typeof value === 'number' ? value.toLocaleString() : String(value)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
              {message.type === "user" && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            placeholder="Ask a question about your data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="resize-none"
            rows={2}
            data-testid="input-chat-message"
          />
          <Button
            onClick={handleSend}
            size="icon"
            disabled={!input.trim()}
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
