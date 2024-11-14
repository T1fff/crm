import { Button, Select, SelectItem } from "@nextui-org/react"
import { useForm } from "react-hook-form"

function ClientePreferences() {
  const { register, handleSubmit } = useForm()
  const animals = [
    { key: "cat", label: "Cat" },
    { key: "dog", label: "Dog" },
    { key: "elephant", label: "Elephant" },
  ]

  const onSubmit = (data) => console.log(data)
  return (
    <div className="my-4 flex flex-col gap-4">
      <div
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 min-h-[550px] "
      >
        <div className="flex flex-col w-100 gap-6">
          <Select
            label="Inmuebles separados"
            placeholder="Seleccione"
            className="m"
            {...register("tipo_credito")}
            color="secondary"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <Select
            label="Estado de separación del inmueble"
            placeholder="Seleccione"
            className="m"
            {...register("estado_aprobacion")}
            color="secondary"
          >
            {animals.map((animal) => (
              <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
          <div className="bg-purple-100 rounded-lg px-4 py-1 text-gray-500 w-full size-xs">
            <label className="text-xs font-light text-purple-600">
              Antiguedad Laboral
            </label>
            <input
              type="date"
              className="w-full bg-transparent outline-none text-purple-500 placeholder-gray-400 text-sm"
              {...register("antiguedad")}
            />
          </div>
        </div>
        <div className="flex flex-col w-100 gap-6"></div>
      </div>

    </div>
  )
}
export default ClientePreferences
