"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { MapPin, TreePalm as Tree } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for tree species by location
const treeSpeciesByLocation: Record<string, string[]> = {
  "Amazon Rainforest, Brazil": ["Oak Tree", "Mahogany Tree", "Brazil Nut Tree"],
  "Pacific Northwest, USA": ["Pine Tree", "Douglas Fir", "Western Red Cedar"],
  Madagascar: ["Baobab Tree", "Traveler's Palm", "Madagascar Palm"],
  "Western Ghats, India": ["Teak Tree", "Sandalwood Tree", "Bamboo"],
  "Borneo, Indonesia": ["Dipterocarp Tree", "Ironwood Tree", "Rattan Palm"],
};

export default function AdoptTreeForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    treeName: "",
    location: "",
    species: "",
    message: "",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [price] = useState(25);

  // Memoize available species for selected location
  const availableSpecies = useMemo(
    () => treeSpeciesByLocation[formData.location] || [],
    [formData.location]
  );

  // Simulate getting user's location
  const getUserLocation = useCallback(() => {
    const randomLocations = Object.keys(treeSpeciesByLocation);
    const suggestedLocation =
      randomLocations[Math.floor(Math.random() * randomLocations.length)];

    setFormData((prevData) => ({
      ...prevData,
      location: suggestedLocation,
      species: treeSpeciesByLocation[suggestedLocation]?.[0] || "",
    }));
  }, []);

  const handleLocationChange = useCallback((location: string) => {
    setFormData((prevData) =>
      prevData.location !== location
        ? { ...prevData, location, species: treeSpeciesByLocation[location]?.[0] || "" }
        : prevData
    );
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => (prevData[id] !== value ? { ...prevData, [id]: value } : prevData));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!showPayment) {
        setShowPayment(true);
      } else {
        router.push("/my-forest");
      }
    },
    [showPayment, router]
  );

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Tree className="h-6 w-6 text-primary" />
          {showPayment ? "Complete Your Adoption" : "Adopt a Tree"}
        </CardTitle>
        <CardDescription>
          {showPayment
            ? "Please complete your payment to finalize your tree adoption."
            : "Fill in the details below to adopt your tree and make a positive impact on our planet."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {!showPayment ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="treeName">Give your tree a name</Label>
                  <Input
                    id="treeName"
                    placeholder="e.g., Groot, Leafy, Oakley"
                    value={formData.treeName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="location">Location</Label>
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 text-xs flex items-center gap-1"
                      onClick={getUserLocation}
                    >
                      <MapPin className="h-3 w-3" /> Use my location
                    </Button>
                  </div>
                  <Select value={formData.location} onValueChange={handleLocationChange}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select a location" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(treeSpeciesByLocation).map((location) => (
                        <SelectItem key={location} value={location}>
                          {location}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="species">Tree Species</Label>
                  <Select
                    value={formData.species}
                    onValueChange={(value) =>
                      setFormData((prevData) =>
                        prevData.species !== value ? { ...prevData, species: value } : prevData
                      )
                    }
                    disabled={!formData.location}
                    required
                  >
                    <SelectTrigger id="species">
                      <SelectValue placeholder="Select a species" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSpecies.map((species) => (
                        <SelectItem key={species} value={species}>
                          {species}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Personal Message (Optional)</Label>
                  <Input
                    id="message"
                    placeholder="Add a personal message or dedication"
                    value={formData.message}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-medium mb-2">Adoption Summary</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Tree Name:</span>
                    <span className="font-medium">{formData.treeName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span className="font-medium">{formData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Species:</span>
                    <span className="font-medium">{formData.species}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-base">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-primary">${price}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full mt-6">
            {showPayment ? "Complete Payment" : "Continue to Payment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
