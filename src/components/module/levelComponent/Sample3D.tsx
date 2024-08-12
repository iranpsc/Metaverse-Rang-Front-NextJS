// 'use client'

// import React, { Suspense, useRef } from 'react'
// import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls, PerspectiveCamera, useFBX, OrthographicCamera } from '@react-three/drei';

// export const Sample3D = ({url}:{url:string}) => {

//     const bugget = useFBX(url);

//     const ref = useRef<any>();

//     const cameraRef = useRef<any>()

//     const Box = () => {

//         // useFrame(() => (ref?.current?.rotation?.y ? ref.current.rotation.y += 0.05 : undefined));

//         useThree(({ camera }) => {
//             // return camera.rotateY(90)
//             // camera.position.y = 0;
//             // camera.lookAt(0, 1.8, 0)
//             // camera.lookAt(0, -200, 0)
//         });

//         return <primitive ref={ref} object={bugget} scale={4.1} />
//     }

//     return <Canvas className="cursor-pointer" >
//         <Suspense fallback={<span className='text-white '>Loading...</span>}>
//             <ambientLight />
//             <OrbitControls enableZoom={true}
//                 // maxPolarAngle={Math.PI / 2} //To Curve
//                 // minPolarAngle={Math.PI / 2} //To Curve
//                 target={[-100, 180, 0]} //Key To Solve
//                 enablePan
//                 enableRotate
//             />
//             <Box />
//             <OrthographicCamera
//                 makeDefault
//                 // fov={10}
//                 // far={10}
//                 // aspect={2/3}
//                 position={[300, 100, 0]}
//                 ref={cameraRef}
//             />
//         </Suspense>
//     </Canvas>

// }
