"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HomeIcon, Users, HeartPulse, Handshake, ArrowRight } from "lucide-react";

export default function Home() {
  const features = [
    {
      name: "Smart Portfolio",
      desc: "Track properties, leases & occupancy — all in one place.",
      icon: HomeIcon,
      img: "https://images.unsplash.com/photo-1560520031-3a4dc4e9de0c?q=80&w=900&auto=format&fit=crop",
    },
    {
      name: "Tenant Management",
      desc: "Manage communication, leases & renewals effortlessly.",
      icon: Users,
      img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=900&auto=format&fit=crop",
    },
    {
      name: "Maintenance",
      desc: "Log & fix requests fast with full transparency.",
      icon: HeartPulse,
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop",
    },
    {
      name: "Financial Insights",
      desc: "Clear reports that boost your property's value.",
      icon: Handshake,
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=900&auto=format&fit=crop",
    },
  ];

  const [occupancy, setOccupancy] = useState(85);
  const roi = 1000 + occupancy * 50;

  return (
    <main className="min-h-screen bg-white font-sans text-gray-900 antialiased max-w-7xl mx-auto px-6 md:px-12">
      {/* Hero */}
      <section className="flex flex-col-reverse md:flex-row items-center gap-12 pt-24 pb-32">
        <div className="max-w-xl space-y-8">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Property Management<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Without the Hassle
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Professional-grade tools that simplify your operations and maximize returns.
          </p>
          <div className="flex gap-4 pt-4">
            <Button asChild className="rounded-full bg-gray-900 px-8 py-6 text-white hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg">
              <Link href="/u/dashboard">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full border-gray-300 px-8 py-6 text-gray-700 hover:bg-gray-50 transition-all duration-300">
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>
        </div>
        <div className="relative w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=900&auto=format&fit=crop"
            alt="Modern property management"
            className="rounded-2xl shadow-2xl w-full object-cover"
            loading="eager"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg hidden md:block">
            <div className="text-sm font-medium text-gray-500">Current Users</div>
            <div className="text-2xl font-bold text-gray-900">12,500+</div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-gray-50 rounded-3xl p-12 my-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Increase Revenue</h3>
            <p className="text-gray-600">Optimize pricing and reduce vacancies with real-time market data.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Reduce Risk</h3>
            <p className="text-gray-600">Automated compliance and screening protects your investments.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold">Save Time</h3>
            <p className="text-gray-600">Automate repetitive tasks and focus on growing your portfolio.</p>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-12 my-24 max-w-4xl mx-auto text-white">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Calculate Your Potential Earnings</h2>
          <p className="text-blue-100 max-w-lg mx-auto">See how increasing occupancy impacts your bottom line</p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Occupancy Rate</span>
              <span className="font-bold">{occupancy}%</span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              value={occupancy}
              onChange={e => setOccupancy(Number(e.target.value))}
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-white"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/20 p-6 rounded-xl">
              <div className="text-sm font-medium text-blue-100">Estimated Monthly ROI</div>
              <div className="text-4xl font-bold mt-2">${roi.toLocaleString()}</div>
            </div>
            <div className="bg-white/20 p-6 rounded-xl">
              <div className="text-sm font-medium text-blue-100">Annualized Return</div>
              <div className="text-4xl font-bold mt-2">${(roi * 12).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="my-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Succeed</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools designed for modern property managers
          </p>
        </div>
        
        <div className="space-y-24">
          {features.map(({ name, desc, icon: Icon, img }, i) => (
            <div 
              key={name} 
              className={`flex flex-col md:flex-row items-center gap-12 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={img} 
                  alt={name} 
                  className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-video"
                  loading="lazy"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-600 text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold">{name}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{desc}</p>
                <Button variant="link" className="p-0 text-blue-600 hover:text-blue-800 text-lg font-medium">
                  Learn more <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative my-32 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700"></div>
        <div className="relative z-10 max-w-5xl mx-auto py-20 px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Property Management?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of property owners who trust our platform to maximize their returns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-white text-blue-600 px-10 py-6 rounded-full text-lg font-semibold shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-0.5">
              <Link href="/signup">Start Free Trial</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white px-10 py-6 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              <Link href="/demo">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}