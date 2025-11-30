"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import HelpBox from "./_components/HelpBox";
import MinimalCard from "@/components/custom/minimalcard";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

const RentalPlatform = () => {
  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="text-foreground pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold text-white md:text-5xl"
        >
          Making renting stress-free
        </motion.h1>
        <p className="mb-12 text-gray-200 md:text-lg">
          Tools and services for tenants and landlords — all in one place.
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { 
              title: "I'm Renting", 
              desc: "Talk to us about finding a place", 
              onClick: () => window.open("sms:+15551234567?body=Hi%2C%20I%27m%20interested%20in%20renting%20a%20place"),
              href: "/getstarted?type=tenant"
            },
            { 
              title: "I'm Leasing", 
              desc: "We'll help you find great tenants" ,
              onClick: () => window.open("sms:+15551234567?body=Hi%2C%20I%27m%20interested%20in%finding%20a%20tennant"),
              href: "/getstarted?type=landlord"
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <MinimalCard title={item.title} onClick={item.onClick} href={item.href}>
                {item.desc}
              </MinimalCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useKindeBrowserClient();

  const handleScrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    // Smooth scroll behavior for anchor links
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-blue-600/40 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-1 text-white">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-2xl font-bold">kamp</h1>
              <span className="hidden text-xs text-white/80 sm:block">
                property
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center gap-4"
          >
            <button
              onClick={handleScrollToFeatures}
              className="text-white/90 hover:text-white transition-colors text-sm"
            >
              Features
            </button>
            {isAuthenticated ? (
              <Link href="/u/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/10">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <LoginLink>
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Login
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button className="bg-white text-blue-600 hover:bg-white/90">
                    Get Started
                  </Button>
                </RegisterLink>
              </>
            )}
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-white/10 bg-blue-600/95 backdrop-blur-sm"
          >
            <div className="flex flex-col p-4 gap-3">
              <button
                onClick={handleScrollToFeatures}
                className="text-white/90 hover:text-white transition-colors text-left py-2"
              >
                Features
              </button>
              {isAuthenticated ? (
                <Link href="/u/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="text-white hover:bg-white/10 w-full justify-start">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <LoginLink>
                    <Button variant="ghost" className="text-white hover:bg-white/10 w-full justify-start">
                      Login
                    </Button>
                  </LoginLink>
                  <RegisterLink>
                    <Button className="bg-white text-blue-600 hover:bg-white/90 w-full">
                      Get Started
                    </Button>
                  </RegisterLink>
                </>
              )}
            </div>
          </motion.div>
        )}
      </nav>

      <RentalPlatform />

      {/* Features Section */}
      <section id="features" className="px-4 py-20 scroll-mt-20">
        <div className="mx-auto max-w-6xl">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            Simple. Powerful. Effective.
          </motion.h2>

          <div className="mx-auto grid gap-1 divide-y divide-slate-200 rounded-2xl md:grid-cols-3 md:divide-x md:divide-y-0 md:bg-white/90 md:backdrop-blur-sm md:p-2">
            {[
              { 
                title: "Tenant Management", 
                description: "Everything you need to manage tenants in one place.",
                icon: "👥"
              },
              { 
                title: "Maintenance", 
                description: "Track and resolve maintenance issues easily.",
                icon: "🔧"
              },
              { 
                title: "Payments", 
                description: "Automated rent collection and reporting.",
                icon: "💳"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="rounded-2xl bg-white p-6 md:rounded-none cursor-pointer transition-shadow hover:shadow-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl mb-2">{feature.icon}</div>
                  <div className="ml-auto rounded-full bg-slate-300/50 p-2">
                    <MoveUpRight width={15} height={15} />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HelpBox />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-white/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 text-sm md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Kamp. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/getstarted" className="hover:text-white transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
