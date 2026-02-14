import { Box } from '@react-three/drei'

export function SpiderManModel(props) {
  return (
    <group {...props}>
      {/* Body */}
      <Box args={[1.5, 2, 1]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#b91c1c" />
      </Box>
      {/* Legs/Hips */}
      <Box args={[1.5, 0.5, 1]} position={[0, -1.25, 0]}>
        <meshStandardMaterial color="#1d4ed8" />
      </Box>
      {/* Head */}
      <Box args={[1.2, 1, 1]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="#b91c1c" />
      </Box>
      {/* Eyes */}
      <Box args={[0.3, 0.3, 0.1]} position={[0.3, 1.6, 0.5]}>
        <meshStandardMaterial color="white" />
      </Box>
      <Box args={[0.3, 0.3, 0.1]} position={[-0.3, 1.6, 0.5]}>
        <meshStandardMaterial color="white" />
      </Box>
    </group>
  )
}
