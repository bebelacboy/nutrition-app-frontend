import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { SessionExerciseRow } from "./SessionExerciseRow";
import { sessionDayChange, addSessionExercise } from "../../slices/createWorkoutPlanSlice";
import { useState } from "react";

export const CreateSessionCard = ({ session }) => {
  const { availableDays } = useSelector(state => state.createWorkoutPlan);
  const [ errorMessage, setErrorMessage ] = useState("");
  const dispatch = useDispatch();

  const daySelectHandle = (e) => {
    const newDay = e.target.value;
    dispatch(sessionDayChange({ newDay, oldDay: session.day }));
  }

  const addExerciseHandle = (e) => {
    if (session.exercises[session.exercises.length - 1].name === "") {
      setErrorMessage("Fill all exercises before add new!");
      setTimeout(() => {
        setErrorMessage("");
      }, 2500);
      return;
    }
    dispatch(addSessionExercise(session.day))
  }


  return <div className="mb-8">
    {errorMessage && <p className="absolute translate-x-8 -translate-y-8 bg-red-600 text-white rounded-lg px-2">{errorMessage}</p>}
    <div className="bg-gray-800 w-72 p-4 rounded-t-lg">
      <label htmlFor="day" className="px-3 text-white">Choose Day</label>
      <select onChange={daySelectHandle} defaultValue={session.day} name="" id="day" className="capitalize px-2">
        <option className="capitalize" value={session.day}>{session.day}</option>
        {availableDays.map((elem) => {
          return <option key={elem} className="capitalize" value={elem}>{elem}</option>
        })}
      </select>
      <FontAwesomeIcon onClick={addExerciseHandle} icon={faPlus} className="ms-3 hover:text-gray-300 text-xl text-white"/>
    </div>
    <div className="bg-amber-200 rounded-b-lg">
      { 
        session.exercises.map((elem, idx) => {
          return <SessionExerciseRow key={idx} exercise={elem} day={session.day} index={idx} />
        })
      }
    </div>
  </div>
}