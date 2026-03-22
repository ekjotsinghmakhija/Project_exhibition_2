"use client"; // Critical: WebSockets and Maps happen on the client

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Users, Activity } from "lucide-react";

export default function Home() {
  const [sosAlert, setSosAlert] = useState<any>(null);

  useEffect(() => {
    // Connect to our Go Backend WebSocket
    const socket = new WebSocket("ws://localhost:8080/ws");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "NEW_SOS") {
        setSosAlert(data);
        // Play alert sound logic would go here
      }
    };

    return () => socket.close();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-8 bg-zinc-50 dark:bg-zinc-950">
      <header className="w-full max-w-6xl flex justify-between items-center mb-12">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 p-2 rounded-lg">
             <AlertTriangle className="text-white h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">SANJEEVANI <span className="text-red-600">v7.0</span></h1>
        </div>
        <Badge variant="outline" className="font-mono">GEO-MESH: KOTHRI KALAN</Badge>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* Active Emergencies Card */}
        <Card className={`transition-all duration-500 ${sosAlert ? 'border-red-500 shadow-lg shadow-red-200 ring-2 ring-red-500' : 'border-zinc-200'}`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Active SOS
              {sosAlert ? (
                <Badge variant="destructive" className="animate-pulse">1 LIVE</Badge>
              ) : (
                <Badge variant="secondary">0 ACTIVE</Badge>
              )}
            </CardTitle>
            <CardDescription>Emergency dispatch network</CardDescription>
          </CardHeader>
          <CardContent>
            {sosAlert ? (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">Patient</p>
                  <p className="text-2xl font-bold">{sosAlert.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-semibold">Diagnosis</p>
                  <p className="text-lg font-medium text-red-600">{sosAlert.condition}</p>
                </div>
                <Button variant="destructive" className="w-full">Dispatch Warriors</Button>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground italic">
                Scanning network for distress signals...
              </div>
            )}
          </CardContent>
        </Card>

        {/* Warriors Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Warriors
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">12 Online</Badge>
            </CardTitle>
            <CardDescription>Response fleet status</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <Users className="h-5 w-5 text-zinc-500" />
                   <p className="text-sm">3 available within 5km</p>
                </div>
                <Button variant="outline" className="w-full">View Warrior Map</Button>
             </div>
          </CardContent>
        </Card>

        {/* AI Health Proxy Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              AI Health Proxy
            </CardTitle>
            <CardDescription>Groq Llama-3 Edge Inference</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Secure proxy active on HF Space (ZeroGPU).</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Open Triage Assistant</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
