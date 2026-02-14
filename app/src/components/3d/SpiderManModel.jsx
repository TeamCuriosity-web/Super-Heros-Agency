import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

export function SpiderManModel(props) {
  // RESTORING PREMIUM PROCEDURAL SPIDER-MAN (RED/BLUE) FOR ORIGINAL COLOR FIDELITY
  // The FBX/OBJ variants were either Miles Morales or Cosmic, which frustrated the user.
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })
  const groupRef = useRef()

  useLayoutEffect(() => {
    // Standardize to 4.5 units height
    const targetHeight = 4.5
    const boxesSize = 4.5 // Hand-calibrated
    setTransform({
      scale: targetHeight / boxesSize,
      offset: [0, 0, 0]
    })
  }, [])

  return (
    <group {...props}>
      <group position={[0, -2, 0]} scale={transform.scale}>
        <group ref={groupRef}>
          {/* Head - Classic Red */}
          <Box args={[1.2, 1, 1]} position={[0, 3.5, 0]}>
            <meshStandardMaterial color="#b91c1c" roughness={0.4} metalness={0.1} />
          </Box>
          {/* Eyes - Expressive White */}
          <Box args={[0.3, 0.3, 0.1]} position={[0.3, 3.6, 0.51]}>
            <meshStandardMaterial color="white" />
          </Box>
          <Box args={[0.3, 0.3, 0.1]} position={[-0.3, 3.6, 0.51]}>
            <meshStandardMaterial color="white" />
          </Box>

          {/* Torso - Iconic Red with Blue sides */}
          <Box args={[1.6, 1.8, 0.9]} position={[0, 2.1, 0]}>
             <meshStandardMaterial attach="material-0" color="#1d4ed8" /> {/* Left */}
             <meshStandardMaterial attach="material-1" color="#1d4ed8" /> {/* Right */}
             <meshStandardMaterial attach="material-2" color="#b91c1c" /> {/* Top */}
             <meshStandardMaterial attach="material-3" color="#b91c1c" /> {/* Bottom */}
             <meshStandardMaterial attach="material-4" color="#b91c1c" /> {/* Front */}
             <meshStandardMaterial attach="material-5" color="#b91c1c" /> {/* Back */}
          </Box>

          {/* Arms - Red shoulders, Red forearms */}
          <Box args={[0.5, 1.2, 0.5]} position={[1.05, 2, 0]}>
            <meshStandardMaterial color="#b91c1c" />
          </Box>
          <Box args={[0.5, 1.2, 0.5]} position={[-1.05, 2, 0]}>
            <meshStandardMaterial color="#b91c1c" />
          </Box>

          {/* Legs - Classic Hero Blue */}
          <Box args={[0.7, 1.4, 0.7]} position={[0.4, 0.7, 0]}>
            <meshStandardMaterial color="#1d4ed8" />
          </Box>
          <Box args={[0.7, 1.4, 0.7]} position={[-0.4, 0.7, 0]}>
            <meshStandardMaterial color="#1d4ed8" />
          </Box>

          {/* Boots - Red boots to complete the look */}
          <Box args={[0.72, 0.4, 0.72]} position={[0.4, 0.2, 0]}>
            <meshStandardMaterial color="#b91c1c" />
          </Box>
          <Box args={[0.72, 0.4, 0.72]} position={[-0.4, 0.2, 0]}>
            <meshStandardMaterial color="#b91c1c" />
          </Box>
        </group>
      </group>
    </group>
  )
}
