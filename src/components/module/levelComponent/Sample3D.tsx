"use client";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import * as THREE from "three";
import { Ray } from "three";

// Extend OrbitControls to be usable in @react-three/fiber
extend({ OrbitControls });

interface ModelProps {
  link: string;
}

// Create a scene
// const scene = new THREE.Scene();

const Model: React.FC<ModelProps> = ({ link }) => {
  const fbxRef = useRef<THREE.Group | null>(null);
  const [model, setModel] = useState<THREE.Group | null>(null);

  // Load the FBX model
  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      link,
      (fbx) => {
        // Calculate the bounding box and center of the model
        const box = new THREE.Box3().setFromObject(fbx);
        const center = box.getCenter(new THREE.Vector3());

        // Offset the model's position so its center is at (0, 0, 0)
        fbx.position.sub(center);

        // Create a new group to act as a pivot and add the model to it
        const pivotGroup = new THREE.Group();
        pivotGroup.position.set(0, 0, 0); // Ensure the group is at the world origin
        pivotGroup.add(fbx); // Add the model to the group

        // Add an AxesHelper to the group for visualization
        // const axesHelper = new THREE.AxesHelper(2);
        // pivotGroup.add(axesHelper);

        // Set the model to be positioned at the world center
        pivotGroup.position.set(0, 0, 0);

        setModel(pivotGroup);
        fbxRef.current = pivotGroup;
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the FBX model:", error);
      }
    );
  }, [link]);

  // Set up orbit controls
  const { camera, gl } = useThree();
  useEffect(() => {
    const controls = new OrbitControls(camera, gl.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.09;
    controls.rotateSpeed = 0.5;
    controls.maxPolarAngle = Math.PI / 2; // Limit vertical rotation
    controls.minDistance = 1; // Minimum zoom distance
    controls.maxDistance = 10; // Maximum zoom distance
    return () => {
      controls.dispose();
    };
  }, [camera, gl]);

  // Rotate the model
  useFrame(() => {
    if (fbxRef.current) {
      // fbxRef.current.rotation.y += 0.01;
      // fbxRef.current.rotation.x += 0.01;
      // fbxRef.current.rotation.z += 0.01;
      // fbxRef.current.scale.x += 0.0001;
      // fbxRef.current.scale.y += 0.0001;
      // fbxRef.current.scale.z += 0.0001;
      // if (fbxRef.current.scale.x >= 0.3) {
      //   fbxRef.current.scale.x = 0.2;
      //   fbxRef.current.scale.y = 0.2;
      //   fbxRef.current.scale.z = 0.2;
      // }
    }
  });

  // Create a vector representing the point (0, 0, 0)
  const zeroVector = new THREE.Vector3(0, 0, 0);

  return model ? (
    <primitive ref={fbxRef} object={model} scale={0.2} position={[0, 0, 0]} />
  ) : null;
};

const Axes = () => {
  return <axesHelper args={[0]} />; // The size of the axes is 5 units
};

interface CanvasPreviewProps {
  url: string;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ url }) => {
  return (
    <Canvas>
      <ambientLight />
      <Axes />
      <hemisphereLight args={["#ffffff", "#60666C"]} />
      <Model link={`https://middle.irpsc.com/app/?url=${url}`} />
    </Canvas>
  );
};

export default CanvasPreview;
