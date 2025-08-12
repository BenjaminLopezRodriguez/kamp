"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-slate-100">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent p-3.5 font-sans">
          <div className="flex  gap-2">
            <div className="ml-auto mr-auto flex flex-col">
            <h1 className="text-2xl font-bold text-primary ml-auto mr-auto">kamp</h1>
            <p className="hidden sm:block text-sm text-muted-foreground">
              Property Management Simplified
            </p>

          </div>
        
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20"> {/* Account for fixed navbar height */}
        {/* Hero Section */}
        <section id="hero" className="py-20 px-2">
          <div className="container mx-auto px-4 flex flex-col items-center text-left bg-white p-16 rounded-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 ml-5">
              Modern property management without <br/> the Hassle
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mb-8 ml-5 mr-20"  >
              Streamline your rental business with our all-in-one platform that
              handles everything from tenant screening to maintenance requests.
            </p>
            <div className="flex gap-4 justify-end content-end w-full">
              <Button size="lg" className=" hover:bg-blue-500/90 active:bg-blue-700 bg-blue-600 font-bold text-xl p-3 py-6 rounded-2xl">
                Get Started
              </Button>
          
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 ">
          <div className="container mx-auto px-2">
            <h2 className="text-3xl font-bold text-center mb-12">
              Powerful Features
            </h2>
            <div className="grid md:grid-cols-3 grid-cols-2  gap-2">
              {[
                {
                  title: "Tenant Management",
                  description:
                    "Screen applicants, sign leases, and communicate with tenants all in one place.",
                },
                {
                  title: "Maintenance Tracking",
                  description:
                    "Receive, assign, and track maintenance requests with ease.",
                },
                {
                  title: "Financial Reporting",
                  description:
                    "Automated rent collection and detailed financial reports.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-3xl "
                >
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Join hundreds of property managers who trust Kamp to simplify
              their operations.
            </p>
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Start Your Free Trial
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <h1 className="text-xl font-bold text-primary">Kamp</h1>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm">
                Privacy Policy
              </Button>
              <Button variant="ghost" size="sm">
                Terms of Service
              </Button>
              <Button variant="ghost" size="sm">
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}