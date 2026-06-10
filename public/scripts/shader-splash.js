// Ocean wave splash — plays once ever (localStorage), not per session
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const KEY = 'splash-v2';
const DURATION = 4000;
const FADE = 800;

const forceShow = new URLSearchParams(location.search).has('splash');
if (forceShow) {
  localStorage.removeItem(KEY);
}

if (localStorage.getItem(KEY)) {
  document.documentElement.classList.add('splash-done');
} else {
  init();
}

function init() {
  localStorage.setItem(KEY, '1');

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
    time: { value: 0 },
    resolution: { value: new THREE.Vector2() },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      // Simplex-like noise from sin combinations
      float wave(vec2 p, float t, float freq, float amp) {
        return sin(p.x * freq + t) * cos(p.y * freq * 0.7 - t * 0.6)
             + sin(p.y * freq * 1.3 + t * 0.8) * 0.5
             + cos((p.x + p.y) * freq * 0.5 - t * 1.1) * 0.3;
      }

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time * 0.4;

        // Layer multiple wave systems
        float w1 = wave(uv, t, 3.0, 1.0);
        float w2 = wave(uv + 0.3, t * 0.7, 5.5, 0.7);
        float w3 = wave(uv - 0.5, t * 1.2, 8.0, 0.4);
        float w4 = wave(uv * 1.5, t * 0.5, 12.0, 0.25);

        float h = w1 * 0.45 + w2 * 0.3 + w3 * 0.15 + w4 * 0.1;
        float norm = h * 0.5 + 0.5; // 0..1

        // Ocean color palette
        vec3 deep   = vec3(0.01, 0.04, 0.12);   // abyssal
        vec3 dark   = vec3(0.02, 0.1, 0.22);     // deep water
        vec3 mid    = vec3(0.04, 0.22, 0.38);     // mid water
        vec3 surf   = vec3(0.08, 0.45, 0.6);      // surface / shallow
        vec3 crest  = vec3(0.45, 0.7, 0.8);       // wave crest
        vec3 foam   = vec3(0.85, 0.92, 0.95);     // white foam

        vec3 col = deep;
        col = mix(col, dark,  smoothstep(0.1, 0.35, norm));
        col = mix(col, mid,   smoothstep(0.3, 0.55, norm));
        col = mix(col, surf,  smoothstep(0.5, 0.7, norm));
        col = mix(col, crest, smoothstep(0.65, 0.82, norm));
        col = mix(col, foam,  smoothstep(0.78, 0.9, norm));

        // Subtle vertical gradient — lighter toward top (horizon)
        float horizon = uv.y * 0.5 + 0.5;
        col = mix(col * 0.8, col, smoothstep(0.0, 0.6, horizon));

        // Slight vignette
        float vignette = 1.0 - length(uv) * 0.35;
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
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
    uniforms.time.value += 0.016;
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

}
