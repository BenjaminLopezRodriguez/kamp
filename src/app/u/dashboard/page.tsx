"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Home,
  Users,
  DollarSign,
  Wrench,
  TrendingUp,
  Calendar,
  Bell,
  Settings,
  Plus,
  Mail,
} from "lucide-react";
import { EmailTemplateSelector } from "@/components/email-templates/EmailTemplateSelector";
import Link from "next/link";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Dashboard() {
  const { isAuthenticated, user, isLoading } = useKindeBrowserClient();

  // Mock data - replace with actual data from your API
  const stats = [
    { label: "Properties", value: "12", icon: Home, change: "+2 this month", color: "text-blue-600" },
    { label: "Tenants", value: "34", icon: Users, change: "+5 this month", color: "text-green-600" },
    { label: "Revenue", value: "$45.2K", icon: DollarSign, change: "+12%", color: "text-emerald-600" },
    { label: "Maintenance", value: "8", icon: Wrench, change: "3 pending", color: "text-orange-600" },
  ];

  const recentActivities = [
    { type: "payment", message: "Rent payment received from John Doe", time: "2 hours ago", amount: "$1,200" },
    { type: "maintenance", message: "New maintenance request: Leaky faucet", time: "5 hours ago", status: "pending" },
    { type: "tenant", message: "New tenant application received", time: "1 day ago", status: "review" },
    { type: "payment", message: "Rent payment received from Jane Smith", time: "2 days ago", amount: "$1,500" },
  ];

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Welcome to Kamp Dashboard
          </h1>
          <p className="mb-6 text-gray-600">
            Please sign in to access your property management dashboard.
          </p>
          <div className="flex flex-col gap-3">
            <LoginLink>
              <Button className="w-full">Sign In</Button>
            </LoginLink>
            <RegisterLink>
              <Button variant="outline" className="w-full">
                Create Account
              </Button>
            </RegisterLink>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="mx-auto max-w-7xl p-3 sm:p-4 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                Welcome back{user?.given_name ? `, ${user.given_name}` : ""}!
              </h1>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">Here's what's happening with your properties</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <Button variant="outline" size="icon" className="relative h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] sm:text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>
              <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button className="h-9 sm:h-10 text-xs sm:text-sm px-2 sm:px-4">
                <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Add Property</span>
                <span className="sm:hidden">Add</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-3 sm:p-4 md:p-6">
        {/* Stats Grid */}
        <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-2 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-3 sm:p-4 md:p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between sm:flex-col sm:items-start">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                      <p className="mt-1 sm:mt-2 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">{stat.change}</p>
                    </div>
                    <div className={`rounded-full bg-gray-100 p-2 sm:p-3 flex-shrink-0 ${stat.color}`}>
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Recent Activity</h2>
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm">
                  View All
                </Button>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-2 sm:gap-4 border-b pb-3 sm:pb-4 last:border-0 last:pb-0"
                  >
                    <div className="rounded-full bg-blue-100 p-1.5 sm:p-2 flex-shrink-0">
                      {activity.type === "payment" && (
                        <DollarSign className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                      )}
                      {activity.type === "maintenance" && (
                        <Wrench className="h-3 w-3 sm:h-4 sm:w-4 text-orange-600" />
                      )}
                      {activity.type === "tenant" && (
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2">{activity.message}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-xs text-gray-500">{activity.time}</span>
                        {activity.amount && (
                          <Badge variant="outline" className="text-[10px] sm:text-xs">
                            {activity.amount}
                          </Badge>
                        )}
                        {activity.status && (
                          <Badge
                            variant="outline"
                            className={`text-[10px] sm:text-xs ${
                              activity.status === "pending"
                                ? "border-orange-500 text-orange-600"
                                : "border-blue-500 text-blue-600"
                            }`}
                          >
                            {activity.status}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>

          {/* Quick Actions & Overview */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card className="p-4 sm:p-6">
              <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-gray-900">Quick Actions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:space-y-2">
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10" asChild>
                  <Link href="/u/dashboard?action=add-tenant">
                    <Users className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Add Tenant</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10" asChild>
                  <Link href="/u/dashboard?action=maintenance">
                    <Wrench className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Maintenance</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10" asChild>
                  <Link href="/u/dashboard?action=payment">
                    <DollarSign className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Payment</span>
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9 sm:h-10" asChild>
                  <Link href="/u/dashboard?action=property">
                    <Home className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Property</span>
                  </Link>
                </Button>
                <div className="col-span-2 sm:col-span-1">
                  <EmailTemplateSelector
                    onSend={(template, subject, body) => {
                      console.log("Sending email:", { template: template.name, subject, body });
                      // TODO: Integrate with your email service
                      alert(`Email would be sent:\n\nSubject: ${subject}\n\nBody: ${body.substring(0, 100)}...`);
                    }}
                  />
                </div>
              </div>
            </Card>

            {/* Performance Overview */}
            <Card className="p-4 sm:p-6">
              <h2 className="mb-3 sm:mb-4 text-lg sm:text-xl font-semibold text-gray-900">Performance</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Occupancy Rate</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">94%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[94%] bg-green-500"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Revenue Growth</span>
                  <span className="flex items-center text-base sm:text-lg font-semibold text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                    +12%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm text-gray-600">Avg. Response Time</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-900">2.4 hrs</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
