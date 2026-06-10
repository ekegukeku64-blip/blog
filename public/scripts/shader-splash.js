// One-time shader splash — plays once per session
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const KEY = 'splash-shown';
const DURATION = 4000;
const FADE = 800;

if (sessionStorage.getItem(KEY)) {
  document.documentElement.classList.add('splash-done');
} else {
  init();
}

function init() {
  document.documentElement.style.overflow = 'hidden';

  const overlay = document.createElement('div');
  overlay.id = 'shader-splash';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '99999',
    background: '#000', overflow: 'hidden',
    transition: `opacity ${FADE}ms cubic-bezier(0.16, 1, 0.3, 1)`,
  });
  document.body.prepend(overlay);

  const camera = new THREE.Camera();
  camera.position.z = 1;
  const scene = new THREE.Scene();
  const geometry = new THREE.PlaneGeometry(2, 2);
  const uniforms = {
    time: { value: 1.0 },
    resolution: { value: new THREE.Vector2() },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.05;
        float lineWidth = 0.002;
        vec3 color = vec3(0.0);
        for (int j = 0; j < 3; j++) {
          for (int i = 0; i < 5; i++) {
            color[j] += lineWidth * float(i * i) /
              abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0
                - length(uv) + mod(uv.x + uv.y, 0.2));
          }
        }
        gl_FragColor = vec4(color[0], color[1], color[2], 1.0);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  overlay.appendChild(renderer.domElement);

  function resize() {
    const w = overlay.clientWidth;
    const h = overlay.clientHeight;
    renderer.setSize(w, h);
    uniforms.resolution.value.set(renderer.domElement.width, renderer.domElement.height);
  }
  resize();
  window.addEventListener('resize', resize);

  let id;
  function animate() {
    id = requestAnimationFrame(animate);
    uniforms.time.value += 0.05;
    renderer.render(scene, camera);
  }
  animate();

  setTimeout(() => {
    overlay.style.opacity = '0';
    document.documentElement.style.overflow = '';
    document.documentElement.classList.add('splash-done');
    setTimeout(() => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', resize);
      overlay.remove();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    }, FADE + 100);
  }, DURATION);

  sessionStorage.setItem(KEY, '1');
}
