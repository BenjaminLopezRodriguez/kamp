"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Menu,
  Wifi,
  BrushCleaning,
  Wrench,
  Shirt,
  CheckCircle2,
  Plus,
} from "lucide-react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [step, setStep] = useState<"checklist" | "services">("checklist");
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [locations, setLocations] = useState<string[]>(["Downtown Loft"]);
  const [locationName, setLocationName] = useState("");

  const services = [
    { id: 1, name: "Wi‑Fi & Internet", icon: Wifi },
    { id: 2, name: "Cleaning Services", icon: BrushCleaning },
    { id: 3, name: "Maintenance Packages", icon: Wrench },
    { id: 4, name: "Laundry Services", icon: Shirt },
  ];

  const disclaimers = [
    "Services are fulfilled by Kamp‑approved third‑party vendors.",
    "Kamp adds a 0.5% transparent management fee.",
    "You choose which services your tenants can access.",
  ];

  function toggleService(id: number) {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function handleSaveLocation() {
    if (locationName.trim()) {
      setLocations((prev) => [...prev, locationName.trim()]);
      setLocationName("");
      setDialogOpen(false);
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-20 h-full transform bg-white shadow-lg transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } flex w-64 flex-col`}
      >
        <div className="border-b p-6">
          <h2 className="text-xl font-bold">Kamp.rent</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="mb-3 font-semibold text-gray-700">My Locations</h3>
          <ul className="space-y-2">
            {locations.map((loc, idx) => (
              <li
                key={idx}
                className="rounded-md bg-gray-100 p-3 font-medium text-gray-800"
              >
                {loc}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto border-t p-4">
          <Button
            onClick={() => {
              setDialogOpen(true);
              setStep("checklist");
            }}
            className="flex w-full items-center gap-2 rounded-full"
          >
            <Plus className="h-5 w-5" />
            Add Location
          </Button>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {menuOpen && (
        <div
          className="bg-opacity-40 fixed inset-0 z-10 bg-black"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top nav */}
        <div className="flex items-center justify-between bg-white p-4 shadow-md">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg font-bold">Service Marketplace</h1>
          <div className="w-6" /> {/* spacer */}
        </div>

        {/* Main view */}
        <div className="flex-1 p-6">
          <h2 className="mb-6 text-2xl font-semibold">Available Services</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;
              const isSelected = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border p-6 transition ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-300"
                      : "border-gray-200 bg-white hover:border-gray-400"
                  }`}
                >
                  <Icon className="mb-3 h-8 w-8" />
                  <span className="text-center font-medium">
                    {service.name}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="absolute top-2 right-2 h-5 w-5 text-blue-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Location Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          {step === "checklist" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Before You Add a Location
                </DialogTitle>
              </DialogHeader>
              <ul className="my-6 space-y-4">
                {disclaimers.map((text, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
                  >
                    <Checkbox id={`check-${idx}`} className="mt-1" />
                    <label
                      htmlFor={`check-${idx}`}
                      className="text-sm text-gray-700"
                    >
                      {text}
                    </label>
                  </li>
                ))}
              </ul>
              <DialogFooter>
                <Button className="w-full" onClick={() => setStep("services")}>
                  I’m Ready
                </Button>
              </DialogFooter>
            </>
          )}

          {step === "services" && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  Name Your Location
                </DialogTitle>
                <p className="mt-1 text-sm text-gray-500">
                  Example: “123 Main Street, Austin, TX”
                </p>
              </DialogHeader>
              <input
                type="text"
                placeholder="Enter location name"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="my-4 w-full rounded-md border p-3"
              />
              <DialogFooter>
                <Button
                  className="w-full"
                  onClick={handleSaveLocation}
                  disabled={!locationName.trim()}
                >
                  Save Location
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
