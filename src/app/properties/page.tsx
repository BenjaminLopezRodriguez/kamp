"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home, MapPin, Bed, Bath, Square } from "lucide-react";
import { motion } from "framer-motion";

export default function PropertiesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    city: "",
    state: "",
    minRent: "",
    maxRent: "",
    propertyType: "",
    bedrooms: "",
  });

  const { data: properties, isLoading } = api.property.getAll.useQuery({
    city: filters.city || undefined,
    state: filters.state || undefined,
    minRent: filters.minRent ? Number(filters.minRent) : undefined,
    maxRent: filters.maxRent ? Number(filters.maxRent) : undefined,
    propertyType: filters.propertyType || undefined,
    bedrooms: filters.bedrooms ? Number(filters.bedrooms) : undefined,
    isAvailable: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Find Your Perfect Home</h1>
          <p className="text-gray-200 text-lg">Browse available properties</p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Input
              placeholder="City"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            />
            <Input
              placeholder="State"
              value={filters.state}
              onChange={(e) => setFilters({ ...filters, state: e.target.value })}
            />
            <Input
              placeholder="Min Rent"
              type="number"
              value={filters.minRent}
              onChange={(e) => setFilters({ ...filters, minRent: e.target.value })}
            />
            <Input
              placeholder="Max Rent"
              type="number"
              value={filters.maxRent}
              onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })}
            />
            <Select
              value={filters.propertyType}
              onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.bedrooms}
              onValueChange={(value) => setFilters({ ...filters, bedrooms: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Any</SelectItem>
                <SelectItem value="1">1 Bedroom</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-white">Loading properties...</p>
          </div>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => router.push(`/properties/${property.id}`)}
                >
                  {property.images && property.images.length > 0 ? (
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <Home className="w-16 h-16 text-gray-400" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <Home className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{property.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        {property.address}, {property.city}, {property.state}
                      </span>
                    </div>
                    <div className="flex gap-4 text-sm text-gray-600 mb-4">
                      {property.bedrooms && (
                        <div className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.bedrooms}
                        </div>
                      )}
                      {property.bathrooms && (
                        <div className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {Number(property.bathrooms)}
                        </div>
                      )}
                      {property.squareFeet && (
                        <div className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          {property.squareFeet} sq ft
                        </div>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        ${Number(property.monthlyRent).toLocaleString()}/mo
                      </span>
                      <Button onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/properties/${property.id}`);
                      }}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new listings.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
