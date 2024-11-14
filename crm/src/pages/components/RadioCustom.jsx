/* eslint-disable react/prop-types */
import { cn, Radio, RadioGroup } from "@nextui-org/react"
import { Controller } from "react-hook-form"

export const RadioCustom = ({ formvalue, control, radiolabel }) => {
  return (
    <Controller
      name={formvalue}
      control={control}
      render={({ field }) => (
        <RadioGroup
          label={radiolabel}
          className="w-1/2 flex"
          orientation="horizontal"
          classNames={{
            label: "text-purple-900  text-sm",
            wrapper: "flex flex-row gap-4",
            base: cn("data-[selected=true]:border-purple-950"),
          }}
          {...field}
          defaultValue={field.value}
          color="secondary"
        >
          <Radio value="true">Si</Radio>
          <Radio value="false">No</Radio>
        </RadioGroup>
      )}
    />
  )
}
