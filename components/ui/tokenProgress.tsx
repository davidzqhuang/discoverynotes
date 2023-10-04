"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const determineColor = (value: number) => {
  if (value < 70) return 'green';
  if (value >= 70 && value <= 90) return 'yellow';
  return 'red';
};

const TokenProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 transition-all"
      style={{
        transform: `translateX(-${100 - (value || 0)}%)`,
        backgroundColor: determineColor(value || 0)
      }}
    />
  </ProgressPrimitive.Root>
));

TokenProgress.displayName = ProgressPrimitive.Root.displayName

export { TokenProgress }
