import React from 'react'
import { Box, Cylinder } from '@react-three/drei'

export function IronManModel(props) {
  return (
    <group {...props}>
      {/* Body */}
      <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#991b1b" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Head */}
      <Box args={[1.2, 1, 1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#991b1b" metalness={0.8} roughness={0.2} />
      </Box>
      {/* Face Plate */}
      <Box args={[0.9, 0.8, 0.1]} position={[0, 1.5, 0.5]}>
        <meshStandardMaterial color="#fde047" metalness={0.9} roughness={0.1} />
      </Box>
      {/* Arc Reactor */}
      <Cylinder args={[0.2, 0.2, 0.1, 32]} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.3, 0.5]}>
        <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={5} />
      </Cylinder>
    </group>
  )
}
