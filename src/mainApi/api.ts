import { Workout } from "@/types/type";

export async function getAllWorkouts(): Promise<Workout[]> {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/fitlog"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch workouts");
  }

  return res.json();
}

export async function getWorkoutById(
  id: string
): Promise<Workout> {
  const res = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`
  );

  if (!res.ok) {
    throw new Error("Workout not found");
  }

  return res.json();
}