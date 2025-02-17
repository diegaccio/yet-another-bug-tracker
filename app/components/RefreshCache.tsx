"use client";

import { useEffect, useState } from "react";
import { useInterval } from "react-interval-hook";

export function RefreshCache({
  check,
  lastTime,
}: {
  check: (lastTime: Date | undefined) => Promise<void>;
  lastTime: Date | undefined;
}) {
  const [shouldRun, setShouldRun] = useState(
    typeof document !== "undefined" && document.hasFocus()
  );

  useEffect(() => {
    const onFocus = () => {
      check(lastTime);
      setShouldRun(true);
    };
    const onBlur = () => setShouldRun(false);

    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);

    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  }, [check, lastTime]);

  const innerCheck = async () => {
    check(lastTime);
  };

  useInterval(innerCheck, shouldRun ? 10000 : undefined);

  return null;
}
