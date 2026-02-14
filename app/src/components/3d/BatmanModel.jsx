import React, { useLayoutEffect, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import * as THREE from 'three'

export function BatmanModel(props) {
  const materials = useLoader(MTLLoader, 'models/batman/lego-batman.mtl')
  const obj = useLoader(OBJLoader, 'models/batman/lego-batman.obj', (loader) => {
    materials.preload()
    loader.setMaterials(materials)
  })
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!obj) return

    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.side = THREE.DoubleSide
        child.material.needsUpdate = true
      }
    })

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
    
    const targetHeight = 4.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [obj, materials])

  return (
    <group {...props}>
      <group position={[0, -2, 0]} scale={transform.scale}>
        <primitive object={obj} position={transform.offset} />
      </group>
    </group>
  )
}
