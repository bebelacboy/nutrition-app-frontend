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

  return <div className="bg-yellow-100 w-64">
    <h2 className="text-2xl bg-amber-300 text-start font-bold py-2 ps-6 rounded-lg">{sessionDayShorts[session.day]}</h2>
    <h3 className="text-lg text-start font-bold ps-6">Exercises Current Stats</h3>
    {session.exercises.map((exercise, index) => {
      return <div key={index}>
        <div className="text-start text-md grid grid-cols-4 ps-6 pb-1">
          <p className="text-start font-semibold capitalize col-span-2">{exercise.name}</p>
          <p className="text-center font-semibold col-span-1">{`${exercise.set} x ${exercise.reps}`}</p>
          <p className="text-center font-semibold col-span-1">{`${exercise.currentWeight} Kg`}</p>
        </div>
        <div className="h-0.5 bg-black w-full overflow-hidden" />
      </ div>
    })}
  </div>
}