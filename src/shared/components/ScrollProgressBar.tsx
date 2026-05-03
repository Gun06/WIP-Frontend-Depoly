"use client";

import { useEffect, useState } from "react";

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    /* 헤더 하단 – absolute bottom-0 으로 헤더에 딱 붙음 */
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 z-50 h-[3px] bg-white/10"
      aria-hidden
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #00d4d0 0%, #5b8fff 50%, #9b6dff 100%)",
          boxShadow: "0 0 8px rgba(0,212,208,0.5)",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
}
