"use client";

import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { LoginValues } from "@/types";
import { z } from "zod";
import { cn } from "@/lib/utils";

const SigninSchema = Yup.object().shape({
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
});

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState("");

  const router = useRouter();

  async function loginWithGoogle() {
    setIsLoading(true);
    try {
      await signIn("google", { callbackUrl: "http://localhost:3000/dashboard" })
        .then((response) => {
          if (response?.error) {
            toast.error("Something went wrong with your login.");
          } else {
            toast.success("You have successfully logged in.");
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      // display error message to user
      toast.error("Something went wrong with your login.");
    } finally {
      setIsLoading(false);
    }
  }

  const loginWithEmail = async (values: LoginValues) => {
    setIsLoading(true);
    try {
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
        .then((response) => {
          if (response?.error) {
            toast.error("Something went wrong with your login.");
          } else {
            toast.success("You have successfully logged in.");
            router.push("/dashboard");
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.message);
        return;
      }
      if (error instanceof AxiosError) {
        toast.error(error.message);
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="w-full h-screen">
      <Toaster />
      <div className="absolute m-14">
        <h2 className="text-white font-normal text-3xl">Tavross</h2>
      </div>
      <section className="w-1/2 h-full absolute left-0 top-0 flex items-center justify-center">
        <Image
          src={"/david-laid.png"}
          alt="login-image"
          width={350}
          height={700}
          className="absolute mt-20 drop-shadow-custom"
        />
      </section>
      <section className="w-1/2 h-full absolute right-0 top-0 mt-16">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            console.log(values);
            loginWithEmail(values);
          }}
          validationSchema={SigninSchema}
        >
          {({ values, errors, touched }) => (
            <Form
              autoComplete="off"
              className="flex flex-col justify-center h-full"
            >
              <div className="">
                <h1 className="text-white font-normal text-3xl">Sign in</h1>
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
                    className={cn(
                      "text-white font-normal z-10 transition-all",
                      {
                        "absolute mt-4 transition-all": isFocused !== "1",
                        "absolute -mt-4 text-sm transition-all":
                          isFocused === "1" || values.email.length > 0,
                      }
                    )}
                    htmlFor="Email"
                    id="1"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="1"
                    onFocus={() => setIsFocused("1")}
                    onClick={() => setIsFocused("1")}
                    onBlur={() => setIsFocused("")}
                    value={values.email}
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
                    className={cn(
                      "text-white font-normal z-10 transition-all",
                      {
                        "absolute mt-4 transition-all": isFocused !== "2",
                        "absolute -mt-4 text-sm transition-all":
                          isFocused === "2" || values.password.length > 0,
                      }
                    )}
                    htmlFor="Password"
                    id="2"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="2"
                    onFocus={() => setIsFocused("2")}
                    onClick={() => setIsFocused("2")}
                    onBlur={() => setIsFocused("")}
                    value={values.password}
                    className="w-full relative h-14 bg-transparent border-b-[1px] border-gray-500 px-2 outline-none z-20 text-white text-normal text-base"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red mt-4 font-normal text-sm">
                      {errors.password}
                    </div>
                  )}
                </div>
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
                    Sign in
                  </button>
                )}
                <div>
                  <Link
                    href={"/recover-password"}
                    className="text-white underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <h5 className="text-[#ffffff57]">
                    Not in Tavross yet?{" "}
                    <Link className="text-white underline" href={"/register"}>
                      Sign up
                    </Link>
                  </h5>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  );
};

export default Login;
