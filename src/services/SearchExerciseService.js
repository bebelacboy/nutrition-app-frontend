import axios from 'axios';

const searchExerciseByName = async (query) => {
  console.log(`${process.env.REACT_APP_EXERCISE_API_URL}`);
  console.log(`${process.env.REACT_APP_API_URL}`);
  console.log(`${process.env.REACT_APP_EXERCISE_API_KEY}`);
  console.log(`${process.env.REACT_APP_EXERCISE_API_HOST}`);
  const response = await axios.request({
    method:'GET',
    url: `${process.env.REACT_APP_EXERCISE_API_URL}`,
    params: {name: query},
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_EXERCISE_API_KEY}`,
      'X-RapidAPI-Host': `${process.env.REACT_APP_EXERCISE_API_HOST}`
    }
  });
  
  return response;
}

const searchExerciseByMuscleTarget = async (query) => {
  const response = await axios.request({
    method: 'GET',
    url: `${process.env.REACT_APP_EXERCISE_API_URL}`,
    params: {muscle: query},
    headers: {
      'X-RapidAPI-Key': `${process.env.REACT_APP_EXERCISE_API_KEY}`,
      'X-RapidAPI-Host': `${process.env.REACT_APP_EXERCISE_API_HOST}`
    }
  });
  return response;
}

const SearchExerciseService = {
  searchExerciseByName,
  searchExerciseByMuscleTarget
}

export default SearchExerciseService;