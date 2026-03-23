"use client"

import React, { useState } from 'react'
import SlideToSOS from '@/components/SlideToSOS'
import {
  HeartPulse, Wind, Droplets, Skull, Zap, Activity,
  ShieldAlert, MapPin, Clock, Info, ShieldCheck
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const symptoms = [
  { id: 'heart', label: 'Chest Pain', icon: HeartPulse, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'breathing', label: 'Breathing', icon: Wind, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'bleeding', label: 'Bleeding', icon: Droplets, color: 'text-rose-600', bg: 'bg-rose-600/10' },
  { id: 'unconscious', label: 'Unconscious', icon: Skull, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'trauma', label: 'Trauma', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'other', label: 'Other', icon: Activity, color: 'text-slate-400', bg: 'bg-slate-500/10' },
]

export default function FirstAidPage() {
  const [selectedSymptom, setSelectedSymptom] = useState<string | null>(null)

  const handleSOS = () => {
    // API Call to trigger emergency logic
    console.log("Emergency triggered:", { symptom: selectedSymptom, timestamp: new Date() })
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-50 selection:bg-red-500/30">
      {/* Subtle Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-red-900/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-4 md:p-8 lg:p-12 space-y-10">
        {/* Header with System Status */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full w-fit">
              <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-red-500">Live Emergency Link</span>
            </div>
            <h1 className="text-5xl font-black tracking-tighter italic">
              SANJEEVANI <span className="text-red-600">CORE</span>
            </h1>
          </div>

          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Responders</div>
              <div className="text-xl font-black font-mono">14 NEARBY</div>
            </div>
            <div className="w-[1px] bg-slate-800 h-10" />
            <div className="text-right">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ETA (Avg)</div>
              <div className="text-xl font-black font-mono text-emerald-500">2.4 MIN</div>
            </div>
          </div>
        </header>

        {/* SOS Action Section */}
        <section className="relative group">
          <div className="absolute inset-0 bg-red-600/5 blur-2xl group-hover:bg-red-600/10 transition-colors" />
          <div className="relative flex flex-col items-center justify-center space-y-8 py-14 rounded-[2rem] bg-slate-900/40 border border-slate-800 backdrop-blur-xl shadow-2xl">
            <div className="text-center space-y-3 px-6">
              <h2 className="text-3xl font-black uppercase tracking-tighter italic leading-none">Immediate Action Required?</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto font-medium">
                Once triggered, your precise medical profile and GPS coordinates are sent to local authorities and verified doctors.
              </p>
            </div>

            <SlideToSOS onConfirm={handleSOS} />

            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-red-500" /> AES-256 GPS</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-3 h-3 text-red-500" /> VERIFIED LINK</span>
              <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-red-500" /> REAL-TIME SYNC</span>
            </div>
          </div>
        </section>

        {/* Symptom Selection Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-l-4 border-red-600 pl-4">
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight italic">Identify Crisis Type</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Refines responder toolkit preparation</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {symptoms.map((s, idx) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => setSelectedSymptom(s.id)}
                  className={cn(
                    "h-full cursor-pointer border-slate-800 bg-slate-900/60 hover:border-red-600 transition-all group relative overflow-hidden",
                    selectedSymptom === s.id ? "border-red-600 bg-red-600/10 ring-1 ring-red-600/50" : ""
                  )}
                >
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-4">
                    <div className={cn(
                      "p-3 rounded-2xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]",
                      s.bg,
                      selectedSymptom === s.id ? "scale-110 shadow-lg" : ""
                    )}>
                      <s.icon className={cn("w-6 h-6", s.color)} />
                    </div>
                    <span className="font-black text-[11px] uppercase tracking-wider">{s.label}</span>

                    {selectedSymptom === s.id && (
                      <motion.div
                        layoutId="active-tick"
                        className="absolute top-2 right-2"
                      >
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Dynamic Protocol Preview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-start gap-5 hover:bg-slate-900/60 transition-colors">
            <div className="p-4 bg-emerald-500/10 rounded-2xl shrink-0">
              <ShieldAlert className="w-7 h-7 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black uppercase tracking-tight italic">Nearby Medical Support</h4>
              <p className="text-sm text-slate-400 font-medium">12 Medical Professionals and 2 Ambulances are currently tracking your zone.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-start gap-5 hover:bg-slate-900/60 transition-colors">
            <div className="p-4 bg-blue-500/10 rounded-2xl shrink-0">
              <Info className="w-7 h-7 text-blue-500" />
            </div>
            <div className="space-y-1">
              <h4 className="font-black uppercase tracking-tight italic">CPR & Basic Life Support</h4>
              <p className="text-sm text-slate-400 font-medium">Wait for a responder? Follow our interactive first-aid guide to stabilize the patient.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
