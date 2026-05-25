"use client";

import { useState } from "react";

export type PanelType = "filter" | "updates" | null;

export function useResponsivePanel() {
  const [activePanel, setActivePanel] = useState<PanelType>(null);

  const open = (type: Exclude<PanelType, null>) => setActivePanel(type);
  const close = () => setActivePanel(null);

  return { activePanel, open, close };
}