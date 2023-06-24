import { WorkoutHistoryRow } from "./WorkoutHistoryRow";

export const WorkoutHistoriesList = ({ workoutSessions }) => {
  const historyRows = workoutSessions.reverse().map((elem, index) => {
    return <WorkoutHistoryRow key={elem._id} id={elem._id} workoutSession={elem} />
  });
  return historyRows;
}