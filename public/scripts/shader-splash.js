// Glass wave splash — SVG filter liquid glass, plays once ever
const KEY = 'splash-v3';
const DURATION = 4200;
const FADE = 800;

const forceShow = new URLSearchParams(location.search).has('splash');
if (forceShow) localStorage.removeItem(KEY);

if (localStorage.getItem(KEY)) {
  document.documentElement.classList.add('splash-done');
} else {
  initGlassSplash();
}

function initGlassSplash() {
  localStorage.setItem(KEY, '1');
  document.documentElement.style.overflow = 'hidden';

  // Inject SVG glass filter — same tech as the liquid glass button
  const filterSVG = document.createElement('div');
  filterSVG.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;';
  filterSVG.setAttribute('aria-hidden', 'true');
  filterSVG.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"><defs>
    <filter id="splash-glass" x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06" numOctaves="2" seed="3" result="turbulence"/>
      <feGaussianBlur in="turbulence" stdDeviation="3" result="blurredNoise"/>
      <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="90" xChannelSelector="R" yChannelSelector="B" result="displaced"/>
      <feGaussianBlur in="displaced" stdDeviation="5" result="finalBlur"/>
      <feComposite in="finalBlur" in2="finalBlur" operator="over"/>
    </filter>
  </defs></svg>`;
  document.body.append(filterSVG);

  // full-screen glass pane
  const overlay = document.createElement('div');
  overlay.id = 'shader-splash';
  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    background: 'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 40%, rgba(7,10,19,0.55) 100%)',
    backdropFilter: 'url(#splash-glass)',
    WebkitBackdropFilter: 'url(#splash-glass)',
    transition: `opacity ${FADE}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    animation: 'glass-float 4s ease-in-out',
  });
  document.body.prepend(overlay);

  // subtle drift animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes glass-float {
      0%   { transform: scale(1.02); opacity: 0; }
      15%  { opacity: 1; }
      85%  { opacity: 1; }
      100% { transform: scale(1); opacity: 0; }
    }
  `;
  document.head.append(style);

  // fade out
  setTimeout(() => {
    overlay.style.opacity = '0';
    document.documentElement.style.overflow = '';
    document.documentElement.classList.add('splash-done');
    setTimeout(() => {
      overlay.remove();
      filterSVG.remove();
      style.remove();
    }, FADE + 100);
  }, DURATION);
}
