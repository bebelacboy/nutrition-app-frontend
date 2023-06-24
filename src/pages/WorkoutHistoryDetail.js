import { useState, useEffect } from "react";
import WorkoutSessionService from "../services/WorkoutSessionService";
import { useParams } from "react-router-dom";
import { BlueOvalLoader } from "../components/Loader/BlueOvalLoader";
import { DetailSessionCard } from "../components/WorkoutPlan/DetailSessionCard";
import WorkoutPlanService from "../services/WorkoutPlanService";


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
    console.log(dateParam);
    WorkoutSessionService.getWorkoutSessionByDate(dateParam).then((fetchedWorkoutSession) => {
      setWorkoutSession(fetchedWorkoutSession);
      setIsLoading(false);
      setTimeout(250);
      WorkoutPlanService.getWorkoutPlanById(fetchedWorkoutSession.plan).then((fetchedWorkoutPlan) => {
        setPlanReference(fetchedWorkoutPlan.name);
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
      <div className="flex flex-wrap items-start justify-center gap-5">
        {planReference}
      </div>
    </div>
  )
  return <div className={`${isLoading ? "mt-24" : "mt-16"}`}>
    { isLoading && <BlueOvalLoader /> }
    { !isLoading && detailView }
  </div>
}