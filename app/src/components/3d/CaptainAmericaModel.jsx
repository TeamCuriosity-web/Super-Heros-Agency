import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function CaptainAmericaModel(props) {
  const fbx = useLoader(FBXLoader, 'models/captain/cap.fbx')
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  // High-fidelity LEGO textures
  const colorMap = useTexture('models/captain/mat0_c.jpg.png', (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.flipY = false
  })
  const normalMap = useTexture('models/captain/mat0_n.jpg.png', (t) => {
    t.flipY = false
  })

  useLayoutEffect(() => {
    if (!fbx) return

    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = colorMap
        child.material.normalMap = normalMap
        child.material.side = THREE.DoubleSide
        
        // Restore real colors: use clean white and subtle lighting
        child.material.color = new THREE.Color(0xffffff)
        child.material.emissive = new THREE.Color(0xffffff)
        child.material.emissiveIntensity = 0.05
        
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(fbx)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    // Perfect alignment: Center horizontally, align bottom to local y=0
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [fbx, colorMap, normalMap])

  return (
    <group {...props}>
      <group position={[0, -1.5, 0]} scale={transform.scale}>
        <primitive object={fbx} position={transform.offset} />
      </group>
    </group>
  )
}
