"use client"

import { useState, useEffect, memo } from "react"
import { Loader2, ChevronDown, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"

interface LoadingProgressProps {
  details?: DetailsData
  className?: string
}

interface Indicator {
  id: string
  displayName: string
}

interface DetailsData {
  restart: boolean
  indicators?: Indicator[]
  periods?: string[]
  orgUnits?: string[]
}

const DetailsItem = memo(({ label, items }: { label: string; items: string[] | { displayName: string; id: string }[] }) => {
    const prefersReducedMotion = useReducedMotion()
    
    return (
        <div className="space-y-1">
            <span className="font-medium">{label}:</span>
            <div className="flex flex-wrap gap-1">
                {items.map((item, i) => (
                    <motion.span
                        key={typeof item === 'string' ? item : item.id}
                        initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ 
                            delay: prefersReducedMotion ? 0 : i * 0.05,
                            duration: 0.2,
                            ease: "easeOut"
                        }}
                        className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary"
                    >
                        {typeof item === 'string' ? item : item.displayName}
                    </motion.span>
                ))}
            </div>
        </div>
    )
})

DetailsItem.displayName = 'DetailsItem'

export default function DataItemsUpdate({
    details,
    className
}: LoadingProgressProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const prefersReducedMotion = useReducedMotion()

    useEffect(() => {
        let animationFrameId: number
        let lastUpdate = Date.now()
        const duration = 3000 // 3 seconds total animation
        const minInterval = 16 // Minimum 60fps

        const updateProgress = () => {
            const now = Date.now()
            const delta = now - lastUpdate
            
            if (delta >= minInterval) {
                setProgress(prev => {
                    const increment = (delta / duration) * 100
                    const next = Math.min(prev + increment, 100)
                    if (next >= 100) return 100
                    return next
                })
                lastUpdate = now
            }

            if (progress < 100) {
                animationFrameId = requestAnimationFrame(updateProgress)
            }
        }

        animationFrameId = requestAnimationFrame(updateProgress)

        return () => {
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    const normalizedProgress = Math.min(Math.max(progress, 0), 100)

    const containerVariants = {
        open: { 
            opacity: 1, 
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        collapsed: { 
            opacity: 0, 
            height: 0,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.div 
            layout={!prefersReducedMotion}
            layoutRoot
            className={cn("w-full max-w-xl rounded-2xl bg-white shadow-lg overflow-hidden", className)}
        >
            <div className="p-6">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">
                        {progress < 100 ? <Loader2 className="h-5 w-5 animate-spin text-primary" /> : <Check className="h-5 w-5 text-primary" />}
                        <div className="flex-1 space-y-1.5">
                            <h3 className="leading-none tracking-tight">
                                Updating data items
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Fetching new data items from DHIS2
                            </p>
                        </div>
                        {details && (
                            <Button 
                                variant="outline" 
                                size="sm" 
                                className="rounded-full group"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span>Details</span>
                                <ChevronDown 
                                    className={cn(
                                        "ml-2 h-4 w-4 transition-transform duration-300",
                                        isOpen ? "rotate-180" : "rotate-0"
                                    )} 
                                />
                            </Button>
                        )}
                    </div>
                    <div className="relative">
                        <Progress value={normalizedProgress} className="h-2" />
                    </div>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isOpen && details && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={containerVariants}
                    >
                        <div className="border-t px-6 py-4 space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-medium">Configuration</h4>
                                <div className="grid gap-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">Restart:</span>
                                        <span>{details.restart ? "Yes" : "No"}</span>
                                    </div>
                                    {details.indicators && details.indicators.length > 0 && (
                                        <DetailsItem label="Data Items" items={details.indicators} />
                                    )}
                                    {details.periods && details.periods.length > 0 && (
                                        <DetailsItem label="Periods" items={details.periods} />
                                    )}
                                    {details.orgUnits && details.orgUnits.length > 0 && (
                                        <DetailsItem label="Organization Units" items={details.orgUnits} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

