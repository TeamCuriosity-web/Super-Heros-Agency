import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box } from '@react-three/drei'
import * as THREE from 'three'

export function BatmanModel(props) {
  const groupRef = useRef()
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

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
          <Box args={[1.5, 2, 0.8]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
          </Box>
          <Box args={[1.6, 2.5, 0.1]} position={[0, -0.2, -0.5]}>
            <meshStandardMaterial color="black" />
          </Box>
          <Box args={[1.2, 1, 1]} position={[0, 1.5, 0]}>
            <meshStandardMaterial color="#1e293b" />
          </Box>
          <Box args={[0.2, 0.4, 0.2]} position={[0.4, 2.1, 0]}>
            <meshStandardMaterial color="#1e293b" />
          </Box>
          <Box args={[0.2, 0.4, 0.2]} position={[-0.4, 2.1, 0]}>
            <meshStandardMaterial color="#1e293b" />
          </Box>
        </group>
      </group>
    </group>
  )
}

