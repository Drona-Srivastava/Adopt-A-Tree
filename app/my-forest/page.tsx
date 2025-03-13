"use client";

import { Leaf, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation" // Updated useRouter import

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MyForestAnimation from "@/components/my-forest-animation"
import AdoptedTreeCard from "@/components/adopted-tree-card"

// Mock data for adopted trees
const adoptedTrees = [
  {
    id: "1",
    name: "Groot",
    species: "Oak Tree",
    location: "Amazon Rainforest, Brazil",
    adoptedDate: "2023-05-15",
    lastUpdate: "2023-11-10",
    height: "2.5 meters",
    co2Absorbed: "12kg",
    image: "/placeholder.svg?height=300&width=300",
    coordinates: { lat: -3.4653, lng: -62.2159 },
    healthStatus: "Excellent",
  },
  {
    id: "2",
    name: "Leafy",
    species: "Pine Tree",
    location: "Pacific Northwest, USA",
    adoptedDate: "2023-07-22",
    lastUpdate: "2023-11-05",
    height: "1.8 meters",
    co2Absorbed: "8kg",
    image: "/placeholder.svg?height=300&width=300",
    coordinates: { lat: 47.6062, lng: -122.3321 },
    healthStatus: "Good",
  },
  {
    id: "3",
    name: "Baobby",
    species: "Baobab Tree",
    location: "Madagascar",
    adoptedDate: "2023-09-03",
    lastUpdate: "2023-11-12",
    height: "3.2 meters",
    co2Absorbed: "15kg",
    image: "/placeholder.svg?height=300&width=300",
    coordinates: { lat: -18.7669, lng: 46.8691 },
    healthStatus: "Excellent",
  },
]

export default function MyForestPage() {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const router = useRouter(); // Updated router initialization

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUserName(null);
    router.push("/"); // Fixed router reference
  };

  // Calculate total stats
  const totalTrees = adoptedTrees.length
  const totalCO2 = adoptedTrees.reduce((sum, tree) => sum + Number.parseInt(tree.co2Absorbed), 0)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Adopt-a-Tree</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/my-forest" className="text-sm font-medium hover:text-primary transition-colors">
              My Forest
            </Link>
            <Link href="/eco-challenges" className="text-sm font-medium hover:text-primary transition-colors">
              Eco-Challenges
            </Link>
            <Link href="/about-us" className="text-sm font-medium hover:text-primary transition-colors">
              About Us
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {userName ? (
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold">{`Hi ${userName}`}</span>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">Logout</span>
                </Button>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">My Forest</h1>
              <p className="text-muted-foreground">Track and manage your adopted trees</p>
            </div>
            <Link href="/adopt">
              <Button className="group transition-all duration-300 transform hover:scale-105">
                Adopt Another Tree
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-primary">{totalTrees}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Trees Adopted</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-primary">{totalCO2}kg</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">CO₂ Absorbed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold text-primary">Level 2</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Forest Guardian</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="cards" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="cards">Tree Cards</TabsTrigger>
              <TabsTrigger value="forest">Forest View</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {adoptedTrees.map((tree) => (
                  <AdoptedTreeCard key={tree.id} tree={tree} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="forest" className="mt-6">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-[500px] w-full">
                    <MyForestAnimation trees={adoptedTrees} />
                    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
                      <p className="text-sm font-medium">Your forest is growing!</p>
                      <p className="text-xs text-muted-foreground">Click on trees to see details</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Adopt-a-Tree</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Adopt-a-Tree. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

