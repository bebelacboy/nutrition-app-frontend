import { TodayExerciseRow } from "./TodayExerciseRow";

export const TodayExercisesList = ({ todaySession }) => {
  const view = (
    todaySession.exercises.map((exercise, index) => {
      return <div key={`${exercise.name}${index}`} className="flex justify-center">
        <TodayExerciseRow session={todaySession} exercise={exercise} exerciseNumber={index} />
      </div>
    })
  )
  return view;
}