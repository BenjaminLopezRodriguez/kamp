"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function HelpBox() {
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSend = () => {
    if (message.trim()) {
      setOpen(true);
      // Here you'll send to GPT API, then set chat state
    }
  };

  return (
    <>
      {/* Floating Help Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed right-6 bottom-6 z-50 flex w-[320px] items-center rounded-full border-2 border-purple-200 bg-white p-2 shadow-xl hover:shadow-2xl transition-shadow"
      >
        <Sparkles className="ml-3 h-5 w-5 text-purple-500" />
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Need help? Ask us anything..."
          className="flex-1 border-none shadow-none ring-0 outline-none focus:ring-0 focus:outline-none focus-visible:ring-transparent"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSend();
            }
          }}
        />
        <Button
          onClick={handleSend}
          className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          size="icon"
        >
          <ArrowRight className="text-white" />
        </Button>
      </motion.div>

      {/* Chat Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col sm:w-[400px]"
        >
          <SheetHeader>
            <SheetTitle>Chat with us</SheetTitle>
            <SheetDescription>
              We’re here to help. Ask us anything about Kamp.
            </SheetDescription>
          </SheetHeader>

          {/* Example chat area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {/* Example user message */}
            <div className="max-w-[80%] self-end rounded-lg bg-blue-50 p-3">
              {message}
            </div>
            {/* Here you'd map through GPT responses */}
          </div>

          {/* Input area inside sheet */}
          <div className="flex gap-2 border-t p-2">
            <Input placeholder="Type your message…" className="flex-1" />
            <Button className="bg-blue-500">
              <ArrowRight className="text-white" />
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
