"use client";

import { cloneElement, isValidElement, type ReactElement } from "react";

type SidebarTooltipProps = {
  title: string;
  /** When false, children render without a title (sidebar open). */
  enabled?: boolean;
  children: ReactElement<{ title?: string }>;
};

/**
 * Lightweight replacement for MUI Tooltip — avoids pulling Emotion into the
 * global sidebar bundle. Native `title` is enough for collapsed nav labels.
 */
export default function SidebarTooltip({
  title,
  enabled = true,
  children,
}: SidebarTooltipProps) {
  if (!enabled || !title || !isValidElement(children)) {
    return children;
  }

  return cloneElement(children, {
    title: children.props.title ?? title,
  });
}
