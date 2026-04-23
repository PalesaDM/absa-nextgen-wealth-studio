import { useEffect, useRef, useState } from "react";

export default function CountUp({ value = 0, duration = 260, format = (v) => v }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = Number(prev.current) || 0;
    const to = Number(value) || 0;
    prev.current = value;

    const start = performance.now();
    let raf;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const next = from + (to - from) * p;
      setDisplay(next);
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <>{format(display)}</>;
}