"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpSquare, MoveUpRight } from "lucide-react";
import HelpBox from "./_components/HelpBox";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      {/* Ultra-minimal Navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1"
          >
            <h1 className="text-2xl font-bold text-white">kamp</h1>
            <span className="mt-1 ml-1 hidden text-xs text-white/80 sm:block">
              property
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2"
          >
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Login
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-white/90">
              Get Started
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-1 pt-32 pb-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
        >
          <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
            Modern property management
            <br />
            <span className="text-blue-600">without the hassle</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            Streamline your rental business with our all-in-one platform.
          </p>

          <div className="flex gap-4">
            <Button
              className="h-12 rounded-xl bg-blue-600 px-6 text-lg text-white hover:bg-blue-700"
          
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-gray-300 px-6 text-lg text-gray-700"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-1 py-20">
        <div className="mx-auto max-w-6xl ">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            Simple. Powerful. Effective.
          </motion.h2>

          <div className="grid grid-cols-2 gap-1 divide-y divide-slate-200 rounded-2xl md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-slate-200 md:bg-white md:p-2 mx-auto">
            {[
              {
                title: "Tenant Management",
                description:
                  "Everything you need to manage tenants in one place.",
              },
              {
                title: "Maintenance",
                description: "Track and resolve maintenance issues easily.",
              },
              {
                title: "Payments",
                description: "Automated rent collection and reporting.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-4 md:rounded-none"
              >
                <div className="flex flex-row">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <div className="relative z-10 ml-auto h-fit w-fit rounded-full bg-slate-300/50 p-2">
                    <MoveUpRight width={15} height={15} />
                  </div>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  

      <HelpBox/>
      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} Kamp. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Privacy
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Terms
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
