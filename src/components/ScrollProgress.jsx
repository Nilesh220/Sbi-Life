'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollProgress() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Scroll progress bar
    const bar = document.getElementById('scroll-progress');
    let scheduled = false;
    const onScroll = () => {
      if (scheduled || !bar) return;
      scheduled = true;
      requestAnimationFrame(() => {
        const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        bar.style.width = Math.min(pct, 100) + '%';
        scheduled = false;
      });
    };

    // 2. Nav shrink on scroll
    const nav = document.getElementById('main-nav');
    const onNavScroll = () => {
      if (nav) nav.classList.toggle('nav--scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('scroll', onNavScroll, { passive: true });
    onScroll();
    onNavScroll();

    // 3. Global Scroll Reveal Observer
    const revealEls = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => {
      if (!el.classList.contains('reveal--visible')) {
        revealObserver.observe(el);
      }
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onNavScroll);
      revealObserver.disconnect();
    };
  }, [pathname]);

  return <div className="scroll-progress-bar" id="scroll-progress"></div>;
}

