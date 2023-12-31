import {
  deleteRutineExercises,
  updateRutineExercises,
} from "@/lib/controllers/exercises"
import { cn } from "@/lib/utils"
import { ExerciseListProps, Rutine } from "@/types"
import React, { useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import { useMutation, QueryClient, useQuery } from "react-query"
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
import { getOneRutine } from "@/lib/controllers/rutines"

interface ExerciseProps {
  exercise: ExerciseListProps
  rutineId: string
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
      toast.success("Ejercicio actualizado")
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
      toast.error("Que haces vago?")
    },
  })

  const handleEdit = async (exercise: ExerciseListProps) => {
    try {
      await updateExerciseMutation.mutateAsync(exercise)
    } catch (error) {
      console.log(error)
    }
  }

  const { data: rutine } = useQuery({
    queryKey: ["rutine"],
    queryFn: async () => {
      const rutine = await getOneRutine(rutineId)
      return rutine as Rutine
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exercises")
    },
    onError: () => {
      console.log("error")
    },
  })

  const handleDelete = async () => {
    try {
      await deleteExerciseMutation.mutateAsync()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-[320px] h-[440px] bg-[#1b1b22]/70 border-[1px] border-primary_light_green/40 rounded-md flex items-center justify-center text-center flex-col gap-5 cursor-pointer">
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
          <h4 className="text-white font-normal text-lg">
            {rutine?.category === "cardio" ? "Minutos: " : "Repeticiones: "}
          </h4>
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
            className="w-[120px] h-11 bg-white text-black font-semibold text-lg rounded-sm hover:bg-[#ffffff8c] transition-colors duration-200"
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
