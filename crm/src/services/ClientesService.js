// src/services/clientsService.js

import { supabase } from "../supabaseCliente"

export const getClients = async () => {
  try {
    const { data, error } = await supabase.from("client_overview").select("*")

    if (error) throw error
    return data
  } catch (error) {
    console.error("Error fetching client overview data:", error.message)
    throw error
  }
}

export const fetchClientById = async (clientId) => {
  // Hacer la primera consulta para obtener los datos del cliente
  const { data: clientData, error: clientError } = await supabase
    .from("CLIENTS")
    .select("*")
    .eq("id", clientId)
    .single()

  if (clientError) {
    throw new Error(clientError.message)
  }

  if (!clientData) {
    throw new Error("Client not found")
  }

  // Hacer las consultas separadas para crédito, financiero y viabilidad
  const { data: creditData, error: creditError } = await supabase
    .from("CREDITO")
    .select("*")
    .eq("cliente_id", clientId)
    .maybeSingle()

  if (creditError) {
    throw new Error(creditError.message)
  }

  const { data: financieraData, error: financieraError } = await supabase
    .from("FINANCIERO")
    .select("*")
    .eq("cliente_id", clientId)
    .maybeSingle()

  if (financieraError) {
    throw new Error(financieraError.message)
  }

  const { data: viabilidadData, error: viabilidadError } = await supabase
    .from("VIABILIDAD")
    .select("*")
    .eq("cliente_id", clientId)
    .maybeSingle()

  if (viabilidadError) {
    throw new Error(viabilidadError.message)
  }

  return {
    client: clientData,
    credit: creditData,
    financiera: financieraData,
    viabilidad: viabilidadData,
  }
}

export const fetchClientHistory = async (clientId) => {
  const { data: historialData, error: historialError } = await supabase
    .from("cliente_historial")
    .select("*")
    .eq("cliente_id", clientId)
    .order("fecha", { ascending: false })

  if (historialError) {
    throw new Error(historialError.message)
  }

  return historialData
}

export const saveClient = async (clientData) => {
  const { id, ...data } = clientData

  let response
  if (id) {
    response = await supabase.from("CLIENTS").update(data).eq("id", id)
  } else {
    response = await supabase
      .from("CLIENTS")
      .insert([data])
      .select("id")
      .single()
  }
  if (response.error) throw new Error(response.error.message)

  return response.data ? response.data.id : null
}

export const saveCredit = async (creditData, cliente_id) => {
  let response

  if (cliente_id) {
    response = await supabase
      .from("CREDITO")
      .upsert([{ ...creditData, cliente_id }], { onConflict: ["cliente_id"] })
  } else {
    throw new Error(
      "El campo cliente_id es obligatorio para insertar o actualizar el registro."
    )
  }

  if (response.error) throw new Error(response.error.message)
  return response.data
}

export const saveFinanciero = async (financieraData, cliente_id) => {
  let response

  if (cliente_id) {
    response = await supabase
      .from("FINANCIERO")
      .upsert([{ ...financieraData, cliente_id }], {
        onConflict: ["cliente_id"],
      })
  } else {
    throw new Error(
      "El campo cliente_id es obligatorio para insertar o actualizar el registro."
    )
  }

  if (response.error) throw new Error(response.error.message)
  return response.data
}

export const saveViabilidad = async (viabilidadData, cliente_id) => {
  let response

  if (cliente_id) {
    response = await supabase
      .from("VIABILIDAD")
      .upsert([{ ...viabilidadData, cliente_id }], {
        onConflict: ["cliente_id"],
      })
  } else {
    throw new Error(
      "El campo cliente_id es obligatorio para insertar o actualizar el registro."
    )
  }

  if (response.error) throw new Error(response.error.message)
  return response.data
}

export const saveHistorial = async (historialData, cliente_id) => {
  if (!cliente_id) {
    throw new Error(
      "El campo cliente_id es obligatorio para insertar el registro."
    )
  }

  const response = await supabase
    .from("cliente_historial")
    .insert([{ ...historialData, cliente_id }])

  if (response.error) throw new Error(response.error.message)
  return response.data
}
