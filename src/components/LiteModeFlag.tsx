"use client";

import { useEffect } from "react";
import { useLiteMode } from "@/lib/performance";

// Adds a "lite" class to the page on lower-powered devices, so CSS can switch off costly effects like glass blur.
export default function LiteModeFlag() {
  const lite = useLiteMode();

  useEffect(() => {
    document.documentElement.classList.toggle("lite", lite);
  }, [lite]);

  return null;
}
