/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSaveHistorial } from "../../../hooks/useQueryClientes"
import { useParams } from "react-router-dom"

export const InteractionsModal = ({ isOpen, onOpenChange, refetch }) => {
  const { clientId } = useParams()
  const { register, handleSubmit, reset } = useForm()
  const userId = JSON.parse(localStorage.getItem("user"))?.user?.id
  const { mutate } = useSaveHistorial()
  const onSubmit = (formData) => {
    const historialData = {
      ...formData,
      accion: formData.accion || null,
      cliente_id: clientId,
      usuario_responsable: userId,
      fecha: new Date().toISOString(),
    }

    mutate(historialData, {
      onSuccess: () => {
        refetch()
      },
      onError: (error) => {
        console.error("Error al guardar el historial:", error.message)
      },
    })
  }

  const onError = (errors, e) => console.log(errors, e)

  useEffect(() => {
    reset({
      accion: null,
      cliente_id: clientId,
      usuario_responsable: userId,
      fecha: new Date().toISOString(),
    })
  }, [reset])

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-purple-800">
              Añadir comentario
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Textarea
                  type="text"
                  label="Comentario adicional"
                  placeholder="Ingrese un comentario"
                  {...register("accion")}
                  color="secondary"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="secondary"
                type="submit"
                onClick={handleSubmit(onSubmit, onError)}
                onPress={onClose}
              >
                Enviar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
