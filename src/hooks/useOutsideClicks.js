import { useEffect, useRef } from "react";

export function useOutsideClicks(handler, listenCapturing = true) {
  const ref = useRef();
  useEffect(
    function () {
      function handleOutsideClicks(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("outside click");
          handler();
        }
      }
      document.addEventListener("click", handleOutsideClicks, listenCapturing);
      return () =>
        document.removeEventListener(
          "click",
          handleOutsideClicks,
          listenCapturing
        );
    },
    [handler, listenCapturing]
  );
  return ref;
}
