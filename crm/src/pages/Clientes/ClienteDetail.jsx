/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Spinner, Tab, Tabs } from "@nextui-org/react"
import ContainerMain from "../components/Container"
import { FaUser } from "react-icons/fa6"
import ClienteBasics from "./form/ClienteBasics"
import ClienteFinances from "./form/ClienteFinances"
import ClienteSubsidy from "./form/ClienteSubsidy"
import ClienteCredit from "./form/ClienteCredit"
import ClientePreferences from "./form/ClientPreferences"
import ClientHistory from "./ClientHistory"
import {
  useClientQuery,
  useClientQueryHistorial,
  useSaveClientAndCredit,
} from "../../hooks/useQueryClientes"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { SelectCustom } from "../components/SelectCustom"
import { useParametersByCategories } from "../../hooks/useQueryParams"

const ClienteDetail = () => {
  const navigate = useNavigate()
  const { clientId } = useParams()
  const { data, isLoading } = useClientQuery(clientId)
  const { refetch } = useClientQueryHistorial(clientId)

  const [isSaving, setIsSaving] = useState(false)
  const { register, reset, handleSubmit, control } = useForm({
    defaultValues: {
      CLIENTS: {
        ...data?.client,
        name: null,
        document_type_id: null,
        phone: null,
        residency: null,
        in_charge: null,
        date_birth: null,
        document_number: null,
        gender_id: null,
        marital_status_id: null,
        email: null,
        address: null,
        process_status_id: 12,
        minority_id: null,
      },
      financiera: {
        occupation_id: null,
        contract_type_id: null,
        monthly_expenses: null,
        education_level_id: null,
        years_working: null,
        monthly_income: null,
        savings: null,
        banked: null,
      },
      credito: {
        credit_type_id: null,
        credit_status_id: null,
        loan_amount: null,
        bank: null,
      },
      viabilidad: {
        apply_subsidy: null,
        concurrent_subsidy: null,
        reports: null,
        vivienda: null,
        sisben_id: null,
        subsidy_type_id: null,
        approved_credit: null,
      },

      vivienda: data?.vivienda || {},
    },
  })

  const { mutate, error, isSuccess } = useSaveClientAndCredit()
  const categories = [
    "process_status",
    "document_type",
    "minority",
    "gender",
    "marital_status",
    "credit_type",
    "credit_status",
    "occupation",
    "contract_type",
    "education_level",
    "bank",
    "subsidy_type",
  ]

  const {
    data: options,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useParametersByCategories({ categories })

  useEffect(() => {
    if (data) {
      reset({
        CLIENTS: data?.client,
        financiera: data?.financiera,
        viabilidad: data?.viabilidad,
        vivienda: data?.vivienda,
        credito: data?.credit,
      })
    }
  }, [data, reset])

  const onSubmit = (formData) => {
    const defaultValues = {
      CLIENTS: {
        ...data?.client,
        name: null,
        document_type_id: null,
        phone: null,
        residency: null,
        in_charge: null,
        date_birth: null,
        document_number: null,
        gender_id: null,
        marital_status_id: null,
        email: null,
        address: null,
        process_status_id: "12",
        minority_id: null,
      },
      financiera: {
        occupation_id: null,
        contract_type_id: null,
        monthly_expenses: null,
        education_level_id: null,
        years_working: null,
        monthly_income: null,
        savings: null,
        banked: null,
      },
      credito: {
        credit_type_id: null,
        credit_status_id: null,
        loan_amount: null,
        bank: null,
      },
      viabilidad: {
        apply_subsidy: null,
        concurrent_subsidy: null,
        reports: null,
        vivienda: null,
        sisben_id: null,
        subsidy_type_id: null,
        approved_credit: null,
      },
    }

    setIsSaving(true)
    const parsedData = Object.keys(defaultValues).reduce((acc, section) => {
      acc[section] = Object.keys(defaultValues[section]).reduce(
        (sectionAcc, key) => {
          sectionAcc[key] = formData[section]?.[key] ?? null
          return sectionAcc
        },
        {}
      )
      return acc
    }, {})
    const { CLIENTS, credito, financiera, viabilidad } = parsedData
    mutate(
      { CLIENTS, credito, financiera, viabilidad },
      {
        onSuccess: (data) => {
          if (!clientId && data.clientId) {
            navigate(`/clientes/${data.clientId}`)
          }
          refetch()
          setIsSaving(false)
        },
        onError: (error) => {
          setIsSaving(false)
        },
      }
    )
  }

  const onError = (errors, e) => console.log(errors, e)

  useEffect(() => {
    if (isSaving) {
      toast.info("Guardando datos, por favor espere...", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
    if (error) {
      toast.error(`Error al guardar: ${error.message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
    if (isSuccess) {
      toast.success("Datos guardados exitosamente", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
    }
  }, [isLoading, error, isSuccess])

  return (
    <>
      <ContainerMain
        titulo={"Detalle de cliente"}
        icon={<FaUser className="text-xl text-purple-900" />}
        optional={
          <>
            <SelectCustom
              title="Estado"
              formvalue="CLIENTS.process_status_id"
              data={options?.process_status}
              className={"w-1/4 text-xs"}
              size={"sm"}
              variant={"bordered"}
              control={control}
              register={register}
            />
          </>
        }
        otherDiv={<ClientHistory />}
      >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
        <div className="flex flex-col mt-4">
          {isLoading || isSaving ? (
            <Spinner
              label="Cargando"
              color="secondary"
              labelColor="secondary"
            />
          ) : (
            <form onSubmit={handleSubmit(onSubmit, onError)}>
              <Tabs
                fullWidth
                aria-label="client-form"
                classNames={{
                  tabList:
                    "gap-6 w-full relative rounded p-0 border-divider bg-purple-50 ",
                  cursor: "w-full bg-purple-200 ",
                  tab: "h-12 hover-bg-purple-900",
                  tabContent: "group-data-[selected=true]:text-purple-900 ",
                }}
                disabledKeys={
                  data ? [] : ["credito", "financiera", "subsidio", "vivienda"]
                }
              >
                <Tab key="basica" title="Información Básica">
                  <ClienteBasics
                    register={register}
                    control={control}
                    options={options}
                  />
                </Tab>
                <Tab key="financiera" title="Financiera">
                  <ClienteFinances
                    register={register}
                    control={control}
                    options={options}
                  />
                </Tab>
                <Tab key="subsidio" title="Subsidio">
                  <ClienteSubsidy
                    register={register}
                    control={control}
                    options={options}
                  />
                </Tab>
                <Tab key="credito" title="Crédito">
                  <ClienteCredit
                    register={register}
                    control={control}
                    options={options}
                  />
                </Tab>
                <Tab key="vivienda" title="Vivienda">
                  <ClientePreferences
                    register={register}
                    control={control}
                    options={options}
                  />
                </Tab>
              </Tabs>
              <div className="flex justify-between w-100 ">
                <Button
                  variant="contained"
                  size="sm"
                  type="button"
                  onClick={() => navigate("/clientes")}
                  className="w-1/6"
                >
                  <div className="flex items-center text-purple-900 gap-2">
                    <FaArrowLeft className="text-xl" />
                    Volver
                  </div>
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="w-1/6"
                  color="secondary"
                >
                  Enviar
                </Button>
              </div>
            </form>
          )}
        </div>
      </ContainerMain>
    </>
  )
}

export default ClienteDetail
