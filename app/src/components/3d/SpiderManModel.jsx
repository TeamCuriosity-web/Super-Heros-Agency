import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function SpiderManModel(props) {
  // Restore the original high-fidelity Miles Morales model
  // The user specifically asked for original colours and was frustrated by the procedural version.
  const fbx = useLoader(FBXLoader, 'models/spider-man/spiderman.fbx')
  const colorMap = useTexture('models/spider-man/T_1036801_Body_D.png', (t) => {
    t.colorSpace = THREE.SRGBColorSpace
    t.flipY = false
  })

  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!fbx) return

    fbx.traverse((child) => {
      if (child.isMesh) {
        // Force high-quality materials to fix missing texture (pink poop) issue
        child.material = new THREE.MeshStandardMaterial({
          map: colorMap,
          metalness: 0.1,
          roughness: 0.8,
          side: THREE.FrontSide
        })
        child.material.needsUpdate = true
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

    if (box.isEmpty()) box.setFromObject(fbx)

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    // Normalize scale to 4.5 units height for cinematic roster consistency
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
