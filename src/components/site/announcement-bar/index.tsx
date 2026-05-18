"use client";

import { useEffect, useState } from "react";

type Props = {
  text: string;
  endDate?: string;
};

export default function AnnouncementBar({ text, endDate }: Props) {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!endDate) return;

    const target = new Date(endDate).getTime();

    const tick = () => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) return;

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return (
    <div className="w-full bg-black/90 text-white flex items-center justify-center">
      <div className="container-custom flex justify-between flex-col md:flex-row items-center py-3 gap-2 md:py-0 md:h-20 md:gap-x-9 lg:gap-x-8">
        {endDate && (
          <div className="hidden md:flex  gap-2.5 select-none">
            <Box
              label="ثانیه"
              value={time.seconds}
              opacity="bg-white/5 border-white/20"
            />
            <Box
              label="دقیقه"
              value={time.minutes}
              opacity="bg-white/10 border-white/25"
            />
            <Box
              label="ساعت"
              value={time.hours}
              opacity="bg-white/15 border-white/30"
            />
            <Box
              label="روز"
              value={time.days}
              opacity="bg-white/20 border-white/35"
            />
          </div>
        )}
        <div className="flex items-center gap-x-2 select-none ">
          <span className="text-sm  md:text-2md font-semibold text-center sm:text-right leading-8">
            {text}
          </span>
          <span className="hidden md:flex animate-pulse text-xl">🔔</span>
        </div>
        {endDate && (
          <div className="flex  md:hidden gap-2.5 select-none">
            <Box
              label="ثانیه"
              value={time.seconds}
              opacity="bg-white/5 border-white/20"
            />
            <Box
              label="دقیقه"
              value={time.minutes}
              opacity="bg-white/10 border-white/25"
            />
            <Box
              label="ساعت"
              value={time.hours}
              opacity="bg-white/15 border-white/30"
            />
            <Box
              label="روز"
              value={time.days}
              opacity="bg-white/20 border-white/35"
            />
          </div>
        )}
      </div>
    </div>
  );
}

function Box({
  value,
  label,
  opacity,
}: {
  value: number;
  label: string;
  opacity: string;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-y-2 
      w-12 h-12 lg:w-13 lg:h-13 
      rounded-lg border ${opacity}`}
    >
      <span className="text-sm font-bold leading-4">{value}</span>
      <span className="text-[10px] opacity-80 leading-3">{label}</span>
    </div>
  );
}
