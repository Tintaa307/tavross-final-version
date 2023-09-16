import { cn } from "@/lib/utils"
import { ExerciseListProps } from "@/types"
import React, { useState } from "react"

interface ExerciseProps {
  exercise: ExerciseListProps
}

const Exercise = ({ exercise }: ExerciseProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newWeight, setNewWeight] = useState(exercise.weight.toString())
  const [newReps, setNewReps] = useState(exercise.reps.toString())

  const handleEdit = (exerciseName: string) => {}
  const handleDelete = (exerciseName: string) => {}

  return (
    <div className="w-[320px] h-[440px] bg-[#1d1c20] border-[1px] border-gray-700 rounded-md flex items-center justify-center text-center flex-col gap-5">
      <h2 className="text-white font-semibold text-[26px]">{exercise.name}</h2>
      <p className="text-base text-gray-400 font-normal px-3">
        Aqui puedes ver los datos de tus ejercicios y modificarlos.
      </p>
      <div className="w-full h-max flex items-start justify-start flex-col gap-4 my-14">
        <div className="flex flex-row gap-3 mx-6">
          <h4 className="text-white font-normal text-lg">Peso: </h4>
          <input
            type="number"
            value={isEditing ? newWeight : exercise.weight}
            disabled={isEditing ? false : true}
            onChange={(e) => setNewWeight(e.target.value)}
            className={cn(
              "w-[160px] rounded-md h-max text-white font-normal text-lg bg-transparent border-transparent outline-none",
              {
                "border-2 border-gray-400 px-2 py-1": isEditing,
              }
            )}
          />
        </div>
        <div className="flex flex-row gap-3 mx-6">
          <h4 className="text-white font-normal text-lg">Repeticiones: </h4>
          <input
            type="number"
            value={isEditing ? newReps : exercise.reps}
            onChange={(e) => setNewReps(e.target.value)}
            disabled={isEditing ? false : true}
            className={cn(
              "w-[160px] rounded-md h-max text-white font-normal text-lg bg-transparent border-transparent outline-none",
              {
                "border-2 border-gray-400 px-2 p py-1": isEditing,
              }
            )}
          />
        </div>
      </div>
      <div className="w-full h-max flex justify-center items-center flex-row gap-6">
        <div>
          <button
            onClick={() => {
              setIsEditing(!isEditing)
              isEditing ? handleEdit(exercise.name) : null
            }}
            className="w-[120px] h-11 bg-blue-600 text-white font-semibold text-lg rounded-sm hover:bg-blue-800 transition-colors duration-200"
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              isEditing ? setIsEditing(false) : handleDelete(exercise.name)
            }}
            className="w-[120px] h-11 bg-[#ee223b] text-white font-semibold text-lg rounded-sm hover:bg-[#ee223a75] transition-colors duration-200"
          >
            {isEditing ? "Cancelar" : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Exercise
