"use client";

import { Leaf, Mail, Phone, MapPin, LogOut } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"; // Updated import statement

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutUsPage() {
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
        {/* Hero Section */}
        <section className="relative h-[300px] overflow-hidden bg-gradient-to-r from-green-800 to-green-600">
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-white drop-shadow-md">About Us</h1>
            <p className="mt-4 max-w-[700px] text-lg text-white/90 drop-shadow-md">
              Learn about our mission, vision, and the impact we're making together
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="prose prose-green max-w-none">
                  <p className="text-lg">
                    Welcome to <strong>Adopt a Tree</strong>, a mission-driven initiative dedicated to fostering
                    environmental responsibility and sustainability. Our platform connects individuals and communities
                    with the opportunity to adopt and care for trees, promoting greener spaces and a healthier planet.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
                  <p>
                    At <strong>Adopt a Tree</strong>, we believe that small actions can create a significant impact. Our
                    mission is to encourage tree adoption, conservation, and environmental awareness by providing a
                    user-friendly platform that enables people to contribute to reforestation and urban greening
                    efforts.
                  </p>

                  <h2 className="text-2xl font-bold mt-8 mb-4">What We Do</h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <strong>Tree Adoption:</strong> We provide a seamless way for individuals and organizations to
                      adopt trees and monitor their growth.
                    </li>
                    <li>
                      <strong>Environmental Awareness:</strong> We educate communities on the importance of
                      afforestation, biodiversity, and climate action.
                    </li>
                    <li>
                      <strong>Community Engagement:</strong> We collaborate with local governments, schools, and NGOs to
                      organize tree-planting drives and sustainability programs.
                    </li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Why Adopt a Tree?</h2>
                  <p>Trees play a vital role in maintaining ecological balance. By adopting a tree, you are:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Reducing carbon footprints</li>
                    <li>Improving air quality</li>
                    <li>Enhancing biodiversity</li>
                    <li>Supporting sustainable urban development</li>
                  </ul>

                  <h2 className="text-2xl font-bold mt-8 mb-4">Get Involved</h2>
                  <p>
                    Join our movement and become a part of a greener future. Whether you're an individual, a school, or
                    a corporation, there are multiple ways to contribute. Adopt a tree today and leave a lasting impact
                    on the planet!
                  </p>

                  <p className="mt-6">
                    For more information, reach out to us at{" "}
                    <a href="mailto:contact@adoptatree.org" className="text-primary hover:underline">
                      contact@adoptatree.org
                    </a>{" "}
                    or follow us on social media.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 mt-8">
                  <Button className="group transition-all duration-300 transform hover:scale-105">
                    Adopt a Tree Now
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Button>
                  <Button variant="outline" className="group transition-all duration-300 transform hover:scale-105">
                    Partner With Us
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Email</p>
                          <a
                            href="mailto:contact@adoptatree.org"
                            className="text-sm text-muted-foreground hover:text-primary"
                          >
                            contact@adoptatree.org
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Phone</p>
                          <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:text-primary">
                            +1 (234) 567-890
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium">Address</p>
                          <p className="text-sm text-muted-foreground">
                            123 Green Street, Eco City,
                            <br />
                            Earth 12345
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">Our Partners</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted aspect-video rounded-md flex items-center justify-center p-4">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="Partner Logo"
                          width={120}
                          height={60}
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div className="bg-muted aspect-video rounded-md flex items-center justify-center p-4">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="Partner Logo"
                          width={120}
                          height={60}
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div className="bg-muted aspect-video rounded-md flex items-center justify-center p-4">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="Partner Logo"
                          width={120}
                          height={60}
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                      <div className="bg-muted aspect-video rounded-md flex items-center justify-center p-4">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="Partner Logo"
                          width={120}
                          height={60}
                          className="opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
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

