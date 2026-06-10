// Diagonal curtain-parting splash — waves push curtain from center toward corners,
// revealing the page beneath. Plays once ever.
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

const KEY = 'splash-v6';
const PART_DURATION = 2.8;  // seconds the curtain takes to fully part
const HOLD = 0.4;           // brief pause after parting before cleanup
const FADE = 400;

const forceShow = new URLSearchParams(location.search).has('splash');
if (forceShow) localStorage.removeItem(KEY);

if (localStorage.getItem(KEY)) {
  document.documentElement.classList.add('splash-done');
} else {
  initPartingSplash();
}

function initPartingSplash() {
  localStorage.setItem(KEY, '1');
  document.documentElement.style.overflow = 'hidden';

  const overlay = document.createElement('div');
  overlay.id = 'shader-splash';
  Object.assign(overlay.style, {
    position: 'fixed', inset: '0', zIndex: '99999',
    background: 'transparent', overflow: 'hidden',
    pointerEvents: 'none',
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
    transparent: true,
    vertexShader: `void main() { gl_Position = vec4(position, 1.0); }`,
    fragmentShader: `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main(void) {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        float t = time;

        // ── diagonal slit along x=y (bottom-left → top-right) ──
        // waves push toward ↙ bottom-left and ↗ top-right
        float across = uv.x - uv.y;
        float dd = abs(across);

        // ── parting front: expands from diagonal, revealing page beneath ──
        float progress = clamp(t / 2.8, 0.0, 1.0);
        // ease-out: starts fast, decelerates as curtain nears corners
        float eased = 1.0 - pow(1.0 - progress, 2.5);
        // start negative so initial state is fully covered (curtain=1 everywhere)
        float partFront = -0.2 + eased * 2.4;

        // curtain alpha: 1 = covered, 0 = page visible
        float edge = 0.06 + (1.0 - progress) * 0.12;
        float curtain = smoothstep(partFront - edge, partFront + edge, dd);

        // ── wave textures on the curtain surface ──
        float w1 = sin(dd * 5.0 - t * 1.6)           * exp(-dd * 1.5);
        float w2 = sin(dd * 8.5 - t * 2.2 + 1.5)     * exp(-dd * 2.0);
        float w3 = cos(dd * 13.0 - t * 2.8 + 3.0)    * exp(-dd * 3.0);
        float w4 = sin(dd * 18.0 - t * 3.2 + 4.5)    * exp(-dd * 4.5);

        // ripple along the diagonal slit
        float along = uv.x + uv.y;
        float slitRipple = sin(along * 4.0 + t * 0.8) * 0.18
                         + cos(along * 7.0 - t * 1.2) * 0.10;

        float wave = (w1 * 0.45 + w2 * 0.25 + w3 * 0.15 + w4 * 0.1 + slitRipple * 0.05) * curtain;
        float intensity = abs(wave);

        // ── ice palette ──
        vec3 abyss  = vec3(0.01, 0.03, 0.10);
        vec3 deep   = vec3(0.03, 0.10, 0.25);
        vec3 mid    = vec3(0.08, 0.25, 0.42);
        vec3 surf   = vec3(0.25, 0.50, 0.65);
        vec3 crest  = vec3(0.60, 0.78, 0.88);
        vec3 foam   = vec3(0.92, 0.95, 0.97);

        vec3 col = abyss;
        col = mix(col, deep,  smoothstep(0.04, 0.18, intensity));
        col = mix(col, mid,   smoothstep(0.14, 0.38, intensity));
        col = mix(col, surf,  smoothstep(0.32, 0.58, intensity));
        col = mix(col, crest, smoothstep(0.52, 0.75, intensity));
        col = mix(col, foam,  smoothstep(0.70, 0.88, intensity));

        // ── slit glow (bright opening crack, fades as curtain parts) ──
        float slitGlow = exp(-dd * 10.0) * (1.0 - progress * 0.85);
        col += slitGlow * vec3(0.12, 0.30, 0.50) * curtain;

        // ── vignette ──
        col *= 1.0 - length(uv) * 0.42;

        // premultiplied alpha — page shows through where curtain = 0
        float alpha = curtain;
        gl_FragColor = vec4(col * alpha, alpha);
      }
    `,
  });

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  overlay.appendChild(renderer.domElement);

  function resize() {
    const w = overlay.clientWidth;
    const h = overlay.clientHeight;
    renderer.setSize(w, h, false);
    uniforms.resolution.value.set(w, h);
  }
  resize();
  window.addEventListener('resize', resize);

  let id;
  const startTime = performance.now();
  function animate(now) {
    id = requestAnimationFrame(animate);
    uniforms.time.value = (now - startTime) / 1000;
    renderer.render(scene, camera);
  }
  requestAnimationFrame(animate);

  const totalMs = (PART_DURATION + HOLD) * 1000;
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
  }, totalMs);
}
