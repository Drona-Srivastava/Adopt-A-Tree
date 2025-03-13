import { Trophy } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function LeaderboardSection() {
  const leaderboardData = [
    { rank: 1, name: "Sarah Johnson", trees: 87, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, name: "Michael Chen", trees: 64, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, name: "Emma Williams", trees: 52, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, name: "David Kim", trees: 45, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 5, name: "Olivia Martinez", trees: 38, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  return (
    <div className="transition-all duration-300 hover:shadow-lg">
      <h3 className="text-2xl font-bold mb-6">Leaderboard</h3>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Top Tree Planters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {leaderboardData.map((user) => (
              <div
                key={user.rank}
                className="flex items-center justify-between transition-all duration-300 hover:bg-muted/50 p-2 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                      user.rank === 1
                        ? "bg-yellow-500 text-yellow-950"
                        : user.rank === 2
                          ? "bg-gray-300 text-gray-700"
                          : user.rank === 3
                            ? "bg-amber-700 text-amber-50"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {user.rank}
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{user.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{user.trees}</span>
                  <span className="text-xs text-muted-foreground">trees</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between bg-muted/30 p-2 rounded-md">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                24
              </div>
              <span className="font-medium">Your Ranking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">12</span>
              <span className="text-xs text-muted-foreground">trees</span>
            </div>
          </div>
          <Link href="/LeaderboardSection">
          <Button variant="outline" className="w-full mt-4 group transition-all duration-300">
            View Full Leaderboard
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Button></Link>
        </CardContent>
      </Card>
    </div>
  )
}

