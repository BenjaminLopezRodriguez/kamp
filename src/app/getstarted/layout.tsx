"use client"
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, name: 'Step One', description: 'Basic Information' },
    { id: 2, name: 'Step Two', description: 'Details' },
    { id: 3, name: 'Step Three', description: 'Confirmation' },
    { id: 4, name: 'Step Four', description: 'Completion' },
  ];

  return (
    <div className='flex flex-col md:flex-row w-full min-h-screen bg-gradient-to-b from-blue-300 to-slate-50 p-4 gap-4'>
      {/* Mobile Nav Toggle Button */}
      <button 
        className='md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md'
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        {mobileNavOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* SIDENAV */}
      <aside className={`${mobileNavOpen ? 'block' : 'hidden'} md:block w-full md:w-64 bg-white rounded-3xl border border-slate-500/50 p-6 shadow-lg fixed md:static h-[calc(100vh-2rem)] md:h-auto z-40`}>
        <h2 className='text-xl font-bold mb-6 text-blue-600'>Progress</h2>
        <ul className='space-y-4'>
          {steps.map((step) => (
            <li key={step.id}>
              <button
                className={`w-full text-left p-3 rounded-xl transition-all ${currentStep === step.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'}`}
                onClick={() => setCurrentStep(step.id)}
              >
                <div className={`flex items-center gap-3 ${currentStep === step.id ? 'text-blue-600' : 'text-gray-600'}`}>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${currentStep === step.id ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                    {step.id}
                  </div>
                  <div>
                    <p className='font-medium'>{step.name}</p>
                    <p className='text-sm text-gray-500'>{step.description}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content Area */}
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 bg-white rounded-3xl border border-slate-500/50 p-6 mb-4 overflow-y-auto shadow-lg'>
          {children}
        </div>
        
        {/* Navigation Buttons */}
        <div className='flex justify-between gap-4 bg-white rounded-3xl border border-slate-500/50 p-4 shadow-lg'>
          <Button 
            variant="outline" 
            className='flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl text-lg px-6 py-6 border border-slate-500/50 transition-all'
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          >
            <ChevronLeft className="h-6 w-6" />
            Back
          </Button>
          
          <Button 
            variant="outline" 
            className='flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 rounded-2xl text-lg px-6 py-6 border border-slate-500/50 transition-all ml-auto'
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          >
            Next
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}