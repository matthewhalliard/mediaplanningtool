import { onBeforeUnmount, onMounted, ref, type Ref } from "vue";

/**
 * A looping clock for a scene, in ms since the loop began. It runs only while
 * the element is on screen and restarts each time it comes back. Under
 * reduced motion it stands still on the finished frame.
 * Same behaviour as the explainer scenes on halliardmedia.com.
 */
export const FADE_MS = 500;

export function useTimeline(period: number): { el: Ref<HTMLElement | null>; t: Ref<number>; opacity: Ref<number> } {
  const el = ref<HTMLElement | null>(null);
  const t = ref(period - FADE_MS - 1);
  const opacity = ref(1);
  let raf = 0;
  let start = 0;
  let io: IntersectionObserver | null = null;

  const tick = (now: number) => {
    if (!start) start = now;
    const x = (now - start) % period;
    t.value = x;
    opacity.value = x > period - FADE_MS ? Math.max(0, (period - x) / FADE_MS) : Math.min(1, x / 250);
    raf = requestAnimationFrame(tick);
  };

  onMounted(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !el.value || typeof IntersectionObserver === "undefined") return;
    io = new IntersectionObserver(
      ([entry]) => {
        cancelAnimationFrame(raf);
        if (entry?.isIntersecting) {
          start = 0;
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el.value);
  });

  onBeforeUnmount(() => {
    io?.disconnect();
    cancelAnimationFrame(raf);
  });

  return { el, t, opacity };
}

const ease = (x: number) => 1 - Math.pow(1 - x, 3);

/** How far, eased 0 to 1, a step starting at `start` and lasting `dur` has got by `t`. */
export function prog(t: number, start: number, dur: number) {
  if (t <= start) return 0;
  if (t >= start + dur) return 1;
  return ease((t - start) / dur);
}

/** Style for an element that appears at `at`: fades and rises into place. */
export function appear(t: number, at: number, dur = 450) {
  const p = prog(t, at, dur);
  return { opacity: p, transform: `translateY(${(1 - p) * 8}px)` };
}

/** A stable 0..1 number from a string, so each tool's bars differ but never change between visits. */
export function seed(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return ((h >>> 0) % 1000) / 1000;
}
