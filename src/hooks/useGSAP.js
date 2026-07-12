'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useGSAP() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return gsap;
}

export function useAnimateCounter(ref, target, duration = 2, suffix = '', runImmediately = false, triggerEl = null) {
  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const obj = { value: 0 };

    const startAnimation = () => {
      gsap.to(obj, {
        value: target,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          const val = Math.round(obj.value);
          if (val >= 1000) {
            el.textContent = (val / 1000).toFixed(val >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K' + suffix;
          } else {
            el.textContent = val.toLocaleString('en-IN') + suffix;
          }
        },
        onComplete: () => {
          if (target >= 1000) {
            el.textContent = (target / 1000).toFixed(target >= 10000 ? 0 : 1).replace(/\.0$/, '') + 'K' + suffix;
          } else {
            el.textContent = target.toLocaleString('en-IN') + suffix;
          }
        }
      });
    };

    if (runImmediately && !triggerEl) {
      startAnimation();
      return;
    }

    const targetTrigger = triggerEl ? triggerEl.current || triggerEl : el;
    if (!targetTrigger) {
      startAnimation();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(targetTrigger);

    return () => {
      if (targetTrigger) {
        observer.unobserve(targetTrigger);
      }
    };
  }, [ref, target, duration, suffix, runImmediately, triggerEl]);
}
