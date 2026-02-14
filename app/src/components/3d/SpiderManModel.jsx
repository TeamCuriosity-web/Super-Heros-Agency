import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function SpiderManModel(props) {
  const fbx = useLoader(FBXLoader, 'models/spiderman_new/Spider-Man Cosmic Invasion.fbx')
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  // High-fidelity Cosmic Texture
  const colorMap = useTexture('models/spiderman_new/T_1036801_Body_D.png', (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.flipY = false
  })

  useLayoutEffect(() => {
    if (!fbx) return

    fbx.traverse((child) => {
      if (child.isMesh) {
        child.material.map = colorMap
        child.material.side = THREE.DoubleSide
        child.material.transparent = false
        child.material.alphaTest = 0.5
        // Ensure no color overrides wash out the map
        child.material.color = new THREE.Color(0xffffff)
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(fbx)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units
    const targetHeight = 5.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    // Perfect alignment: Center horizontally, but align bottom to y=0 in local group
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [fbx, colorMap])

  return (
    <group {...props}>
      <group position={[0, -1.5, 0]} scale={transform.scale}>
        <primitive object={fbx} position={transform.offset} />
      </group>
    </group>
  )
}
