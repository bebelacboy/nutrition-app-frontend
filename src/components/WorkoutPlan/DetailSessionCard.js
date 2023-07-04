export const DetailSessionCard = ({ session }) => {
  const sessionDayShorts = {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun"
  }

  return <div className="bg-gray-800 pb-1 rounded-lg w-64">
    <h2 className="text-2xl bg-gray-800 text-amber-300 text-start font-semibold py-2 ps-6 rounded-lg">{sessionDayShorts[session.day]}</h2>
    <h3 className="text-lg text-white text-start mb-1 ps-6">Exercises Current Stats</h3>
    {session.exercises.map((exercise, index) => {
      return <div key={index}>
        <div className="bg-amber-200 text-start text-md grid grid-cols-4 ps-6 pb-1 mx-2 mb-3 rounded-md">
          <p className="text-start font-semibold capitalize col-span-2">{exercise.name}</p>
          <p className="text-center font-semibold col-span-1">{`${exercise.set} x ${exercise.reps}`}</p>
          <p className="text-center font-semibold col-span-1">{`${exercise.currentWeight} Kg`}</p>
        </div>
      </ div>
    })}
  </div>
}