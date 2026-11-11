"use client";
import { useEffect, useState } from "react";

export default function Clock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [timeZone]);

  return <span className="font-mono">{time}</span>;
}