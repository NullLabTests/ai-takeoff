"use client"

import { Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SoundControllerProps {
  isMuted: boolean
  toggleMute: () => void
}

export function SoundController({ isMuted, toggleMute }: SoundControllerProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="h-8 w-8">
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{isMuted ? "Unmute sounds" : "Mute sounds"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

