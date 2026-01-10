"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveUpRight, Home, Users, Wrench, DollarSign, MessageSquare, Shield, Zap } from "lucide-react";
import HelpBox from "./_components/HelpBox";
import MinimalCard from "@/components/custom/minimalcard";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect, useState } from "react";

const RentalPlatform = () => {
  const router = useRouter();
  const { isAuthenticated } = useKindeBrowserClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="text-foreground pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold md:text-5xl text-white"
        >
          Making renting stress-free
        </motion.h1>
        <p className="mb-12 text-gray-200 md:text-lg">
          Tools and services for tenants and landlords — all in one place.
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 mb-12">
          {[
            { 
              title: "I'm Renting", 
              desc: "Find your perfect home and manage your lease easily", 
              onClick: () => {
                if (mounted && isAuthenticated) {
                  router.push("/properties");
                } else {
                  router.push("/api/auth/login");
                }
              }
            },
            { 
              title: "I'm Leasing", 
              desc: "Manage properties, tenants, and payments all in one place",
              onClick: () => {
                if (mounted && isAuthenticated) {
                  router.push("/u/dashboard");
                } else {
                  router.push("/api/auth/login");
                }
              }
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03 }}
            >
              <MinimalCard title={item.title} onClick={item.onClick}>{item.desc}</MinimalCard>
            </motion.div>
          ))}
        </div>

        {mounted && !isAuthenticated && (
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-white text-blue-600 hover:bg-white/90">
              <RegisterLink>Get Started Free</RegisterLink>
            </Button>
            <Button asChild variant="outline" className="text-white border-white hover:bg-white/10">
              <LoginLink>Sign In</LoginLink>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-blue-600/40 border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1 text-white"
          >
            <h1 className="text-2xl font-bold">kamp</h1>
            <span className="hidden text-xs text-white/80 sm:block">
              property
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2"
          >
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
          </motion.div>
        </div>
      </nav>

      <RentalPlatform />

      {/* Features Section */}
      <section className="px-4 py-20">
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
                title: "Property Management", 
                description: "List, manage, and track all your properties in one place.",
                icon: Home,
                color: "text-blue-500"
              },
              { 
                title: "Maintenance Requests", 
                description: "Track and resolve maintenance issues quickly and efficiently.",
                icon: Wrench,
                color: "text-orange-500"
              },
              { 
                title: "Payment Tracking", 
                description: "Automated rent collection, payment reminders, and financial reporting.",
                icon: DollarSign,
                color: "text-green-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-6 md:rounded-none hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <feature.icon className={`w-8 h-8 ${feature.color} mb-2`} />
                  <div className="rounded-full bg-slate-300/50 p-2">
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
          
          {/* Additional Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { 
                title: "Tenant Applications", 
                description: "Streamlined application process with background checks.",
                icon: Users,
                color: "text-purple-500"
              },
              { 
                title: "Secure Messaging", 
                description: "Direct communication between landlords and tenants.",
                icon: MessageSquare,
                color: "text-indigo-500"
              },
              { 
                title: "Document Storage", 
                description: "Store leases, receipts, and important documents securely.",
                icon: Shield,
                color: "text-teal-500"
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <feature.icon className={`w-8 h-8 ${feature.color} mb-3`} />
                <h3 className="mb-2 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <HelpBox />

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-white/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 text-sm">
          <span>© {new Date().getFullYear()} Kamp. All rights reserved.</span>
          <div className="flex gap-4">
            <Button variant="ghost" className="hover:text-white">
              Privacy
            </Button>
            <Button variant="ghost" className="hover:text-white">
              Terms
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
