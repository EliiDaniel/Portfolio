"use client";

import { useSyncExternalStore } from "react";

type DeviceNavigator = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

const noSubscribe = () => () => {};

// Lite mode: lower-powered devices (4 or fewer CPU cores, 4 GB of memory or less) or data saver turned on.
// These devices skip the astronaut (the most expensive part) and get a lighter constellation.
// Always false during server rendering.
function detectLiteMode() {
  const nav = navigator as DeviceNavigator;
  const fewCores = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const saveData = nav.connection?.saveData === true;
  return fewCores || lowMemory || saveData;
}

export function useLiteMode() {
  return useSyncExternalStore(noSubscribe, detectLiteMode, () => false);
}
