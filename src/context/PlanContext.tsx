"use client";

import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { Workout, PlanWorkout } from "@/types/type";


interface PlanContextType {
  // today workout plan
  plan: PlanWorkout[];

  // saved workouts
  saved: Workout[];

  // Plan add
  addToPlan: (workout: Workout) => void;

  // sved list add
  addToSaved: (workout: Workout) => void;

  // Plan remov
  removeFromPlan: (id: number) => void;

  // sved list remov
  removeFromSaved: (id: number) => void;

  // workout complete 
  markAsDone: (id: number) => void;

  // dash b
  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
  };
}



const PlanContext = createContext<PlanContextType | null>(null);



export function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  // today paln
  const [plan, setPlan] = useState<PlanWorkout[]>([]);

  // Saved workout 
  const [saved, setSaved] = useState<Workout[]>([]);


  // Plan workout add function
  const addToPlan = (workout: Workout) => {
 
   //optional gpt task
    if (plan.length >= 6) {
      toast.error("Plan is full!");
      return;
    }


    // chek if exces is allready ase kina
    if (plan.some((item) => item.id === workout.id)) {
      toast.error("Already added!");
      return;
    }


    // workout plan add
    setPlan([
      ...plan,
      {
        ...workout,
        isDone: false,
      },
    ]);

    toast.success("Added to plan!");
  };


 //save list add func
  const addToSaved = (workout: Workout) => {

    // saved list ase kina chick if thake thole tost
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("Already saved!");
      return;
    }


    // add save list
    setSaved([
      ...saved,
      workout,
    ]);

    toast.success("Saved!");
  };


  // plan workout remove  function
  const removeFromPlan = (id: number) => {

    // if not match add new arry 
    setPlan(
      plan.filter((item) => item.id !== id)
    );

    toast.success("Removed!");
  };


  // saved list workout remove
  const removeFromSaved = (id: number) => {

//if id not match store the value  arr
    setSaved(
      saved.filter((item) => item.id !== id)
    );

    toast.success("Removed!");
  };


  //main w functoin
  const markAsDone = (id: number) => {

    
    setPlan(
      plan.map((item) =>


        item.id === id
          ? {
              ...item,
              isDone: true,
            }

          
          : item
      )
    );

    toast.success("Workout done!");
  };


  // Dashboard এর 
  const metrics = {

    // length
    exercises: plan.length,


    // all workout  duration sum 
    minutes: plan.reduce(
      (total, item) => total + item.duration,
      0
    ),


    // all workout calorie sum
    calories: plan.reduce(
      (total, item) => total + item.caloriesBurned,
      0
    ),
  };


  return (


    <PlanContext.Provider
      value={{
        plan,
        saved,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
        metrics,
      }}
    >

   
      {children}

    </PlanContext.Provider>
  );
}



export function usePlan() {

  
  const context = useContext(PlanContext);



  if (!context) {
    throw new Error(
      "usePlan must be used inside PlanProvider"
    );
  }



  return context;
}