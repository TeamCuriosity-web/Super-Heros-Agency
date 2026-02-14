import React from 'react'
import { Box, Cylinder } from '@react-three/drei'

export function CaptainAmericaModel(props) {
  return (
    <group {...props}>
      {/* Body */}
      <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1d4ed8" />
      </Box>
      {/* Head */}
      <Box args={[1.2, 1, 1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#1d4ed8" />
      </Box>
      {/* Star */}
      <Box args={[0.4, 0.4, 0.1]} position={[0, 0.3, 0.5]}>
        <meshStandardMaterial color="white" />
      </Box>
      {/* Shield */}
      <Cylinder args={[0.8, 0.8, 0.1, 64]} rotation={[Math.PI / 2, 0, 0]} position={[1.2, 0, 0.5]}>
        <meshStandardMaterial color="#b91c1c" />
        <Cylinder args={[0.4, 0.4, 0.11, 64]} position={[0, 0.01, 0]}>
           <meshStandardMaterial color="white" />
        </Cylinder>
      </Cylinder>
    </group>
  )
}
