"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import HelpBox from "./_components/HelpBox";
import MinimalCard from "@/components/custom/minimalcard";

const RentalPlatform = () => {
  return (
    <section className="text-foreground pt-32 pb-20">
      <div className="container mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-3xl font-bold md:text-5xl"
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
              onClick: () => window.open("sms:+15551234567?body=Hi%2C%20I%27m%20interested%20in%20renting%20a%20place") 
            },
            { 
              title: "I'm Leasing", 
              desc: "We'll help you find great tenants" ,
              onClick: () => window.open("sms:+15551234567?body=Hi%2C%20I%27m%20interested%20in%finding%20a%20tennant") 

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
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Login
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-white/90">
              Get Started
            </Button>
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
              { title: "Tenant Management", description: "Everything you need to manage tenants in one place." },
              { title: "Maintenance", description: "Track and resolve maintenance issues easily." },
              { title: "Payments", description: "Automated rent collection and reporting." },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-4 md:rounded-none"
              >
                <div className="flex items-center">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <div className="ml-auto rounded-full bg-slate-300/50 p-2">
                    <MoveUpRight width={15} height={15} />
                  </div>
                </div>
                <p className="text-gray-600">{feature.description}</p>
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
