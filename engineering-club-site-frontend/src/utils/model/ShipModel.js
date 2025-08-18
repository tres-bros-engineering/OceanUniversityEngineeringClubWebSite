// Ship 3D Model in the Sea 
import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { OrbitControls, Sky, ContactShadows, useGLTF } from "@react-three/drei";
import { Water } from "three-stdlib";
import ContainerShip from "../../assets/models/ContainerShip.glb";
import WaterNormals from "../../assets/models/waternormals.jpg";
import * as THREE from "three";
import { useRef, useMemo } from "react";

extend({ Water });

// Ship component
const Ship = (props) => {
  const { scene } = useGLTF(ContainerShip);
  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 1.5) * 0.1 + 1.7; // floating effect
  });
  return <primitive ref={ref} object={scene} {...props} />;
}

// Sea and Sky component
const SeaScene = () => {
  const waterNormals = useLoader(THREE.TextureLoader, WaterNormals);
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const waterRef = useRef();
  const waterGeometry = useMemo(() => new THREE.PlaneGeometry(1000, 1000), []);

  // Animate waves
  useFrame((state, delta) => {
    if (waterRef.current) {
      waterRef.current.material.uniforms["time"].value += delta * 0.15;
    }
  });

  return (
    <>
      <Sky
        distance={450000}
        sunPosition={[5, 1, 8]}
        inclination={0.49}
        azimuth={0.25}
      />

      <water
        ref={waterRef}
        args={[
          waterGeometry,
          {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: waterNormals,
            sunDirection: new THREE.Vector3(5, 1, 8),
            sunColor: "#ffffffff",
            waterColor: "#006994",
            distortionScale: 3.7,
            fog: true,
          },
        ]}
        rotation-x={-Math.PI / 2}
      />

      <Ship position={[0, 0, 0]} scale={15} />

      <ContactShadows
        position={[0, -1, 0]}
        opacity={0.5}
        width={10}
        height={10}
        blur={2}
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  );
}

const ShipModel = () => {
  return (
    <div style={{ height: "100vh" }}>
      <Canvas camera={{ position: [0, 5, 20], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} />
        <SeaScene />
      </Canvas>
    </div>
  );
}

export default ShipModel;
