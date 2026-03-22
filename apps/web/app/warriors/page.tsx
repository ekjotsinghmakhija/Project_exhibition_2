"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShieldAlert, MapPin, Activity, CheckCircle2 } from "lucide-react";

// Simulated Database of Active Warriors
const warriors = [
  {
    id: "WAR-001",
    name: "Dr. Ananya Sharma",
    role: "Paramedic",
    status: "online",
    location: "Kothri Kalan (Sector A)",
    distance: "1.2 km",
    rating: "4.9",
    earnings: "₹1,250",
    avatar: "AS"
  },
  {
    id: "WAR-084",
    name: "Rahul Verma",
    role: "Certified First Responder",
    status: "dispatched",
    location: "VIT Bhopal Campus",
    distance: "0.5 km",
    rating: "4.7",
    earnings: "₹800",
    avatar: "RV"
  },
  {
    id: "WAR-112",
    name: "Priya Singh",
    role: "Nursing Student",
    status: "offline",
    location: "Sehore Highway",
    distance: "8.4 km",
    rating: "4.8",
    earnings: "₹2,100",
    avatar: "PS"
  },
  {
    id: "WAR-045",
    name: "Amit Patel",
    role: "Off-duty EMT",
    status: "online",
    location: "Ashta Town Center",
    distance: "12.1 km",
    rating: "5.0",
    earnings: "₹4,500",
    avatar: "AP"
  }
];

export default function WarriorsPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 max-w-6xl mx-auto w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <ShieldAlert className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Warrior Fleet</h2>
            <p className="text-muted-foreground font-mono text-sm uppercase mt-1">Ground Node Management</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-mono text-xs">
            <Activity className="w-3 h-3 mr-2" />
            Ping Fleet
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 font-mono text-xs text-white">
            <CheckCircle2 className="w-3 h-3 mr-2" />
            Process Payouts
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Active Nodes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">142</div>
            <p className="text-xs text-muted-foreground mt-1">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Currently Dispatched</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">3</div>
            <p className="text-xs text-muted-foreground mt-1">In active SOS zones</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Response Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2m</div>
            <p className="text-xs text-muted-foreground mt-1">Within 5km radius</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="py-4">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Ledger Payouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">₹12,450</div>
            <p className="text-xs text-muted-foreground mt-1">Via Razorpay Route</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border">
          <CardTitle>Regional Roster (Geo-Mesh: Kothri Kalan)</CardTitle>
          <CardDescription>Live PostGIS spatial query results for the current sector.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[250px] pl-6">Warrior Identity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Location</TableHead>
                <TableHead>Proximity</TableHead>
                <TableHead className="text-right pr-6">Escrow Ledger</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {warriors.map((warrior) => (
                <TableRow key={warrior.id}>
                  <TableCell className="font-medium pl-6">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">{warrior.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span>{warrior.name}</span>
                        <span className="text-xs text-muted-foreground font-mono">{warrior.role}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {warrior.status === 'online' && <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">ONLINE</Badge>}
                    {warrior.status === 'dispatched' && <Badge variant="destructive" className="animate-pulse">DISPATCHED</Badge>}
                    {warrior.status === 'offline' && <Badge variant="outline" className="text-muted-foreground">OFFLINE</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {warrior.location}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{warrior.distance}</TableCell>
                  <TableCell className="text-right pr-6 font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    {warrior.earnings}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
