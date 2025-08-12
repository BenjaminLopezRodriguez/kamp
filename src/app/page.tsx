"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpSquare, MapPin, MoveUpRight, Search, UploadCloud } from "lucide-react";
import HelpBox from "./_components/HelpBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@radix-ui/react-label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea, Scrollbar } from "@radix-ui/react-scroll-area";
import { ScrollBar } from "@/components/ui/scroll-area";



function getStateName(abbr: string) {
  const states: Record<string, string> = {
    'CA': 'California',
    'NV': 'Nevada',
    'TX': 'Texas',
    'AZ': 'Arizona'
  };
  return states[abbr] || abbr;
}
const RentalPlatform = () => (
  <section className="px-4 pt-32 pb-20">
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
    >
      <div className="text-center mb-8">
        <h1 className="mb-4 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
          <span className="text-blue-600 font-black">Renting made easy</span>
        </h1>
        <p className="mb-6 max-w-2xl mx-auto text-md text-gray-600">
          Helping connect great tenants with great landlords
        </p>
      </div>

      <Tabs defaultValue="renter" className="w-full">
        <TabsList className="grid grid-cols-2 w-full bg-gray-100 p-1 rounded-xl">
          <TabsTrigger 
            value="renter" 
            className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            I'm Renting
          </TabsTrigger>
          <TabsTrigger 
            value="landlord" 
            className="py-3 data-[state=active]:bg-white data-[state=active]:shadow-sm rounded-lg transition-all"
          >
            I'm a Landlord
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="renter" className="mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">Find your perfect home</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2">
  <Label htmlFor="location" className="text-gray-700 mb-2 block">Location</Label>
  
  {/* Search Input with Dropdown */}
  <div className="relative">
    <Input
      id="location"
      placeholder="Search city, neighborhood, or address"
      className="w-full h-12 pl-10 pr-4 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>

  {/* Popular Cities Section */}
  <div className="mt-4">
    <h3 className="text-sm font-medium text-gray-700 mb-2">Popular in your area</h3>
    
    <ScrollArea className="w-full">
      <div className="flex gap-3 pb-4">
        {[
          // California
          { name: "Los Angeles", state: "CA" },
          { name: "San Diego", state: "CA" },
          { name: "San Francisco", state: "CA" },
          
          // Nevada
          { name: "Las Vegas", state: "NV" },
          
          // Texas
          { name: "Austin", state: "TX" },
          { name: "Dallas", state: "TX" },
          
          // Arizona
          { name: "Phoenix", state: "AZ" }
        ].map((city, index) => (
          <button
            key={`${city.name}-${index}`}
            className="flex-shrink-0 w-40 p-3 border rounded-xl hover:border-blue-400 transition-colors text-left"
            onClick={() => console.log('Selected:', city.name)}
          >
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <span className="text-xs font-medium text-blue-600">
                  {city.state}
                </span>
              </div>
              <h3 className="font-medium text-sm">{city.name}</h3>
            </div>
            <p className="text-xs text-gray-500 mt-1">{getStateName(city.state)}</p>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>

  {/* All Cities Section */}
  <div className="mt-4">
    <h3 className="text-sm font-medium text-gray-700 mb-2">All locations</h3>
    <div className="border rounded-lg divide-y">
      {[
        // California
        { name: "Los Angeles", state: "CA" },
        { name: "San Diego", state: "CA" },
        { name: "San Francisco", state: "CA" },
        { name: "Sacramento", state: "CA" },
        { name: "San Jose", state: "CA" },
        
        // Nevada
        { name: "Las Vegas", state: "NV" },
        { name: "Reno", state: "NV" },
        { name: "Henderson", state: "NV" },
        
        // Texas
        { name: "Austin", state: "TX" },
        { name: "Dallas", state: "TX" },
        { name: "Houston", state: "TX" },
        { name: "San Antonio", state: "TX" },
        
        // Arizona
        { name: "Phoenix", state: "AZ" },
        { name: "Tucson", state: "AZ" },
        { name: "Mesa", state: "AZ" },
        { name: "Scottsdale", state: "AZ" }
      ].map((city, index) => (
        <button
          key={`${city.name}-${index}`}
          className="w-full p-3 hover:bg-gray-50 transition-colors text-left flex items-center"
          onClick={() => console.log('Selected:', city.name)}
        >
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <div>
            <span className="font-medium">{city.name}</span>
            <span className="text-gray-500 text-sm ml-2">{getStateName(city.state)}</span>
          </div>
        </button>
      ))}
    </div>
  </div>
</div>

              <div>
                <Label htmlFor="radius" className="text-gray-700">Radius</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Within 5 miles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Within 1 mile</SelectItem>
                    <SelectItem value="5">Within 5 miles</SelectItem>
                    <SelectItem value="10">Within 10 miles</SelectItem>
                    <SelectItem value="25">Within 25 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="min-price" className="text-gray-700">Min Price</Label>
                <Input id="min-price" placeholder="$" type="number" className="h-12" />
              </div>
              <div>
                <Label htmlFor="max-price" className="text-gray-700">Max Price</Label>
                <Input id="max-price" placeholder="$" type="number" className="h-12" />
              </div>
              <div>
                <Label htmlFor="bedrooms" className="text-gray-700">Bedrooms</Label>
                <Select>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full mt-2 h-14 rounded-xl bg-blue-600 text-lg text-white hover:bg-blue-700">
              Search Properties
            </Button>
          </motion.div>
        </TabsContent>
        
        <TabsContent value="landlord" className="mt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-gray-900">List your property</h2>
            <div className="space-y-6">
              <div>
                <Label htmlFor="property-address" className="text-gray-700">Property Address</Label>
                <Input id="property-address" placeholder="Full address" className="h-12" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="property-type" className="text-gray-700">Property Type</Label>
                  <Select>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bedrooms" className="text-gray-700">Bedrooms</Label>
                  <Input id="bedrooms" type="number" min="0" className="h-12" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bathrooms" className="text-gray-700">Bathrooms</Label>
                  <Input id="bathrooms" type="number" step="0.5" min="0" className="h-12" />
                </div>
                <div>
                  <Label htmlFor="square-feet" className="text-gray-700">Square Feet</Label>
                  <Input id="square-feet" type="number" className="h-12" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="rent-amount" className="text-gray-700">Monthly Rent ($)</Label>
                <Input id="rent-amount" type="number" className="h-12" />
              </div>
              
              <div>
                <Label htmlFor="description" className="text-gray-700">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe your property's features and amenities"
                  rows={4}
                  className="min-h-[120px]"
                />
              </div>
              
              <div>
                <Label className="text-gray-700">Upload Photos</Label>
                <div className="flex items-center justify-center w-full border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 transition-colors cursor-pointer">
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-3 font-medium">Drag and drop photos here</p>
                    <p className="text-sm text-gray-500 mt-1">or click to browse</p>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mt-2 h-14 rounded-xl bg-blue-600 text-lg text-white hover:bg-blue-700">
                List My Property
              </Button>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </motion.div>
  </section>
);


export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 to-slate-100">
      {/* Ultra-minimal Navbar */}
      <nav className="fixed top-0 right-0 left-0 z-50 p-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1"
          >
            <h1 className="text-2xl font-bold text-white">kamp</h1>
            <span className="mt-1 ml-1 hidden text-xs text-white/80 sm:block">
              property
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex gap-2"
          >
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Login
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-white/90">
              Get Started
            </Button>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <RentalPlatform/>
      {/* <section className="px-1 pt-32 pb-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
        >
          <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl">
            Modern property management
            <br />
            <span className="text-blue-600">without the hassle</span>
          </h1>

          <p className="mb-8 max-w-2xl text-lg text-gray-600">
            Streamline your rental business with our all-in-one platform.
          </p>

          <div className="flex gap-4">
            <Button
              className="h-12 rounded-xl bg-blue-600 px-6 text-lg text-white hover:bg-blue-700"
          
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl border-gray-300 px-6 text-lg text-gray-700"
            >
              Learn More
            </Button>
          </div>
        </motion.div>
      </section> */}

      {/* Features Section */}
      <section className="px-1 py-20">
        <div className="mx-auto max-w-6xl ">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-12 text-center text-3xl font-bold text-white"
          >
            Simple. Powerful. Effective.
          </motion.h2>

          <div className="grid grid-cols-2 gap-1 divide-y divide-slate-200 rounded-2xl md:grid-cols-3 md:divide-x md:divide-y-0 md:divide-slate-200 md:bg-white md:p-2 mx-auto">
            {[
              {
                title: "Tenant Management",
                description:
                  "Everything you need to manage tenants in one place.",
              },
              {
                title: "Maintenance",
                description: "Track and resolve maintenance issues easily.",
              },
              {
                title: "Payments",
                description: "Automated rent collection and reporting.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-white p-4 md:rounded-none"
              >
                <div className="flex flex-row">
                  <h3 className="mb-3 text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <div className="relative z-10 ml-auto h-fit w-fit rounded-full bg-slate-300/50 p-2">
                    <MoveUpRight width={15} height={15} />
                  </div>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

  

      <HelpBox/>
      {/* Minimal Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4">
          <div className="text-sm text-white/80">
            © {new Date().getFullYear()} Kamp. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Privacy
            </Button>
            <Button variant="ghost" className="text-white/80 hover:text-white">
              Terms
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );

  
}
