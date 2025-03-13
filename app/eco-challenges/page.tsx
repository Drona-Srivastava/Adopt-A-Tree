"use client";

import { Leaf, TreeDeciduous, Axe, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for climate news
const climateNews = [
  {
    id: "1",
    title: "Amazon Deforestation Reaches Critical Levels",
    summary:
      "Recent satellite data shows alarming rates of deforestation in the Amazon rainforest, with over 10,000 hectares lost in the past month alone.",
    source: "Environmental Monitor",
    date: "2023-11-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Deforestation",
  },
  {
    id: "2",
    title: "Record-Breaking Temperatures Recorded Globally",
    summary:
      "Scientists report that the past month was the hottest on record globally, raising concerns about accelerating climate change impacts.",
    source: "Climate Science Journal",
    date: "2023-11-10",
    image: "/placeholder.svg?height=200&width=400",
    category: "Climate Change",
  },
  {
    id: "3",
    title: "New Reforestation Initiative Launches in Southeast Asia",
    summary:
      "A coalition of environmental organizations has launched an ambitious project to plant 5 million trees across Southeast Asia over the next five years.",
    source: "Green Earth News",
    date: "2023-11-08",
    image: "/placeholder.svg?height=200&width=400",
    category: "Reforestation",
  },
]

// Mock data for eco-challenges
const ecoChallenges = [
  {
    id: "1",
    title: "Plant 5 Trees This Month",
    description: "Adopt and plant five trees within the next 30 days to earn the Forest Expander badge.",
    difficulty: "Medium",
    participants: 1245,
    completionRate: 68,
    reward: "Forest Expander Badge",
    deadline: "2023-12-15",
  },
  {
    id: "2",
    title: "Reduce Carbon Footprint",
    description: "Track and reduce your carbon emissions by 20% over the next two weeks.",
    difficulty: "Hard",
    participants: 876,
    completionRate: 42,
    reward: "Carbon Cutter Badge",
    deadline: "2023-11-30",
  },
  {
    id: "3",
    title: "Spread Awareness",
    description: "Share your tree adoption journey on social media and get 5 friends to join the platform.",
    difficulty: "Easy",
    participants: 2134,
    completionRate: 85,
    reward: "Eco Influencer Badge",
    deadline: "2023-12-01",
  },
]

// Mock data for tree statistics
const treeStatistics = {
  treesPlanted: 25487,
  treesPlantedToday: 342,
  treesDeforested: 50000,
  treesDeforestedToday: 1200,
  netLoss: 24513,
}

export default function EcoChallengesPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setUserName(null);
    router.push("/");
  };

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Eco-Challenges</h1>
            <p className="text-muted-foreground">Take action, earn rewards, and make a real difference</p>
          </div>

          {/* Tree Statistics */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Real-Time Tree Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-green-50 dark:bg-green-950/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <TreeDeciduous className="h-5 w-5 text-primary" />
                    <CardTitle>Trees Planted</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-primary">{treeStatistics.treesPlanted.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Total trees planted worldwide</p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
                      <p className="text-lg font-bold text-primary">
                        +{treeStatistics.treesPlantedToday.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-red-50 dark:bg-red-950/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Axe className="h-5 w-5 text-destructive" />
                    <CardTitle>Trees Lost to Deforestation</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-3xl font-bold text-destructive">
                        {treeStatistics.treesDeforested.toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">Total trees lost worldwide</p>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                      <p className="text-lg font-bold text-destructive">
                        +{treeStatistics.treesDeforestedToday.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Today</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-4">
              <CardHeader className="pb-2">
                <CardTitle>Net Forest Impact</CardTitle>
                <CardDescription>Current global balance between reforestation and deforestation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center">
                      <span className="h-3 w-3 rounded-full bg-destructive mr-1"></span>
                      Net Loss
                    </span>
                    <span className="font-medium">{treeStatistics.netLoss.toLocaleString()} trees</span>
                  </div>
                  <Progress value={33} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    We need to plant more trees to offset deforestation. Join our challenges to help!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="challenges" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="challenges">Eco-Challenges</TabsTrigger>
              <TabsTrigger value="news">Climate News</TabsTrigger>
            </TabsList>

            {/* Eco-Challenges Tab */}
            <TabsContent value="challenges" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ecoChallenges.map((challenge) => (
                  <Card key={challenge.id} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{challenge.title}</CardTitle>
                        <Badge
                          className={
                            challenge.difficulty === "Easy"
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : challenge.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                          }
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span className="font-medium">{challenge.completionRate}%</span>
                      </div>
                      <Progress value={challenge.completionRate} className="h-2" />

                      <div className="flex justify-between text-sm">
                        <span>Participants</span>
                        <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span>Deadline</span>
                        <span className="font-medium">{challenge.deadline}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <span>Reward:</span>
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                          {challenge.reward}
                        </Badge>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full group transition-all duration-300">
                        Join Challenge
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Climate News Tab */}
            <TabsContent value="news" className="mt-6">
              <div className="space-y-6">
                {climateNews.map((news) => (
                  <Card key={news.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="md:flex">
                      <div className="relative h-48 md:h-auto md:w-1/3">
                        <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle>{news.title}</CardTitle>
                            <Badge
                              className={
                                news.category === "Reforestation"
                                  ? "bg-green-100 text-green-800"
                                  : news.category === "Deforestation"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-blue-100 text-blue-800"
                              }
                            >
                              {news.category}
                            </Badge>
                          </div>
                          <CardDescription>
                            {news.source} • {news.date}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>{news.summary}</p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="group transition-all duration-300">
                            Read Full Article
                            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                          </Button>
                        </CardFooter>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
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

