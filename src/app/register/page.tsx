"use client"

import { cn } from "@/lib/utils"
import { RegisterValues } from "@/types"
import axios from "axios"
import { Field, Form, Formik } from "formik"
import Email from "next-auth/providers/email"
import { signIn } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { Toaster, toast } from "react-hot-toast"
import * as Yup from "yup"

const SigninSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "The name is too short!")
    .max(25, "The name is too long!")
    .required("Missing requiered field"),
  password: Yup.string()
    .min(7, "The password is too short!")
    .max(25, "The password is too long!")
    .matches(/[0-9]/, "Password requires a number")
    .matches(/[a-z]/, "Password requires a lowercase letter")
    .matches(/[A-Z]/, "Password requires an uppercase letter")
    .matches(/[^\w]/, "Password requires a symbol")
    .required("Missing requiered field"),
  email: Yup.string()
    .email("Invalid email")
    .required("Missing requiered field"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
})

const Register = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [isFocused, setIsFocused] = useState("")
  const [userToken, setUserToken] = useState("")

  async function loginWithGoogle() {
    setIsLoading(true)
    try {
      await signIn("google").then((response) => {
        console.log(response)
        toast.success("email sent")
      })
    } catch (error) {
      // display error message to user
      toast.error("Something went wrong with your login.")
    } finally {
      setIsLoading(false)
    }
  }

  const saveUser = async (values: RegisterValues) => {
    setIsLoading(true)
    try {
      await axios
        .post("/api/register", {
          name: values.name,
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          console.log(response.data)
          toast.success("email sent")
        })
        .catch((error) => console.log("error", error))
    } catch (error) {
      toast.error("Something went wrong with your login.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main
      style={{
        width: "300px",
        height: "400px",
        display: "flex",
        justifyItems: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "1rem",
        backgroundColor: "#f3f3f3",
      }}
      className="w-full h-screen"
    >
      <Toaster />
      <div className="absolute m-14">
        <h2 className="text-white font-normal text-3xl">Tavross</h2>
      </div>
      <section className="w-1/2 h-full absolute left-0 top-0 flex items-center justify-center drop-shadow-custom">
        <Image
          src={"/david-laid.png"}
          alt="login-image"
          width={350}
          height={700}
          className="absolute mt-12"
        />
      </section>
      <section className="w-1/2 h-full absolute right-0 top-0 mt-32">
        <Formik
          initialValues={{ name: "", email: "", password: "", terms: false }}
          onSubmit={(values) => {
            console.log(values)
            saveUser(values)
          }}
          validationSchema={SigninSchema}
        >
          {({ values, errors, touched }) => (
            <Form
              autoComplete="off"
              className="flex flex-col justify-center h-full"
            >
              <div className="mb-4">
                <h1 className="text-white font-normal text-3xl">Sign up</h1>
              </div>
              <div>
                <h6 className="text-[#ffffff57] text-sm">
                  Already have an account?{" "}
                  <Link className="text-white underline" href="/login">
                    {" "}
                    Sign in
                  </Link>
                </h6>
              </div>
              <div>
                <button
                  type="button"
                  className="w-48 h-11 border-[1px] border-gray-500 flex flex-row items-center justify-center my-6 text-white font-normal rounded"
                  onClick={loginWithGoogle}
                >
                  {isLoading ? null : (
                    <svg
                      className="mr-2 h-4 w-4"
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fab"
                      data-icon="github"
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                      <path d="M1 1h22v22H1z" fill="none" />
                    </svg>
                  )}
                  Acceder con Google
                </button>
              </div>
              <div className="my-6">
                <h6 className="text-[#ffffff57] text-sm">
                  or use E-mail instead
                </h6>
              </div>
              <div className="flex flex-col justify-start items-start gap-6">
                <div className="w-1/2 my-3">
                  <label
                    className={cn("text-white font-normal z-10", {
                      "absolute mt-4 transition-all": isFocused !== "1",
                      "absolute -mt-4 text-sm transition-all text-[#ffffff57]":
                        isFocused === "1" || values.name.length > 0,
                    })}
                    id="1"
                    htmlFor="Email"
                  >
                    Full name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    onFocus={() => setIsFocused("1")}
                    onClick={() => setIsFocused("1")}
                    onBlur={() => setIsFocused("")}
                    value={values.name}
                    className="w-full relative h-14 bg-transparent border-b-[1px] border-gray-500 px-2 outline-none z-20 text-white text-normal text-base"
                  />
                  {errors.name && touched.name && (
                    <div className="text-red mt-4 font-normal text-sm">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="w-1/2 my-3">
                  <label
                    className={cn("text-white font-normal z-10", {
                      "absolute mt-4 transition-all": isFocused !== "2",
                      "absolute -mt-4 text-sm transition-all text-[#ffffff57]":
                        isFocused === "2" || values.email.length > 0,
                    })}
                    id="2"
                    htmlFor="Email"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    value={values.email}
                    onFocus={() => setIsFocused("2")}
                    onClick={() => setIsFocused("2")}
                    onBlur={() => setIsFocused("")}
                    className="w-full relative h-14 bg-transparent border-b-[1px] border-gray-500 px-2 outline-none z-20 text-white text-normal text-base"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red mt-4 font-normal text-sm">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="w-1/2 my-3">
                  <label
                    className={cn("text-white font-normal z-10", {
                      "absolute mt-4 transition-all": isFocused !== "3",
                      "absolute -mt-4 text-sm transition-all text-[#ffffff57]":
                        isFocused === "3" || values.password.length > 0,
                    })}
                    id="3"
                    htmlFor="Password"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    value={values.password}
                    onFocus={() => setIsFocused("3")}
                    onClick={() => setIsFocused("3")}
                    onBlur={() => setIsFocused("")}
                    className="w-full relative h-14 bg-transparent border-b-[1px] border-gray-500 px-2 outline-none z-20 text-white text-normal text-base"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red mt-4 font-normal text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="w-1/2 flex flex-row mb-1">
                  <Field
                    type="checkbox"
                    name="terms"
                    value={values.terms}
                    checked={values.terms}
                    className="relative mt-3 mr-[6px] h-5 w-10 appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]  checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent"
                  />
                  <p className="text-[#ffffff57] text-sm mt-2 leading-6">
                    I agree with the{" "}
                    <span className="text-white underline">Terms of Use</span>{" "}
                    and the{" "}
                    <span className="text-white underline">
                      Integrations Terms of Use
                    </span>
                    . I acknowledge the{" "}
                    <span className="text-white underline">Privacy Policy</span>
                    .
                  </p>
                </div>
                {errors.terms && touched.terms && (
                  <div className="text-red mt-4 font-normal text-sm">
                    {errors.terms}
                  </div>
                )}
                {isLoading ? (
                  <button
                    type="submit"
                    className="w-1/2 h-12 flex items-center justify-center px-4 rounded bg-transparent text-white mb-5 border-[1px] border-blue-800"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-solid border-blue-500 border-l-transparent bg-transparent animate-spin" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-1/2 h-12 px-4 rounded bg-blue-800 text-white mb-5"
                  >
                    Sign up
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default Register
