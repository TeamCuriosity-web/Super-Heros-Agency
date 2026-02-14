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
        // Create a fresh material to avoid "pink" shader errors from original FBX materials
        const newMat = new THREE.MeshStandardMaterial({
          map: colorMap,
          side: THREE.DoubleSide,
          transparent: false,
          alphaTest: 0.5,
          color: 0xffffff,
          roughness: 0.7,
          metalness: 0.2
        })
        child.material = newMat
      }
    })

    // Compute bounding box from MESHES ONLY to avoid rigs/helpers distorting sizing
    const box = new THREE.Box3()
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.geometry.computeBoundingBox()
        const childBox = new THREE.Box3().copy(child.geometry.boundingBox).applyMatrix4(child.matrixWorld)
        box.union(childBox)
      }
    })

    if (box.isEmpty()) box.setFromObject(fbx) // Fallback

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    // Normalize scale to height of 4.5 units (scaled down from 5.5 for better fit)
    const targetHeight = 4.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [fbx, colorMap])

  return (
    <group {...props}>
      <group position={[0, -2, 0]} scale={transform.scale}>
        <primitive object={fbx} position={transform.offset} />
      </group>
    </group>
  )
}
