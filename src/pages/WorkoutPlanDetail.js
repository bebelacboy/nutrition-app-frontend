import { useState, useEffect } from "react";
import WorkoutPlanService from "../services/WorkoutPlanService";
import { useParams } from "react-router-dom";
import { BlueOvalLoader } from "../components/Loader/BlueOvalLoader";
import { DetailSessionCard } from "../components/WorkoutPlan/DetailSessionCard";
import { Helmet } from "react-helmet";


export const WorkoutPlanDetailPage = () => {
  const { id } = useParams();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ workoutPlan, setWorkoutPlan ] = useState({}); 

  useEffect(() => {
    WorkoutPlanService.getWorkoutPlanById(id).then((fetchedWorkoutPlan) => {
      setWorkoutPlan(fetchedWorkoutPlan);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const detailView = (
    <div>
      <h1 className="text-3xl mt-24 mb-12 font-semibold">{workoutPlan.name}</h1>
      <div className="flex flex-wrap items-start justify-center gap-5">
        {workoutPlan.workoutSessions?.map((session, index) => {
          return <DetailSessionCard key={index} session={session} />
        })}
      </div>
    </div>
  )

  return <div className={`${isLoading ? "mt-24" : "mt-16"}`}>
    <Helmet>
      <title>{`${workoutPlan?.name}'s detail`}</title>
    </Helmet>
    { isLoading && <BlueOvalLoader /> }
    { !isLoading && detailView }
  </div>
}