import React, { useLayoutEffect, useRef, useState } from 'react'
import { Box, Cylinder, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export function CaptainAmericaModel(props) {
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
          {/* Head & Helmet */}
          <group position={[0, 1.5, 0]}>
            <Box args={[1.2, 1, 1]}>
              <meshStandardMaterial color="#1d4ed8" />
            </Box>
            {/* Wings */}
            <Box args={[0.1, 0.4, 0.3]} position={[0.65, 0.1, 0]}>
              <meshStandardMaterial color="white" />
            </Box>
            <Box args={[0.1, 0.4, 0.3]} position={[-0.65, 0.1, 0]}>
              <meshStandardMaterial color="white" />
            </Box>
            {/* Helmet Logo "A" */}
            <Box args={[0.4, 0.4, 0.1]} position={[0, 0.1, 0.51]}>
              <meshStandardMaterial color="white" />
            </Box>
          </group>

          {/* Torso */}
          <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#1d4ed8" roughness={0.3} metalness={0.2} />
          </Box>
          {/* Chest Star */}
          <Box args={[0.5, 0.5, 0.1]} position={[0, 0.3, 0.51]}>
            <meshStandardMaterial color="white" />
          </Box>
          {/* Belts */}
          <Box args={[1.55, 0.2, 1.05]} position={[0, -0.6, 0]}>
            <meshStandardMaterial color="#7c2d12" />
          </Box>

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

          {/* Shield - The Iconic Vibranium Disk */}
          <group position={[1.4, 0, 0.3]} rotation={[0, -Math.PI / 6, 0]}>
            <Cylinder args={[1.1, 1.1, 0.1, 64]} rotation={[Math.PI / 2, 0, 0]}>
              <meshStandardMaterial color="#b91c1c" metalness={0.8} roughness={0.2} />
              
              <Cylinder args={[0.8, 0.8, 0.12, 64]} position={[0, 0.01, 0]}>
                <meshStandardMaterial color="white" metalness={0.8} />
                
                <Cylinder args={[0.5, 0.5, 0.14, 64]} position={[0, 0.01, 0]}>
                  <meshStandardMaterial color="#b91c1c" metalness={0.8} />
                  
                  <Sphere args={[0.3, 32, 32]} position={[0, 0.05, 0]} scale={[1, 0.1, 1]}>
                    <meshStandardMaterial color="#1d4ed8" metalness={0.8} />
                  </Sphere>
                  {/* Small Star on Shield */}
                  <Box args={[0.2, 0.2, 0.05]} position={[0, 0.08, 0]}>
                    <meshStandardMaterial color="white" />
                  </Box>
                </Cylinder>
              </Cylinder>
            </Cylinder>
          </group>
        </group>
      </group>
    </group>
  )
}

