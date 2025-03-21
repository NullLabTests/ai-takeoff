"use client"

import { Suspense, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AITakeoffVisualization() {
  const [takeoffType, setTakeoffType] = useState("slow")

  return (
    <div className="flex flex-col h-screen">
      <div className="p-4 bg-background border-b">
        <h1 className="text-2xl font-bold">AI Takeoff Visualization</h1>
        <p className="text-muted-foreground">Visualizing different intelligence explosion scenarios from a seed AI</p>
      </div>

      <div className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-3/4 h-[500px] md:h-full">
          <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
              <pointLight position={[-10, -10, -10]} />

              <TakeoffVisualization type={takeoffType} />

              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="w-full md:w-1/4 p-4 overflow-y-auto">
          <Tabs defaultValue="slow" value={takeoffType} onValueChange={setTakeoffType}>
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
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">About This Visualization</h3>
            <p className="text-sm text-muted-foreground mb-4">
              This 3D model demonstrates different theoretical patterns of AI capability growth from a seed AI. The
              visualization shows how intelligence might develop over time according to different takeoff scenarios.
            </p>
            <Button variant="outline" className="w-full" onClick={() => setTakeoffType("slow")}>
              Reset View
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TakeoffVisualization({ type }) {
  return (
    <group>
      {/* Base seed AI node */}
      <mesh position={[0, -6, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#0ea5e9" />
      </mesh>

      <Text position={[0, -8, 0]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
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

    return (
      <group key={i}>
        <mesh position={[0, y, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Connection line from previous node */}
        {i > 0 && (
          <mesh position={[0, y - 0.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        )}
      </group>
    )
  })

  return (
    <group>
      {nodes}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text position={[3, 0, 0]} fontSize={0.7} color="#ffffff" anchorX="center" anchorY="middle">
          Slow Takeoff
        </Text>
        <Text position={[3, -1, 0]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
          Gradual improvement
        </Text>
        <Text position={[3, -1.7, 0]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
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

    return (
      <group key={i}>
        <mesh position={[0, y, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Connection line from previous node */}
        {i > 0 && (
          <mesh position={[0, y - factor * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, factor * 0.8, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        )}
      </group>
    )
  })

  return (
    <group>
      {nodes}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text position={[3, 0, 0]} fontSize={0.7} color="#ffffff" anchorX="center" anchorY="middle">
          Moderate Takeoff
        </Text>
        <Text position={[3, -1, 0]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
          Significant progress
        </Text>
        <Text position={[3, -1.7, 0]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
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

    return (
      <group key={i}>
        <mesh position={[0, y, 0]}>
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial color={color} />
        </mesh>

        {/* Connection line from previous node */}
        {i > 0 && (
          <mesh position={[0, y - factor * 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.05, 0.05, factor * 0.5, 8]} />
            <meshStandardMaterial color="#64748b" />
          </mesh>
        )}
      </group>
    )
  })

  return (
    <group>
      {nodes}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text position={[3, 0, 0]} fontSize={0.7} color="#ffffff" anchorX="center" anchorY="middle">
          Fast Takeoff
        </Text>
        <Text position={[3, -1, 0]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
          Rapid intelligence
        </Text>
        <Text position={[3, -1.7, 0]} fontSize={0.4} color="#94a3b8" anchorX="center" anchorY="middle">
          explosion in days/weeks
        </Text>
      </Float>
    </group>
  )
}

