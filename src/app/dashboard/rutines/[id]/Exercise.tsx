import {
  deleteRutineExercises,
  updateRutineExercises,
} from "@/lib/controllers/exercises"
import { cn } from "@/lib/utils"
import { ExerciseListProps } from "@/types"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useMutation, QueryClient } from "react-query"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

interface ExerciseProps {
  exercise: ExerciseListProps
  rutineId: string
}

interface ExerciseKey {
  name: string
}

const Exercise = ({ exercise, rutineId }: ExerciseProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [newWeight, setNewWeight] = useState(exercise.weight.toString())
  const [newReps, setNewReps] = useState(exercise.reps.toString())
  const router = useRouter()
  const queryClient = new QueryClient()

  const updateExerciseMutation = useMutation({
    mutationKey: ["updateExercise"],
    mutationFn: async (values: ExerciseListProps) => {
      await updateRutineExercises(rutineId, {
        name: values.name,
        weight: Number(newWeight),
        reps: Number(newReps),
      })
    },
    onSuccess: () => {
      toast.success("Exercise updated")
      queryClient.invalidateQueries("exercises")
    },
    onError: () => {
      toast.error("Error updating exercise")
    },
  })

  const deleteExerciseMutation = useMutation({
    mutationKey: ["deleteExercise"],
    mutationFn: async () => {
      await deleteRutineExercises(rutineId)
    },
    onSuccess: () => {
      toast.success("Exercise deleted")
      queryClient.invalidateQueries("exercises")
    },
    onError: () => {
      toast.error("Error deleting exercise")
    },
  })

  const handleEdit = async (exercise: ExerciseListProps) => {
    try {
      await updateExerciseMutation.mutateAsync(exercise)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteExerciseMutation.mutateAsync()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      onClick={() => router.push("/dashboard/rutines/25/exercise")}
      className="w-[320px] h-[440px] bg-[#1d1c20] border-[1px] border-gray-700 rounded-md flex items-center justify-center text-center flex-col gap-5 cursor-pointer"
    >
      <Toaster />
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
              isEditing ? handleEdit(exercise) : null
            }}
            className="w-[120px] h-11 bg-blue-600 text-white font-semibold text-lg rounded-sm hover:bg-blue-800 transition-colors duration-200"
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="w-[120px] h-11 bg-[#ee223b] text-white font-semibold text-lg rounded-sm hover:bg-[#ee223a75] transition-colors duration-200">
                Eliminar
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#13131A] border-[1px] border-gray-700">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Estas seguro de esto?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta accion no se puede deshacer. Este ejercicio sera
                  eliminado permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover:bg-[#eeeeeeb6] transition-colors duration-200">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-[#ee223b] hover:bg-[#ee223a75] transition-colors duration-200"
                  onClick={handleDelete}
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}

export default Exercise
