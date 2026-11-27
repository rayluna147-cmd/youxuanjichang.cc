import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initSpectrumMotion() {
  // Clean up previous ScrollTriggers on Astro ViewTransition navigation
  ScrollTrigger.getAll().forEach((st) => st.kill());

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Fullscreen Dynamic Menu
  const menuTrigger = document.getElementById('menu-trigger');
  const fullscreenMenu = document.getElementById('fullscreen-menu');
  if (menuTrigger && fullscreenMenu && menuTrigger.dataset.bound !== 'true') {
    menuTrigger.dataset.bound = 'true';
    const toggleMenu = (force?: boolean) => {
      const nextOpen = typeof force === 'boolean' ? force : !fullscreenMenu.classList.contains('open');
      fullscreenMenu.classList.toggle('open', nextOpen);
      menuTrigger.setAttribute('aria-expanded', String(nextOpen));
      fullscreenMenu.setAttribute('aria-hidden', String(!nextOpen));
      document.body.style.overflow = nextOpen ? 'hidden' : '';

      if (nextOpen && !reducedMotion) {
        gsap.fromTo(
          fullscreenMenu.querySelectorAll('.menu-item'),
          { y: 28, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.055, ease: 'power3.out', clearProps: 'transform' }
        );
      }
    };

    menuTrigger.addEventListener('click', () => toggleMenu());
    fullscreenMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && fullscreenMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  if (reducedMotion) return;

  // 2. Magnetic Buttons
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    if (el.dataset.magBound === 'true') return;
    el.dataset.magBound = 'true';
    el.addEventListener('pointermove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.24;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.24;
      gsap.to(el, { x, y, duration: 0.3, ease: 'power2.out' });
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
    });
  });

  // 3. 3D Perspective Tilt Cards
  document.querySelectorAll<HTMLElement>('[data-tilt-card]').forEach((card) => {
    if (card.dataset.tiltBound === 'true') return;
    card.dataset.tiltBound = 'true';
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      const rx = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      const ry = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      gsap.to(card, {
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        duration: 0.35,
        ease: 'power2.out',
      });
    });
    card.addEventListener('pointerleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
    });
  });

  // 4. Dynamic Color Accent Shifting per Section
  document.querySelectorAll<HTMLElement>('[data-accent-section]').forEach((section) => {
    const color = section.dataset.accentSection;
    if (!color) return;
    ScrollTrigger.create({
      trigger: section,
      start: 'top 55%',
      end: 'bottom 45%',
      onEnter: () => document.documentElement.style.setProperty('--spectrum-accent', color),
      onEnterBack: () => document.documentElement.style.setProperty('--spectrum-accent', color),
    });
  });

  // 5. Mask Reveal & Scroll Entrance
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 86%',
          once: true,
        },
      }
    );
  });

  // 6. SVG Path Drawing
  document.querySelectorAll<SVGPathElement>('[data-svg-draw]').forEach((path) => {
    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.6,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: path,
        start: 'top 82%',
        once: true,
      },
    });
  });
}

document.addEventListener('astro:page-load', initSpectrumMotion);
