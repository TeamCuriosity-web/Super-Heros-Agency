import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei'
import { IronManModel } from './IronManModel'

export function ModelViewer() {
  return (
    <div className="w-full h-full absolute inset-0 z-10">
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={100} castShadow />
        <Suspense fallback={null}>
          <IronManModel position={[0, -1.5, 0]} rotation={[0, 0, 0]} />
          <Environment preset="city" />
          <ContactShadows position={[0, -1.6, 0]} opacity={0.5} scale={10} blur={2.5} far={4} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 2.5} maxPolarAngle={Math.PI / 1.5} />
      </Canvas>
    </div>
  )
}
