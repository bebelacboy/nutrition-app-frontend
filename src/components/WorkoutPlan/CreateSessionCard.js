import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { addSessionExercise, sessionDayChange } from "../../actions/workoutPlanActions";
import { SessionExerciseRow } from "./SessionExerciseRow";
export const CreateSessionCard = ({ session }) => {
  const { availableDays, workoutSessions } = useSelector(state => state.createWorkoutPlan);
  const dispatch = useDispatch();

  const daySelectHandle = (e) => {
    const newDay = e.target.value;
    dispatch(sessionDayChange(newDay, session, workoutSessions, availableDays));
  }

  const addExerciseHandle = (e) => {
    dispatch(addSessionExercise(session, workoutSessions))
  }

  return <div>
    <div className="bg-gray-800 p-4">
      <label htmlFor="day" className="px-3 text-white">Choose Day</label>
      <select onChange={daySelectHandle} defaultValue={session.day} name="" id="day" className="capitalize px-2">
        <option className="capitalize" value={session.day}>{session.day}</option>
        {availableDays.map((elem) => {
          return <option key={elem} className="capitalize" value={elem}>{elem}</option>
        })}
      </select>
      <FontAwesomeIcon onClick={addExerciseHandle} icon={faPlus} className="ms-3 hover:text-gray-300 text-xl text-white"/>
    </div>
    <div className="bg-yellow-100">
      { 
        session.exercises.map((elem, idx) => {
          return <SessionExerciseRow exercise={elem} />
        })
      }
    </div>
  </div>
}