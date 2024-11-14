import { Button, useDisclosure } from "@nextui-org/react"
import { useState } from "react"
import { FaPlusCircle } from "react-icons/fa"
import { RiHistoryLine } from "react-icons/ri"
import { InteractionsModal } from "./form/InteractionsModal"
import { useParams } from "react-router-dom"
import { useClientQueryHistorial } from "../../Hooks/useQueryClientes"

const ClientHistory = () => {
  const { clientId } = useParams()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  const {
    data,
    isLoading: isLoadingHistorial,
    refetch,
  } = useClientQueryHistorial(clientId)

  const history = data

  const filteredHistory = history?.filter((item) => {
    const itemDate = new Date(item?.fecha)
    const start = startDate ? new Date(startDate) : null
    const end = endDate ? new Date(endDate) : null
    if (start && end) {
      return itemDate >= start && itemDate <= end
    }

    if (start) {
      return itemDate >= start
    }

    if (end) {
      return itemDate <= end
    }

    return true
  })

  function parseISODate(isoDate) {
    const date = new Date(isoDate)

    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",

      hour12: false, // Para usar AM/PM
      timeZone: "UTC",
    }

    return new Intl.DateTimeFormat("es-ES", options).format(date) || "NA"
  }
  return (
    <>
      <InteractionsModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        refetch={refetch}
      />
      <div className="bg-purple-200 p-10 px-5 w-2/6 h-screen  ">
        <div className="flex justify-between items-center  mb-8">
          <div className="flex gap-2">
            <RiHistoryLine className="text-purple-900 text-xl " />
            <h2 className="font-semibold text-purple-900">
              Historial de cliente
            </h2>
          </div>
          {clientId && (
            <Button
              isIconOnly={true}
              onPress={onOpen}
              className="w-fit h-fit bg-transparent"
            >
              <FaPlusCircle className="text-purple-900 text-xl " />
            </Button>
          )}
        </div>
        <div className="flex gap-4 mb-6">
          <div className="flex bg-[rgba(255,255,255,0.3)] rounded-md py-1 flex-col">
            <label
              className="ml-2 font-semibold text-purple-800 text-xs"
              htmlFor=""
            >
              Desde
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-transparent text-xs text-purple-800 p-2 rounded-md"
            />
          </div>
          <div className="flex bg-[rgba(255,255,255,0.3)] rounded-md py-1 flex-col">
            <label
              className="ml-2 font-semibold text-purple-800 text-xs"
              htmlFor=""
            >
              Hasta
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-transparent text-xs text-purple-800 p-2 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col h-5/6 overflow-scroll hover:overflow-scroll scroll-smooth scrollbar-thumb-rounded-full scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-purple-200 scrollbar">
          {filteredHistory?.length > 0 && !isLoadingHistorial ? (
            filteredHistory?.map((item, index) => (
              <div
                key={index}
                className="flex border-solid border-purple-400 border flex-col p-3 my-2 rounded-md ml-2"
              >
                <p className="text-sm text-purple-900 font-semibold text-lg mb-1">
                  {item?.accion}
                </p>

                <div className="flex gap-2 justify-between font-semibold opacity-75 mt-1 text-xs">
                  <p className="text-purple-900  ">
                    {item?.usuario_responsable || "NA"}
                  </p>

                  <p className="text-purple-900 ">
                    {parseISODate(item?.fecha)}
                  </p>
                </div>
              </div>
            ))
          ) : isLoadingHistorial ? (
            <p className="text-purple-900 opacity-50 text-xs text-center">
              Cargando...
            </p>
          ) : (
            <p className="text-purple-900 opacity-50 text-xs text-center">
              No hay interacciones en el historial
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default ClientHistory
