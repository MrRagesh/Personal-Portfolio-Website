/* ===================================================
   THREE.JS HERO SCENE — three-scene.js
   =================================================== */

(function () {
  "use strict";

  let scene, camera, renderer, animFrameId;
  let particles, geometries = [];
  let mouse = { x: 0, y: 0 };
  let targetMouse = { x: 0, y: 0 };
  let canvas, W, H;

  function initThreeScene() {
    canvas = document.getElementById("heroCanvas");
    if (!canvas || typeof THREE === "undefined") return;

    W = canvas.offsetWidth;
    H = canvas.offsetHeight;

    // Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050b15, 0.035);

    // Camera
    camera = new THREE.PerspectiveCamera(70, W / H, 0.1, 1000);
    camera.position.set(0, 0, 35);

    // Renderer
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x050b15, 1);

    buildParticleField();
    buildFloatingObjects();
    buildGridLines();
    addLights();
    startLoop();
    bindEvents();
  }

  /* ---------- PARTICLE FIELD ---------- */
  function buildParticleField() {
    const count = 1800;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color(0x0ea5e9), // blue
      new THREE.Color(0x8b5cf6), // purple
      new THREE.Color(0xf97316), // orange
      new THREE.Color(0x38bdf8), // light blue
      new THREE.Color(0xffffff), // white
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 10;
      sizes[i] = Math.random() * 1.5 + 0.3;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      depthWrite: false,
    });

    particles = new THREE.Points(geo, mat);
    scene.add(particles);
  }

  /* ---------- FLOATING 3D OBJECTS ---------- */
  function buildFloatingObjects() {
    const configs = [
      { geo: new THREE.OctahedronGeometry(1.2, 0), x: -14, y: 4, z: -5, color: 0x0ea5e9, speed: 0.006, wire: false },
      { geo: new THREE.TetrahedronGeometry(1, 0), x: 14, y: -3, z: -8, color: 0x8b5cf6, speed: 0.009, wire: true },
      { geo: new THREE.IcosahedronGeometry(0.9, 0), x: 10, y: 8, z: -4, color: 0xf97316, speed: 0.007, wire: false },
      { geo: new THREE.BoxGeometry(1.4, 1.4, 1.4), x: -8, y: -6, z: -6, color: 0x38bdf8, speed: 0.005, wire: true },
      { geo: new THREE.OctahedronGeometry(0.7, 0), x: 0, y: 9, z: -10, color: 0xa78bfa, speed: 0.008, wire: false },
      { geo: new THREE.TetrahedronGeometry(0.6, 0), x: -16, y: -2, z: -12, color: 0xf97316, speed: 0.011, wire: true },
      { geo: new THREE.IcosahedronGeometry(1.3, 0), x: 18, y: 6, z: -14, color: 0x0ea5e9, speed: 0.004, wire: true },
      { geo: new THREE.BoxGeometry(0.9, 0.9, 0.9), x: -4, y: -10, z: -8, color: 0x8b5cf6, speed: 0.010, wire: false },
    ];

    configs.forEach((cfg) => {
      const mat = cfg.wire
        ? new THREE.MeshBasicMaterial({
            color: cfg.color,
            wireframe: true,
            transparent: true,
            opacity: 0.4,
          })
        : new THREE.MeshStandardMaterial({
            color: cfg.color,
            metalness: 0.7,
            roughness: 0.2,
            transparent: true,
            opacity: 0.7,
          });

      const mesh = new THREE.Mesh(cfg.geo, mat);
      mesh.position.set(cfg.x, cfg.y, cfg.z);
      mesh.userData = {
        baseY: cfg.y,
        baseX: cfg.x,
        speed: cfg.speed,
        phase: Math.random() * Math.PI * 2,
        floatAmp: 0.8 + Math.random() * 0.8,
      };
      scene.add(mesh);
      geometries.push(mesh);
    });
  }

  /* ---------- GRID LINES ---------- */
  function buildGridLines() {
    const matGrid = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.06,
    });

    // Horizontal lines
    for (let i = -10; i <= 10; i += 2) {
      const pts = [
        new THREE.Vector3(-50, i * 1.5, -20),
        new THREE.Vector3(50, i * 1.5, -20),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, matGrid));
    }
    // Vertical lines
    for (let i = -12; i <= 12; i += 3) {
      const pts = [
        new THREE.Vector3(i * 3, -20, -20),
        new THREE.Vector3(i * 3, 20, -20),
      ];
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(new THREE.Line(geo, matGrid));
    }
  }

  /* ---------- LIGHTS ---------- */
  function addLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.15);
    scene.add(ambient);

    const blue = new THREE.PointLight(0x0ea5e9, 3, 60);
    blue.position.set(-10, 10, 15);
    scene.add(blue);

    const purple = new THREE.PointLight(0x8b5cf6, 2, 50);
    purple.position.set(10, -8, 12);
    scene.add(purple);

    const orange = new THREE.PointLight(0xf97316, 1.5, 40);
    orange.position.set(0, 12, 10);
    scene.add(orange);
  }

  /* ---------- ANIMATION LOOP ---------- */
  let clock = { t: 0 };

  function startLoop() {
    let last = 0;

    function loop(time) {
      animFrameId = requestAnimationFrame(loop);
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      clock.t += dt;

      // Smooth mouse lag
      mouse.x += (targetMouse.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.y - mouse.y) * 0.06;

      // Rotate particle field slowly
      if (particles) {
        particles.rotation.y = clock.t * 0.015;
        particles.rotation.x = clock.t * 0.005;
      }

      // Animate floating objects
      geometries.forEach((mesh) => {
        const d = mesh.userData;
        mesh.rotation.x += d.speed;
        mesh.rotation.y += d.speed * 1.3;
        mesh.position.y =
          d.baseY + Math.sin(clock.t * 0.5 + d.phase) * d.floatAmp;

        // Cursor parallax
        mesh.position.x =
          d.baseX + mouse.x * (2 + Math.abs(d.baseX) * 0.05);
      });

      // Camera subtle movement
      camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 1.5 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    requestAnimationFrame(loop);
  }

  /* ---------- EVENTS ---------- */
  function bindEvents() {
    window.addEventListener("mousemove", (e) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("resize", () => {
      if (!canvas) return;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    });

    // Pause when tab hidden
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        startLoop();
      }
    });
  }

  /* ---------- INIT ON LOAD ---------- */
  function tryInit() {
    if (typeof THREE !== "undefined") {
      initThreeScene();
    } else {
      setTimeout(tryInit, 100);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", tryInit);
  } else {
    tryInit();
  }
})();
