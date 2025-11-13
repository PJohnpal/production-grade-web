import { ChatInterface } from "@/components/ChatInterface";

export default function ChatWithData() {
  return (
    <div className="h-full flex flex-col">
      <div className="p-8 border-b">
        <h1 className="text-2xl font-semibold mb-2">Chat with Data</h1>
        <p className="text-sm text-muted-foreground">
          Ask questions about your invoice data in natural language
        </p>
      </div>
      <div className="flex-1 overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
