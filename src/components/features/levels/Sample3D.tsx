
"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

type ModelSource =
  | string
  | {
      gltf: string;
      bin?: string;
    };

interface Sample3DProps {
  src: ModelSource;
  lang: string;
}

/* =========================================================
   Component
========================================================= */

export default function Sample3D({
  src,
  lang,
}: Sample3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /* =======================================================
     Source
  ======================================================= */

  const gltfUrl =
    typeof src === "object"
      ? src.gltf
      : src;

  const binUrl =
    typeof src === "object"
      ? src.bin
      : undefined;

  /* =======================================================
     GLTF Proxy
  ======================================================= */

  function createGltfProxyUrl() {
    const params = new URLSearchParams();

    params.set("type", "gltf");
    params.set("url", gltfUrl);

    if (binUrl) {
      params.set("bin", binUrl);
    }

    /*
     * اگر API شما در /api/model است و نه /[lang]/api/model،
     * این قسمت را به:
     *
     * /api/model
     *
     * تغییر بده.
     */

    return `/${lang}/api/model?${params.toString()}`;
  }

  /* =======================================================
     Main Three.js
  ======================================================= */

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !gltfUrl) {
      setLoading(false);
      return;
    }

    let destroyed = false;

    setLoading(true);
    setProgress(0);
    setError(false);
    setErrorMessage(null);

    /* =====================================================
       SCENE
    ===================================================== */

    const scene = new THREE.Scene();

    /*
     * بسیار مهم:
     * پس‌زمینه عمداً null است.
     *
     * بنابراین canvas شفاف خواهد بود.
     */
    scene.background = null;

    /* =====================================================
       CAMERA
    ===================================================== */

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.001,
      100000,
    );

    camera.position.set(0, 0, 5);

    /* =====================================================
       RENDERER
    ===================================================== */

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, 2),
    );

    renderer.setSize(width, height, false);

    /*
     * GLTF textures معمولاً sRGB هستند.
     */
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    /*
     * عمداً از ACES استفاده نمی‌کنیم.
     *
     * ACES روی بعضی مدل‌های GLTF باعث می‌شود
     * رنگ‌ها و روشنایی مخصوصاً روی مدل‌های تیره
     * غیرطبیعی شوند.
     */
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.toneMappingExposure = 1;

    /*
     * Transparent canvas
     */
    renderer.setClearColor(0x000000, 0);

    /*
     * Shadow لازم نیست برای Viewer محصولی.
     * خاموش بودن آن نور مدل را هم تمیزتر می‌کند.
     */
    renderer.shadowMap.enabled = false;

    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.background = "transparent";

    container.appendChild(renderer.domElement);

    /* =====================================================
       ENVIRONMENT LIGHTING
    ===================================================== */

    /*
     * این بخش مهم‌ترین تغییر نسبت به کد قبلی است.
     *
     * به‌جای چند DirectionalLight بسیار قوی،
     * یک محیط نوری استاندارد Three.js می‌سازیم.
     *
     * مزیت:
     * - MeshStandardMaterial سیاه نمی‌شود
     * - Metallic/Roughness طبیعی‌تر دیده می‌شود
     * - سایه‌های خیلی تند نداریم
     * - پس‌زمینه همچنان شفاف می‌ماند
     */

    const pmremGenerator = new THREE.PMREMGenerator(
      renderer,
    );

    pmremGenerator.compileEquirectangularShader();

    const environment = new RoomEnvironment();

    const environmentRenderTarget =
      pmremGenerator.fromScene(environment, 0.04);

    scene.environment =
      environmentRenderTarget.texture;

    /*
     * RoomEnvironment را دیگر لازم نداریم.
     */
    environment.dispose();
    pmremGenerator.dispose();

    /* =====================================================
       ADDITIONAL SOFT LIGHT
    ===================================================== */

    /*
     * HemisphereLight فقط برای جلوگیری از سیاه شدن
     * کامل قسمت‌های زیر مدل.
     */

    const hemisphereLight =
      new THREE.HemisphereLight(
        0xffffff,
        0x777777,
        1.2,
      );

    scene.add(hemisphereLight);

    /*
     * یک نور بسیار نرم از جلو.
     *
     * قبلاً سه DirectionalLight شدید داشتیم.
     * آن‌ها حذف شدند.
     */

    const frontLight =
      new THREE.DirectionalLight(
        0xffffff,
        1.2,
      );

    frontLight.position.set(3, 5, 8);

    scene.add(frontLight);

    /* =====================================================
       CONTROLS
    ===================================================== */

    const controls = new OrbitControls(
      camera,
      renderer.domElement,
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    controls.enableZoom = true;
    controls.enablePan = true;

    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 0.8;
    controls.panSpeed = 0.8;

    controls.minDistance = 0.01;
    controls.maxDistance = 100000;

    controls.screenSpacePanning = true;

    /* =====================================================
       LOADING MANAGER
    ===================================================== */

    const manager = new THREE.LoadingManager();

    manager.setURLModifier((url) => {
      console.log("[Sample3D] THREE requested:", url);

      /*
       * اگر URL قبلاً Proxy شده،
       * دوباره Proxy نکن.
       */

      if (url.includes("/api/model?")) {
        return url;
      }

      const lowerUrl = url.toLowerCase();

      /* ===================================================
         BIN
      =================================================== */

      if (
        lowerUrl.endsWith(".bin") ||
        lowerUrl.includes(".bin?")
      ) {
        const actualBinUrl = binUrl || url;

        const params = new URLSearchParams();

        params.set("type", "bin");
        params.set("url", actualBinUrl);

        const proxyUrl =
          `/${lang}/api/model?${params.toString()}`;

        console.log(
          "[Sample3D] BIN Proxy:",
          proxyUrl,
        );

        return new URL(
          proxyUrl,
          window.location.origin,
        ).href;
      }

      /*
       * ===================================================
       * IMAGE
       * ===================================================
       *
       * فعلاً تصویر را دستکاری نمی‌کنیم.
       *
       * چون Proxy فعلی شما type=image ندارد.
       *
       * اگر GLTF شما Texture خارجی داشته باشد و CORS بدهد،
       * باید API /api/model را برای image هم توسعه دهیم.
       */

      return url;
    });

    /* =====================================================
       Loading Events
    ===================================================== */

    manager.onStart = (
      url,
      itemsLoaded,
      itemsTotal,
    ) => {
      console.log(
        "[Sample3D] Loading started:",
        {
          url,
          itemsLoaded,
          itemsTotal,
        },
      );
    };

    manager.onProgress = (
      url,
      itemsLoaded,
      itemsTotal,
    ) => {
      console.log(
        "[Sample3D] Loading progress:",
        {
          url,
          itemsLoaded,
          itemsTotal,
        },
      );

      if (
        itemsTotal > 0 &&
        !destroyed
      ) {
        const percentage =
          Math.round(
            (itemsLoaded / itemsTotal) * 90,
          );

        setProgress(
          Math.max(
            5,
            Math.min(percentage, 95),
          ),
        );
      }
    };

    manager.onLoad = () => {
      console.log(
        "[Sample3D] ALL FILES LOADED",
      );

      if (!destroyed) {
        setProgress(95);
      }
    };

    manager.onError = (url) => {
      console.error(
        "[Sample3D] LoadingManager ERROR:",
        url,
      );
    };

    /* =====================================================
       GLTF LOADER
    ===================================================== */

    const loader = new GLTFLoader(manager);

    const gltfProxyUrl =
      createGltfProxyUrl();

    console.log(
      "========================================",
    );

    console.log(
      "[Sample3D] START",
    );

    console.log(
      "[Sample3D] Original GLTF:",
      gltfUrl,
    );

    console.log(
      "[Sample3D] Original BIN:",
      binUrl,
    );

    console.log(
      "[Sample3D] GLTF Proxy:",
      gltfProxyUrl,
    );

    console.log(
      "[Sample3D] Background: TRANSPARENT",
    );

    console.log(
      "[Sample3D] Base64: DISABLED",
    );

    console.log(
      "[Sample3D] Blob: DISABLED",
    );

    console.log(
      "========================================",
    );

    /* =====================================================
       ANIMATION
    ===================================================== */

    let mixer: THREE.AnimationMixer | null = null;

    const clock = new THREE.Clock();

    /* =====================================================
       LOAD
    ===================================================== */

    loader.load(
      gltfProxyUrl,

      /* ===================================================
         SUCCESS
      =================================================== */

      (gltf) => {
        if (destroyed) {
          return;
        }

        console.log(
          "========================================",
        );

        console.log(
          "[Sample3D] GLTF LOADED SUCCESSFULLY",
        );

        console.log(
          "[Sample3D] Scene:",
          gltf.scene,
        );

        console.log(
          "[Sample3D] Animations:",
          gltf.animations,
        );

        console.log(
          "[Sample3D] Cameras:",
          gltf.cameras,
        );

        console.log(
          "========================================",
        );

        const model = gltf.scene;

        /* =================================================
           MATERIAL / MESH SETUP
        ================================================= */

        model.traverse((object) => {
          if (
            object instanceof THREE.Mesh
          ) {
            object.castShadow = false;
            object.receiveShadow = false;
            object.frustumCulled = true;

            /*
             * بسیار مهم:
             *
             * متریال GLTF را عوض نمی‌کنیم.
             *
             * اگر Texture دارد، همان Texture استفاده می‌شود.
             */

            const materials =
              Array.isArray(object.material)
                ? object.material
                : [object.material];

            materials.forEach((material) => {
              /*
               * اگر Standard/Physical باشد،
               * محیط نوری روی آن اثر می‌گذارد.
               */

              if (
                material instanceof
                  THREE.MeshStandardMaterial ||
                material instanceof
                  THREE.MeshPhysicalMaterial
              ) {
                material.envMapIntensity = 1.0;
              }

              /*
               * Texture های GLTF باید sRGB باشند.
               */

              const materialWithMap =
                material as THREE.Material & {
                  map?: THREE.Texture | null;
                  emissiveMap?: THREE.Texture | null;
                };

              if (
                materialWithMap.map
              ) {
                materialWithMap.map.colorSpace =
                  THREE.SRGBColorSpace;

                materialWithMap.map.needsUpdate =
                  true;
              }

              if (
                materialWithMap.emissiveMap
              ) {
                materialWithMap.emissiveMap.colorSpace =
                  THREE.SRGBColorSpace;

                materialWithMap.emissiveMap.needsUpdate =
                  true;
              }

              material.needsUpdate = true;
            });
          }
        });

        /* =================================================
           ADD MODEL
        ================================================= */

        scene.add(model);

        /* =================================================
           BOUNDING BOX
        ================================================= */

        let box =
          new THREE.Box3().setFromObject(
            model,
          );

        const initialSize =
          box.getSize(
            new THREE.Vector3(),
          );

        const initialCenter =
          box.getCenter(
            new THREE.Vector3(),
          );

        console.log(
          "[Sample3D] Initial bounds:",
          {
            size: initialSize,
            center: initialCenter,
          },
        );

        /*
         * اگر مدل خیلی کوچک/بزرگ بود،
         * ابتدا Center می‌کنیم.
         */

        model.position.sub(
          initialCenter,
        );

        /*
         * بعد از Center دوباره Bounds می‌گیریم.
         */

        box =
          new THREE.Box3().setFromObject(
            model,
          );

        const size =
          box.getSize(
            new THREE.Vector3(),
          );

        const centered =
          box.getCenter(
            new THREE.Vector3(),
          );

        const maxDimension =
          Math.max(
            size.x,
            size.y,
            size.z,
          );

        const safeDimension =
          maxDimension > 0
            ? maxDimension
            : 1;

        /*
         * =================================================
         * MODEL CENTER
         * =================================================
         */

        model.position.sub(centered);

        /*
         * =================================================
         * CAMERA FIT
         * =================================================
         */

        const halfFov =
          THREE.MathUtils.degToRad(
            camera.fov * 0.5,
          );

        let distance =
          safeDimension /
          (2 * Math.tan(halfFov));

        /*
         * کمی فاصله بیشتر برای اینکه
         * مدل به لبه‌ها نچسبد.
         */

        distance *= 1.35;

        /*
         * اگر مدل خیلی باریک بود،
         * حداقل فاصله.
         */

        distance = Math.max(
          distance,
          0.1,
        );

        /*
         * Camera کمی بالاتر قرار می‌گیرد.
         */

        camera.position.set(
          0,
          safeDimension * 0.08,
          distance,
        );

        /*
         * Near/Far دقیق بر اساس مدل.
         */

        camera.near =
          Math.max(
            safeDimension / 1000,
            0.0001,
          );

        camera.far =
          Math.max(
            safeDimension * 100,
            100,
          );

        camera.updateProjectionMatrix();

        /*
         * =================================================
         * CONTROLS TARGET
         * =================================================
         */

        controls.target.set(
          0,
          0,
          0,
        );

        controls.update();

        /*
         * =================================================
         * ANIMATION
         * =================================================
         */

        if (
          gltf.animations &&
          gltf.animations.length > 0
        ) {
          mixer =
            new THREE.AnimationMixer(
              model,
            );

          gltf.animations.forEach(
            (clip) => {
              const action =
                mixer!.clipAction(
                  clip,
                );

              action.reset();
              action.play();
            },
          );

          console.log(
            "[Sample3D] Animations started:",
            gltf.animations.length,
          );
        }

        /*
         * =================================================
         * FINISH
         * =================================================
         */

        setProgress(100);
        setLoading(false);
        setError(false);
        setErrorMessage(null);
      },

      /* ===================================================
         PROGRESS
      =================================================== */

      (progressEvent) => {
        if (destroyed) {
          return;
        }

        if (
          progressEvent.total > 0
        ) {
          const percentage =
            (progressEvent.loaded /
              progressEvent.total) *
            100;

          setProgress(
            Math.min(
              Math.max(
                percentage,
                1,
              ),
              90,
            ),
          );

          console.log(
            `[Sample3D] GLTF download: ${percentage.toFixed(
              1,
            )}%`,
          );
        } else {
          console.log(
            "[Sample3D] GLTF bytes:",
            progressEvent.loaded,
          );
        }
      },

      /* ===================================================
         ERROR
      =================================================== */

      (loadError) => {
        if (destroyed) {
          return;
        }

        console.error(
          "========================================",
        );

        console.error(
          "[Sample3D] THREE GLTF LOAD ERROR",
        );

        console.error(
          "[Sample3D] Error:",
          loadError,
        );

        console.error(
          "[Sample3D] GLTF Proxy:",
          gltfProxyUrl,
        );

        console.error(
          "[Sample3D] Original GLTF:",
          gltfUrl,
        );

        console.error(
          "[Sample3D] Original BIN:",
          binUrl,
        );

        console.error(
          "========================================",
        );

        setLoading(false);
        setError(true);

        setErrorMessage(
          loadError instanceof Error
            ? loadError.message
            : "خطا در بارگذاری مدل سه‌بعدی",
        );
      },
    );

    /* =====================================================
       RESIZE
    ===================================================== */

    const handleResize = () => {
      if (
        destroyed ||
        !container
      ) {
        return;
      }

      const newWidth =
        container.clientWidth;

      const newHeight =
        container.clientHeight;

      if (
        newWidth <= 0 ||
        newHeight <= 0
      ) {
        return;
      }

      camera.aspect =
        newWidth / newHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        newWidth,
        newHeight,
        false,
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio || 1,
          2,
        ),
      );
    };

    window.addEventListener(
      "resize",
      handleResize,
    );

    /* =====================================================
       ANIMATION LOOP
    ===================================================== */

    let animationFrameId = 0;

    const animate = () => {
      if (destroyed) {
        return;
      }

      animationFrameId =
        requestAnimationFrame(
          animate,
        );

      const delta =
        clock.getDelta();

      if (mixer) {
        mixer.update(delta);
      }

      controls.update();

      renderer.render(
        scene,
        camera,
      );
    };

    animate();

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      destroyed = true;

      cancelAnimationFrame(
        animationFrameId,
      );

      window.removeEventListener(
        "resize",
        handleResize,
      );

      controls.dispose();

      mixer?.stopAllAction();
      mixer = null;

      /*
       * Dispose model
       */

      scene.traverse(
        (object) => {
          if (
            object instanceof THREE.Mesh
          ) {
            object.geometry.dispose();

            const material =
              object.material;

            if (
              Array.isArray(material)
            ) {
              material.forEach(
                (mat) => {
                  disposeMaterial(mat);
                },
              );
            } else if (
              material
            ) {
              disposeMaterial(
                material,
              );
            }
          }
        },
      );

      /*
       * Environment
       */

      if (
        scene.environment
      ) {
        scene.environment.dispose();
        scene.environment = null;
      }

      renderer.dispose();
      renderer.forceContextLoss();

      if (
        renderer.domElement.parentNode ===
        container
      ) {
        container.removeChild(
          renderer.domElement,
        );
      }
    };
  }, [
    gltfUrl,
    binUrl,
    lang,
  ]);

  /* =======================================================
     NO MODEL
  ======================================================= */

  if (!gltfUrl) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl border">
        <p className="font-bold text-gray-500">
          مدل سه‌بعدی وجود ندارد
        </p>
      </div>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl border">
        <div className="px-4 text-center">
          <p className="font-bold text-red-500">
            خطا در بارگذاری مدل سه‌بعدی
          </p>

          {errorMessage && (
            <p className="mt-2 break-words text-xs text-gray-400">
              {errorMessage}
            </p>
          )}

          <button
            type="button"
            onClick={() =>
              window.location.reload()
            }
            className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            تلاش دوباره
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
     VIEWER
  ======================================================= */

  const roundedProgress =
    Math.min(
      100,
      Math.round(progress),
    );

  const circumference =
    2 * Math.PI * 26;

  return (
    <div
      className="
        relative
        aspect-[5/7]
        w-full
        overflow-hidden
        rounded-xl
        bg-transparent
      "
    >
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-100 dark:bg-neutral-900">
          <div className="relative h-20 w-20">
            <svg
              viewBox="0 0 60 60"
              className="h-20 w-20 -rotate-90"
            >
              <circle
                cx="30"
                cy="30"
                r="26"
                strokeWidth="5"
                className="fill-none stroke-neutral-300 dark:stroke-neutral-700"
              />

              <circle
                cx="30"
                cy="30"
                r="26"
                strokeWidth="5"
                strokeLinecap="round"
                className="fill-none stroke-light-primary transition-[stroke-dashoffset] duration-150 ease-out dark:stroke-dark-yellow"
                strokeDasharray={
                  circumference
                }
                strokeDashoffset={
                  circumference -
                  (roundedProgress / 100) *
                    circumference
                }
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-neutral-700 dark:text-neutral-200">
              {roundedProgress}%
            </div>
          </div>

          {/* <p className="text-xs text-neutral-500 dark:text-neutral-400">
            در حال بارگذاری مدل...
          </p> */}
        </div>
      )}

      <div
        ref={containerRef}
        className="h-full w-full bg-transparent"
      />
    </div>
  );
}

/* =========================================================
   Material Cleanup
========================================================= */

function disposeMaterial(
  material: THREE.Material,
) {
  const materialWithMaps =
    material as THREE.Material & {
      map?: THREE.Texture | null;
      lightMap?: THREE.Texture | null;
      aoMap?: THREE.Texture | null;
      emissiveMap?: THREE.Texture | null;
      bumpMap?: THREE.Texture | null;
      normalMap?: THREE.Texture | null;
      displacementMap?: THREE.Texture | null;
      roughnessMap?: THREE.Texture | null;
      metalnessMap?: THREE.Texture | null;
      alphaMap?: THREE.Texture | null;
      envMap?: THREE.Texture | null;
    };

  const maps = [
    materialWithMaps.map,
    materialWithMaps.lightMap,
    materialWithMaps.aoMap,
    materialWithMaps.emissiveMap,
    materialWithMaps.bumpMap,
    materialWithMaps.normalMap,
    materialWithMaps.displacementMap,
    materialWithMaps.roughnessMap,
    materialWithMaps.metalnessMap,
    materialWithMaps.alphaMap,
    materialWithMaps.envMap,
  ];

  const disposed =
    new Set<THREE.Texture>();

  for (const texture of maps) {
    if (
      texture &&
      !disposed.has(texture)
    ) {
      disposed.add(texture);
      texture.dispose();
    }
  }

  material.dispose();
}

