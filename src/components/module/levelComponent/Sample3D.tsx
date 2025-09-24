"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";

extend({ OrbitControls });

interface ModelProps {
  link: string;
  onProgress: (percent: number) => void;
  onLoaded: () => void;
}

const Model: React.FC<ModelProps> = ({ link, onProgress, onLoaded }) => {
  const fbxRef = useRef<THREE.Group | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    const loader = new FBXLoader();

    // از loadAsync استفاده می‌کنیم
    const loadModel = async () => {
      try {
        const fbx = await loader.loadAsync(link, (xhr) => {
          if (xhr.lengthComputable) {
            let percent = (xhr.loaded / xhr.total) * 100;
            if (percent > 95) percent = 95;
            onProgress(Math.round(percent));
          }
        });

        // مرکز مدل رو محاسبه و صفر می‌کنیم
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());
        fbx.position.sub(center);

        const pivotGroup = new THREE.Group();
        pivotGroup.add(fbx);
        setModel(pivotGroup);
        fbxRef.current = pivotGroup;

        onProgress(100);
        onLoaded();
      } catch (error) {
        console.error("Error loading FBX:", error);
        onLoaded();
      }
    };

    loadModel();
  }, [link, camera, onProgress, onLoaded]);

  // OrbitControls
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.rotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);
    controls.update();

    return () => controls.dispose();
  }, [camera, gl]);

  return model ? <primitive ref={fbxRef} object={model} scale={0.07} /> : null;
};

const Axes = () => <axesHelper args={[0]} />;

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
            {/* Progress Circle */}
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
        camera={{ fov: 50 }}
      >
        <Axes />
        <hemisphereLight
          color={"#ffffff"}
          groundColor={"#60666C"}
          position={[0, 50, 0]}
        />
        <Model
          link={`https://middle.irpsc.com/app/?url=${url}`}
          onProgress={setProgress}
          onLoaded={() => setLoading(false)}
        />
      </Canvas>
    </div>
  );
};

export default CanvasPreview;
