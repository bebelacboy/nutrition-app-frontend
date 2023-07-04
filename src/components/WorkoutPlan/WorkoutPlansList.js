import { useSelector } from "react-redux";
import { WorkoutPlanRow } from "./WorkoutPlanRow";

export const WorkoutPlansList = ({ workoutPlans }) => {
  const { currentPlanId } = useSelector(state => state.auth);
  const currentPlan = workoutPlans.find((workoutPlan) => {
    return workoutPlan._id === currentPlanId
  });
  const currentPlanRow = (
    currentPlan ?
    <WorkoutPlanRow key={currentPlan?._id} id={currentPlan?._id} workoutPlan={currentPlan} />
    :
    <></>
  );

  const notCurrentPlanRows = workoutPlans.reverse().map((elem, index) => {
    return ( 
      currentPlanId !== elem._id && 
      <WorkoutPlanRow key={elem._id} id={elem._id} workoutPlan={elem} />
    )
  })

  return (
    <>
      {currentPlanRow}
      {notCurrentPlanRows}
    </>
  )
}