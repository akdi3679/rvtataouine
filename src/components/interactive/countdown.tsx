"use client";

import { useEffect, useState, useMemo } from "react";

interface CountdownProps {
  targetDate: string;
  targetTime: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calculateTimeLeft(target: Date): TimeLeft {
  const now = new Date().getTime();
  const difference = target.getTime() - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    total: difference,
  };
}

export function Countdown({ targetDate, targetTime }: CountdownProps) {
  // Memoize target to prevent recalculation on every render
  const target = useMemo(
    () => new Date(`${targetDate}T${targetTime}:00`),
    [targetDate, targetTime]
  );

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTimeLeft(calculateTimeLeft(target));

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [target]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        {["Jours", "Heures", "Minutes", "Secondes"].map((label, i) => (
          <div key={label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 sm:h-20 sm:w-20">
                <span className="text-2xl font-bold text-white tabular-nums sm:text-4xl">00</span>
              </div>
              <span className="mt-2 text-xs font-medium text-white/70 uppercase tracking-wider">
                {label}
              </span>
            </div>
            {i < 3 && (
              <span className="text-2xl font-bold text-white/40 sm:text-3xl mb-6">:</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  if (timeLeft.total <= 0) {
    return (
      <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white">
        <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
        Match en cours
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Jours" },
    { value: timeLeft.hours, label: "Heures" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Secondes" },
  ];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-2 sm:gap-3">
          <div className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 sm:h-20 sm:w-20">
              <span className="text-2xl font-bold text-white tabular-nums sm:text-4xl">
                {String(unit.value).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-2 text-xs font-medium text-white/70 uppercase tracking-wider">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-2xl font-bold text-white/40 sm:text-3xl mb-6">:</span>
          )}
        </div>
      ))}
    </div>
  );
}