"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Activity, MapPin } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

// Dynamically import the map to disable SSR
const MapComponent = dynamic(() => import("@/components/MapComponent"), { ssr: false });

export default function Home() {
  const [sosAlert, setSosAlert] = useState<any>(null);

  useEffect(() => {
    // Connect to the Go Backend WebSocket Hub
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "NEW_SOS") {
          setSosAlert(data);
          // Auto-clear alert after 30 seconds for demo purposes
          setTimeout(() => setSosAlert(null), 30000);
        }
      } catch (e) {
        console.error("WebSocket message parse error", e);
      }
    };

    return () => socket.close();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-background text-foreground transition-colors duration-300">
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-3">
          <div className="bg-red-600 p-2 rounded-xl shadow-lg shadow-red-500/20">
             <AlertTriangle className="text-white h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">SANJEEVANI</h1>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">Network v7.0</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="font-mono bg-background hidden sm:flex">
            <MapPin className="w-3 h-3 mr-1" /> KOTHRI KALAN
          </Badge>
          <ThemeToggle />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Active Emergencies Card */}
        <Card className={`lg:col-span-2 transition-all duration-500 ${sosAlert ? 'border-red-500 shadow-xl shadow-red-500/10' : 'border-border'}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Live Dispatch
              {sosAlert ? (
                <Badge variant="destructive" className="animate-pulse">ACTIVE SOS</Badge>
              ) : (
                <Badge variant="secondary">MONITORING</Badge>
              )}
            </CardTitle>
            <CardDescription>Real-time spatial emergency routing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {sosAlert ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 bg-muted/50 p-4 rounded-lg border border-border">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Patient Identity</p>
                    <p className="text-2xl font-bold">{sosAlert.patient}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Clinical Triage</p>
                    <p className="text-xl font-medium text-red-600 dark:text-red-400">{sosAlert.condition}</p>
                  </div>
                  <Button variant="destructive" className="w-full font-bold tracking-wider">DISPATCH WARRIORS</Button>
                </div>
                <div className="w-full h-full min-h-[250px]">
                  <MapComponent lat={sosAlert.lat} lng={sosAlert.lng} patient={sosAlert.patient} condition={sosAlert.condition} />
                </div>
              </div>
            ) : (
              <div className="py-16 text-center text-muted-foreground flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg bg-muted/20">
                <Activity className="h-10 w-10 mb-4 opacity-20 animate-pulse" />
                <p className="font-mono text-sm">Awaiting cryptographic SOS payloads...</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-6">
          {/* Warriors Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Active Warriors
                <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/25">12 Online</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                     <Users className="h-5 w-5" />
                     <p className="text-sm">3 available within 5km radius</p>
                  </div>
                  <Button variant="outline" className="w-full">View Fleet Details</Button>
               </div>
            </CardContent>
          </Card>

          {/* AI Health Proxy Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                AI Health Proxy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">Groq LPU Edge Inference Proxy active. Latency: ~12ms.</p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white border-0">Open Triage Assistant</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
