/* eslint-disable react/prop-types */
import { cn, Input, Radio, RadioGroup } from "@nextui-org/react"
import { SelectCustom } from "../../components/SelectCustom"
import { Controller } from "react-hook-form"
import { RadioCustom } from "../../components/RadioCustom"

function ClienteFinances({ register, control }) {
  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 min-h-[550px] ">
        <div className="flex flex-col w-100 gap-6">
          <SelectCustom
            title="Ocupación"
            formvalue="financiera.occupation_id"
            category="occupation"
            control={control}
            register={register}
          />

          <SelectCustom
            title="Tipo de contrato"
            formvalue="financiera.contract_type_id"
            category="contract_type"
            control={control}
            register={register}
          />

          <Input
            type="number"
            label="Gastos mensuales"
            placeholder="Ingrese el valor de los gastos"
            color="secondary"
            {...register("financiera.monthly_expenses")}
          />
          <SelectCustom
            title="Nivel de educación"
            formvalue="financiera.education_level_id"
            category="education_level"
            control={control}
            register={register}
          />
        </div>
        <div className="flex flex-col w-100 gap-6">
          <RadioCustom formvalue="financiera.banked" control={control} radiolabel="¿Está bancarizado?" />
          <div className="bg-purple-100 rounded-lg px-4 py-1 text-purple-500 w-full size-xs">
            <label className="text-xs font-light text-purple-600">
              Antiguedad Laboral
            </label>
            <input
              type="date"
              className="w-full bg-transparent outline-none text-purple-600 placeholder-gray-400 text-sm"
              {...register("financiera.years_working")}
            />
          </div>
          <Input
            type="number"
            label="Ingresos mensuales"
            color="secondary"
            placeholder="Digite el valor de los ingresos"
            {...register("financiera.monthly_income")}
          />
          <Input
            type="number"
            label="Ahorros disponibles"
            color="secondary"
            placeholder="Digite el valor de los ahorros"
            {...register("financiera.savings")}
          />
        </div>
      </div>
    </div>
  )
}
export default ClienteFinances
