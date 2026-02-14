import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { IronManModel } from './IronManModel'

const LoadingScreen = () => (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 flex-col">
    <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-white font-black tracking-widest text-xs uppercase animate-pulse">Initializing Hero Assets...</p>
  </div>
)

export function ModelViewer({ ModelComponent, cameraTarget = [0, 0, 0] }) {
  return (
    <div className="w-full h-full absolute inset-0 z-10 bg-black">
      <Suspense fallback={<LoadingScreen />}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [0, 0, 7], fov: 45 }} 
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} castShadow shadow-mapSize={[512, 512]} />
          <ModelComponent />
          <Environment preset="city" />
          <ContactShadows position={[0, -0.9, 0]} opacity={0.4} scale={10} blur={2.8} far={4} resolution={128} />
          <OrbitControls enableZoom={true} enablePan={false} rotateSpeed={0.5} target={cameraTarget} />
        </Canvas>
      </Suspense>
    </div>
  )
}
