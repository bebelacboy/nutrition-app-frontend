import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const WorkoutHistoryRow = ({ workoutSession, id }) => {
  const navigate = useNavigate();
  const sessionDate = new Date(workoutSession.date);
  const handleDetailClick = (e) => {
    navigate(`/workout-history/${sessionDate.toLocaleDateString().replaceAll("/", "-")}`);
  }

  return <div onClick={handleDetailClick} 
  className="w-3/4 mx-auto mb-3 py-4 px-5 rounded-md
  bg-gray-600 hover:bg-gray-800
  flex justify-between items-center">
    <p className="text-white text-start text-xl">
      <span><FontAwesomeIcon className="me-4" icon={faHistory} /></span>
      {`${sessionDate.toLocaleDateString()} session`}
    </p>
  </div>
}