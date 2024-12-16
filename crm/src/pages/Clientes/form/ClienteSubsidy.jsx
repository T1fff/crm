/* eslint-disable react/prop-types */
import { cn, Radio, RadioGroup } from "@nextui-org/react"
import { Controller } from "react-hook-form"
import { SelectCustom } from "../../components/SelectCustom"

function ClienteSubsidy({ register, control, options }) {
  const resultado = "Aprobado"
  const apply = control._formValues.viabilidad.apply_subsidy
  return apply ? (
    <>
      <div className="my-4 flex flex-col gap-4">
        <div className="flex flex-col gap-4 min-h-[550px] ">
          <div className="flex flex-row w-100 gap-6">
            <SelectCustom
              title="Tipo de contrato"
              formvalue="viabilidad.subsidy_type_id"
              data={options?.subsidy_type}
              control={control}
              register={register}
            />

            <Controller
              name="viabilidad.concurrent_subsidy"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Subsidio concurrente"
                  className="w-1/2 flex"
                  orientation="horizontal"
                  classNames={{
                    label: "text-purple-900 text-sm",
                    wrapper: "flex flex-row gap-4",
                    base: cn("data-[selected=true]:border-purple-950"),
                  }}
                  {...field}
                  color="secondary"
                >
                  <Radio value="true">Si</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              )}
            />
          </div>

          <div className=" w-full bg-purple-100 rounded-md my-6 p-2 text-purple-700">
            Viabilidad: <span className="font-semibold">{resultado}</span>
          </div>

          <div className="flex flex-row w-100 gap-6">
            <Controller
              name="viabilidad.vivienda"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Vivienda propia"
                  className="w-1/2 flex"
                  orientation="horizontal"
                  classNames={{
                    label: "text-purple-900 text-sm",
                    wrapper: "flex flex-row gap-4",
                    base: cn("data-[selected=true]:border-purple-950"),
                  }}
                  {...field}
                  color="secondary"
                >
                  <Radio value="true">Si</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              )}
            />
            <Controller
              name="viabilidad.reports"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Reportes negativos"
                  className="w-1/2 flex"
                  orientation="horizontal"
                  classNames={{
                    label: "text-purple-900 text-sm",
                    wrapper: "flex flex-row gap-4",
                    base: cn("data-[selected=true]:border-purple-950"),
                  }}
                  {...field}
                  color="secondary"
                >
                  <Radio value="true">Si</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              )}
            />
          </div>
          <div className="flex flex-row w-100 gap-6 mt-6">
            <Controller
              name="viabilidad.approved_credit"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Crédito aprobado"
                  className="w-1/2 flex"
                  orientation="horizontal"
                  classNames={{
                    label: "text-purple-900  text-sm",
                    wrapper: "flex flex-row gap-4",
                    base: cn("data-[selected=true]:border-purple-950"),
                  }}
                  {...field}
                  color="secondary"
                >
                  <Radio value="true">Si</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              )}
            />
            <SelectCustom
              title="SISBEN"
              formvalue="viabilidad.sisben_id"
              data={options?.sisben_group}
              control={control}
              register={register}
            />
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className="min-h-[550px] text-purple-700">No aplica para subsidio</p>
  )
}
export default ClienteSubsidy
