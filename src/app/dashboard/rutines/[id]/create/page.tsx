"use client"

import { cn } from "@/lib/utils"
import { Field, Form, Formik } from "formik"
import React, { useEffect, useState } from "react"
import toast, { Toaster } from "react-hot-toast"
import * as Yup from "yup"
import { motion } from "framer-motion"
import { useSession } from "next-auth/react"
import { statusAuth } from "@/objects/status"
import Loader from "@/components/shared/Loader"
import { ExerciseListProps, Rutine } from "@/types"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { addExercises } from "@/lib/controllers/exercises"
import { useRouter } from "next/navigation"
import { getOneRutine } from "@/lib/controllers/rutines"

const exerciseSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  weight: Yup.string().required("Weight is required"),
  reps: Yup.string().required("Reps is required"),
})

const AddExercises = ({ params }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { status } = useSession()
  const router = useRouter()
  const { LOADING } = statusAuth
  const [exercisesList, setExercisesList] = useState<ExerciseListProps[]>([])
  const queryClient = useQueryClient()

  const handleExercises = (values: ExerciseListProps) => {
    if (values === undefined) {
      toast.error("Debe llenar todos los campos")
    } else {
      if (exercisesList?.length === 0) {
        setExercisesList([
          {
            name: values.name,
            weight: values.weight,
            reps: values.reps,
            rutinesId: Number(params.id),
          },
        ])
      } else {
        setExercisesList([
          ...exercisesList!,
          {
            name: values.name,
            weight: values.weight,
            reps: values.reps,
            rutinesId: Number(params.id),
          },
        ])
      }
    }
  }

  const handleDelete = (name: string) => {
    const newList = exercisesList?.filter((exercise) => exercise.name !== name)
    setExercisesList([...newList!])
  }

  const addExercisesMutation = useMutation({
    mutationKey: ["addExercises"],
    mutationFn: async (list: ExerciseListProps[]) => {
      await addExercises([...list])
    },
    onSuccess: () => {
      toast.success("Exercises agregados")
      router.push(`/dashboard/rutines/${params.id}`)
      queryClient.invalidateQueries("rutines")
    },
    onError: () => {
      toast.error("Error agregando ejercicios")
    },
  })

  const {
    data: rutine,
    isError,
    error,
  } = useQuery({
    queryKey: ["rutine"],
    queryFn: async () => {
      const rutine = await getOneRutine(params.id)
      return rutine as Rutine
    },
    onSuccess: () => {
      queryClient.invalidateQueries("exercises")
    },
    onError: () => {
      console.log("error")
    },
  })

  const handleSubmit = async (list: ExerciseListProps[]) => {
    setIsLoading(true)
    try {
      await addExercisesMutation.mutateAsync(list)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {status === LOADING ? (
        <Loader />
      ) : (
        <main className="w-full h-full flex items-center justify-center">
          <Toaster />
          <div className="w-full h-full flex items-center justify-center flex-row">
            <div className="w-1/2 h-[86.7vh] flex items-center justify-center flex-col gap-4">
              <h1 className="text-white text-4xl font-normal">
                Agrega tus ejercicios
              </h1>
              <Formik
                initialValues={
                  rutine?.category === "cardio"
                    ? {
                        name: "",
                        reps: "",
                        weight: 0,
                      }
                    : {
                        name: "",
                        weight: "",
                        reps: "",
                      }
                }
                validationSchema={exerciseSchema}
                onSubmit={(values) => {
                  console.log(values)
                  handleSubmit(exercisesList)
                }}
              >
                {({ values, errors, touched }) => (
                  <Form
                    autoComplete="off"
                    className="w-full flex items-center justify-center flex-col"
                  >
                    <div className="w-full h-max flex justify-center my-5">
                      <Field
                        placeholder={
                          errors.name && touched.name
                            ? errors.name
                            : "Nombre..."
                        }
                        name="name"
                        value={values.name}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-blue-700 transition-all duration-500 text-white",
                          {
                            "border-[#ff6b6b]": errors.name && touched.name,
                          }
                        )}
                      />
                    </div>
                    {rutine?.category === "cardio" ? null : (
                      <div className="w-full h-max flex justify-center my-5">
                        <Field
                          placeholder={
                            errors.weight && touched.weight
                              ? errors.weight
                              : "Peso..."
                          }
                          name="weight"
                          type="number"
                          value={values.weight}
                          className={cn(
                            "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-blue-700 transition-all duration-500 text-white",
                            {
                              "border-[#ff6b6b]":
                                errors.weight && touched.weight,
                            }
                          )}
                        />
                      </div>
                    )}
                    <div className="w-full h-max flex justify-center my-5">
                      <Field
                        type="number"
                        placeholder={
                          errors.reps && touched.reps
                            ? errors.reps
                            : rutine?.category === "cardio"
                            ? "Minutos..."
                            : "Repeticiones..."
                        }
                        name="reps"
                        value={values.reps}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-blue-700 transition-all duration-500 text-white",
                          {
                            "border-[#ff6b6b]": errors.reps && touched.reps,
                          }
                        )}
                      />
                    </div>
                    <motion.div
                      onClick={() => {
                        handleExercises(
                          rutine?.category === "cardio"
                            ? {
                                name: values.name,
                                reps: Number(values.reps),
                                weight: 0,
                              }
                            : {
                                name: values.name,
                                weight: Number(values.weight),
                                reps: Number(values.reps),
                              }
                        )
                      }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.5, type: "tween" }}
                      className="w-1/2 h-12 px-4 rounded bg-blue-800 text-white mt-4 hover:bg-blue-900 flex items-center justify-center cursor-pointer transition-colors duration-200"
                    >
                      Agregar ejercicio
                    </motion.div>
                    {exercisesList?.length > 0 ? (
                      isLoading ? (
                        <button
                          type="submit"
                          className="w-1/2 h-12 mt-4 flex items-center justify-center px-4 rounded bg-transparent text-white mb-5 border-[1px] border-blue-800"
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-solid border-blue-500 border-l-transparent bg-transparent animate-spin" />
                        </button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          transition={{ duration: 0.5, type: "tween" }}
                          type="submit"
                          className="w-1/2 h-12 px-4 rounded bg-blue-800 text-white mt-4 hover:bg-blue-900"
                        >
                          Enviar ejercicios
                        </motion.button>
                      )
                    ) : null}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="w-1/2 h-full flex items-start justify-center flex-col gap-4">
              {exercisesList?.map((exercise, index) => (
                <motion.div
                  onClick={() => handleDelete(exercise.name)}
                  initial={{ scale: 0.9 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, type: "tween" }}
                  key={index}
                  className="w-max h-max p-2 rounded-md bg-transparent border-[1px] border-gray-400 flex items-center justify-center"
                >
                  <h1 className="text-white text-lg font-normal">
                    {exercise.name}
                  </h1>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  )
}

export default AddExercises
