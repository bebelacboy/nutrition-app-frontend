import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { CreateSessionCard } from "../components/WorkoutPlan/CreateSessionCard";
import { useDispatch, useSelector } from "react-redux";
import { frequencyChange, resetPlan } from "../slices/createWorkoutPlanSlice";
import WorkoutPlanService from "../services/WorkoutPlanService";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export const CreateWorkoutPlanPage = () => {
  const { workoutSessions } = useSelector(state => state.createWorkoutPlan);
  const [splitRecommendation, setSplitRecommendation] = useState("");
  const [frequency, setFrequency] = useState(workoutSessions.length);
  const [planName, setPlanName] = useState("My Workout Plan");
  const [errorSubmit, setErrorSubmit] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const frequencySelectHandle = (e) => {
    const newFrequency = e.target.value;
    dispatch(frequencyChange(newFrequency));
    setFrequency(newFrequency);
  }

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    const emptyExercise = workoutSessions.find((session) => {
      if (session.exercises[session.exercises.length - 1].name === "") {
        return true
      }
      return false;
    })
    if (emptyExercise) {
      setErrorSubmit("Fill all exercises before submit!");
      setTimeout(() => {
        setErrorSubmit("");
      }, 2500);
      return;
    }
    const newWorkoutPlan = {
      name: planName,
      frequency,
      workoutSessions
    }
    const response = await WorkoutPlanService.createWorkoutPlan(newWorkoutPlan);
    navigate(`/workout-plan/${response.data.workoutPlan._id}`);
  }

  const nameChangeHandle = (e) => {
    setPlanName(e.target.value);
  }
  
  useEffect(() => {
    if (frequency === 3) {
      setSplitRecommendation("Full Body Workout Split");
    } else if (frequency === 4) {
      setSplitRecommendation("Upper Lower Workout Split");
    } else if (frequency === 5) {
      setSplitRecommendation("Upper Lower Workout, Push Pull Leg Upper Lower Workout Split");
    } else if (frequency === 6) {
      setSplitRecommendation("Push Pull Leg Workout Split");
    }
  }, [frequency]);

  useEffect(() => {
    dispatch(resetPlan());
    setFrequency(3);
    setPlanName("My Workout Plan");
  }, [dispatch])

  return <div className="mt-16">
    <Helmet>
      <title>New Workout Plan</title>
    </Helmet>
    <div className="mt-24">
      <input className="text-center rounded text-3xl py-1 border border-solid border-black" onChange={nameChangeHandle} value={planName} type="text" />
    </div>
    <form onSubmit={formSubmitHandle}>
      <div className="flex justify-center items-center">
        <label htmlFor="frequency" className="text-xl">How many times do you workout in a week?</label>
        {/* Workout frequency */}
        <div className="relative">
          <select onChange={frequencySelectHandle} value={frequency} name="frequency" id="frequency"
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
      <button className="bg-gray-800 hover:bg-gray-700 p-3 text-xl font-semibold text-white rounded" type="submit">Save Plan</button>
      {errorSubmit && <p className="bg-red-600 w-64 mx-auto mt-3 font-semibold text-white text-md rounded-lg py-1 px-1">{errorSubmit}</p>}

    </form>

  </div>;
};