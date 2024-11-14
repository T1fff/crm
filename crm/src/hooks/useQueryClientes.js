// src/hooks/useClientsQuery.js
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  fetchClientById,
  fetchClientHistory,
  getClients,
  saveClient,
  saveCredit,
  saveFinanciero,
  saveHistorial,
  saveViabilidad,
  // saveCredit,
} from "../services/ClientesService"
import useAuthStore from "../authStore"

export const useClientsQuery = () => {
  const { isAuthenticated } = useAuthStore()
  return useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    staleTime: 5 * 60 * 1000,
    enabled: isAuthenticated,
  })
}

export const useClientQuery = (clientId) => {
  return useQuery({
    queryKey: ["client", clientId],
    queryFn: () => fetchClientById(clientId),
    enabled: !!clientId,
  })
}

export const useClientQueryHistorial = (clientId) => {
  return useQuery({
    queryKey: ["clientHistory", clientId],
    queryFn: () => fetchClientHistory(clientId),
    enabled: !!clientId,
  })
}

export const useSaveClientAndCredit = () => {
  const mutation = useMutation({
    mutationFn: async ({ CLIENTS, credito, financiera, viabilidad }) => {
      try {
        const clientId = await saveClient(CLIENTS)
        if (CLIENTS.id) {
          await saveFinanciero(financiera, CLIENTS?.id)
          await saveCredit(credito, CLIENTS?.id)
          await saveViabilidad(viabilidad, CLIENTS?.id)
        }

        return { clientId, success: true }
      } catch (error) {
        console.error("Error en la mutación de cliente y crédito:", error)
        throw new Error(error.message)
      }
    },
  })

  return mutation
}

export const useSaveHistorial = () => {
  const mutation = useMutation({
    mutationFn: async (historialData) => {
      if (!historialData.cliente_id) {
        throw new Error("El campo cliente_id es obligatorio para el historial.")
      }

      // Llama al servicio saveHistorial con los datos del historial y el cliente_id
      return await saveHistorial(historialData, historialData.cliente_id)
    },
    onError: (error) => {
      console.error("Error al guardar el historial:", error)
    },
    onSuccess: (data) => {
    },
  })

  return mutation
}
