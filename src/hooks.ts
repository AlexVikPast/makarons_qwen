import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** IntersectionObserver: возвращает [ref, inView]. Срабатывает один раз. */
export function useInView<T extends HTMLElement>(
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px"
): [React.MutableRefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, inView]);
  return [ref, inView];
}

/** Плавный счётчик до target, когда inView === true. */
export function useCountUp(target: number, inView: boolean, duration = 1400, decimals = 0): string {
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced]);
  return value.toFixed(decimals);
}

const SCRAMBLE_CHARS = "МАКАРОНЫПСТ✳*#%&@";

/** Scramble-decode: текст «расшифровывается» слева направо. */
export function useScramble(text: string, start = true, duration = 1100): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? text : "");
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const locked = Math.floor(p * text.length);
      let s = text.slice(0, locked);
      for (let i = locked; i < text.length; i++) {
        s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, start, duration, reduced]);
  return out;
}

/** Лёгкий параллакс по скроллу. Возвращает ref; двигает элемент с factor. */
export function useParallax<T extends HTMLElement>(factor = 0.08): React.MutableRefObject<T | null> {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate3d(0, ${window.scrollY * factor}px, 0)`;
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [factor, reduced]);
  return ref;
}
