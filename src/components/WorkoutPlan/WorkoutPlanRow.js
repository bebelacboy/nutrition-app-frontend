import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { selectPlanToDelete } from "../../slices/listWorkoutPlanSlice";


export const WorkoutPlanRow = ({ workoutPlan, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDetailClick = (e) => {
    navigate(`/workout-plan/${id}`);
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(selectPlanToDelete(id));
  }

  return <div onClick={handleDetailClick} className="w-3/4 mx-auto mb-3 py-4 px-5
  bg-gray-600 hover:bg-gray-800 rounded-md
  flex justify-between items-center">
    <p className="text-white text-start text-xl">
      <span><FontAwesomeIcon className="me-4" icon={faCalendarDays} /></span>
      {workoutPlan.name}
    </p>
    <FontAwesomeIcon onClick={handleDeleteClick} icon={faTrash} className="text-yellow-200 text-xl"/>
  </div>
}