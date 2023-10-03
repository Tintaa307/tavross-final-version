"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { statusAuth } from "@/objects/status"
import Loader from "@/components/shared/Loader"
import { useSession } from "next-auth/react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { cn } from "@/lib/utils"
import { Rutine } from "@/types"
import { useMutation } from "react-query"
import { createRutine } from "@/lib/controllers/rutines"
import toast, { Toaster } from "react-hot-toast"
import { motion } from "framer-motion"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const rutineSchema = Yup.object().shape({
  name: Yup.string().required("Completa este campo!"),
  frequency: Yup.string().required("Completa este campo!"),
})

const Create = () => {
  const { status, data } = useSession()
  const router = useRouter()
  const { LOADING, UNAUTH } = statusAuth
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState("")

  useEffect(() => {
    if (status === UNAUTH) {
      router.push("/login")
    }
  })

  const createRutineMutation = useMutation({
    mutationKey: ["createRutine"],
    mutationFn: async (values: Rutine) => {
      await createRutine({
        name: values.name,
        frequency: values.frequency,
        category: category,
        identifier: data?.user?.email!,
      })
    },
    onSuccess: () => {
      toast.success("Rutine created")
      router.push("/dashboard/rutines")
    },
    onError: () => {
      toast.error("Error creating rutine")
    },
  })

  const handleSubmit = async (values: Rutine) => {
    setIsLoading(true)
    try {
      await createRutineMutation.mutateAsync(values)
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
            <div className="w-1/2 h-screen flex items-center justify-center flex-col gap-4">
              <h1 className="text-white text-4xl font-normal">
                Crea tus rutinas
              </h1>
              <Formik
                initialValues={{
                  name: "",
                  frequency: "",
                }}
                validationSchema={rutineSchema}
                onSubmit={(values) => {
                  console.log(values)
                  handleSubmit({
                    name: values.name,
                    frequency: values.frequency,
                    category: category,
                  })
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
                            : "Nombre... (ejemplo: Espalda y bicep)"
                        }
                        name="name"
                        value={values.name}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-primary_green transition-all duration-500 text-white",
                          {
                            "border-red": errors.name && touched.name,
                          }
                        )}
                      />
                    </div>
                    <div className="w-full h-max flex justify-center my-5">
                      <Field
                        placeholder={
                          errors.frequency && touched.frequency
                            ? errors.frequency
                            : "Frencuencia... (ejemplo: 3 veces por semana)"
                        }
                        name="frequency"
                        value={values.frequency}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-primary_green transition-all duration-500 text-white",
                          {
                            "border-red": errors.frequency && touched.frequency,
                          }
                        )}
                      />
                    </div>
                    <div className="w-full h-max flex justify-center my-5">
                      <Select onValueChange={(value) => setCategory(value)}>
                        <SelectTrigger
                          className={cn(
                            "w-1/2 h-11 bg-transparent text-white border-[1px] border-gray-400 outline-none focus:border-[1px] focus:ring-0 focus:ring-transparent focus:border-gray-400"
                          )}
                        >
                          <SelectValue placeholder="Elige una categoria" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#13131A] text-white font-semibold">
                          <SelectGroup>
                            <SelectLabel>Categoria</SelectLabel>
                            <SelectItem value="musculacion">
                              Musculacion
                            </SelectItem>
                            <SelectItem value="cardio">Cardio</SelectItem>
                            <SelectItem value="salud">Saludable</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    {isLoading ? (
                      <button
                        type="submit"
                        className="w-1/2 h-12 flex items-center justify-center px-4 rounded bg-transparent text-white mb-5 border-[1px] border-primary_green"
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-solid border-primary_green border-l-transparent bg-transparent animate-spin" />
                      </button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.5, type: "tween" }}
                        type="submit"
                        className="w-1/2 h-12 px-4 rounded bg-primary_green/20 border-[1px] border-primary_green text-white mt-4 hover:bg-primary_light_green/40 transition-colors duration-200"
                      >
                        Crear rutina
                      </motion.button>
                    )}
                  </Form>
                )}
              </Formik>
            </div>
            <div className="w-1/2 h-full"></div>
          </div>
        </main>
      )}
    </>
  )
}

export default Create
