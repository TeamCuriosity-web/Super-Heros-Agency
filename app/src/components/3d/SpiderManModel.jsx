import React, { useLayoutEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { TextureLoader } from 'three'
import * as THREE from 'three'

export function SpiderManModel(props) {
  const obj = useLoader(OBJLoader, 'models/spiderman/M-FF_iOS_HERO_Miles_Morales_Spider-Man_Ultimate.obj')
  const texture = useLoader(TextureLoader, 'models/spiderman/M-FF_iOS_HERO_Miles_Morales_Spider-Man_Ultimate_Body_D.png')

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture
        child.material.needsUpdate = true
      }
    })

    const box = new THREE.Box3().setFromObject(obj)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    
    // Normalize scale to height of 5.5 units to match Iron Man/Hulk exactly
    const targetHeight = 5.5
    const scaleFactor = targetHeight / size.y
    obj.scale.setScalar(scaleFactor)

    // Position normalization
    obj.position.x = -center.x * scaleFactor
    obj.position.y = -center.y * scaleFactor
    obj.position.z = -center.z * scaleFactor

  }, [obj, texture])

  return (
    <group {...props}>
      <primitive object={obj} position={[0, 1.2, 0]} />
    </group>
  )
}

