import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

const ResultDetail = ({ result }) => {
  const [isDetailExpand, setIsDetailExpand] = useState(false);
  const onClickTab = () => {
    setIsDetailExpand(!isDetailExpand);
  };
  const muscleTarget = result.muscle.replaceAll("_", " ");
  const equipmentType = result.equipment.replaceAll("_", " ");
  const instructions = result.instructions.split(".");
  instructions.pop();
  const resultCard = (
    <div className="w-4/5 lg:w-2/5 md:w-3/5 mx-auto mt-3 transition"> 
      <div onClick={onClickTab} className="bg-gray-800 text-white capitalize px-5 py-4 rounded-md  flex justify-between align-middle">
        <p className="text-2xl" >{result.name}</p>
        <FontAwesomeIcon className=" text-white font-extrabold text-xl" icon={faPlus} />
      </div>
      <div className={isDetailExpand ? 'overflow-hidden h-fit' : 'h-0 overflow-hidden'}>
        <div className={`${isDetailExpand ? '' : '-translate-y-full'} p-4 transition-all ease-in-out duration-500 text-start bg-yellow-100 rounded-b-lg`}>
          <p className="font-semibold text-xl">
            Muscle Target 
          </p>
          <p className="capitalize text-lg"> {muscleTarget}</p>
          <p className="font-semibold text-xl">
            Equipment Type 
          </p>
          <p className="capitalize text-lg"> {equipmentType}</p>
          <p className="font-semibold text-xl">
            How To Do It
          </p>
          {instructions.map((elem, i) => {
              return <p key={elem} className="text-lg">{i + 1}. {elem}</p>
          })}
        </div>
          
      </div>
      </div>
  );
  return resultCard;
};

const ResultList = ({ resultSet }) => {
  const view = resultSet.map((result) => {
    return <ResultDetail key={result.name} result={result}/>;
  });
  return view;
}

export const HomePage = () => {
  const [searchBase, setSearchBase] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
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
    let options = {}
    if (searchBase === "name") {
      options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {name: searchQuery},
        headers: {
          'X-RapidAPI-Key': 'd31f531777mshae68be1f8bed451p1c7d29jsn18e4a72eeb0a',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
      };
    } else {
      options = {
        method: 'GET',
        url: 'https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises',
        params: {muscle: searchQuery},
        headers: {
          'X-RapidAPI-Key': 'd31f531777mshae68be1f8bed451p1c7d29jsn18e4a72eeb0a',
          'X-RapidAPI-Host': 'exercises-by-api-ninjas.p.rapidapi.com'
        }
      };
    }

    try {
      const response = await axios.request(options)
      setSearchResult(response.data);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  }

  return <div className="mt-36">
    <h2 className="text-4xl font-bold">Search for Exercises</h2>
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