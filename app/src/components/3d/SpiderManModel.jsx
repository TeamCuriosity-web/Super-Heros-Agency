import React, { useLayoutEffect, useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

export function SpiderManModel(props) {
  // Restore the original high-fidelity Miles Morales model
  // The user specifically asked for original colours and was frustrated by the procedural version.
  const materials = useLoader(MTLLoader, 'models/spiderman/M-FF_iOS_HERO_Miles_Morales_Spider-Man_Ultimate.mtl')
  const obj = useLoader(OBJLoader, 'models/spiderman/M-FF_iOS_HERO_Miles_Morales_Spider-Man_Ultimate.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })

  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!obj) return

    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide
        child.material.transparent = false
        child.material.alphaTest = 0.5
        child.material.needsUpdate = true
      }
    })

    // Compute bounding box from MESHES ONLY to avoid rigs/helpers distorting sizing
    const box = new THREE.Box3()
    obj.traverse((child) => {
      if (child.isMesh) {
        child.geometry.computeBoundingBox()
        const childBox = new THREE.Box3().copy(child.geometry.boundingBox).applyMatrix4(child.matrixWorld)
        box.union(childBox)
      }
    })

    if (box.isEmpty()) box.setFromObject(obj)

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    // Normalize scale to 4.5 units height for cinematic roster consistency
    const targetHeight = 4.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [obj])

  return (
    <group {...props}>
      <group position={[0, -2, 0]} scale={transform.scale}>
        <primitive object={obj} position={transform.offset} />
      </group>
    </group>
  )
}
