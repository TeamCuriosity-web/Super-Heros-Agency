import React from 'react'
import { useLoader } from '@react-three/fiber'
import { USDZLoader } from 'three-stdlib'

export function IronManModel(props) {
  const model = useLoader(USDZLoader, '/models/Iron_Man.usdz')
  
  return (
    <group {...props} dispose={null}>
      <primitive object={model} scale={0.8} />
    </group>
  )
}
