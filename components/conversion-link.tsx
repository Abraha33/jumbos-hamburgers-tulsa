"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { ConversionEvent } from "@/lib/site-data";

export function emitConversion(event: ConversionEvent, detail: Record<string, unknown> = {}) {
  const trackedWindow = window as Window & { dataLayer?: Array<Record<string, unknown>> };
  const payload = { event: "restaurant_conversion", conversion_action: event, ...detail };
  trackedWindow.dataLayer ??= [];
  trackedWindow.dataLayer.push(payload);
  window.dispatchEvent(new CustomEvent("jumbos:conversion", { detail: payload }));
}

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  event: ConversionEvent;
  detail?: Record<string, unknown>;
  children: ReactNode;
};

export function ConversionLink({ event, detail, children, onClick, ...props }: Props) {
  return (
    <a
      {...props}
      data-conversion={event}
      onClick={(clickEvent) => {
        emitConversion(event, detail);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}
