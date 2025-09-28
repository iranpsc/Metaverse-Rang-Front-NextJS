"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";
import { Environment } from "@react-three/drei";

extend({ OrbitControls });

interface ModelProps {
  link: string;
  onProgress: (percent: number) => void;
  onLoaded: () => void;
}

const Model: React.FC<ModelProps> = ({ link, onProgress, onLoaded }) => {
  const modelRef = useRef<THREE.Group | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const { camera, gl } = useThree();

useEffect(() => {
  const loader = new GLTFLoader();

  loader.load(
    link,
    (gltf) => {
      const scene = gltf.scene;

      // مرکز مدل رو صفر می‌کنیم
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      const pivotGroup = new THREE.Group();
      pivotGroup.add(scene);
      setModel(pivotGroup);
      modelRef.current = pivotGroup;

      onProgress(100);
      onLoaded();
    },
    (xhr) => {
      if (xhr.lengthComputable) {
        let percent = (xhr.loaded / xhr.total) * 100;
        if (percent > 95) percent = 95;
        onProgress(Math.round(percent));
      }
    },
    (error) => {
      console.error("Error loading GLB:", error);
      onLoaded();
    }
  );
}, [link, camera, onProgress, onLoaded]);


  // OrbitControls
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 0.5;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);
    controls.update();

    return () => controls.dispose();
  }, [camera, gl]);

  return model ? <primitive ref={modelRef} object={model} scale={3.5} /> : null;
};

const Axes = () => <axesHelper args={[2]} />;

interface CanvasPreviewProps {
  url: string;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ url }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  return (
    <div className="relative w-full h-full">
      {/* Loader */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="relative w-[100px] h-[100px] rounded-full flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `conic-gradient(var(--progress-color) ${
                  progress * 3.6
                }deg, var(--progress-bg) ${progress * 3.6}deg)`,
              }}
            />
            <div className="absolute inset-2 bg-white dark:bg-[#080807] rounded-full flex items-center justify-center">
              <span className="text-black dark:text-white font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}

<Canvas
  gl={{ alpha: true }}
  style={{ background: "transparent" }}
  camera={{ fov: 50, position: [0, 0, 3] }}
>
  {/* نور محیطی نرم‌تر */}
  <ambientLight intensity={0.7} />

  {/* نور اصلی قوی‌تر */}
  <directionalLight
    position={[5, 5, 5]}
    intensity={1.5}
    castShadow
  />

  {/* نور پرکننده کمی قوی‌تر */}
  <directionalLight position={[-5, 2, -5]} intensity={0.7} />

  {/* نور حاشیه‌ای برای برجسته‌تر شدن لبه‌ها */}
  <pointLight position={[0, 3, -3]} intensity={0.8} color={"#ffffff"} />

  <Environment preset="city" />

  <Model
    link={url}
    onProgress={setProgress}
    onLoaded={() => setLoading(false)}
  />
</Canvas>


    </div>
  );
};

export default CanvasPreview;
