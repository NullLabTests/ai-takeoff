"use client"

import { useState } from "react"
import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export function InfoPanel() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-6 w-full border rounded-lg">
      <CollapsibleTrigger asChild>
        <Button variant="ghost" className="flex w-full justify-between p-4">
          <div className="flex items-center">
            <Info className="mr-2 h-4 w-4" />
            <span>About This Visualization</span>
          </div>
          <div className="text-xs text-muted-foreground">{isOpen ? "Hide" : "Show"}</div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4">
        <div className="space-y-2 text-sm">
          <p>
            This 3D model demonstrates different theoretical patterns of AI capability growth from a seed AI. The
            visualization shows how intelligence might develop over time according to different takeoff scenarios.
          </p>
          <p>
            The concept of AI takeoff refers to the hypothetical future event where an artificial intelligence system
            rapidly improves its capabilities, potentially leading to artificial general intelligence (AGI) or
            superintelligence.
          </p>
          <p>
            Each node in the visualization represents a generation of AI improvement, with the size and color indicating
            the level of capability. The connections between nodes show the development path.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Note: This is a conceptual visualization and not a precise prediction of how AI development will unfold.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

