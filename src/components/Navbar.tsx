"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell } from "lucide-react";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();
  const onMyPlan = pathname === "/my-plan";

  const base = "px-4 py-1.5 rounded-full text-sm";
  const active = "bg-accent text-black font-semibold";
  const normal = "text-gray-400";

  return (
    <header className="border-b border-line">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
        {/* l- logo */}
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <Dumbbell className="text-accent" size={22} />
          <span className="hidden sm:inline">FITLOG</span>
        </Link>

        {/* m- links */}
        <div className="flex gap-1 bg-card rounded-full p-1">
          <Link href="/" className={`${base} ${!onMyPlan ? active : normal}`}>Workout</Link>
          <Link href="/my-plan" className={`${base} ${onMyPlan ? active : normal}`}>My Plan</Link>
        </div>

        {/* R-icon */}
        <div className="flex gap-2 text-xs font-semibold">
          <Link href="/my-plan" className="bg-accent text-black rounded-full px-3 py-1">Plan {plan.length}</Link>
          <Link href="/my-plan" className="border border-gray-500 rounded-full px-3 py-1">Saved {saved.length}</Link>
        </div>
      </nav>
    </header>
  );
}
