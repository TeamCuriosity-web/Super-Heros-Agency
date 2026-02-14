import { Box } from '@react-three/drei'

export function HulkModel(props) {
  return (
    <group {...props}>
      <Box args={[2, 3, 2]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial color="#22c55e" roughness={0.5} />
      </Box>
    </group>
  )
}
