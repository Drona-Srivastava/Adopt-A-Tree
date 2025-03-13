"use client";

import { Leaf } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import AdoptTreeForm from "@/components/adopt-tree-form"

export default function AdoptTreePage() {
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
            <Link href="/login">
              <Button variant="outline" size="sm">
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-12">
        <div className="container">
          <AdoptTreeForm />
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

