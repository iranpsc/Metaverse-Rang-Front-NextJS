import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import loader from "../../../../../public/gif/loader.gif"
import { useEffect, useRef, useState } from "react";
import Image from "next/image"
type GLBModelProps = {
  url: string;
};

function GLBModel({ url }: GLBModelProps) {
  const mount = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  let model: any;
  let camera: THREE.PerspectiveCamera;
  let renderer: THREE.WebGLRenderer;

  useEffect(() => {
    if (!mount.current) return;
    const manager = new THREE.LoadingManager();
    const loader = new GLTFLoader(manager);

    const scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(
      60,
      mount.current.clientWidth / mount.current.clientHeight,
      1,
      1000
    );
    renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(mount.current.clientWidth, mount.current.clientHeight);
    mount.current.appendChild(renderer.domElement);
    renderer.setClearColor(0xffffff);

    // Load the .glb file
    loader.load(url, (gltf) => {
      // Remove any existing models
      if (model) {
        scene.remove(model);
      }
      // Add the new loaded model to the scene
      model = gltf.scene;
      scene.add(model);
      setIsLoading(false);
    });

    camera.position.set(0, 1, 2.5);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.5);
    pointLight.position.set(0, 3, 3);
    scene.add(pointLight);

    let isRotating = false;
    let previousX = 0;
    let previousY = 0;

    function onMouseDown(event: any) {
      isRotating = true;
      previousX = event.clientX;
      previousY = event.clientY;
    }

    function onMouseMove(event: any) {
      if (isRotating) {
        const dx = event.clientX - previousX;
        const dy = event.clientY - previousY;
        model.rotation.y += dx * 0.01;
        model.rotation.x += dy * 0.01;
      }
      previousX = event.clientX;
      previousY = event.clientY;
    }

    function onMouseUp() {
      isRotating = false;
    }

    function onMouseScroll(event: any) {
      camera.fov += event.deltaY * 0.01;
      camera.updateProjectionMatrix();
    }

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    renderer.domElement.addEventListener("mousemove", onMouseMove);
    renderer.domElement.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("wheel", onMouseScroll);

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (mount.current) {
        mount.current.removeChild(renderer.domElement);
      }
    };
  }, [url]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '54vh' }}>
      {isLoading && (
        <>
        <Image 
          src={loader} height="80" width="80" alt="loading"
          style={{ position: 'absolute', top: '32%', left: '42%' }}
        />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} className="text-gray">
          Loading...
        </div>
        </>
      )}
      <div ref={mount} style={{ width: '100%', height: '100%' }} />
    </div>
  );}

export default GLBModel;
