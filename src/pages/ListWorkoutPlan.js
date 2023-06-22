import { useState, useEffect } from "react";
import WorkoutPlanService from "../services/WorkoutPlanService";
import { WorkoutPlansList } from "../components/WorkoutPlan/WorkoutPlansList";
import { BlueOvalLoader } from "../components/Loader/BlueOvalLoader";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "../components/Modal/Modal";
import { cancelDelete, deleteWorkoutPlan } from "../slices/listWorkoutPlanSlice";

export const ListWorkoutPlanPage = () => {
  const [ workoutPlans, setWorkoutPlans ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const { planToDeleteId } = useSelector(state => state.listWorkoutPlan);
  const [ planToDeleteName, setPlanToDeleteName] = useState("");
  const dispatch = useDispatch();
  
  useEffect(() => {
    WorkoutPlanService.getWorkoutPlansList().then((fetchedWorkoutPlans) => {
      console.log(fetchedWorkoutPlans);
      setWorkoutPlans(fetchedWorkoutPlans);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
    console.log(workoutPlans);
  }, []);

  useEffect(() => {
    if (!planToDeleteId) {
      setPlanToDeleteName("");
      return;
    }
    workoutPlans.forEach((plan) => {
      if (plan._id === planToDeleteId) {
        setPlanToDeleteName(plan.name);
        return;
      }
    });

  }, [planToDeleteId]);

  const handleDeleteCancel = (e) => {
    dispatch(cancelDelete());
  };

  const handleDeleteConfirm = async (e) => {
    await dispatch(deleteWorkoutPlan(planToDeleteId));
    setIsLoading(true);
    WorkoutPlanService.getWorkoutPlansList().then((fetchedWorkoutPlans) => {
      console.log(fetchedWorkoutPlans);
      setWorkoutPlans(fetchedWorkoutPlans);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  };

  return <div className="mt-16">
    <h1 className="mt-24 text-3xl font-semibold mb-10"> Your Workout Plans </h1>
    {
      workoutPlans.length > 0 &&
      <div className="w-5/6 flex justify-end">
        <a href="/workout-plan/create" 
        className="
        bg-blue-600 hover:bg-blue-700 text-white text-xl 
        px-4 py-1 rounded-2xl mb-3">+ Create New Plan</a>
      </div>
    }
    {
    isLoading ? 
    <BlueOvalLoader/>
    : 
    ( 
      workoutPlans.length > 0 ?
      <WorkoutPlansList  workoutPlans={workoutPlans}  />
      :
      <>
      <h2 className="text-xl mb-3">You dont have any plan. Start your first plan!</h2>
      <a href="/workout-plan/create" 
      className="
       bg-blue-600 hover:bg-blue-700 text-white text-xl 
      px-4 py-1 rounded-2xl">+ Create New Plan</a>
      
      </>
    )
    }
    {
      planToDeleteId &&
      <Modal onConfirm={handleDeleteConfirm} onCancel={handleDeleteCancel} message={`Anda yakin ingin menghapus ${planToDeleteName}?`} />
    }
  </div>
}