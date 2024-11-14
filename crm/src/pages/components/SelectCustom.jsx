/* eslint-disable react/prop-types */

import { useController } from "react-hook-form"
import { useParametersByCategory } from "../../hooks/useQueryParams"
import { Select, SelectItem } from "@nextui-org/react"

export const SelectCustom = ({ title, formvalue, category, control, register, className, size, variant }) => {
  const { data } = useParametersByCategory(category)

  // Usamos useController para conectar el campo con React Hook Form
  const {
    field: { value },
  } = useController({
    name: formvalue, // Nombre del campo en el formulario
    control, // Control de React Hook Form
    defaultValue: null, // Si no hay valor inicial, se maneja aquí
  })

  return (
    <Select
      label={title}
      placeholder="Seleccione"
      color="secondary"
      className={className}
      size={size}
      variant={variant}
      defaultSelectedKeys={value ? [`${value}`] : []}
      {...register(`${formvalue}`)}
    >
      {data
        ?.sort((a, b) => a.description.localeCompare(b.description))
        .map((item) => (
          <SelectItem key={item.id} value={item.id}>
            {item.description}
          </SelectItem>
        ))}
    </Select>
  )
}
