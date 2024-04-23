"use client";
import ColumnWrapper from "@/app/_components/wrappers/ColumnWrapper";
import "@/styles/clock.css";
import { useEffect, useRef, useState } from "react";

export default function Clock({ timezone }: { timezone: string }) {
  const hourRef = useRef<HTMLDivElement>(null);
  const minuteRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("fi", { timeZone: timezone }),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hr = Number(
        date.toLocaleTimeString("fi", { timeZone: timezone }).split(".")[0],
      );
      const min = Number(
        date.toLocaleTimeString("fi", { timeZone: timezone }).split(".")[1],
      );
      const hr_rotation = 30 * hr + min / 2; //converting current time
      const min_rotation = 6 * min;
      setTime(hr + ":" + (min < 10 ? "0" + min : min));

      if (hourRef.current)
        hourRef.current.style.transform = `rotate(${hr_rotation}deg)`;
      if (minuteRef.current)
        minuteRef.current!.style.transform = `rotate(${min_rotation}deg)`;
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ColumnWrapper>
      <span>{time}</span>
      <div
        id="clockContainer"
        className="rounded-full border-[2px] border-black85 dark:border-white"
      >
        <div
          ref={minuteRef}
          style={{ transform: "rotate(0deg)" }}
          className="bg-black85 duration-300 ease-out dark:bg-white"
          id="minute"
        ></div>
        <div
          ref={hourRef}
          style={{ transform: "rotate(0deg)" }}
          id="hour"
          className="bg-primary duration-300 ease-out"
        ></div>
      </div>
    </ColumnWrapper>
  );
}
