"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Camera, 
  ClipboardCheck, 
  Eye, 
  Mail, 
  Plus,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  Send
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

// Lazy load mobile nav to reduce initial bundle
const MobileNav = dynamic(() => import("@/components/custom/MobileNav"), { ssr: false });

const features = [
  {
    icon: Camera,
    title: "Room Tours",
    description: "Schedule & manage property tours",
    color: "from-purple-500 to-pink-500",
    count: 3,
  },
  {
    icon: ClipboardCheck,
    title: "Inspections",
    description: "Track property inspections",
    color: "from-blue-500 to-cyan-500",
    count: 2,
  },
  {
    icon: Eye,
    title: "Peer Previews",
    description: "Get feedback from peers",
    color: "from-green-500 to-emerald-500",
    count: 1,
  },
  {
    icon: Mail,
    title: "Templates",
    description: "Email templates library",
    color: "from-orange-500 to-red-500",
    count: 5,
  },
];

const mockTours = [
  {
    id: 1,
    property: "123 Main St, Apt 2B",
    tenant: "John Doe",
    email: "john@example.com",
    date: "2025-11-25 10:00 AM",
    type: "Virtual",
    status: "scheduled",
  },
  {
    id: 2,
    property: "456 Oak Ave, Unit 5",
    tenant: "Jane Smith",
    email: "jane@example.com",
    date: "2025-11-26 2:00 PM",
    type: "In-Person",
    status: "scheduled",
  },
];

const mockInspections = [
  {
    id: 1,
    property: "123 Main St, Apt 2B",
    type: "Move-In",
    date: "2025-11-30 9:00 AM",
    status: "scheduled",
  },
  {
    id: 2,
    property: "789 Pine Rd",
    type: "Routine",
    date: "2025-12-05 1:00 PM",
    status: "completed",
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 pb-20 md:pb-0">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-white/70 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Profile</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">Welcome back! 👋</h2>
          <p className="text-muted-foreground">Manage your properties and tenant interactions</p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Card className="relative overflow-hidden border-0 shadow-md hover:shadow-xl transition-all cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className={`inline-flex p-2 rounded-lg bg-gradient-to-br ${feature.color} mb-2`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription className="text-xs">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{feature.count}</div>
                  </CardContent>
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary">{feature.count}</Badge>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="tours">Room Tours</TabsTrigger>
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
            <TabsTrigger value="previews">Peer Previews</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="h-5 w-5 text-purple-600" />
                    Upcoming Tours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTours.map((tour) => (
                    <div key={tour.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{tour.tenant}</p>
                        <p className="text-sm text-muted-foreground">{tour.property}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {tour.date}
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                        {tour.type}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClipboardCheck className="h-5 w-5 text-blue-600" />
                    Recent Inspections
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockInspections.map((inspection) => (
                    <div key={inspection.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                      <div className="flex-1">
                        <p className="font-medium">{inspection.property}</p>
                        <p className="text-sm text-muted-foreground">{inspection.type}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {inspection.date}
                        </div>
                      </div>
                      {inspection.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Clock className="h-5 w-5 text-orange-600" />
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Room Tours Tab */}
          <TabsContent value="tours" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Room Tours</CardTitle>
                  <CardDescription>Schedule and manage property tours</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Plus className="h-4 w-4 mr-2" />
                      New Tour
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Room Tour</DialogTitle>
                      <DialogDescription>
                        Create a new room tour and send invitation email
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="property">Property</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">123 Main St, Apt 2B</SelectItem>
                            <SelectItem value="2">456 Oak Ave, Unit 5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenant-name">Tenant Name</Label>
                        <Input id="tenant-name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tenant-email">Tenant Email</Label>
                        <Input id="tenant-email" type="email" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="date">Date & Time</Label>
                        <Input id="date" type="datetime-local" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="type">Tour Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="in-person">In-Person</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="notes">Notes (Optional)</Label>
                        <Textarea id="notes" placeholder="Additional information..." />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600">
                        <Send className="h-4 w-4 mr-2" />
                        Schedule & Send Email
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTours.map((tour) => (
                    <div key={tour.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-purple-300 hover:shadow-md transition-all">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{tour.tenant}</h4>
                            <p className="text-sm text-muted-foreground">{tour.email}</p>
                          </div>
                          <Badge className={tour.type === "Virtual" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}>
                            {tour.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {tour.property}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tour.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-red-600">Cancel</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Inspections Tab */}
          <TabsContent value="inspections" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Inspections</CardTitle>
                  <CardDescription>Manage property inspections and reports</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600">
                      <Plus className="h-4 w-4 mr-2" />
                      New Inspection
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Schedule Inspection</DialogTitle>
                      <DialogDescription>
                        Create a new inspection and notify tenant
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="i-property">Property</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">123 Main St, Apt 2B</SelectItem>
                            <SelectItem value="2">456 Oak Ave, Unit 5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="i-type">Inspection Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="move-in">Move-In</SelectItem>
                            <SelectItem value="move-out">Move-Out</SelectItem>
                            <SelectItem value="routine">Routine</SelectItem>
                            <SelectItem value="emergency">Emergency</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="i-date">Date & Time</Label>
                        <Input id="i-date" type="datetime-local" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="i-notes">Notes</Label>
                        <Textarea id="i-notes" placeholder="Inspection details..." />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600">
                      <Send className="h-4 w-4 mr-2" />
                      Schedule & Notify
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockInspections.map((inspection) => (
                    <div key={inspection.id} className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-blue-300 hover:shadow-md transition-all">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-semibold">{inspection.property}</h4>
                            <p className="text-sm text-muted-foreground">{inspection.type} Inspection</p>
                          </div>
                          <Badge className={inspection.status === "completed" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"}>
                            {inspection.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {inspection.date}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        {inspection.status === "scheduled" && (
                          <Button size="sm" variant="outline">Complete</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Peer Previews Tab */}
          <TabsContent value="previews" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Peer Previews</CardTitle>
                  <CardDescription>Request feedback from other landlords</CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Request Review
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Request Peer Preview</DialogTitle>
                      <DialogDescription>
                        Get feedback from experienced landlords
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="p-property">Property</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">123 Main St, Apt 2B</SelectItem>
                            <SelectItem value="2">456 Oak Ave, Unit 5</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="reviewer-email">Reviewer Email</Label>
                        <Input id="reviewer-email" type="email" placeholder="reviewer@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="topic">Topic</Label>
                        <Input id="topic" placeholder="What feedback do you need?" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" placeholder="Provide context..." rows={4} />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                      <Send className="h-4 w-4 mr-2" />
                      Send Request
                    </Button>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No peer previews yet</p>
                  <p className="text-sm">Request feedback to get started</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNav />
    </div>
  );
}
