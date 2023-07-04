import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectPlanToDelete } from "../../slices/listWorkoutPlanSlice";
import { followPlan, unfollowPlan } from "../../slices/authSlice";


export const WorkoutPlanRow = ({ workoutPlan, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentPlanId } = useSelector(state => state.auth);

  const handleDetailClick = (e) => {
    navigate(`/workout-plan/${id}`);
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    dispatch(selectPlanToDelete(id));
  }

  const handleFollowClick = (e) => {
    e.stopPropagation();
    dispatch(followPlan(id));
  }
  
  const handleUnfollowClick = (e) => {
    e.stopPropagation();
    dispatch(unfollowPlan());
  }

  return <div onClick={handleDetailClick} className={`w-3/4 mx-auto mb-3 py-4 px-5 rounded-md
  ${ currentPlanId === id ?
    "bg-gray-900 hover:bg-black"
    :
    "bg-gray-600 hover:bg-gray-800" } 
  flex justify-between items-center`}>
    <p className="text-white text-start text-xl">
      <span><FontAwesomeIcon className="me-4" icon={faCalendarDays} /></span>
      {workoutPlan.name}
    </p>
    {currentPlanId !== id ? 
    <div className="flex gap-4 items-center">
      <button onClick={handleFollowClick} className="text-white text-md px-2 py-2 bg-yellow-600 hover:bg-yellow-700 rounded">Follow Plan</button>
      <FontAwesomeIcon onClick={handleDeleteClick} icon={faTrash} 
      className="text-yellow-200 hover:text-yellow-300 text-xl"/>
    </div>
    :
    <div className="flex gap-4 items-center">
      <p className="text-md text-white">Your current plan</p>
      <button onClick={handleUnfollowClick} className="text-white text-md me-6 px-2 py-2 bg-gray-600 hover:bg-gray-800 rounded">Unfollow Plan</button>
    </div>
    }
  </div>
}