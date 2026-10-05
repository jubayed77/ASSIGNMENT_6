"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, X, ChevronDown } from "lucide-react";
import { usePlan } from "@/context/PlanContext";
import Stats from "@/components/Stats";

export default function MyPlan() {
  const { plan, saved, metrics, removeFromPlan, removeFromSaved, markAsDone } = usePlan();
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");
  const [sortBy, setSortBy] = useState("duration");

  const currentList = activeTab === "plan" ? plan : saved;

  //list sort code 
  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === "duration") return a.duration - b.duration;
    if (sortBy === "calories") return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  const tabStyle = "px-4 py-1.5 rounded text-sm";

  return (
    <div>
      <h1 className="font-display text-3xl font-bold uppercase">My Plan</h1>
      <p className="text-gray-400 text-sm mb-6">Cap of five lifts for today. Finish them, then load more.</p>

     
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          ["Exercises", metrics.exercises],
          ["Minutes", metrics.minutes],
          ["Calories", metrics.calories],
        ].map(([label, value]) => (
          <div key={label} className="bg-card border border-line rounded-lg p-4">
            <p className="text-xs text-gray-400 uppercase">{label}</p>
            <p className="font-display text-3xl text-accent font-bold">{value}</p>
          </div>
        ))}
      </div>

      {/* Tab  Sort code */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <div className="flex gap-1 bg-card rounded p-1">
          <button onClick={() => setActiveTab("plan")} className={`${tabStyle} ${activeTab === "plan" ? "bg-accent text-black font-semibold" : "text-gray-400"}`}>
            Today&apos;s Plan
          </button>
          <button onClick={() => setActiveTab("saved")} className={`${tabStyle} ${activeTab === "saved" ? "bg-accent text-black font-semibold" : "text-gray-400"}`}>
            Saved
          </button>
        </div>

        <label className="flex items-center gap-2 text-xs text-gray-400">
          Sort By
          <span className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-card border border-line rounded px-3 py-1.5 pr-7 text-white"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-2 pointer-events-none" />
          </span>
        </label>
      </div>

      {/* Em list */}
      {sortedList.length === 0 ? (
        <div className="bg-card border border-line rounded-xl text-center py-14 px-4">
          <h3 className="font-display text-xl font-bold">NOTHING HERE YET</h3>
          <p className="text-gray-400 text-sm my-3">Browse the library and add a lift to get today moving.</p>
          <Link href="/" className="inline-block bg-accent text-black font-bold text-sm px-5 py-2 rounded">
            Go to workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedList.map((item) => {
            const isDone = "isDone" in item && item.isDone;
            return (
              <div key={item.id} className="bg-card border border-line rounded-lg p-3 flex flex-col sm:flex-row sm:items-center gap-3">
                {/* itm imag  */}
                <img src={item.image} alt={item.name} className="h-16 w-24 object-cover rounded" />
                <div className="flex-1">
                  <h3 className={`font-display font-bold uppercase ${isDone ? "line-through text-gray-500" : ""}`}>{item.name}</h3>
                  <p className="text-xs text-gray-400 mb-1">{item.equipment}</p>
                  <Stats workout={item} />
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/workout/${item.id}`} className="border border-gray-500 text-xs px-3 py-2 rounded">
                    View Details
                  </Link>

{/* mark d b */}
     
                  {activeTab === "plan" && !isDone && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className="flex items-center gap-1 bg-accent text-black font-semibold text-xs px-3 py-2 rounded"
                    >
                      <Check size={14} /> Mark as Done
                    </button>
                  )}
                  {/* remove b  */}
                  <button
                    onClick={() => (activeTab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                    className="text-gray-400 hover:text-white p-1"
                    aria-label="Remove"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
