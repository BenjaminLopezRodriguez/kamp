import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  HomeIcon,
  Users,
  HeartPulse,
  Handshake,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      name: "Smart Portfolio",
      desc: "Track your properties, leases, and occupancy in one unified dashboard.",
      icon: HomeIcon,
      img: "https://picsum.photos/seed/portfolio/600/400",
    },
    {
      name: "Tenant Management",
      desc: "Simplify communication, leases, and renewals for every tenant.",
      icon: Users,
      img: "https://picsum.photos/seed/tenants/600/400",
    },
    {
      name: "Maintenance Requests",
      desc: "Quickly log and resolve issues with modern digital tools.",
      icon: HeartPulse,
      img: "https://picsum.photos/seed/maintenance/600/400",
    },
    {
      name: "Financial Insights",
      desc: "Get clear, actionable reports to maximize your property value.",
      icon: Handshake,
      img: "https://picsum.photos/seed/finance/600/400",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 via-yellow-50 to-white text-stone-900">
      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-12 py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h1 className="font-heading text-5xl md:text-7xl font-extrabold text-purple-900 leading-tight tracking-tight">
            Manage Properties <br /> Smarter, Friendlier, Faster
          </h1>
          <p className="mt-6 text-lg text-stone-700 max-w-xl leading-relaxed">
            KAMP is the all‑in‑one property management platform designed to save
            you time and help you grow. Tenants, leases, maintenance, and
            finances — beautifully connected.
          </p>
          <div className="mt-10 flex gap-4 flex-wrap">
            <Button
              asChild
              className="rounded-full bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 text-lg shadow-lg"
            >
              <Link href="/u/dashboard">
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-purple-300 text-purple-800 hover:bg-purple-100 px-8 py-4 text-lg"
            >
              <Link href="#features">See How It Works</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <img
            src="https://picsum.photos/seed/hero/900/700"
            alt="Hero showcase"
            className="object-cover w-full h-full"
          />
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="container mx-auto px-6 md:px-12 py-24 space-y-24"
      >
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`grid md:grid-cols-2 gap-12 items-center ${
              idx % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="rounded-3xl overflow-hidden shadow-md">
              <img
                src={feature.img}
                alt={feature.name}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="p-4 rounded-xl bg-yellow-100 text-purple-700 w-fit mb-6">
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="font-heading text-3xl font-bold text-purple-900">
                {feature.name}
              </h3>
              <p className="text-lg text-stone-700 mt-4 leading-relaxed max-w-xl">
                {feature.desc}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-700 to-purple-800 text-white py-28">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left max-w-xl">
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold leading-tight">
              Ready to simplify property management?
            </h2>
            <p className="mt-6 text-lg text-purple-100 leading-relaxed">
              Join thousands of landlords who trust KAMP to handle their
              portfolios with clarity and confidence.
            </p>
          </div>
          <Button
            asChild
            className="rounded-full bg-yellow-300 text-purple-900 hover:bg-yellow-400 px-10 py-4 text-lg font-semibold shadow-lg"
          >
            <Link href="/signup">Start Free Today</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
