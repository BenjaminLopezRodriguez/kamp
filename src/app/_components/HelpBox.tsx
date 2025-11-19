"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

interface Message {
  id: string;
  text: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

export default function HelpBox() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm here to help. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const handleSend = async () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmedMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);
    setOpen(true);

    // Simulate API call (replace with actual API integration)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks for your message: "${trimmedMessage}". Our team will get back to you soon! In the meantime, feel free to explore our features or check out our help center.`,
        sender: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Help Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="fixed right-6 bottom-6 z-50"
      >
        {!open && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 rounded-full border border-slate-300 bg-white p-3 shadow-lg transition-all hover:shadow-xl"
          >
            <Input
              ref={inputRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Get in touch, ask, get help…"
              className="w-[250px] border-none shadow-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-transparent sm:w-[300px]"
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              className="rounded-full bg-blue-500 hover:bg-blue-600"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <ArrowRight className="text-white" />
              )}
            </Button>
          </motion.div>
        )}

        {!open && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl"
            aria-label="Open help chat"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">Need Help?</span>
          </motion.button>
        )}
      </motion.div>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col sm:w-[400px]"
        >
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat with us
            </SheetTitle>
            <SheetDescription>
              We're here to help. Ask us anything about Kamp.
            </SheetDescription>
          </SheetHeader>

          {/* Chat area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <span
                      className={`mt-1 block text-xs ${
                        msg.sender === "user"
                          ? "text-blue-100"
                          : "text-gray-500"
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="rounded-lg bg-gray-100 p-3">
                  <Loader2 className="h-4 w-4 animate-spin text-gray-600" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex gap-2 border-t p-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message…"
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!message.trim() || isLoading}
              className="bg-blue-500 hover:bg-blue-600"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <ArrowRight className="text-white" />
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
