import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { ResultList } from "../components/Home/ResultList";
import { useSelector } from "react-redux";
import SearchExerciseService from "../services/SearchExerciseService";
import { BlueOvalLoader } from "../components/Loader/BlueOvalLoader";
import WorkoutSessionService from "../services/WorkoutSessionService";
import WorkoutPlanService from "../services/WorkoutPlanService";
import { TodayExercisesList } from "../components/Home/TodayExercisesList";
import { Helmet } from "react-helmet";

export const HomePage = () => {
  const [searchBase, setSearchBase] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [isTodaySessionLoading, setIsTodaySessionLoading] = useState(false);
  const [todaySession, setTodaySession] = useState({});

  const { user, currentPlanId } = useSelector(state => state.auth);

  useEffect(() => {
    setIsTodaySessionLoading(true);
    if (!currentPlanId) {
      setIsTodaySessionLoading(false);
      return;
    }
    // Get current workout plan
    let theWorkoutPlan = {};
    WorkoutPlanService.getWorkoutPlanById(currentPlanId).then((workoutPlan) => {
      theWorkoutPlan = workoutPlan;
    }).catch((err) => {
      theWorkoutPlan = {};
    });
    const todayDate = new Date();
    const todayString = todayDate.toLocaleDateString("en-US", { weekday: 'long'}).toLowerCase();
    // Check available session for today in database
    WorkoutSessionService.getWorkoutSessionByDate(todayDate).then((workoutSession) => {
      // If available check is the workout session referenced the current plan
      if (workoutSession.plan === currentPlanId) {
        // If same, set the today session to the fetched workout plan
        setTodaySession(workoutSession);
        setIsTodaySessionLoading(false);
      } else {
        // If not same, update the fetched session so it same as the current plan
        workoutSession.plan = currentPlanId;
        for (let i = 0; i < theWorkoutPlan.workoutSessions.length; i++) {
          // If the changed plan has matching day with today
          if (theWorkoutPlan.workoutSessions[i].day === todayString) {
            const todaySessionOfCurrentWorkoutPlan = theWorkoutPlan.workoutSessions.find((session) => {
              return session.day === todayString;
            });
            
            workoutSession.exercises = todaySessionOfCurrentWorkoutPlan.exercises;
            WorkoutSessionService.updateWorkoutSession(workoutSession).then((response) => {
              const updatedWorkoutSessionResponse = response.data.workoutSession;
              setTodaySession(updatedWorkoutSessionResponse);
              setIsTodaySessionLoading(false);
            });
            return;
          };
        }
        // If the changed plan has no matching day with today
        setTodaySession({});
        setIsTodaySessionLoading(false);
      }
      // If available  set the fetched session to todaySession state
      
    }).catch((err) => {
      // If not available create new workout session if today is workout day
      console.log(err);
      for (let i = 0; i < theWorkoutPlan.workoutSessions?.length; i++) {
        if (theWorkoutPlan.workoutSessions[i].day === todayString) {
          const newWorkoutSession = {
            date: todayDate,
            plan: currentPlanId,
            exercises: theWorkoutPlan.workoutSessions[i].exercises
          }
          WorkoutSessionService.createWorkoutSession(newWorkoutSession).then((response) => {
            setTodaySession(response.data.workoutSession);
            setIsTodaySessionLoading(false);
          });
          setTimeout(500); //prevent double session created *React18 behavior
          return;
        }
      }
      setIsTodaySessionLoading(false);
    });
  }, [currentPlanId]);
  
  const onChangeSearchBase = (event) => {
    if (event.target.value === "name") {
      setSearchBase("name");
    } else {
      setSearchBase("muscle");
    }
  }

  const onChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  }
  const onKeyDownSearch = (event) => {
    if (event.key === 'Enter') {
      performSearch(searchQuery);
    }
  }

  const performSearch = async (query) => {
    setIsSearchLoading(true);
    if (searchBase === "name") {
      try {
        const response = await SearchExerciseService.searchExerciseByName(query);
        setSearchResult(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await SearchExerciseService.searchExerciseByMuscleTarget(query);
        setSearchResult(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    setIsSearchLoading(false);
  }

  return <div className="lg:mt-16 md:mt-16">
    <Helmet>
      <title>Home</title>
    </Helmet>
    <h1 className="text-4xl font-semibold bg-gray-300 py-12">{user ? `Welcome, ${user.username}!` : 'Login to start your workout plan!'}</h1>
    <div className="flex flex-wrap justify-center gap-40">
    { user &&
      <div>
        <h2 className="text-4xl font-bold mt-8">Today Session</h2>
        <div className=" bg-gray-800 mx-auto 
        mt-4 p-2
        rounded-md">
          <p className="text-xl text-white m-2">Exercises to do!</p>
          {isTodaySessionLoading && <BlueOvalLoader />}
          {!isTodaySessionLoading &&
            (Object.keys(todaySession).length === 0 ?
            <h2 className="mb-2 text-white">No session for today.</h2>
            :
            <TodayExercisesList todaySession={todaySession} /> )
          }
        </div>
        
      </div>}
      <div className="max-w-md">
        <h2 className="text-4xl font-bold mt-8">Search for Exercises</h2>
        <div className="relative">  
          <p className="inline font-semibold">Search based on</p>
          <select onChange={onChangeSearchBase} className="inline border py-1 border-black rounded mx-2 px-2 text-black bg-amber-200" name="" id="">
            <option value="name" className="py-2 select:bg-yellow-200">Exercise Name</option>
            <option value="muscle">Target 
            Muscle</option>
          </select>
        </div>
        <div className="relative w-fit mx-auto">
          <div className="absolute inset-y-0 pl-3 py-2 top-2 left-0 pointer-events-none">
            <FontAwesomeIcon aria-hidden className=" text-gray-400 text-lg" icon={faSearch} />
          </div>
          <input onKeyPress={onKeyDownSearch} onChange={onChangeSearch} type="text" value={searchQuery} className="w-96 ps-9 border border-black mt-2 h-10 rounded-md" placeholder={searchBase === "name" ? "Enter exercise name..." : "Enter target muscle..."}/>
        </div>
        {isSearchLoading ? <BlueOvalLoader/> : <></>}
        {isSearchLoading ? <></> : 
        (
          searchResult.length !== 0 ?
          <ResultList resultSet={searchResult}/>
          :
          <p className="text-xl mt-3">No exercise found.</p>
        )
        }
      </div>
      
    </div>
    
  </div>;
};