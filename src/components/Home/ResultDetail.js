import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export const ResultDetail = ({ result }) => {
  const [isDetailExpand, setIsDetailExpand] = useState(false);
  const onClickTab = () => {
    setIsDetailExpand(!isDetailExpand);
  };
  const muscleTarget = result.muscle.replaceAll("_", " ");
  const equipmentType = result.equipment.replaceAll("_", " ");
  const instructions = result.instructions.split(".");
  instructions.pop();
  const resultCard = (
    <div className=" mx-auto mt-3 transition"> 
      <div onClick={onClickTab} className="bg-gray-800 hover:bg-gray-700 text-white capitalize px-5 py-4 rounded-md  flex justify-between align-middle">
        <p className="text-2xl" >{result.name}</p>
        {
          isDetailExpand ? 
          <FontAwesomeIcon className=" text-white font-extrabold text-xl" icon={faMinus} />  : 
          <FontAwesomeIcon className=" text-white font-extrabold text-xl" icon={faPlus} />
        }
        
      </div>
      <div className={isDetailExpand ? 'overflow-hidden h-fit' : 'h-0 overflow-hidden'}>
        <div className={`${isDetailExpand ? '' : '-translate-y-full'} p-4 transition-all ease-in-out duration-500 text-start bg-amber-200 rounded-b-lg`}>
          <p className="font-semibold text-2xl">
            Muscle Target 
          </p>
          <p className="capitalize"> {muscleTarget}</p>
          <p className="font-semibold text-2xl">
            Equipment Type 
          </p>
          <p className="capitalize"> {equipmentType}</p>
          <p className="font-semibold text-2xl">
            How To Do It
          </p>
          {instructions.map((elem, i) => {
              return <p key={elem} className="">{i + 1}. {elem}</p>
          })}
        </div>
          
      </div>
      </div>
  );
  return resultCard;
};