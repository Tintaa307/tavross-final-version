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

const rutineSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  frequency: Yup.string().required("Frequency is required"),
  category: Yup.string().required("Category is required"),
})

const Create = () => {
  const { status, data } = useSession()
  const router = useRouter()
  const { LOADING, UNAUTH } = statusAuth
  const [isLoading, setIsLoading] = useState(false)

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
        category: values.category,
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
            <div className="w-1/2 h-[86.7vh] flex items-center justify-center flex-col gap-4">
              <h1 className="text-white text-4xl font-normal">
                Create your rutine
              </h1>
              <Formik
                initialValues={{
                  name: "",
                  frequency: "",
                  category: "",
                }}
                validationSchema={rutineSchema}
                onSubmit={(values) => {
                  handleSubmit(values)
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
                            : "Nombre de la rutina..."
                        }
                        name="name"
                        value={values.name}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-blue-700 transition-all duration-500 text-white",
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
                            : "Frencuencia de la rutina..."
                        }
                        name="frequency"
                        value={values.frequency}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-blue-700 transition-all duration-500 text-white",
                          {
                            "border-red": errors.frequency && touched.frequency,
                          }
                        )}
                      />
                    </div>
                    <div className="w-full h-max flex justify-center my-5">
                      <Field
                        placeholder={
                          errors.category && touched.category
                            ? errors.category
                            : "Categoria..."
                        }
                        name="category"
                        value={values.category}
                        className={cn(
                          "w-1/2 h-12 outline-none bg-transparent border-b-[2px] border-white focus:border-blue-700 transition-all duration-500 text-white",
                          {
                            "border-red": errors.category && touched.category,
                          }
                        )}
                      />
                    </div>
                    {isLoading ? (
                      <button
                        type="submit"
                        className="w-1/2 h-12 flex items-center justify-center px-4 rounded bg-transparent text-white mb-5 border-[1px] border-blue-800"
                      >
                        <div className="w-6 h-6 rounded-full border-2 border-solid border-blue-500 border-l-transparent bg-transparent animate-spin" />
                      </button>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        transition={{ duration: 0.5, type: "tween" }}
                        type="submit"
                        className="w-1/2 h-12 px-4 rounded bg-blue-800 text-white mt-4 hover:bg-blue-900 "
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
