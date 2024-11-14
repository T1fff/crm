/* eslint-disable react/prop-types */
import { Input } from "@nextui-org/react"
import { SelectCustom } from "../../components/SelectCustom"

function ClienteCredit({ register, control }) {

  return (
    <div className="my-4 flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 min-h-[550px] ">
        <div className="flex flex-col w-100 gap-6">
          <SelectCustom
            title="Tipo crédito"
            formvalue="credito.credit_type_id"
            category="credit_type"
            register={register}
            control={control}
          />
          <SelectCustom
            title="Estado del crédito"
            formvalue="credito.credit_status_id"
            category="credit_status"
            register={register}
            control={control}
          />

          <Input
            type="number"
            label="Monto del crédito"
            placeholder="Ingrese el monto del crédito"
            {...register("credito.loan_amount")}
            color="secondary"
          />
          <Input
            type="text"
            label="Institución financiera"
            placeholder="Ingrese el banco"
            {...register("credito.bank")}
            color="secondary"
          />
          {/* <SelectCustom
            title="Institución financiera"
            formvalue="bank"
            category="bank"
            initialValue={data?.bank}
            register={register}
          /> */}
        </div>
        <div className="flex flex-col w-100 gap-6"></div>
      </div>
    </div>
  )
}
export default ClienteCredit
