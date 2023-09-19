"use client"

import React, { ChangeEvent, use, useEffect, useState } from "react"
import "./Calculator.css"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { object } from "zod"

const Calculator = () => {
  const [data, setData] = useState({
    reps: "",
    weight: "",
  })

  const calcRM =
    0.0333 * Number(data.weight) * Number(data.reps) + Number(data.weight)

  const lvlRM = [
    {
      lvl: "100%",
      calc: calcRM,
      reps: "1",
    },
    {
      lvl: "95%",
      calc: calcRM * 0.95,
      reps: "2",
    },
    {
      lvl: "90%",
      calc: calcRM * 0.9,
      reps: "4",
    },
    {
      lvl: "85%",
      calc: calcRM * 0.85,
      reps: "6",
    },
    {
      lvl: "80%",
      calc: calcRM * 0.8,
      reps: "8",
    },
    {
      lvl: "75%",
      calc: calcRM * 0.75,
      reps: "10",
    },
    {
      lvl: "70%",
      calc: calcRM * 0.7,
      reps: "12",
    },
    {
      lvl: "65%",
      calc: calcRM * 0.65,
      reps: "16",
    },
    {
      lvl: "60%",
      calc: calcRM * 0.6,
      reps: "20",
    },
    {
      lvl: "55%",
      calc: calcRM * 0.55,
      reps: "24",
    },
    {
      lvl: "50%",
      calc: calcRM * 0.5,
      reps: "30",
    },
  ]

  useEffect(() => {
    console.log(data)
  })

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const values = Object.fromEntries(formData.entries())
    setData({
      reps: values.reps.toString(),
      weight: values.weight.toString(),
    })
  }

  return (
    <section className="calculator">
      <h1 className="title">RM Calculator</h1>
      <div className="calculator-content">
        <form
          onSubmit={submit}
          autoComplete="off"
          className="calculator-container"
        >
          <h1 className="text-white text-4xl font-semibold">
            Testea tus limites
          </h1>
          <input
            type="text"
            className="w-72 h-11 bg-transparent border-[1px] border-gray-400 text-gray-400 text-base font-medium pl-3 rounded-md outline-none focus:outline-[3px] focus:outline-gray-500 transition-all duration-100"
            name="weight"
            placeholder="Peso..."
          />
          <input
            type="text"
            className="w-72 h-11 bg-transparent border-[1px] border-gray-400 text-gray-400 text-base font-medium pl-3 rounded-md outline-none focus:outline-[3px] focus:outline-gray-500 transition-all duration-100"
            name="reps"
            placeholder="Repeticiones..."
          />
          <input
            type="submit"
            placeholder="Calcular"
            className="w-44 h-11 bg-white flex items-center justify-center hover:bg-gray-300 transition-colors duration-200 text-black rounded-md font-semibold outline-none"
          />
        </form>
        <div className="results">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px] text-white font-semibold text-xl">
                    Porcentaje RM
                  </TableHead>
                  <TableHead className="w-[200px] text-white font-semibold text-xl">
                    Peso Levantado
                  </TableHead>
                  <TableHead className="w-[200px] text-white font-semibold text-xl">
                    Repeticiones de RM
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lvlRM.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-gray-400 ">{item.lvl}</TableCell>
                    <TableCell className="text-gray-400 ">
                      {Math.ceil(item.calc)}kg
                    </TableCell>
                    <TableCell className="text-gray-400 ">
                      {item.reps}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Calculator
