"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  Gift,
  Globe,
  Leaf,
  MapPin,
  Users,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Updated import statement

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForestAnimation from "@/components/forest-animation";
import TreeCard from "@/components/tree-card";
import LeaderboardSection from "@/components/leaderboard-section";
import CounterAnimation from "@/components/counter-animation";

export default function Home() {
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
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Adopt-a-Tree</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/my-forest"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              My Forest
            </Link>
            <Link
              href="/eco-challenges"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Eco-Challenges
            </Link>
            <Link
              href="/about-us"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
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

      {/* Hero Section */}
      <section className="relative h-[600px] overflow-hidden">
        <ForestAnimation />
        <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white drop-shadow-md">
            Adopt a Tree, Grow a Forest
          </h1>
          <p className="mt-4 max-w-[700px] text-lg text-white drop-shadow-md">
            Sponsor real trees, track their growth, and build your virtual
            forest while making a real impact on our planet.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href="/adopt">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 group transition-all duration-300 transform hover:scale-105"
              >
                Adopt a Tree Now!
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href={"/my-forest"}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white hover:bg-white/20 border-white/20 transition-all duration-300 hover:scale-105"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
              Join our global community and make a real impact on reforestation
              efforts around the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-2 border-green-100 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Leaf className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>1. Adopt a Tree</CardTitle>
                <CardDescription>
                  Choose a tree species and location. Name your tree and
                  complete your adoption.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-green-100 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>2. Track Growth</CardTitle>
                <CardDescription>
                  Receive updates on your tree's growth with real photos and GPS
                  coordinates.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2 border-green-100 dark:border-green-900/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>3. Earn Rewards</CardTitle>
                <CardDescription>
                  Collect badges, climb the leaderboard, and complete
                  eco-challenges.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Tree Sponsorship */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Featured Trees
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
              Choose from a variety of tree species to adopt and track their
              growth in real-time.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TreeCard
              name="Oak Tree"
              location="Amazon Rainforest, Brazil"
              image="/images/oak.jpg"
              price={25}
              co2="25kg per year"
              lifespan="100+ years"
            />
            <TreeCard
              name="Pine Tree"
              location="Pacific Northwest, USA"
              image="/images/pine.png"
              price={20}
              co2="18kg per year"
              lifespan="80+ years"
            />
            <TreeCard
              name="Baobab Tree"
              location="Madagascar"
              image="/images/baobab.png"
              price={30}
              co2="30kg per year"
              lifespan="1000+ years"
            />
          </div>
          {/* <div className="mt-10 text-center">
            <Button
              size="lg"
              className="group transition-all duration-300 transform hover:scale-105"
            >
              View All Tree Species
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-green-50 dark:from-background dark:to-green-950/20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Interactive Features
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
              Engage with your trees through our innovative digital experiences.
            </p>
          </div>

          <Tabs defaultValue="ar" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3">
              <TabsTrigger value="ar">AR Visualization</TabsTrigger>
              <TabsTrigger value="3d">3D Forest</TabsTrigger>
              <TabsTrigger value="reports">Growth Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="ar" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    AR Tree Visualization
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Use augmented reality to "plant" your adopted tree in your
                    own space and watch it grow virtually over time.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        New
                      </Badge>
                      Place your tree anywhere using your phone camera
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Feature
                      </Badge>
                      See realistic 3D models of your exact tree species
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Interactive
                      </Badge>
                      Take photos with your virtual tree to share
                    </li>
                  </ul>
                  <Button className="mt-6 group transition-all duration-300 transform hover:scale-105">
                    Try AR Feature
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="bg-green-100 dark:bg-green-900/20 rounded-xl overflow-hidden h-[300px] flex items-center justify-center shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="AR Tree Visualization"
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="3d" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-green-100 dark:bg-green-900/20 rounded-xl overflow-hidden h-[300px] flex items-center justify-center shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="3D Forest Exploration"
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    3D Forest Exploration
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Explore your personal forest in an immersive 3D environment.
                    Click on trees to see their details and growth progress.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Interactive
                      </Badge>
                      Navigate through your forest with intuitive controls
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Detailed
                      </Badge>
                      View detailed information about each tree
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Realistic
                      </Badge>
                      Experience seasonal changes and growth over time
                    </li>
                  </ul>
                  <Button className="mt-6 group transition-all duration-300 transform hover:scale-105">
                    Explore Your Forest
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="mt-6">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Monthly Growth Reports
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Receive personalized emails with updates on your trees'
                    growth, environmental impact statistics, and eco-tips.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Personalized
                      </Badge>
                      Custom reports for your specific trees
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Informative
                      </Badge>
                      Learn about your environmental impact
                    </li>
                    <li className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Educational
                      </Badge>
                      Get tips on how to further help the environment
                    </li>
                  </ul>
                  <Button className="mt-6 group transition-all duration-300 transform hover:scale-105">
                    View Sample Report
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
                <div className="bg-green-100 dark:bg-green-900/20 rounded-xl overflow-hidden h-[300px] flex items-center justify-center shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-[1.02]">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Monthly Growth Reports"
                    width={400}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Gamification & Rewards
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
              Earn badges, climb the leaderboard, and compete with friends as
              you grow your forest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Achievement Badges</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium">Green Guardian</h4>
                    <p className="text-xs text-muted-foreground">
                      Adopt 10 trees
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium">Forest Pioneer</h4>
                    <p className="text-xs text-muted-foreground">
                      First tree planted
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium">Eco Warrior</h4>
                    <p className="text-xs text-muted-foreground">
                      Complete 5 challenges
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center opacity-50">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium text-muted-foreground">
                      Forest King
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Adopt 50 trees
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center opacity-50">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium text-muted-foreground">
                      Gift Giver
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Gift 5 trees
                    </p>
                  </CardContent>
                </Card>
                <Card className="text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center opacity-50">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium text-muted-foreground">
                      Team Player
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Join a group
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="transition-all duration-300 transform hover:scale-105"
                >
                  View All Badges
                </Button>
              </div>
            </div>

            <LeaderboardSection />
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white dark:from-green-950/20 dark:to-background">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Community Engagement
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
              Connect with others, form groups, and make a collective impact on
              our planet.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Gift Trees</CardTitle>
                <CardDescription>
                  Give the gift of a tree to friends and family with a
                  personalized message.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full group transition-all duration-300"
                >
                  Gift a Tree
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Join Teams</CardTitle>
                <CardDescription>
                  Create or join teams with friends, colleagues, or classmates
                  for collective impact.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full group transition-all duration-300"
                >
                  Explore Teams
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>

            <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Global Impact</CardTitle>
                <CardDescription>
                  See real-time data on global deforestation and reforestation
                  efforts.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full group transition-all duration-300"
                >
                  View Impact
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Our Impact
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
              Together, we're making a real difference in the fight against
              climate change.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">
                  <CounterAnimation target={25487} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Trees Planted</p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">
                  <CounterAnimation target={637} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Tons of CO₂ Absorbed</p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">
                  <CounterAnimation target={12345} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Active Users</p>
              </CardContent>
            </Card>

            <Card className="text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-primary">
                  <CounterAnimation target={42} />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Countries Impacted</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-green-50 dark:bg-green-950/20 rounded-xl p-6 shadow-md transition-all duration-300 hover:shadow-lg">
            <h3 className="text-xl font-bold mb-4">
              Global Reforestation Goal
            </h3>
            <div className="mb-2 flex justify-between text-sm">
              <span>Current Progress: 25,487 trees</span>
              <span>Goal: 100,000 trees</span>
            </div>
            <Progress value={25} className="h-3" />
            <p className="mt-4 text-sm text-muted-foreground">
              Help us reach our goal of planting 100,000 trees by the end of the
              year!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Ready to Make a Difference?
          </h2>
          <p className="mt-4 max-w-[700px] mx-auto text-primary-foreground/80">
            Join thousands of others who are already growing their forests and
            helping our planet.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="secondary"
              className="group transition-all duration-300 transform hover:scale-105"
            >
              Adopt Your First Tree
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Adopt-a-Tree</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Making reforestation accessible, transparent, and engaging for
                everyone.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    My Forest
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Eco-Challenges
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Connect With Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Adopt-a-Tree. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
