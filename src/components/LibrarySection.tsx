"use client";

import { useEffect, useState } from "react";

import { Workout } from "@/types/type";
import { getAllWorkouts } from "@/mainApi/api";

import WorkoutCard from "./WorkoutCard";

export default function LibrarySection() {

 
  const [workouts, setWorkouts] = useState<Workout[]>([]);

 
  const [loading, setLoading] = useState(true);

  
  const [error, setError] = useState(false);


  
  useEffect(() => {

    async function loadWorkouts() {

      try {

       
        const data = await getAllWorkouts();

      
        setWorkouts(data);

      } catch (error) {

       
        console.log(error);

        setError(true);

      } finally {

        
        setLoading(false);
      }
    }

    loadWorkouts();

  }, []);


  return (
    <section id="library" className="mt-12">

      {/*title */}
      <h2 className="font-display text-2xl font-bold uppercase">
        The Library
      </h2>

      <p className="text-gray-400 text-sm mb-6">
        Twelve lifts covering every major muscle group.
      </p>


      {/* loading  */}
      {loading && (
        <div className="flex justify-center py-16">

          <div className="h-10 w-10 rounded-full border-4 border-line border-t-accent animate-spin"></div>

        </div>
      )}


      {/* error m */}
      {error && (
        <p className="text-red-400">
          Could not load workouts. Please try again.
        </p>
      )}


      {/* workout card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {workouts.map((workout) => (

          <WorkoutCard
            key={workout.id}
            workout={workout}
          />

        ))}

      </div>

    </section>
  );
}