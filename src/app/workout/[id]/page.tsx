"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Bookmark } from "lucide-react";

import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/mainApi/api";
import { Workout } from "@/types/type";
import Tags from "@/components/Tags";

type Params = {
  params: Promise<{ id: string }>;
};

export default function WorkoutDetails({ params }: Params) {
  const { plan, addToPlan, addToSaved } = usePlan();

  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const { id } = await params;

        const data = await getWorkoutById(id);

        setWorkout(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadWorkout();
  }, [params]);

  // loading
  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-10 w-10 rounded-full border-4 border-line border-t-accent animate-spin"></div>
      </div>
    );
  }

  // exces not found
  if (!workout) {
    return (
      <div className="text-center py-20">
        <p className="mb-4">Workout not found.</p>

        <Link
          href="/"
          className="bg-accent text-black font-bold px-5 py-2 rounded"
        >
          Go to workouts
        </Link>
      </div>
    );
  }

  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);
  const isPlanFull = plan.length >= 5;

  return (
    <div className="grid md:grid-cols-2 gap-8">

      {/* image */}
      <img
        src={workout.image}
        alt={workout.name}
        className="w-full rounded-xl object-cover md:h-[480px]"
      />

      {/* excesuse informonson */}
      <div>

        <h1 className="font-display text-3xl font-bold uppercase">
          {workout.name}
        </h1>

        <p className="text-gray-400 mt-2 mb-3">
          {workout.description}
        </p>

        {/* musle grop */}
        <Tags list={workout.muscleGroups} />

        {/* excese Details */}
        <div className="bg-card border border-line rounded-lg mt-5">

          <div className="flex justify-between px-4 py-2 border-b border-line">
            <span className="text-gray-400">Equipment</span>
            <span>{workout.equipment}</span>
          </div>

          <div className="flex justify-between px-4 py-2 border-b border-line">
            <span className="text-gray-400">Difficulty</span>
            <span>{workout.difficulty}</span>
          </div>

          <div className="flex justify-between px-4 py-2 border-b border-line">
            <span className="text-gray-400">Sets</span>
            <span>{workout.sets}</span>
          </div>

          <div className="flex justify-between px-4 py-2 border-b border-line">
            <span className="text-gray-400">Reps</span>
            <span>{workout.reps}</span>
          </div>

          <div className="flex justify-between px-4 py-2 border-b border-line">
            <span className="text-gray-400">Duration</span>
            <span>{workout.duration} min</span>
          </div>

          <div className="flex justify-between px-4 py-2 border-b border-line">
            <span className="text-gray-400">Calories</span>
            <span>{workout.caloriesBurned} kcal</span>
          </div>

          <div className="flex justify-between px-4 py-2">
            <span className="text-gray-400">Rating</span>
            <span>{workout.rating}</span>
          </div>

        </div>

        {/* instructor */}
        <h3 className="font-display font-bold uppercase mt-6 mb-2">
          Instructions
        </h3>

        <ol className="space-y-2 text-sm text-gray-300">
          {workout.instructions.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="text-accent font-bold">
                {index + 1}.
              </span>

              <span>{step}</span>
            </li>
          ))}
        </ol>

        {/* btn */}
        <div className="flex flex-wrap gap-3 mt-6">

          {/* add to p b */}
          <button
            onClick={() => addToPlan(workout)}
            disabled={isPlanFull || isAlreadyInPlan}
            className="flex items-center gap-2 bg-accent text-black font-bold text-sm px-5 py-3 rounded disabled:opacity-40"
          >
            <Plus size={16} />

            {isAlreadyInPlan
              ? "Already in Plan"
              : isPlanFull
              ? "Plan Full"
              : "Add to today's plan"}
          </button>

          {/* save b */}
          <button
            onClick={() => addToSaved(workout)}
            className="flex items-center gap-2 border border-gray-500 text-sm px-5 py-3 rounded"
          >
            <Bookmark size={16} />

            Save for later
          </button>

        </div>
      </div>
    </div>
  );
}