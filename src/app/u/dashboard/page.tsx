"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";
import { api } from "@/trpc/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Home, Wrench, DollarSign, MessageSquare, FileText, Users } from "lucide-react";
import { motion } from "framer-motion";

// Landlord Dashboard Components
function LandlordDashboard() {
  const { data: properties } = api.property.getByLandlord.useQuery();
  const { data: leases } = api.lease.getAll.useQuery();
  const { data: maintenanceRequests } = api.maintenance.getAll.useQuery({ status: "pending" });
  const { data: payments } = api.payment.getAll.useQuery({ status: "pending" });
  const { data: applications } = api.application.getAll.useQuery({ status: "pending" });
  const router = useRouter();

  const totalRevenue = payments
    ?.filter((p) => p.status === "paid")
    .reduce((sum, p) => sum + Number(p.amount), 0) ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Landlord Dashboard</h1>
        <Button onClick={() => router.push("/u/dashboard/properties/new")}>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Properties</p>
              <p className="text-2xl font-bold">{properties?.length ?? 0}</p>
            </div>
            <Home className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Leases</p>
              <p className="text-2xl font-bold">
                {leases?.filter((l) => l.status === "active").length ?? 0}
              </p>
            </div>
            <FileText className="w-8 h-8 text-green-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold">{maintenanceRequests?.length ?? 0}</p>
            </div>
            <Wrench className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid gap-4">
            {properties && properties.length > 0 ? (
              properties.map((property) => (
                <Card key={property.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <p className="text-gray-600">{property.address}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {property.city}, {property.state} {property.zipCode}
                      </p>
                      <p className="text-lg font-semibold text-blue-600 mt-2">
                        ${Number(property.monthlyRent).toLocaleString()}/month
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/u/dashboard/properties/${property.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600 mb-4">No properties yet</p>
                <Button onClick={() => router.push("/u/dashboard/properties/new")}>
                  Add Your First Property
                </Button>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <div className="grid gap-4">
            {applications && applications.length > 0 ? (
              applications.map((app) => (
                <Card key={app.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Application #{app.id}</h3>
                      <p className="text-gray-600">Property ID: {app.propertyId}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Submitted: {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/u/dashboard/applications/${app.id}`)}
                      >
                        Review
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No pending applications</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="grid gap-4">
            {maintenanceRequests && maintenanceRequests.length > 0 ? (
              maintenanceRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{request.title}</h3>
                      <p className="text-gray-600">{request.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Priority: <span className="font-semibold">{request.priority}</span>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/u/dashboard/maintenance/${request.id}`)}
                      >
                        View
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No pending maintenance requests</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4">
            {payments && payments.length > 0 ? (
              payments.map((payment) => (
                <Card key={payment.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Payment #{payment.id}</h3>
                      <p className="text-gray-600">Amount: ${Number(payment.amount).toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No payments</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Tenant Dashboard Components
function TenantDashboard() {
  const { data: leases } = api.lease.getAll.useQuery();
  const { data: maintenanceRequests } = api.maintenance.getAll.useQuery();
  const { data: payments } = api.payment.getAll.useQuery();
  const router = useRouter();

  const activeLease = leases?.find((l) => l.status === "active");
  const upcomingPayments = payments?.filter(
    (p) => p.status === "pending" && new Date(p.dueDate) > new Date(),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
        <Button onClick={() => router.push("/properties")}>
          <Home className="w-4 h-4 mr-2" />
          Browse Properties
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Lease</p>
              <p className="text-2xl font-bold">{activeLease ? "1" : "0"}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Open Requests</p>
              <p className="text-2xl font-bold">
                {maintenanceRequests?.filter((r) => r.status !== "completed").length ?? 0}
              </p>
            </div>
            <Wrench className="w-8 h-8 text-orange-500" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Upcoming Payments</p>
              <p className="text-2xl font-bold">{upcomingPayments?.length ?? 0}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </Card>
      </div>

      <Tabs defaultValue="lease" className="space-y-4">
        <TabsList>
          <TabsTrigger value="lease">My Lease</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="lease" className="space-y-4">
          {activeLease ? (
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Current Lease</h3>
              <div className="space-y-2">
                <p>
                  <span className="font-semibold">Property ID:</span> {activeLease.propertyId}
                </p>
                <p>
                  <span className="font-semibold">Monthly Rent:</span> $
                  {Number(activeLease.monthlyRent).toLocaleString()}
                </p>
                <p>
                  <span className="font-semibold">Start Date:</span>{" "}
                  {new Date(activeLease.startDate).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">End Date:</span>{" "}
                  {new Date(activeLease.endDate).toLocaleDateString()}
                </p>
              </div>
            </Card>
          ) : (
            <Card className="p-8 text-center">
              <p className="text-gray-600 mb-4">No active lease</p>
              <Button onClick={() => router.push("/properties")}>
                Browse Available Properties
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Maintenance Requests</h3>
            <Button onClick={() => router.push("/u/dashboard/maintenance/new")}>
              <Plus className="w-4 h-4 mr-2" />
              New Request
            </Button>
          </div>
          <div className="grid gap-4">
            {maintenanceRequests && maintenanceRequests.length > 0 ? (
              maintenanceRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{request.title}</h3>
                      <p className="text-gray-600">{request.description}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Status: <span className="font-semibold">{request.status}</span>
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        request.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : request.status === "in_progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {request.status}
                    </span>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No maintenance requests</p>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4">
            {payments && payments.length > 0 ? (
              payments.map((payment) => (
                <Card key={payment.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">
                        {payment.type === "rent" ? "Rent Payment" : payment.type}
                      </h3>
                      <p className="text-gray-600">Amount: ${Number(payment.amount).toLocaleString()}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 items-end">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800"
                            : payment.status === "overdue"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {payment.status}
                      </span>
                      {payment.status === "pending" && (
                        <Button size="sm" onClick={() => router.push(`/u/dashboard/payments/${payment.id}`)}>
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center">
                <p className="text-gray-600">No payments</p>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function DashboardPage() {
  const { isAuthenticated, isLoading } = useKindeAuth();
  const router = useRouter();
  const { data: user } = api.user.getOrCreate.useQuery(undefined, {
    enabled: isAuthenticated ?? false,
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/api/auth/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // If user hasn't selected a role, redirect to get started
  if (user && !user.role) {
    router.push("/getstarted");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {user?.role === "landlord" ? <LandlordDashboard /> : <TenantDashboard />}
    </div>
  );
}
