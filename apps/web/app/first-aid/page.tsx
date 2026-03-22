"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HeartPulse, Wind, Droplet, Activity, AlertOctagon } from "lucide-react";

// The Offline-Capable Deterministic Decision Tree
const protocols = {
  cardiac: [
    {
      id: "cpr",
      title: "Hands-Only CPR (Adult)",
      critical: true,
      steps: [
        "1. CHECK: Ensure the scene is safe. Tap the person's shoulder and shout, 'Are you okay?'",
        "2. CALL: If no response, point to a specific Warrior/Bystander and say, 'Call an ambulance!'",
        "3. POSITION: Place the person flat on their back on a firm surface.",
        "4. HANDS: Put the heel of one hand in the center of their chest. Put your other hand on top and interlace your fingers.",
        "5. PUSH: Push hard and fast (at least 2 inches deep) at a rate of 100-120 beats per minute (to the beat of 'Stayin' Alive').",
        "6. CONTINUE: Do not stop until medical help takes over or the person breathes/moves."
      ]
    },
    {
      id: "heart-attack",
      title: "Suspected Heart Attack",
      critical: false,
      steps: [
        "1. REST: Have the person sit down, rest, and try to keep calm.",
        "2. LOOSEN: Loosen any tight clothing around their neck or chest.",
        "3. MEDICATION: Ask if they take chest pain medication (like nitroglycerin). Help them take it.",
        "4. ASPIRIN: If they are not allergic, have them chew and swallow one adult aspirin (325mg).",
        "5. MONITOR: Stay with them and monitor breathing until the Warrior fleet arrives."
      ]
    }
  ],
  breathing: [
    {
      id: "choking",
      title: "Choking (Heimlich Maneuver)",
      critical: true,
      steps: [
        "1. VERIFY: Ask, 'Are you choking?' If they cannot cough, speak, or breathe, act immediately.",
        "2. STAND: Stand behind the person. Place one foot slightly in front of the other for balance.",
        "3. ARMS: Wrap your arms around their waist. Tip them forward slightly.",
        "4. FIST: Make a fist with one hand. Place it slightly above their navel (belly button).",
        "5. GRASP: Grasp the fist with your other hand.",
        "6. THRUST: Press hard into the abdomen with a quick, upward thrust. Repeat until the object is expelled."
      ]
    }
  ],
  trauma: [
    {
      id: "bleeding",
      title: "Severe Bleeding (Hemorrhage)",
      critical: true,
      steps: [
        "1. PROTECT: Put on medical gloves if available.",
        "2. EXPOSE: Remove or cut clothing to find the source of the bleeding.",
        "3. PRESSURE: Apply direct, continuous pressure to the wound with a clean cloth or sterile dressing.",
        "4. MAINTAIN: Do not remove the cloth. If blood soaks through, add more cloth on top and push harder.",
        "5. TOURNIQUET: If the bleeding is from an arm or leg and will not stop, apply a tourniquet 2-3 inches above the wound (never on a joint). Note the exact time it was applied."
      ]
    }
  ]
};

export default function FirstAidPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6 max-w-4xl mx-auto w-full">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-red-600 p-2 rounded-lg">
          <AlertOctagon className="w-8 h-8 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">First Aid Protocols</h2>
          <p className="text-muted-foreground font-mono text-sm uppercase mt-1">
            <Badge variant="outline" className="text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-500/10 mr-2">
              Offline Available
            </Badge>
            Deterministic Emergency Trees
          </p>
        </div>
      </div>

      <Card className="border-border/50 shadow-sm">
        <CardHeader className="bg-muted/30 border-b border-border pb-6">
          <CardTitle>Clinical Guidelines</CardTitle>
          <CardDescription>Follow these step-by-step instructions carefully until professional medical responders arrive on the scene.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="cardiac" className="w-full">
            <div className="p-4 md:px-6 border-b border-border overflow-x-auto">
              <TabsList className="w-full justify-start h-12 bg-muted/50">
                <TabsTrigger value="cardiac" className="flex items-center gap-2 text-sm">
                  <HeartPulse className="w-4 h-4 text-red-500" /> Cardiac
                </TabsTrigger>
                <TabsTrigger value="breathing" className="flex items-center gap-2 text-sm">
                  <Wind className="w-4 h-4 text-blue-500" /> Breathing
                </TabsTrigger>
                <TabsTrigger value="trauma" className="flex items-center gap-2 text-sm">
                  <Droplet className="w-4 h-4 text-rose-500" /> Trauma & Bleeding
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Cardiac Tab */}
            <TabsContent value="cardiac" className="p-0 m-0">
              <Accordion type="single" collapsible className="w-full">
                {protocols.cardiac.map((protocol) => (
                  <AccordionItem value={protocol.id} key={protocol.id} className="border-b-0 border-t first:border-t-0 px-4 md:px-6">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-3 text-left">
                        {protocol.title}
                        {protocol.critical && <Badge variant="destructive" className="ml-2">CRITICAL</Badge>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 space-y-4">
                      {protocol.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-3 bg-muted/20 p-3 rounded-md border border-border/50">
                          <span className="font-bold text-foreground">{step.split(':')[0]}:</span>
                          <span>{step.split(':')[1] || step}</span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Breathing Tab */}
            <TabsContent value="breathing" className="p-0 m-0">
              <Accordion type="single" collapsible className="w-full">
                {protocols.breathing.map((protocol) => (
                  <AccordionItem value={protocol.id} key={protocol.id} className="border-b-0 border-t first:border-t-0 px-4 md:px-6">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-3 text-left">
                        {protocol.title}
                        {protocol.critical && <Badge variant="destructive" className="ml-2">CRITICAL</Badge>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 space-y-4">
                      {protocol.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-3 bg-muted/20 p-3 rounded-md border border-border/50">
                          <span className="font-bold text-foreground">{step.split(':')[0]}:</span>
                          <span>{step.split(':')[1] || step}</span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

            {/* Trauma Tab */}
            <TabsContent value="trauma" className="p-0 m-0">
              <Accordion type="single" collapsible className="w-full">
                {protocols.trauma.map((protocol) => (
                  <AccordionItem value={protocol.id} key={protocol.id} className="border-b-0 border-t first:border-t-0 px-4 md:px-6">
                    <AccordionTrigger className="hover:no-underline py-6">
                      <div className="flex items-center gap-3 text-left">
                        {protocol.title}
                        {protocol.critical && <Badge variant="destructive" className="ml-2">CRITICAL</Badge>}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-base text-muted-foreground leading-relaxed pb-6 space-y-4">
                      {protocol.steps.map((step, idx) => (
                        <div key={idx} className="flex gap-3 bg-muted/20 p-3 rounded-md border border-border/50">
                          <span className="font-bold text-foreground">{step.split(':')[0]}:</span>
                          <span>{step.split(':')[1] || step}</span>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
