import Link from "next/link";
import { HydrateClient } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bell, ChevronRight, Users, HeartPulse, Handshake, ChevronDown, Mail 
} from "lucide-react";

export default async function Home() {
  const navItems = [
    { name: "Properties", href: "/", icon: Users },
    { name: "Tenants", href: "/about", icon: Users },
    { name: "Maintenance", href: "/blog", icon: HeartPulse },
    { name: "Financials", href: "/contact", icon: Handshake },
  ];

  const metrics = [
    { title: "Portfolio Value", value: "$4.2M", change: "+12%", progress: 72, icon: Users },
    { title: "Occupancy Rate", value: "94%", change: "+3%", progress: 94, icon: Users },
    { title: "Avg. Rent", value: "$2,150", change: "+5%", progress: 82, icon: Handshake },
  ];

  const activities = [
    { title: "Lease Signed", description: "Property #24 - 12 month lease", time: "2 hours ago", icon: Users },
    { title: "Maintenance Completed", description: "Property #15 - HVAC repair", time: "5 hours ago", icon: HeartPulse },
    { title: "Payment Received", description: "Property #8 - $3,200", time: "1 day ago", icon: Handshake },
  ];

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col bg-gradient-to-b from-purple-50 via-purple-100 to-yellow-50 text-stone-900">
        {/* Header */}
        <header className="w-full sticky top-0 z-50 bg-purple-50/80 backdrop-blur-md border-b border-purple-200">
          <div className="container mx-auto px-8 py-4 flex items-center justify-between">
            <h1 className="text-3xl font-extrabold tracking-tight text-purple-700">KAMP</h1>

            <nav className="hidden md:flex gap-1 ml-12">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant="ghost"
                  className="px-4 py-2 rounded-full font-medium hover:bg-purple-100 text-purple-700"
                >
                  <Link href={item.href} className="flex items-center gap-2">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {[Mail, Bell].map((Icon, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-purple-100 text-purple-700"
                >
                  <Icon className="w-5 h-5" />
                </Button>
              ))}
              <Button variant="ghost" className="rounded-full hover:bg-purple-100 text-purple-700 gap-2 pl-2.5 pr-3">
                <Avatar className="w-9 h-9 border-2 border-purple-300">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-purple-600 text-white">BL</AvatarFallback>
                </Avatar>
                <span className="text-sm font-semibold">Admin</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-8 py-12 w-full space-y-10">
          {/* Metrics */}
          <Card className={"grid grid-cols-1 md:grid-cols-3 gap-0 " + 
                            "bg-purple-100 rounded-3xl border-none shadow-md hover:shadow-lg transition"

          }>
            {metrics.map((metric, index) => (
              <Card 
                key={index}
                className="bg-transparent shadow-none border-none  transition"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-purple-900">
                      {metric.title}
                    </CardTitle>
                    <metric.icon className="w-5 h-5 text-purple-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-2">
                    <p className="text-3xl font-bold text-purple-900">{metric.value}</p>
                    <Badge className="bg-yellow-100 text-purple-800 rounded-full px-2 py-0.5 text-xs font-medium">
                      {metric.change}
                    </Badge>
                  </div>
                  <div className="mt-4 h-2 bg-yellow-100 rounded-full overflow-hidden">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Properties */}
            <Card className="lg:col-span-2 bg-white rounded-3xl shadow-sm border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-purple-900">Property Portfolio</CardTitle>
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
                      className="flex items-start gap-4 p-4 bg-purple-50 rounded-2xl hover:shadow-md transition"
                    >
                      <div className="w-16 h-16 rounded-2xl bg-yellow-100 flex items-center justify-center">
                        <Users className="w-7 h-7 text-purple-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-purple-900">Property #{property}</h4>
                        <p className="text-sm text-purple-600 mt-1">123 Main St, Unit {property}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge className="bg-purple-100 text-purple-800 rounded-full">Occupied</Badge>
                          <Badge className="bg-purple-100 text-purple-800 rounded-full">$2,400/mo</Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-white rounded-3xl shadow-sm border-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-bold text-purple-900">Recent Activity</CardTitle>
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
                    <div className="p-3 rounded-xl bg-yellow-100 text-purple-700">
                      <activity.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-purple-900">{activity.title}</h4>
                      <p className="text-sm text-purple-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-purple-500 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="border-t border-purple-100">
                <Button variant="ghost" className="text-purple-700 hover:bg-purple-50 w-full rounded-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
