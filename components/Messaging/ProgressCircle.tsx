'use client';

import { motion } from 'framer-motion';

interface ProgressCircleProps {
  size?: number;
  strokeWidth?: number;
  progress: number; // 0-100
  label?: string;
}

export const ProgressCircle = ({
  size = 28,
  strokeWidth = 3,
  progress,
  label,
}: ProgressCircleProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, progress));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      title={label}
      aria-label={label}
    >
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-muted-foreground/25"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-primary"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: offset }}
          initial={false}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </svg>
      <span className="absolute text-[9px] font-semibold select-none text-foreground">
        {clamped}%
      </span>
    </div>
  );
};
