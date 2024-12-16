/* eslint-disable react/prop-types */

import { useController } from "react-hook-form"
import { Select, SelectItem } from "@nextui-org/react"

export const SelectCustom = ({
  title,
  formvalue,
  data,
  control,
  register,
  className,
  size,
  variant,
}) => {

  const {
    field: { value },
  } = useController({
    name: formvalue, 
    control, 
    defaultValue: null, 
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
