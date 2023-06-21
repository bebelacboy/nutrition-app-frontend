import { WorkoutPlanRow } from "./WorkoutPlanRow";

export const WorkoutPlansList = ({ workoutPlans }) => {
  const view = workoutPlans.reverse().map((elem, index) => {
    return <WorkoutPlanRow key={elem._id} id={elem._id} workoutPlan={elem} />
  })
  return view;
}