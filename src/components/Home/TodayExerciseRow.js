import { useState } from "react";
import WorkoutSessionService from "../../services/WorkoutSessionService"
import WorkoutPlanService from "../../services/WorkoutPlanService";
import { useSelector } from "react-redux";
import { BlueOvalLoader } from "../Loader/BlueOvalLoader";

export const TodayExerciseRow = ({ exercise, exerciseNumber, session }) => {
  const [newSet, setNewSet] = useState(exercise.set);
  const [newReps, setNewReps] = useState(exercise.reps);
  const [newWeight, setNewWeight] = useState(exercise.weight);
  const [isDone, setIsDone] = useState(exercise.isDone);
  const [isLoadingDone, setIsLoadingDone] = useState(false);
  const { currentPlanId } = useSelector(state => state.auth);

  const handleSetChange = (e) => {
    setNewSet(e.target.value);
  }

  const handleRepsChange = (e) => {
    setNewReps(e.target.value);
  }
  const handleWeightChange = (e) => {
    setNewWeight(e.target.value);
  }
  
  const handleDone = async (e) => {
    setIsLoadingDone(true);
    // Deep copy session
    let newExercises = JSON.parse(JSON.stringify(session.exercises));
    newExercises[exerciseNumber].set = newSet;
    newExercises[exerciseNumber].reps = newReps;
    newExercises[exerciseNumber].weight = newWeight;
    newExercises[exerciseNumber].isDone = true;
    await WorkoutSessionService.updateWorkoutSession({
      ...session,
      exercises: newExercises
    });
    const sessionLocaleDate = new Date(session.date);
    console.log("alipdimas");
    const updatedWorkoutPlan = await WorkoutPlanService.getWorkoutPlanById(currentPlanId);
    const todayString = sessionLocaleDate.toLocaleDateString("en-US", { weekday: 'long' }).toLowerCase()
    for (let i = 0; i < updatedWorkoutPlan.workoutSessions.length; i++) {
      if (updatedWorkoutPlan.workoutSessions[i].day === todayString) {
        for (let j = 0; j < newExercises.length; j++) {
          newExercises[j].currentWeight = newExercises[j].weight;
          delete newExercises[j].weight;
        }
        updatedWorkoutPlan.workoutSessions[i].exercises = newExercises;
        break;
      }
    }
    console.log(updatedWorkoutPlan);
    await WorkoutPlanService.updateWorkoutPlan(updatedWorkoutPlan);
    setIsDone(true);
    setIsLoadingDone(false);
  }

  return <div className="flex gap-3 w-full justify-center items-center bg-amber-200 px-3 py-2 mb-2 rounded-md">
    <p className="font-semibold w-56">{exercise.name}</p>
    <div>
      { isDone ?
      <p className="font-semibold">{newSet} x {newReps}</p>
      :
      <>
        <input type="number" className="w-8 text-center rounded-md border border-black border-solid" 
        value={newSet} onChange={handleSetChange} /> x 
        <input type="number" className="w-8 ms-1 text-center rounded-md border border-black border-solid" 
        value={newReps} onChange={handleRepsChange} />
      </>
      }
    </div>
    <div className="flex gap-1">
      { isDone ?
        <p className="font-semibold">{newWeight}</p>
        :
        <input type="number" onChange={handleWeightChange} className="w-8 text-center rounded-md border border-black border-solid" value={newWeight} />
        
      }
      <p className="font-semibold">Kg</p>
    </div>
    {
      isDone ?
      <button disabled className="bg-gray-600 text-white px-2 py-1 rounded-md">Complete</button>
      :
      ( isLoadingDone ?
        <BlueOvalLoader className="max-h-3" width={22} height={22} /> :
      <button onClick={handleDone}className="bg-green-600 hover:bg-green-700 text-white px-2 rounded-md">Done</button>)
    }
  </div>
}