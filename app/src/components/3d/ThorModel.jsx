import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box, Cylinder } from '@react-three/drei'
import * as THREE from 'three'

export function ThorModel(props) {
  const groupRef = useRef()
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!groupRef.current) return
    const box = new THREE.Box3().setFromObject(groupRef.current)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units
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
      </group>
    </group>
  )
}

