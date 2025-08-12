"use client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-slate-100">
      {/* Ultra-minimal Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1"
          >
            <h1 className="text-2xl font-bold text-white">kamp</h1>
            <span className="text-xs text-white/80 mt-1 ml-1 hidden sm:block">
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
      <section className="pt-32 pb-20 px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-sm"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Modern property management<br/>
            <span className="text-blue-600">without the hassle</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl">
            Streamline your rental business with our all-in-one platform.
          </p>
          
          <div className="flex gap-4">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-6 text-lg rounded-xl"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              className="h-12 px-6 text-lg rounded-xl border-gray-300 text-gray-700"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-2">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-center mb-12 text-white"
          >
            Simple. Powerful. Effective.
          </motion.h2>
          
          <div className="grid md:grid-cols-3  grid-cols-2 gap-2">
            {[
              {
                title: "Tenant Management",
                description: "Everything you need to manage tenants in one place.",
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
                className="bg-white p-4 rounded-2xl"
              >
                <div className="flex flex-row">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <div className="bg-slate-300/50 h-fit w-fit p-2 rounded-full ml-auto relative z-10"><MoveUpRight width={15} height={15}/></div>

                </div>
            
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bg-white p-8 rounded-3xl text-center"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
            Join hundreds of property managers using Kamp today.
          </p>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-lg rounded-xl"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Start Free Trial
          </Button>
        </motion.div>
      </section>

      {/* Minimal Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="text-white/80 text-sm">
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