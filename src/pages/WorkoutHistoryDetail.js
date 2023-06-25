import { useState, useEffect } from "react";
import WorkoutSessionService from "../services/WorkoutSessionService";
import { useParams } from "react-router-dom";
import { BlueOvalLoader } from "../components/Loader/BlueOvalLoader";
import WorkoutPlanService from "../services/WorkoutPlanService";
import { Helmet } from "react-helmet";


export const WorkoutHistoryDetailPage = () => {
  const { date } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ workoutSession, setWorkoutSession ] = useState({});
  const [ planReference, setPlanReference ] = useState("");


  useEffect(() => {
    let [month, day, year] = date.split("-");
    month = parseInt(month);
    day = parseInt(day);
    year = parseInt(year);
    const dateParam = new Date(year, month - 1, day);
    WorkoutSessionService.getWorkoutSessionByDate(dateParam).then((fetchedWorkoutSession) => {
      setWorkoutSession(fetchedWorkoutSession);
      WorkoutPlanService.getWorkoutPlanById(fetchedWorkoutSession.plan).then((fetchedWorkoutPlan) => {
        setPlanReference(fetchedWorkoutPlan.name);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  const detailView = (
    <div>
      <h1 className="text-3xl mt-24 mb-12 font-semibold">{date} Workout Log</h1>
      <div className="bg-yellow-100 w-4/5 lg:w-3/5 mx-auto p-3 rounded-md
      border border-solid border-black">
        <p className="font-bold text-2xl mb-3">{planReference}'s Session</p>
        <div className="grid grid-cols-4 mx-auto font-bold">
          <p>Exercise Name</p>
          <p>Set x Reps</p>
          <p>Weight</p>
          <p>Status</p>
        </div>
        {workoutSession.exercises?.map((exercise, index) => {
          return <div key={index} className="grid grid-cols-4 gap-4 mb-2 mx-auto py-2 px-3
           bg-yellow-300 font-semibold rounded-md">
            <p className="text-start my-auto">{exercise.name}</p>
            <p className="my-auto">{exercise.set} x {exercise.reps}</p>
            <p className="my-auto">{exercise.weight} Kg</p>
            <p className="my-auto">{exercise.isDone ? "Completed" : "Not Completed"}</p>
          </div>
        })}
        
      </div>
    </div>
  )
  return <div className={`${isLoading ? "mt-24" : "mt-16"}`}>
    <Helmet>
      <title>{`${date} Session Detail`}</title>
    </Helmet>
    { isLoading && <BlueOvalLoader /> }
    { !isLoading && detailView }
  </div>
}