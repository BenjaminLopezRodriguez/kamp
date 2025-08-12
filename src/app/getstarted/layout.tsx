"use client";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import type { ReactNode } from "react";
import { useState } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: "Step One", description: "Basic Information" },
    { id: 2, name: "Step Two", description: "Details" },
    { id: 3, name: "Step Three", description: "Confirmation" },
    { id: 4, name: "Step Four", description: "Completion" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col gap-4 bg-gradient-to-b from-blue-300 to-slate-50 p-4 md:flex-row">
      {/* Mobile Nav Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 rounded-lg bg-white p-2 shadow-md md:hidden"
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        {mobileNavOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </button>

      {/* SIDENAV */}
      <aside
        className={`${mobileNavOpen ? "block" : "hidden"} fixed z-40 h-[calc(100vh-2rem)] w-full rounded-3xl border border-slate-500/50 bg-white p-6 shadow-lg md:static md:block md:h-auto md:w-64`}
      >
        <h2 className="mb-6 text-xl font-bold text-blue-600">Progress</h2>
        <ul className="space-y-4">
          {steps.map((step) => (
            <li key={step.id}>
              <button
                className={`w-full rounded-xl p-3 text-left transition-all ${currentStep === step.id ? "border border-blue-200 bg-blue-50" : "hover:bg-gray-50"}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div
                  className={`flex items-center gap-3 ${currentStep === step.id ? "text-blue-600" : "text-gray-600"}`}
                >
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${currentStep === step.id ? "bg-blue-600 text-white" : "bg-gray-200"}`}
                  >
                    {step.id}
                  </div>
                  <div>
                    <p className="font-medium">{step.name}</p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        <div className="mb-4 flex-1 overflow-y-auto rounded-3xl border border-slate-500/50 bg-white p-6 shadow-lg">
          {children}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4 rounded-3xl border border-slate-500/50 bg-white p-4 shadow-lg">
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-2xl border border-slate-500/50 bg-white px-6 py-6 text-lg text-gray-800 transition-all hover:bg-gray-50"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          >
            <ChevronLeft className="h-6 w-6" />
            Back
          </Button>

          <Button
            variant="outline"
            className="ml-auto flex items-center gap-2 rounded-2xl border border-slate-500/50 bg-white px-6 py-6 text-lg text-gray-800 transition-all hover:bg-gray-50"
            onClick={() =>
              setCurrentStep(Math.min(steps.length, currentStep + 1))
            }
          >
            Next
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
