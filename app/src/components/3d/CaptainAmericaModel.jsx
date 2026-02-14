import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function CaptainAmericaModel(props) {
  const fbx = useLoader(FBXLoader, 'models/captain/cap.fbx')
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  // PBR Textures for the new model
  const colorMap = useTexture('models/captain/mat0_c.jpg.png')
  const normalMap = useTexture('models/captain/mat0_n.jpg.png')

  useLayoutEffect(() => {
    if (!fbx) return

    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = colorMap
        child.material.normalMap = normalMap
        child.material.side = THREE.DoubleSide
        
        // Fix for "color not showing": ensure material color is white so map shows fully, 
        // and add subtle emissive for vibrancy
        child.material.color = new THREE.Color(0xffffff)
        child.material.emissive = new THREE.Color(0xffffff)
        child.material.emissiveIntensity = 0.1
        
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(fbx)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units to match others exactly
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -center.y, -center.z]
    })
  }, [fbx, colorMap, normalMap])

  return (
    <group {...props}>
      <group position={[0, 1.2, 0]} scale={transform.scale}>
        <primitive object={fbx} position={transform.offset} />
      </group>
    </group>
  )
}
