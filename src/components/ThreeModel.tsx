import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useRef } from "react";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({
  url,
  scale,
  position,
  rotation,
}: {
  url: string;
  scale: number;
  position: number[];
  rotation: number[];
}) => {
  const { scene } = useGLTF(url);
  const groupRef = useRef(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.6;
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive
        object={scene}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    </group>
  );
};

const ThreeModel = () => {
  return (
    <motion.div
      initial={{ y: -500, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, stiffness: 300, damping: 20 }}
      className="w-full h-[500px]"
    >
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={3} />
        <directionalLight intensity={5} position={[0, 2, 2]} castShadow />
        <Model
          url="/src/assets/models/scene.gltf"
          scale={2}
          position={[-1, -1, 1.4]}
          rotation={[Math.PI / 10, 0, Math.PI / 6]}
        />
        <OrbitControls />
      </Canvas>
    </motion.div>
  );
};

export default ThreeModel;
