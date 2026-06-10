// Canvas 雨雾动态背景
(function initRainFogBg() {
  if (document.getElementById('rain-fog-bg')) return;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'rain-fog-bg';
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-999;';
  document.body.prepend(canvas);

  const ctx = canvas.getContext('2d');

  let dpr = window.devicePixelRatio || 1;
  let w, h;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  // --- 粒子：80 条雨丝 ---
  const raindrops = [];
  const RAIN_COUNT = 80;
  for (let i = 0; i < RAIN_COUNT; i++) {
    raindrops.push({
      x: Math.random() * w,
      y: Math.random() * h,
      length: 10 + Math.random() * 25,
      speed: 6 + Math.random() * 14,
      opacity: 0.10 + Math.random() * 0.05,
      width: 0.3 + Math.random() * 0.7,
    });
  }

  // --- 雾气层：2 团缓慢飘移的雾 ---
  const fogLayers = [
    { x: 0.2, y: 0.35, r: 0, radius: w * 0.55 },
    { x: 0.75, y: 0.65, r: 0, radius: w * 0.45 },
  ];

  let fogTime = 0;
  let lastTime = performance.now();

  function drawFog(now) {
    const dt = (now - lastTime) / 1000;
    lastTime = now;
    fogTime += dt * 0.15;

    fogLayers.forEach((fog, i) => {
      const cx = w * (fog.x + Math.sin(fogTime + i * 2.5) * 0.06);
      const cy = h * (fog.y + Math.cos(fogTime * 0.7 + i) * 0.04);

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, fog.radius);
      gradient.addColorStop(0, 'rgba(80, 130, 150, 0.25)');
      gradient.addColorStop(0.35, 'rgba(55, 90, 110, 0.12)');
      gradient.addColorStop(0.7, 'rgba(30, 50, 65, 0.04)');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);
    });
  }

  function drawRain() {
    raindrops.forEach(d => {
      d.y += d.speed;
      d.x -= d.speed * 0.15;
      if (d.y > h + d.length) {
        d.y = -d.length;
        d.x = Math.random() * w * 1.3;
      }
      if (d.x < -30) {
        d.x = w + 30;
        d.y = -d.length;
      }

      const grad = ctx.createLinearGradient(d.x, d.y, d.x + d.speed * 0.08, d.y + d.length);
      grad.addColorStop(0, `rgba(200,220,235,${d.opacity.toFixed(3)})`);
      grad.addColorStop(1, 'rgba(200,220,235,0)');

      ctx.beginPath();
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x + d.speed * 0.08, d.y + d.length);
      ctx.strokeStyle = grad;
      ctx.lineWidth = d.width;
      ctx.stroke();
    });
  }

  function drawBase() {
    ctx.fillStyle = '#070A13';
    ctx.fillRect(0, 0, w, h);
  }

  function animate(now) {
    drawBase();
    drawFog(now);
    drawRain();
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
})();
