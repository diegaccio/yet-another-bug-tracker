"use client";

import { useEffect, useState } from "react";
import { useInterval } from "react-interval-hook";

export function RefreshCache({ check }: { check: () => Promise<void> }) {
  const [shouldRun, setShouldRun] = useState(
    typeof document !== "undefined" && document.hasFocus()
  );

  useEffect(() => {
    const onFocus = () => {
      check();
      setShouldRun(true);
    };
    const onBlur = () => setShouldRun(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [check]);

  useInterval(check, shouldRun ? 10000 : undefined);

  return null;
}
