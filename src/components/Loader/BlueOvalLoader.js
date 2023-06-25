import { Oval } from "react-loader-spinner"

export const BlueOvalLoader = ({width = 50, height = 60}) => {
  return <div className="flex justify-center">
      <Oval
        color="blue"
        ariaLabel='oval-loading'
        secondaryColor="lightblue"
        className="mx-auto"
        width={width}
        height={height}
      /> 
  </div>
}