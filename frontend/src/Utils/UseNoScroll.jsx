import { useEffect } from "react";

export default function useNoScroll(on = true) {
  useEffect(() => {
    if (on) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden"; 
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [on]);
}