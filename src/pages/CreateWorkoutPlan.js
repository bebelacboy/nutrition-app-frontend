import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { CreateSessionCard } from "../components/WorkoutPlan/CreateSessionCard";
import { useDispatch, useSelector } from "react-redux";
import { frequencyChange } from "../slices/workoutPlanSlice";

export const CreateWorkoutPlanPage = () => {
  const [frequency, setFrequency] = useState(3);
  const [splitRecommendation, setSplitRecommendation] = useState("");
  const { workoutSessions } = useSelector(state => state.createWorkoutPlan);
  const dispatch = useDispatch();

  const frequencySelectHandle = (e) => {
    const newFrequency = e.target.value;
    dispatch(frequencyChange(newFrequency));
    setFrequency(newFrequency);
  }
  
  useEffect(() => {
    if (frequency == 3) {
      setSplitRecommendation("Full Body Workout Split");
    } else if (frequency == 4) {
      setSplitRecommendation("Upper Lower Workout Split");
    } else if (frequency == 5) {
      setSplitRecommendation("Upper Lower Workout, Push Pull Leg Upper Lower Workout Split");
    } else if (frequency == 6) {
      setSplitRecommendation("Push Pull Leg Workout Split");
    }
  }, [frequency]);
  return <div className="mt-16">
    <div className="mt-24 font-semibold text-3xl">
      Your workout plan
    </div>
    <form>
      <div className="flex justify-center items-center">
        <label htmlFor="frequency" className="text-xl">How many times do you workout in a week?</label>
        {/* Workout frequency */}
        <div className="relative">
          <select onChange={frequencySelectHandle} name="frequency" id="frequency"
            className="appearance-none w-14 px-2 py-2 ms-3 font-bold border-2 border-black focus:outline-none rounded focus:outline-blue-600" >
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
          </select>
          <FontAwesomeIcon aria-hidden className=" pointer-events-none absolute inset-y-0 my-auto right-3 text-gray-400" icon={faChevronDown} />
        </div>
      </div>
      <br />
      <p className="mb-10">Split Recommendation: <span className="font-bold">{splitRecommendation}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
        {workoutSessions.map((elem, idx) => {
          return (
            <CreateSessionCard key={idx} session={elem}></CreateSessionCard>
            );
          ;
        })}
      </div>
      <button className="bg-gray-800 hover:bg-gray-600 p-3 text-xl font-semibold text-white rounded" type="submit">Save Plan</button>
    </form>

  </div>;
};