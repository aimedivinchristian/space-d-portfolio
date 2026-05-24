'use client';
import { useEffect, useRef } from 'react';

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mount = mountRef.current;
    if (!mount) return;

    let animId: number;
    let THREE: typeof import('three');

    async function init() {
      THREE = await import('three');
      const mountEl = mountRef.current;
      if (!mountEl) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountEl.appendChild(renderer.domElement);

      // Floating particles
      const particleCount = 180;
      const positions = new Float32Array(particleCount * 3);
      const velocities: { x: number; y: number; z: number }[] = [];
      const sizes = new Float32Array(particleCount);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        velocities.push({
          x: (Math.random() - 0.5) * 0.003,
          y: (Math.random() - 0.5) * 0.003,
          z: (Math.random() - 0.5) * 0.002,
        });
        sizes[i] = Math.random() * 2.5 + 0.5;
      }

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const mat = new THREE.PointsMaterial({
        color: 0xe08a45,
        size: 0.04,
        transparent: true,
        opacity: 0.5,
        sizeAttenuation: true,
      });
      const particles = new THREE.Points(geom, mat);
      scene.add(particles);

      // Floating geometric shapes
      const shapes: any[] = [];
      const shapeDefs = [
        { geo: new THREE.OctahedronGeometry(0.22), pos: [-3, 1.5, -2], color: 0xe08a45, speed: 0.005 },
        { geo: new THREE.TetrahedronGeometry(0.18), pos: [3.5, -1, -1.5], color: 0x4aa8cc, speed: 0.007 },
        { geo: new THREE.OctahedronGeometry(0.14), pos: [1, 2.5, -3], color: 0xe08a45, speed: 0.004 },
        { geo: new THREE.TetrahedronGeometry(0.1), pos: [-2.5, -2, -1], color: 0x4aa8cc, speed: 0.009 },
        { geo: new THREE.OctahedronGeometry(0.28), pos: [4, 2, -4], color: 0xe08a45, speed: 0.003 },
      ];

      shapeDefs.forEach((def) => {
        const wireMat = new THREE.MeshBasicMaterial({
          color: def.color, wireframe: true, transparent: true, opacity: 0.3,
        });
        const mesh = new THREE.Mesh(def.geo, wireMat);
        mesh.position.set(...(def.pos as [number, number, number]));
        mesh.userData.speed = def.speed;
        mesh.userData.initY = def.pos[1];
        scene.add(mesh);
        shapes.push(mesh);
      });

      let mouse = { x: 0, y: 0 };
      const onMouse = (e: MouseEvent) => {
        mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
        mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.5;
      };
      window.addEventListener('mousemove', onMouse);

      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      let t = 0;
      function animate() {
        animId = requestAnimationFrame(animate);
        t += 0.01;

        // Animate particles
        const pos = geom.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += velocities[i].x;
          pos[i * 3 + 1] += velocities[i].y;
          pos[i * 3 + 2] += velocities[i].z;

          if (Math.abs(pos[i * 3]) > 10) velocities[i].x *= -1;
          if (Math.abs(pos[i * 3 + 1]) > 10) velocities[i].y *= -1;
          if (Math.abs(pos[i * 3 + 2]) > 5) velocities[i].z *= -1;
        }
        geom.attributes.position.needsUpdate = true;

        // Animate shapes
        shapes.forEach((s) => {
          s.rotation.x += s.userData.speed;
          s.rotation.y += s.userData.speed * 1.3;
          s.position.y = s.userData.initY + Math.sin(t * s.userData.speed * 60) * 0.3;
        });

        // Subtle camera drift
        camera.position.x += (mouse.x - camera.position.x) * 0.02;
        camera.position.y += (mouse.y - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
      }
      animate();

      return () => {
        window.removeEventListener('mousemove', onMouse);
        window.removeEventListener('resize', onResize);
        cancelAnimationFrame(animId);
        renderer.dispose();
        const current = mountRef.current;
        if (current && current.contains(renderer.domElement)) current.removeChild(renderer.domElement);
      };
    }

    const cleanup = init();
    return () => { cleanup.then((fn) => fn && fn()); };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none', overflow: 'hidden',
        opacity: 0.55,
      }}
    />
  );
}
