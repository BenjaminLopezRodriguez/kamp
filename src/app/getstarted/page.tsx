"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Home, User, ArrowRight } from "lucide-react";
import { api } from "@/trpc/react";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export default function GetStartedPage() {
  const router = useRouter();
  const { isAuthenticated, getUser } = useKindeAuth();
  const user = getUser();
  const [selectedRole, setSelectedRole] = useState<"landlord" | "tenant" | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateUser = api.user.update.useMutation();
  const getOrCreateUser = api.user.getOrCreate.useQuery(undefined, {
    enabled: isAuthenticated ?? false,
  });

  const handleRoleSelect = async (role: "landlord" | "tenant") => {
    if (!isAuthenticated || !user?.id) {
      router.push("/api/auth/login");
      return;
    }

    setSelectedRole(role);
    setIsSubmitting(true);

    try {
      await updateUser.mutateAsync({ role });
      router.push("/u/dashboard");
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-slate-100">
        <Card className="p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Welcome to Kamp</h1>
          <p className="text-center text-gray-600 mb-6">
            Please sign in to continue
          </p>
          <Button
            onClick={() => router.push("/api/auth/login")}
            className="w-full"
          >
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  // If user already has a role, redirect to dashboard
  if (getOrCreateUser.data?.role && getOrCreateUser.data.role !== "tenant") {
    router.push("/u/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full"
      >
        <Card className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Welcome to Kamp!
            </h1>
            <p className="text-gray-600 text-lg">
              Let's get you started. Are you a landlord or a tenant?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  selectedRole === "landlord"
                    ? "border-blue-500 border-2 bg-blue-50"
                    : "hover:border-blue-300"
                }`}
                onClick={() => handleRoleSelect("landlord")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-blue-100 p-4 mb-4">
                    <Home className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">I'm a Landlord</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Manage properties, tenants, and payments all in one place
                  </p>
                  <ul className="text-left text-sm text-gray-500 space-y-1">
                    <li>• List and manage properties</li>
                    <li>• Track rent payments</li>
                    <li>• Handle maintenance requests</li>
                    <li>• Communicate with tenants</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  selectedRole === "tenant"
                    ? "border-blue-500 border-2 bg-blue-50"
                    : "hover:border-blue-300"
                }`}
                onClick={() => handleRoleSelect("tenant")}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="rounded-full bg-green-100 p-4 mb-4">
                    <User className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">I'm a Tenant</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Find your perfect home and manage your lease easily
                  </p>
                  <ul className="text-left text-sm text-gray-500 space-y-1">
                    <li>• Browse available properties</li>
                    <li>• Submit maintenance requests</li>
                    <li>• Pay rent online</li>
                    <li>• Message your landlord</li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </div>

          {isSubmitting && (
            <div className="text-center">
              <p className="text-gray-600">Setting up your account...</p>
            </div>
          )}

          <div className="text-center">
            <Button
              variant="ghost"
              onClick={() => router.push("/")}
              className="text-gray-600"
            >
              Go back
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
