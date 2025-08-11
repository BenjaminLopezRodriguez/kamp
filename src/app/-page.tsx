"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  HomeIcon,
  Users,
  HeartPulse,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  const { isAuthenticated } = useKindeAuth();

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
    <main className="mx-auto min-h-screen max-w-7xl bg-white px-6 font-sans text-gray-900 antialiased md:px-12">
      {/* Hero */}
      <section className="flex flex-col-reverse items-center gap-12 pt-24 pb-32 md:flex-row">
        <div className="max-w-xl space-y-8">
          <h1 className="text-5xl leading-tight font-extrabold tracking-tight md:text-6xl">
            Property Management
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Without the Hassle
            </span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-600">
            Professional-grade tools that simplify your operations and maximize
            returns.
          </p>
          <div className="flex gap-4 pt-4">
            <Button
              asChild
              className="transform rounded-full bg-gray-900 px-8 py-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800"
            >
              <Link href="/u/dashboard">Get Started</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-gray-300 px-8 py-6 text-gray-700 transition-all duration-300 hover:bg-gray-50"
            >
              <Link href="#features">See How It Works</Link>
            </Button>

            {isAuthenticated ? (
              <Button
                asChild
                variant="outline"
                className="rounded-full border-gray-300 px-8 py-6 text-gray-700 transition-all duration-300 hover:bg-gray-50"
              >
                <LogoutLink>Sign out</LogoutLink>
              </Button>
            ) : (
              <>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-gray-300 px-8 py-6 text-gray-700 transition-all duration-300 hover:bg-gray-50"
                >
                  <LoginLink>Sign in</LoginLink>
                </Button>
                <Button
                  asChild
                  className="transform rounded-full bg-blue-600 px-8 py-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-700"
                >
                  <RegisterLink>Sign up</RegisterLink>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="relative w-full md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=900&auto=format&fit=crop"
            alt="Modern property management"
            className="w-full rounded-2xl object-cover shadow-2xl"
            loading="eager"
          />
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-4 shadow-lg md:block">
            <div className="text-sm font-medium text-gray-500">
              Current Users
            </div>
            <div className="text-2xl font-bold text-gray-900">12,500+</div>
          </div>
        </div>
      </section>

      {/* Rest of your existing code remains the same */}
      {/* Value Proposition */}
      <section className="mx-auto my-24 max-w-6xl rounded-3xl bg-gray-50 p-12">
        {/* ... existing value prop content ... */}
      </section>

      {/* ROI Calculator */}
      <section className="mx-auto my-24 max-w-4xl rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-12 text-white">
        {/* ... existing ROI calculator content ... */}
      </section>

      {/* Features */}
      <section id="features" className="my-32">
        {/* ... existing features content ... */}
      </section>

      {/* CTA */}
      <section className="relative my-32 overflow-hidden rounded-3xl">
        {/* ... existing CTA content ... */}
      </section>
    </main>
  );
}
