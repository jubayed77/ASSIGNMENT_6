
import Link from "next/link";
import { Workout } from "@/types/type";
import Tags from "./Tags";
import Stats from "./Stats";


// Card component
export default function WorkoutCard({
  workout,
}: {
  workout: Workout;
}) {

  return (

    // click to  workout details pag
    <Link
      href={`/workout/${workout.id}`}
      className="group block bg-card border border-line rounded-xl overflow-hidden transition hover:-translate-y-1 hover:border-accent/50"
    >

      {/* workout ima contner */}
      <div className="h-40 overflow-hidden">

        {/* exes image */}
        <img
          src={workout.image}
          alt={workout.name}
          className="h-full w-full object-cover transition group-hover:scale-110"
        />

      </div>


      {/* exes info */}
      <div className="p-4 space-y-2">

        {/* exses grop */}
        <Tags list={workout.muscleGroups} />


        {/* exses nam */}
        <h3 className="font-display text-lg font-bold uppercase">
          {workout.name}
        </h3>


        {/* eq */}
        <p className="text-sm text-gray-400">
          {workout.equipment}
        </p>


        
        <Stats workout={workout} />

      </div>

    </Link>
  );
}