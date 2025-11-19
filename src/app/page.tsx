"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Home, 
  Camera, 
  ClipboardCheck, 
  Eye, 
  Mail, 
  Sparkles,
  ArrowRight,
  Building2,
  Users
} from "lucide-react";
import HelpBox from "./_components/HelpBox";
import { MobileNav } from "@/components/custom/MobileNav";
import Link from "next/link";

const features = [
  {
    icon: Camera,
    title: "Room Tours",
    description: "Schedule virtual or in-person property tours with automated email reminders",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50"
  },
  {
    icon: ClipboardCheck,
    title: "Inspections",
    description: "Streamline property inspections with digital checklists and reports",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Eye,
    title: "Peer Preview",
    description: "Get feedback from other landlords before finalizing decisions",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50"
  },
  {
    icon: Mail,
    title: "Smart Templates",
    description: "Pre-built email templates for every tenant interaction",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50"
  },
];

const RentalPlatform = () => {
  return (
    <section className="pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 mb-6"
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">
              Modern Property Management
            </span>
          </motion.div>

          <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent leading-tight">
            Making renting
            <br />
            stress-free & fun
          </h1>
          
          <p className="mb-8 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            All-in-one platform for landlords and tenants. Schedule tours, manage inspections, and communicate seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/getstarted">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all group w-full sm:w-auto"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-accent w-full sm:w-auto"
              onClick={() => window.open("sms:+15551234567?body=Hi%2C%20I%27d%20like%20to%20learn%20more")}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => window.open("sms:+15551234567?body=Hi%2C%20I%27m%20interested%20in%20renting%20a%20place")}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <Home className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">I'm Renting</h3>
              <p className="text-purple-100">Find your perfect place</p>
              <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => window.open("sms:+15551234567?body=Hi%2C%20I%27m%20interested%20in%20finding%20tenants")}
          >
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-8 text-white shadow-lg hover:shadow-2xl transition-all">
              <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
              <Building2 className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-2">I'm Leasing</h3>
              <p className="text-blue-100">Find great tenants</p>
              <ArrowRight className="absolute bottom-6 right-6 h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20 md:pb-0">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 border-b border-border/40">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              kamp
            </h1>
            <span className="hidden text-xs text-muted-foreground sm:block">
              property
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex gap-2"
          >
            <Button variant="ghost" className="hover:bg-accent">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
              Get Started
            </Button>
          </motion.div>
        </div>
      </nav>

      <RentalPlatform />

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Everything you need
            </h2>
            <p className="text-muted-foreground text-lg">
              Powerful tools designed for modern property management
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <div className="h-full rounded-2xl bg-card border border-border p-6 shadow-sm hover:shadow-lg transition-all">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 p-12 text-center text-white shadow-2xl">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            <div className="relative z-10">
              <Users className="h-16 w-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to simplify your property management?
              </h2>
              <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of landlords and tenants who trust Kamp for their rental needs.
              </p>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <HelpBox />

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="mx-auto flex max-w-6xl flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} Kamp. All rights reserved.</span>
          <div className="flex gap-6">
            <Button variant="ghost" size="sm" className="hover:text-foreground">
              Privacy
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-foreground">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="hover:text-foreground">
              Contact
            </Button>
          </div>
        </div>
      </footer>

      <MobileNav />
    </div>
  );
}
