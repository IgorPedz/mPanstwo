import { useEffect } from "react";

export default function useNoScroll(on = true) {
  useEffect(() => {
    if (!on) return;

    const originalOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow = originalOverflow;
    };
  }, [on]);
}