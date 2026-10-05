import { Clock, Flame, Star } from "lucide-react";
import { Workout } from "@/types/type";

export default function Stats({ workout }: { workout: Workout }) {
  return (
    <div className="flex gap-4 text-xs text-gray-400">
      <span className="flex items-center gap-1"><Clock size={14} /> {workout.duration} min</span>
      <span className="flex items-center gap-1"><Flame size={14} /> {workout.caloriesBurned} kcal</span>
      <span className="flex items-center gap-1"><Star size={14} /> {workout.rating}</span>
    </div>
  );
}
