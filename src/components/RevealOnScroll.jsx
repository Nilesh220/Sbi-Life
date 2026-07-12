'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function RevealOnScroll({ children, className = '', delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    gsap.set(el, { opacity: 0, y: 12 });


    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 95%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay,
          ease: 'power2.out',
        });
      }
    });

    // Refresh layout calculations once mounted to prevent offset issues from dynamic renders
    ScrollTrigger.refresh();
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 300);

    return () => {
      trigger.kill();
      clearTimeout(timeoutId);
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
