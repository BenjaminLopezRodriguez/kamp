"use client";
import { Button } from "@/components/ui/button";
import { exampleAction, exampleAction2, uploadFile } from "@/server/actions/example/action";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: () => Promise<number>) => {
    setIsLoading(true);
    try {
      const res = await action();
      setResult(res);
      console.log(res);
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const res = await uploadFile(file);
      console.log(res);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
      e.target.value = ""; // Reset input
    }
  };

  return (
    <main className="min-h-screen pt-14"> {/* Account for fixed nav height */}
      <nav className="fixed top-0 left-0 right-0 z-10 h-14 border-b bg-background shadow-sm">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Kamp</h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost">Login</Button>
            <Button variant="outline">Get Started</Button>
            <Button className="bg-primary hover:bg-primary/90">Free 14 day trial</Button>
            
            <div className="ml-4 flex items-center gap-2 border-l pl-4">
              <Button 
                variant="secondary"
                onClick={() => handleAction(exampleAction)}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : `Example ${result}`}
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => handleAction(exampleAction2)}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : `Example 2 ${result}`}
              </Button>
              
              <div className="relative">
                <input 
                  type="file"
                  onChange={handleFileUpload}
                  disabled={isLoading}
                  className="absolute inset-0 h-full w-full opacity-0"
                  id="file-upload"
                />
                <Button 
                  asChild
                  variant="secondary"
                  disabled={isLoading}
                >
                  <label htmlFor="file-upload">
                    {isLoading ? "Uploading..." : "Upload File"}
                  </label>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        {/* Main content would go here */}
      </div>
    </main>
  );
}