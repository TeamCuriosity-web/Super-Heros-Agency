import React from 'react'
import { Box, Cylinder } from '@react-three/drei'

export function ThorModel(props) {
  return (
    <group {...props}>
      {/* Body */}
      <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#334155" metalness={0.5} />
      </Box>
      {/* Cape */}
      <Box args={[1.8, 2.5, 0.1]} position={[0, -0.2, -0.6]}>
        <meshStandardMaterial color="#991b1b" />
      </Box>
      {/* Head */}
      <Box args={[1.2, 1, 1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#fde047" />
      </Box>
      {/* Hammer (Mjolnir) */}
      <group position={[1.2, -0.5, 0.5]}>
        <Box args={[0.8, 0.5, 0.5]}>
          <meshStandardMaterial color="#94a3b8" metalness={0.8} />
        </Box>
        <Cylinder args={[0.1, 0.1, 1, 16]} position={[0, -0.5, 0]}>
          <meshStandardMaterial color="#78350f" />
        </Cylinder>
      </group>
    </group>
  )
}
