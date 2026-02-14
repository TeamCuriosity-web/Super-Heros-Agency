import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

export function CaptainAmericaModel(props) {
  const groupRef = useRef()
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!groupRef.current) return
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units to match other heroes
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
          {/* Body */}
          <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.2} />
          </Box>
          {/* Legs */}
          <Box args={[1.5, 0.5, 1]} position={[0, -1.25, 0]}>
            <meshStandardMaterial color="#1e3a8a" />
          </Box>
          {/* Head */}
          <Box args={[1.2, 1, 1]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#1d4ed8" />
          </Box>
          {/* Star */}
          <Box args={[0.4, 0.4, 0.1]} position={[0, 0.3, 0.51]}>
            <meshStandardMaterial color="white" />
          </Box>
          {/* Shield */}
          <Cylinder args={[0.8, 0.8, 0.1, 64]} rotation={[Math.PI / 2, 0, 0]} position={[1.2, 0, 0.5]}>
            <meshStandardMaterial color="#b91c1c" />
            <Cylinder args={[0.4, 0.4, 0.11, 64]} position={[0, 0.01, 0]}>
               <meshStandardMaterial color="white" />
               <Box args={[0.1, 0.1, 0.01]} position={[0, 0.06, 0]}>
                 <meshStandardMaterial color="#1d4ed8" />
               </Box>
            </Cylinder>
          </Cylinder>
        </group>
      </group>
    </group>
  )
}

