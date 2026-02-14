import React, { useLayoutEffect, useState } from 'react'
import { useGLTF, Clone } from '@react-three/drei'
import * as THREE from 'three'

export function HulkModel(props) {
  const { scene } = useGLTF('models/hulk/lego_hulk.glb')
  const [transform, setTransform] = useState({ scale: 1, offset: [0, 0, 0] })

  useLayoutEffect(() => {
    if (!scene) return
    
    scene.position.set(0, 0, 0)
    scene.scale.set(1, 1, 1)
    scene.rotation.set(0, 0, 0)
    scene.updateMatrixWorld()

    // Bounding box from MESHES ONLY
    const box = new THREE.Box3()
    scene.traverse((child) => {
      if (child.isMesh) {
        child.geometry.computeBoundingBox()
        const childBox = new THREE.Box3().copy(child.geometry.boundingBox).applyMatrix4(child.matrixWorld)
        box.union(childBox)
      }
    })

    if (box.isEmpty()) box.setFromObject(scene)

    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    
    const targetHeight = 4.5
    const scaleFactor = targetHeight / (size.y || 1)
    
    setTransform({
      scale: scaleFactor,
      offset: [-center.x, -box.min.y, -center.z]
    })
  }, [scene])

  return (
    <group {...props} dispose={null}>
      <group position={[0, -2, 0]} scale={transform.scale}>
        <Clone object={scene} position={transform.offset} />
      </group>
    </group>
  )
}

useGLTF.preload('models/hulk/lego_hulk.glb')
