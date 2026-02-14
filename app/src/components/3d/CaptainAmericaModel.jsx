import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box, Cylinder, Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function CaptainAmericaModel(props) {
  const groupRef = useRef()
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  // High-fidelity LEGO textures
  const headTexture = useTexture('models/captain/0x0bb2cd85.png')
  const torsoTexture = useTexture('models/captain/0x20cbdca0.png')
  const shieldTexture = useTexture('models/captain/0x59be2e63.png')

  useLayoutEffect(() => {
    if (!groupRef.current) return
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -center.y, -center.z]
    })
  }, [])

  return (
    <group {...props}>
      <group position={[0, 1.2, 0]} scale={transform.scale}>
        <group ref={groupRef} position={transform.offset}>
          {/* Head & Helmet - Textured Face (Front only) */}
          <group position={[0, 1.5, 0]}>
            <Box args={[1.2, 1, 1]}>
              <meshStandardMaterial attach="material-0" color="#1d4ed8" />
              <meshStandardMaterial attach="material-1" color="#1d4ed8" />
              <meshStandardMaterial attach="material-2" color="#1d4ed8" />
              <meshStandardMaterial attach="material-3" color="#1d4ed8" />
              <meshStandardMaterial attach="material-4" map={headTexture} color="#ffffff" />
              <meshStandardMaterial attach="material-5" color="#1d4ed8" />
            </Box>
            {/* Wings - subtle subtle detail */}
            <Box args={[0.05, 0.4, 0.2]} position={[0.62, 0.1, 0]}>
              <meshStandardMaterial color="white" />
            </Box>
            <Box args={[0.05, 0.4, 0.2]} position={[-0.62, 0.1, 0]}>
              <meshStandardMaterial color="white" />
            </Box>
          </group>

          {/* Torso - Textured with the Iconic Star and Belt (Applied to Front only) */}
          <Box args={[1.5, 2, 0.8]} position={[0, 0, 0]}>
            <meshStandardMaterial attach="material-0" color="#1d4ed8" />
            <meshStandardMaterial attach="material-1" color="#1d4ed8" />
            <meshStandardMaterial attach="material-2" color="#1d4ed8" />
            <meshStandardMaterial attach="material-3" color="#1d4ed8" />
            <meshStandardMaterial attach="material-4" map={torsoTexture} color="#ffffff" roughness={0.3} metalness={0.2} />
            <meshStandardMaterial attach="material-5" color="#1d4ed8" />
          </Box>
          
          {/* Armored Studs (LEGO Vibe) */}
          <Cylinder args={[0.2, 0.2, 0.2, 32]} position={[0.7, 1, 0]} rotation={[0, 0, Math.PI/2]}>
            <meshStandardMaterial color="#1d4ed8" />
          </Cylinder>
          <Cylinder args={[0.2, 0.2, 0.2, 32]} position={[-0.7, 1, 0]} rotation={[0, 0, Math.PI/2]}>
            <meshStandardMaterial color="#1d4ed8" />
          </Cylinder>

          {/* Legs */}
          <group position={[0, -1.25, 0]}>
            <Box args={[1.5, 0.5, 1]}>
              <meshStandardMaterial color="#1e3a8a" />
            </Box>
            <Box args={[0.7, 1, 0.9]} position={[0.4, -0.6, 0]}>
              <meshStandardMaterial color="#1d4ed8" />
            </Box>
            <Box args={[0.7, 1, 0.9]} position={[-0.4, -0.6, 0]}>
              <meshStandardMaterial color="#1d4ed8" />
            </Box>
          </group>

          {/* Shield - Textured Vibranium Disk */}
          <group position={[1.4, 0, 0.3]} rotation={[0, -Math.PI / 6, 0]}>
            <Cylinder args={[1.1, 1.1, 0.1, 64]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial map={shieldTexture} color="#ffffff" metalness={0.8} roughness={0.2} />
            </Cylinder>
          </group>
        </group>
      </group>
    </group>
  )
}

