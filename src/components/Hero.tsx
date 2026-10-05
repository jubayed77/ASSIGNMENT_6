import { ArrowDown } from "lucide-react";

//hero
export default function Hero() {
  return (
    <section className="bg-card border border-line rounded-2xl p-6 md:p-10 grid lg:grid-cols-2 gap-6 items-center">
      <div>
        <span className="inline-block border border-accent text-accent text-xs font-semibold tracking-widest px-3 py-1 rounded-full">
          WORKOUT LIBRARY
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold uppercase mt-4">
          Train with intent. Log every set.
        </h1>
        <p className="text-gray-400 mt-4">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the
          week&apos;s work add up.
        </p>
        
        <a
          href="#library"
          className="inline-flex items-center gap-2 bg-accent text-black font-bold text-sm px-5 py-3 rounded mt-6"
        >
          BROWSE WORKOUTS <ArrowDown size={16} />
        </a>
      </div>
    
      <img
        src="https://img.magnific.com/free-photo/3d-cartoon-fitness-man_23-2151691400.jpg?w=740"
        alt="Fitness hero"
        className="w-full max-h-72 object-cover rounded-xl"
      />
    </section>
  );
}
