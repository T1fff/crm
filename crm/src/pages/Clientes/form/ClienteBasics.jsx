/* eslint-disable react/prop-types */
import { Input, Switch } from "@nextui-org/react"
import { SelectCustom } from "../../components/SelectCustom"
import { Controller } from "react-hook-form"

function ClienteBasics({ register, control }) {
  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 min-h-[550px] ">
        <div className="flex flex-col w-100 gap-6">
          <Input
            type="nombre"
            label="Nombre"
            placeholder="Ingrese el nombre"
            color="secondary"
            {...register("CLIENTS.name")}
          />
          <SelectCustom
            title="Tipo documento"
            formvalue="CLIENTS.document_type_id"
            category="document_type"
            control={control}
            register={register}
          />
          <Input
            type="text"
            label="Celular"
            placeholder="Ingrese el celular"
            {...register("CLIENTS.phone")}
            color="secondary"
          />
          <Input
            type="text"
            label="Ciudad"
            placeholder="Ingrese la ciudad"
            color="secondary"
            {...register("CLIENTS.residency")}
          />
          <Input
            type="number"
            label="Número de dependientes"
            placeholder="Ingrese el num de dependientes"
            color="secondary"
            {...register("CLIENTS.in_charge")}
          />
          <SelectCustom
            title="Grupo especial"
            formvalue="CLIENTS.minority_id"
            category="minority"
            control={control}
            register={register}
          />
          <Controller
            name="viabilidad.apply_subsidy"
            control={control}
            render={({ field }) => (
              <Switch
                {...field}
                size="md"
                color="secondary"
                isSelected={field.value}
              >
                Aplica a subsidio
              </Switch>
            )}
          />
        </div>
        <div className="flex flex-col w-100 gap-6">
          <div className="bg-purple-100 rounded-lg px-4 py-1 text-purple-500 w-full size-xs">
            <label className="text-xs font-light text-purple-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              color="secondary"
              className="w-full bg-transparent outline-none text-purple-700 placeholder-purple-400 text-sm"
              {...register("CLIENTS.date_birth")}
            />
          </div>
          <Input
            type="number"
            label="Número de documento"
            color="secondary"
            placeholder="Ingrese el num de documento"
            {...register("CLIENTS.document_number")}
          />
          <SelectCustom
            title="Género"
            formvalue="CLIENTS.gender_id"
            category="gender"
            register={register}
            control={control}
          />
          <SelectCustom
            title="Estado civil"
            formvalue="CLIENTS.marital_status_id"
            category="marital_status"
            register={register}
            control={control}
          />

          <Input
            type="email"
            label="Email"
            placeholder="Ingrese el email"
            color="secondary"
            {...register("CLIENTS.email")}
          />
          <Input
            type="text"
            label="Dirección"
            placeholder="Ingrese la dirección de residencia"
            color="secondary"
            {...register("CLIENTS.address")}
          />
        </div>
      </div>
    </div>
  )
}
export default ClienteBasics
