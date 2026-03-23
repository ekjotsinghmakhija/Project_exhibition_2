"use client"

import React, { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronRight, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SlideToSOSProps {
  onConfirm: () => void
  className?: string
}

export default function SlideToSOS({ onConfirm, className }: SlideToSOSProps) {
  const [isTriggered, setIsTriggered] = useState(false)
  const x = useMotionValue(0)

  // Visual transformations based on drag distance
  const opacity = useTransform(x, [0, 150], [1, 0])
  const bgWidth = useTransform(x, [0, 240], ["0%", "100%"])
  const textX = useTransform(x, [0, 240], [0, 20])

  const handleDragEnd = () => {
    // If dragged more than 200px, trigger the action
    if (x.get() > 200) {
      setIsTriggered(true)
      onConfirm()
    } else {
      x.set(0)
    }
  }

  return (
    <div className={cn(
      "relative w-full max-w-md h-20 bg-slate-950 rounded-full border-2 border-slate-800 overflow-hidden shadow-[0_0_30px_rgba(220,38,38,0.2)] p-2 select-none",
      className
    )}>
      {/* Dynamic Background Fill */}
      <motion.div
        style={{ width: bgWidth }}
        className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-red-600/30 to-red-600/60 z-0"
      />

      {/* Instructional Text */}
      <motion.div
        style={{ opacity, x: textX }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
      >
        <span className="text-red-500 font-black uppercase tracking-[0.2em] text-sm animate-pulse">
          Slide to Trigger SOS
        </span>
      </motion.div>

      {/* Draggable Trigger */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 240 }}
        dragElastic={0.05}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className={cn(
          "relative z-20 w-16 h-16 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-xl transition-colors duration-500",
          isTriggered ? "bg-emerald-500" : "bg-red-600 hover:bg-red-500"
        )}
      >
        <AnimatePresence mode="wait">
          {isTriggered ? (
            <motion.div
              key="check"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
            >
              <CheckCircle2 className="text-white w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div key="arrow" animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
              <ChevronRight className="text-white w-10 h-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {isTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-emerald-500 flex items-center justify-center z-30"
          >
            <span className="text-white font-black italic text-xl tracking-tighter uppercase">
              Alert Broadcasted
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
