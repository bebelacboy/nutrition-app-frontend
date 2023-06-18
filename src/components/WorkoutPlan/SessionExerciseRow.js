import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export const SessionExerciseRow = ({ exercise }) => {
  return <div className="flex gap-2 mx-auto py-3 w-64 items-center">
    <input type="text" className="w-3/6 border-solid border-black border rounded" value={exercise.name}/>
    <input type="number" className="w-1/6 border-solid border-black border rounded text-center" value={exercise.set}/>
    <input type="number" className="w-1/6 border-solid border-black border rounded text-center" value={exercise.reps}/>
    <FontAwesomeIcon className="text-red-600 hover:text-red-800 text-lg" icon={faTrash}/>
  </div>
}