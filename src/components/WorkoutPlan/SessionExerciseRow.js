import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectExercise, setExerciseSet, setExerciseReps, deleteExercise } from "../../slices/createWorkoutPlanSlice";
import SearchExerciseService from "../../services/SearchExerciseService";

export const SessionExerciseRow = ({ exercise, day, index }) => {
  const [exerciseName, setExerciseName] = useState(exercise.name);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const debouncing = setTimeout(async () => {
      setIsLoading(true);
      if (exerciseName.trim() !== '') {
        const response = await SearchExerciseService.searchExerciseByName(exerciseName);
        setSearchResult(response.data);
      } else {
        setSearchResult([]);
      }
      setIsLoading(false);
    }, 500);
    return () => {
      clearTimeout(debouncing);
    };
  }, [exerciseName]);

 

  const dispatch = useDispatch();

  const { name: reduxStateExercise, set, reps } = useSelector(state => {
    for (let i = 0; i < state.createWorkoutPlan.workoutSessions.length; i++) {
      if (state.createWorkoutPlan.workoutSessions[i].day === day) {
        return state.createWorkoutPlan.workoutSessions[i].exercises[index];
      }
    }
  });

  const handleOptionClick = (e) => {
    setShowOptions(false);
    dispatch(selectExercise({
      day,
      index,
      exercise: e.target.innerHTML
    }));
  };

  const handleSearchChange = (e) => {
    setExerciseName(e.target.value);
  };

  const handleSetChange = (e) => {
    dispatch(setExerciseSet(
      {
        day,
        index,
        set: e.target.value
      }
    ));
  }
  
  const handleRepsChange = (e) => {
    dispatch(setExerciseReps(
      {
        day,
        index,
        reps: e.target.value
      }
    ));
  }

  const handleNameInputClick = (e) => {
    setShowOptions(!showOptions);
  }

  const handLeMouseLeaveOptions = (e) => {
    setShowOptions(false);
  }

  const handleDeleteRow = (e) => {
    dispatch(deleteExercise({
      day,
      index
    }));
  }

  return <div>
    <div className="flex gap-2 mx-auto pt-1 w-64 items-center">
      <label className="w-3/6 font-semibold">Exercise Name</label>      
      <label className="w-1/6 font-semibold">Set</label>      
      <label className="w-1/6 font-semibold">Rep</label>      
    </div>
    
    <div className="flex gap-2 mx-auto pt-1 pb-2 w-64 items-center">
      <div onMouseLeave={handLeMouseLeaveOptions} className="w-3/6">
        <input readOnly onClick={handleNameInputClick} placeholder="Find Exercises" id="exerciseName" type="text" className="w-11/12 border-solid ps-2 focus:outline-none border-black border rounded" value={reduxStateExercise}/>
        <ul className={`${!showOptions && 'hidden'} max-h-48 overflow-y-scroll scrollbar-thumb  absolute border-solid border border-black z-10`}>
          {showOptions && 
            <li className="ps-2 py-1 w-48 bg-slate-200 text-start text-black">
              <input onChange={handleSearchChange} placeholder="Find Exercises" id="exerciseName" type="text" className="border-solid w-11/12 ps-2 border-black border rounded" value={exerciseName}/>
            </li>}
          {showOptions && isLoading && <li className="ps-2 py-1 w-48 bg-slate-200 text-start text-black">Loading....</li>}
          {showOptions && !isLoading && searchResult.map((elem) => {
            return <li onClick={handleOptionClick} key={elem.name} className="ps-2 py-1 w-48 bg-slate-200 hover:bg-slate-400 text-start text-black">{elem.name}</li>
          })}
        </ul>

      </div>
      <input onChange={handleSetChange} type="number" id="set" className="w-1/6 : appearance-none border-solid border-black border rounded text-center" value={set}/>
      <input onChange={handleRepsChange} type="number" id="reps" className="w-1/6 border-solid border-black border rounded text-center" value={reps}/>
      <FontAwesomeIcon onClick={handleDeleteRow} className="text-red-600 hover:text-red-800 text-lg" icon={faTrash}/>
    </div>
    
  </div>
}