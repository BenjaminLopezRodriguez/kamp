"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Home,
  Users,
  CheckCircle,
  ArrowRight,
  Building2,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

type UserType = "tenant" | "landlord" | null;

function GetStartedContent() {
  const searchParams = useSearchParams();
  const { isAuthenticated } = useKindeBrowserClient();
  const [userType, setUserType] = useState<UserType>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const type = searchParams.get("type") as UserType;
    if (type === "tenant" || type === "landlord") {
      setUserType(type);
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", { userType, ...formData });
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      {/* Header */}
      <header className="border-b border-white/10 bg-blue-600/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-1 text-white">
            <h1 className="text-2xl font-bold">kamp</h1>
            <span className="hidden text-xs text-white/80 sm:block">
              property
            </span>
          </Link>
          {isAuthenticated ? (
            <Link href="/u/dashboard">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <LoginLink>
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Sign In
              </Button>
            </LoginLink>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        {/* Progress Steps */}
        <div className="mb-12 flex items-center justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  step >= s
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-400"
                }`}
              >
                {step > s ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">{s}</span>
                )}
              </div>
              {s < 3 && (
                <div
                  className={`h-1 w-16 transition-all ${
                    step > s ? "bg-blue-600" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Choose User Type */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold text-white">
              Welcome to Kamp
            </h1>
            <p className="mb-12 text-xl text-gray-200">
              Let's get you started. Are you a tenant or a landlord?
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`cursor-pointer p-8 transition-all ${
                    userType === "tenant"
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => {
                    setUserType("tenant");
                    setStep(2);
                  }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-blue-100 p-4">
                      <UserCheck className="h-12 w-12 text-blue-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                    I'm Renting
                  </h3>
                  <p className="text-gray-600">
                    Find your perfect place, manage your lease, and connect
                    with your landlord easily.
                  </p>
                  <Button className="mt-6 w-full" variant="outline">
                    Get Started as Tenant
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  className={`cursor-pointer p-8 transition-all ${
                    userType === "landlord"
                      ? "border-blue-600 bg-blue-50 shadow-lg"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => {
                    setUserType("landlord");
                    setStep(2);
                  }}
                >
                  <div className="mb-4 flex justify-center">
                    <div className="rounded-full bg-green-100 p-4">
                      <Building2 className="h-12 w-12 text-green-600" />
                    </div>
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-gray-900">
                    I'm Leasing
                  </h3>
                  <p className="text-gray-600">
                    Manage your properties, tenants, and payments all in one
                    place.
                  </p>
                  <Button className="mt-6 w-full" variant="outline">
                    Get Started as Landlord
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Step 2: Contact Form */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-8">
              <h2 className="mb-2 text-3xl font-bold text-gray-900">
                Tell us about yourself
              </h2>
              <p className="mb-8 text-gray-600">
                We'll help you get started with{" "}
                {userType === "tenant" ? "finding a place" : "managing your properties"}
                .
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message">
                    {userType === "tenant"
                      ? "What are you looking for?"
                      : "Tell us about your properties"}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={
                      userType === "tenant"
                        ? "I'm looking for a 2-bedroom apartment in downtown..."
                        : "I manage 5 properties and would like to..."
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-12">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="h-16 w-16 text-green-600" />
                </div>
              </div>
              <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Thank you for getting started!
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                We've received your information and will contact you shortly.
                In the meantime, create an account to access your dashboard.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <RegisterLink>
                  <Button size="lg" className="w-full sm:w-auto">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RegisterLink>
                <Link href="/">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      <header className="border-b border-white/10 bg-blue-600/40 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
          <Link href="/" className="flex items-center gap-1 text-white">
            <h1 className="text-2xl font-bold">kamp</h1>
            <span className="hidden text-xs text-white/80 sm:block">
              property
            </span>
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-4xl items-center justify-center px-4 py-12">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent mx-auto"></div>
          <p className="text-white">Loading...</p>
        </div>
      </main>
    </div>
  );
}

export default function GetStarted() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <GetStartedContent />
    </Suspense>
  );
}
