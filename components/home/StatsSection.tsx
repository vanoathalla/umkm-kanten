"use client";
import { umkmData, kategoriList } from "@/data/umkm";
import { Store, Tag, MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(ease * target));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCard({
  icon: Icon,
  value,
  suffix = "+",
  label,
  accent,
}: {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  accent: string;
}) {
  const { count, ref } = useCountUp(value);
  return (
    <div
      ref={ref}
      className="group flex flex-col items-center text-center py-8 px-4 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-[#011f6d]/20 dark:hover:border-white/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
        style={{ backgroundColor: accent + "18" }}
      >
        <Icon size={22} style={{ color: accent }} />
      </div>
      <p
        className="text-3xl font-bold text-[#011f6d] dark:text-white mb-1"
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        {count}
        {suffix}
      </p>
      <p className="text-gray-400 dark:text-gray-500 text-sm">{label}</p>
    </div>
  );
}

export default function StatsSection() {
  const kategoriCount = kategoriList.filter((k) => k !== "Semua").length;
  return (
    <section className="py-16 bg-gray-50 dark:bg-[#011f6d]/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={Store}  value={umkmData.length} label="Total UMKM"       accent="#011f6d" />
          <StatCard icon={Tag}    value={kategoriCount}   label="Kategori"          accent="#ffaa4d" />
          <StatCard icon={MapPin} value={5}               label="RT"      suffix="" accent="#011f6d" />
          <StatCard icon={Users}  value={500}             label="Warga Terlayani"  accent="#ffaa4d" />
        </div>
      </div>
    </section>
  );
}
