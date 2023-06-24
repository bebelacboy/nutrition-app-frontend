import { useState, useEffect } from "react";
import { BlueOvalLoader } from "../components/Loader/BlueOvalLoader";
import WorkoutSessionService from "../services/WorkoutSessionService";
import { WorkoutHistoriesList } from "../components/WorkoutHistory/WorkoutHistoriesList";

export const ListWorkoutHistoryPage = () => {
  const [ workoutSessions, setWorkoutSessions ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  
  useEffect(() => {
    WorkoutSessionService.getWorkoutSessionsList().then((fetchedWorkoutSessions) => {
      console.log(fetchedWorkoutSessions);
      setWorkoutSessions(fetchedWorkoutSessions);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return <div className="mt-16">
    <h1 className="mt-24 text-3xl font-semibold mb-10"> Your Workout History </h1>
    {
    isLoading ? 
    <BlueOvalLoader/>
    : 
    ( 
      workoutSessions.length > 0 ?
      <WorkoutHistoriesList  workoutSessions={workoutSessions}  />
      :
      <h2 className="text-xl mb-3">You haven't done any exercise.</h2>
    )
    }
  </div>
}