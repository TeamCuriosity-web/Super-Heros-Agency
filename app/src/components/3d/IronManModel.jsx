import React, { useLayoutEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three-stdlib'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export function IronManModel(props) {
  const obj = useLoader(OBJLoader, '/models/Iron_Man.obj')
  
  const textures = useTexture({
    map: '/models/textures/BaseColor.png',
    emissiveMap: '/models/textures/Emissive.png',
    normalMap: '/models/textures/Normal.png',
    roughnessMap: '/models/textures/Roughness.png',
    metalnessMap: '/models/textures/Metallic.png',
  })

  useLayoutEffect(() => {
    obj.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: textures.map,
          emissiveMap: textures.emissiveMap,
          normalMap: textures.normalMap,
          roughnessMap: textures.roughnessMap,
          metalnessMap: textures.metalnessMap,
          emissive: new THREE.Color(0xffffff),
          emissiveIntensity: 1,
          metalness: 1,
          roughness: 1,
        })
        child.material.side = THREE.DoubleSide
       
        child.castShadow = true
        child.receiveShadow = true
      }
    })
  }, [obj, textures])

  return (
    <group {...props} dispose={null}>
      <primitive object={obj} scale={0.0013} position={[0, -0.5, 2]} />
    </group>
  )
}
