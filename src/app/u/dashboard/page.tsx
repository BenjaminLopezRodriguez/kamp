import Link from "next/link";
import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  ChevronRight,
  Users,
  HeartPulse,
  Handshake,
  ChevronDown,
  Mail,
} from "lucide-react";
import AuthButtons, { ClientWrapper } from "@/app/_components/AuthButton";
import { Navbar } from "@/app/_components/NavBar";

export default async function Home() {
  const navItems = [
    { name: "Properties", href: "/", icon: Users },
    { name: "Tenants", href: "/about", icon: Users },
    { name: "Maintenance", href: "/blog", icon: HeartPulse },
    { name: "Financials", href: "/contact", icon: Handshake },
  ];

  const metrics = [
    {
      title: "Portfolio Value",
      value: "$4.2M",
      change: "+12%",
      progress: 72,
      icon: Users,
    },
    {
      title: "Occupancy Rate",
      value: "94%",
      change: "+3%",
      progress: 94,
      icon: Users,
    },
    {
      title: "Avg. Rent",
      value: "$2,150",
      change: "+5%",
      progress: 82,
      icon: Handshake,
    },
  ];

  const activities = [
    {
      title: "Lease Signed",
      description: "Property #24 - 12 month lease",
      time: "2 hours ago",
      icon: Users,
    },
    {
      title: "Maintenance Completed",
      description: "Property #15 - HVAC repair",
      time: "5 hours ago",
      icon: HeartPulse,
    },
    {
      title: "Payment Received",
      description: "Property #8 - $3,200",
      time: "1 day ago",
      icon: Handshake,
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 via-purple-100 to-yellow-50 text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-purple-200 bg-purple-50/80 backdrop-blur-md">
        <Navbar />
      </header>

      {/* Main Content */}
      <div className="container mx-auto w-full space-y-10 px-8 py-12">
        {/* Metrics */}
        <Card
          className={
            "grid grid-cols-1 gap-0 md:grid-cols-3 " +
            "rounded-3xl border-none bg-purple-100 shadow-md transition hover:shadow-lg"
          }
        >
          {metrics.map((metric, index) => (
            <Card
              key={index}
              className="border-none bg-transparent shadow-none transition"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-purple-900">
                    {metric.title}
                  </CardTitle>
                  <metric.icon className="h-5 w-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2">
                  <p className="text-3xl font-bold text-purple-900">
                    {metric.value}
                  </p>
                  <Badge className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-purple-800">
                    {metric.change}
                  </Badge>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-yellow-100">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Properties */}
          <Card className="rounded-3xl border-none bg-white shadow-sm lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-purple-900">
                  Property Portfolio
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[1, 2, 3].map((property) => (
                  <div
                    key={property}
                    className="flex items-start gap-4 rounded-2xl bg-purple-50 p-4 transition hover:shadow-md"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100">
                      <Users className="h-7 w-7 text-purple-700" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">
                        Property #{property}
                      </h4>
                      <p className="mt-1 text-sm text-purple-600">
                        123 Main St, Unit {property}
                      </p>
                      <div className="mt-2 flex gap-2">
                        <Badge className="rounded-full bg-purple-100 text-purple-800">
                          Occupied
                        </Badge>
                        <Badge className="rounded-full bg-purple-100 text-purple-800">
                          $2,400/mo
                        </Badge>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-purple-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-3xl border-none bg-white shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-purple-900">
                  Recent Activity
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full border-purple-200 text-purple-700 hover:bg-purple-50"
                >
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="rounded-xl bg-yellow-100 p-3 text-purple-700">
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-purple-900">
                      {activity.title}
                    </h4>
                    <p className="mt-1 text-sm text-purple-600">
                      {activity.description}
                    </p>
                    <p className="mt-2 text-xs text-purple-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="border-t border-purple-100">
              <Button
                variant="ghost"
                className="w-full rounded-full text-purple-700 hover:bg-purple-50"
              >
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
