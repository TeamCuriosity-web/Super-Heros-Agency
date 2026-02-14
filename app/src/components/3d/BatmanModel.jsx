import React from 'react'
import { Box } from '@react-three/drei'

export function BatmanModel(props) {
  return (
    <group {...props}>
      <Box args={[1.8, 3, 1]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </Box>
      {/* Small "ears" for the placeholder */}
      <Box args={[0.3, 0.5, 0.3]} position={[0.5, 1.6, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>
      <Box args={[0.3, 0.5, 0.3]} position={[-0.5, 1.6, 0]}>
        <meshStandardMaterial color="#0f172a" />
      </Box>
    </group>
  )
}
