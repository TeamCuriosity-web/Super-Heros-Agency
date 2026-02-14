import { useGLTF } from '@react-three/drei'

export function HulkModel(props) {
  const { scene } = useGLTF('models/hulk/lego_hulk.glb')

  return (
    <group {...props} dispose={null}>
      <primitive object={scene} scale={3} position={[0, -1.5, 0]} />
    </group>
  )
}

useGLTF.preload('models/hulk/lego_hulk.glb')

