import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function CaptainAmericaModel(props) {
  const fbx = useLoader(FBXLoader, 'models/captain/cap.fbx')
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  // High-fidelity LEGO textures - Restored to .jpg to satisfy internal FBX loader paths
  const colorMap = useTexture('models/captain_new/mat0_c.jpg.png', (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.flipY = false
  })
  const normalMap = useTexture('models/captain_new/mat0_n.jpg.png', (t) => {
    t.flipY = false
  })

  useLayoutEffect(() => {
    if (!fbx) return

    fbx.traverse((child) => {
      if (child.isMesh) {
        if (child.material) {
          child.material.map = colorMap
          child.material.normalMap = normalMap
          child.material.needsUpdate = true
        }
      }
    })

    const box = new THREE.Box3()
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.geometry.computeBoundingBox()
        const childBox = new THREE.Box3().copy(child.geometry.boundingBox).applyMatrix4(child.matrixWorld)
        box.union(childBox)
      }
    })

    if (box.isEmpty()) box.setFromObject(fbx)

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    const targetHeight = 4.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [fbx, colorMap, normalMap])

  return (
    <group {...props}>
      <group position={[0, -2, 0]} scale={transform.scale}>
        <primitive object={fbx} position={transform.offset} />
      </group>
    </group>
  )
}
