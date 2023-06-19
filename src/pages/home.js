import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { ResultList } from "../components/Home/ResultList";
import { useSelector } from "react-redux";
import SearchExerciseService from "../services/SearchExerciseService";

export const HomePage = () => {
  const [searchBase, setSearchBase] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useSelector(state => state.auth);
  
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
    setIsLoading(true);
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
    setIsLoading(false);
  }

  return <div className="mt-16">
    <h1 className="text-4xl font-semibold bg-gray-300 py-12">{user ? `Welcome, ${user.username}!` : 'Login to start your workout plan!'}</h1>
    <h2 className="text-4xl font-bold mt-8">Search for Exercises</h2>
    <div className="relative">  
      <p className="inline font-semibold">Search based on</p>
      <select onChange={onChangeSearchBase} className="inline border py-1 border-black rounded mx-2 px-2 text-black bg-blue-300" name="" id="">
        <option value="name" className="py-2 select:bg-blue-400">Exercise Name</option>
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
    {isLoading ? <div className="font-bold mt-3">Loading Exercises...</div> : <></>}
    {isLoading ? <></> : <ResultList resultSet={searchResult}/>}
    
  </div>;
};