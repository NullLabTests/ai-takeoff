"use client"

import { Suspense, useState, useEffect, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SoundController } from "@/components/sound-controller"
import { InfoPanel } from "@/components/info-panel"
import { Analytics } from "@/components/analytics"

export default function AITakeoffVisualization() {
  const [takeoffType, setTakeoffType] = useState("slow")
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef(null)

  // Handle takeoff type change
  const handleTakeoffChange = (value) => {
    setTakeoffType(value)

    // Play corresponding sound if not muted
    if (!isMuted && audioRef.current) {
      // Stop any currently playing audio
      audioRef.current.pause()
      audioRef.current.currentTime = 0

      // Set the source based on the takeoff type
      audioRef.current.src = `/sounds/${value}-takeoff.mp3`
      audioRef.current.play().catch((e) => console.log("Audio playback prevented:", e))
    }
  }

  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
    }
  }

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio(`/sounds/slow-takeoff.mp3`)
    audioRef.current.loop = true
    audioRef.current.volume = 0.5

    // Clean up on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-background/90">
      <header className="p-4 bg-background/80 backdrop-blur-sm border-b z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">AI Takeoff Visualization</h1>
            <p className="text-muted-foreground">
              Visualizing different intelligence explosion scenarios from a seed AI
            </p>
          </div>
          <SoundController isMuted={isMuted} toggleMute={toggleMute} />
        </div>
      </header>

      <main className="flex flex-col md:flex-row flex-1 container mx-auto">
        <div className="w-full md:w-3/4 h-[500px] md:h-full relative">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            dpr={[1, 2]} // Optimize for different device pixel ratios
            performance={{ min: 0.5 }} // Performance optimization
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <Suspense fallback={<LoadingFallback />}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <TakeoffVisualization type={takeoffType} />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={30}
                dampingFactor={0.05}
                rotateSpeed={0.5}
              />
              <Environment preset="city" />
            </Suspense>
          </Canvas>

          {/* Version and attribution */}
          <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">v1.0.0 | Created by nulllabtests</div>
        </div>

        <aside className="w-full md:w-1/4 p-4 overflow-y-auto">
          <Tabs defaultValue="slow" value={takeoffType} onValueChange={handleTakeoffChange} className="space-y-4">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="slow">Slow</TabsTrigger>
              <TabsTrigger value="moderate">Moderate</TabsTrigger>
              <TabsTrigger value="fast">Fast</TabsTrigger>
            </TabsList>

            <TabsContent value="slow">
              <Card>
                <CardHeader>
                  <CardTitle>Slow Takeoff</CardTitle>
                  <CardDescription>Gradual improvement over decades</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    In a slow takeoff scenario, AI capabilities improve gradually over many years or decades. Progress
                    is visible but incremental, giving society time to adapt to each advancement.
                  </p>
                  <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                    <li>Continuous, predictable progress</li>
                    <li>Multiple AI systems develop in parallel</li>
                    <li>Human oversight remains effective</li>
                    <li>Economic impacts are absorbed gradually</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="moderate">
              <Card>
                <CardHeader>
                  <CardTitle>Moderate Takeoff</CardTitle>
                  <CardDescription>Significant progress over years</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    A moderate takeoff involves more rapid advancement than a slow takeoff, with significant
                    capabilities emerging over a period of years rather than decades, but still allowing some time for
                    adaptation.
                  </p>
                  <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                    <li>Accelerating progress with key breakthroughs</li>
                    <li>Leading AI systems gain advantages</li>
                    <li>Regulatory frameworks struggle to keep pace</li>
                    <li>Economic disruption becomes significant</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fast">
              <Card>
                <CardHeader>
                  <CardTitle>Fast Takeoff</CardTitle>
                  <CardDescription>Rapid intelligence explosion</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    In a fast takeoff scenario, once a seed AI reaches a certain threshold, it rapidly self-improves in
                    a matter of days or weeks, potentially leading to superintelligence before human intervention is
                    possible.
                  </p>
                  <ul className="mt-2 text-sm list-disc pl-5 space-y-1">
                    <li>Exponential self-improvement</li>
                    <li>Single system achieves decisive strategic advantage</li>
                    <li>Human control becomes challenging or impossible</li>
                    <li>Transformative economic and social impacts</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <InfoPanel />

          <div className="mt-6 space-y-2">
            <Button variant="outline" className="w-full" onClick={() => handleTakeoffChange("slow")}>
              Reset View
            </Button>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => window.open("https://github.com/nulllabtests/ai-takeoff-visualization", "_blank")}
            >
              View Source
            </Button>
          </div>
        </aside>
      </main>

      <Analytics />
    </div>
  )
}

// Loading fallback component
function LoadingFallback() {
  return (
    <Text position={[0, 0, 0]} fontSize={1} color="#ffffff" anchorX="center" anchorY="middle">
      Loading visualization...
    </Text>
  )
}

function TakeoffVisualization({ type }) {
  return (
    <group>
      {/* Base seed AI node */}
      <mesh position={[0, -6, 0]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#0ea5e9"
          roughness={0.3}
          metalness={0.7}
          emissive="#0ea5e9"
          emissiveIntensity={0.2}
        />
      </mesh>

      <Text
        position={[0, -8, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.woff"
      >
        Seed AI
      </Text>

      {/* Growth visualization based on takeoff type */}
      {type === "slow" && <SlowTakeoff />}
      {type === "moderate" && <ModerateTakeoff />}
      {type === "fast" && <FastTakeoff />}
    </group>
  )
}

function SlowTakeoff() {
  // Create nodes with gradual, linear growth
  const nodes = Array.from({ length: 10 }, (_, i) => {
    const y = -6 + (i + 1) * 1
    const size = 0.2 + i * 0.1
    const color = i < 3 ? "#0ea5e9" : i < 7 ? "#6366f1" : "#8b5cf6"
    const emissiveIntensity = 0.1 + i * 0.05

    return (
      <group key={i}>
        <mesh position={[0, y, 0]} castShadow receiveShadow>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>

        {/* Connection line from previous node */}
        {i > 0 && (
          <mesh position={[0, y - 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color="#64748b" opacity={0.7} transparent />
          </mesh>
        )}
      </group>
    )
  })

  return (
    <group>
      {nodes}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[3, 0, 0]}
          fontSize={0.7}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Slow Takeoff
        </Text>
        <Text
          position={[3, -1, 0]}
          fontSize={0.4}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          Gradual improvement
        </Text>
        <Text
          position={[3, -1.7, 0]}
          fontSize={0.4}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          over decades
        </Text>
      </Float>
    </group>
  )
}

function ModerateTakeoff() {
  // Create nodes with accelerating growth
  const nodes = Array.from({ length: 10 }, (_, i) => {
    // Exponential growth but not too extreme
    const factor = Math.pow(1.3, i)
    const y = -6 + factor * 0.8
    const size = 0.2 + i * 0.15
    const color = i < 3 ? "#0ea5e9" : i < 7 ? "#6366f1" : "#8b5cf6"
    const emissiveIntensity = 0.1 + i * 0.08

    return (
      <group key={i}>
        <mesh position={[0, y, 0]} castShadow receiveShadow>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>

        {/* Connection line from previous node */}
        {i > 0 && (
          <mesh position={[0, y - factor * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, factor * 0.8, 8]} />
            <meshStandardMaterial color="#64748b" opacity={0.7} transparent />
          </mesh>
        )}
      </group>
    )
  })

  return (
    <group>
      {nodes}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[3, 0, 0]}
          fontSize={0.7}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Moderate Takeoff
        </Text>
        <Text
          position={[3, -1, 0]}
          fontSize={0.4}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          Significant progress
        </Text>
        <Text
          position={[3, -1.7, 0]}
          fontSize={0.4}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          over years
        </Text>
      </Float>
    </group>
  )
}

function FastTakeoff() {
  // Create nodes with rapid exponential growth
  const nodes = Array.from({ length: 10 }, (_, i) => {
    // Dramatic exponential growth
    const factor = Math.pow(1.8, i)
    const y = -6 + factor * 0.5
    const size = 0.2 + i * 0.25
    const color = i < 2 ? "#0ea5e9" : i < 5 ? "#6366f1" : "#8b5cf6"
    const emissiveIntensity = 0.1 + i * 0.12

    return (
      <group key={i}>
        <mesh position={[0, y, 0]} castShadow receiveShadow>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            emissive={color}
            emissiveIntensity={emissiveIntensity}
          />
        </mesh>

        {/* Connection line from previous node */}
        {i > 0 && (
          <mesh position={[0, y - factor * 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, factor * 0.5, 8]} />
            <meshStandardMaterial color="#64748b" opacity={0.7} transparent />
          </mesh>
        )}
      </group>
    )
  })

  return (
    <group>
      {nodes}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[3, 0, 0]}
          fontSize={0.7}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
        >
          Fast Takeoff
        </Text>
        <Text
          position={[3, -1, 0]}
          fontSize={0.4}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          Rapid intelligence
        </Text>
        <Text
          position={[3, -1.7, 0]}
          fontSize={0.4}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Regular.woff"
        >
          explosion in days/weeks
        </Text>
      </Float>
    </group>
  )
}

