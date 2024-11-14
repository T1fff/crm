import { supabase } from "../supabaseCliente"

export const fetchParametersByCategory = async (category) => {
  const { data, error } = await supabase
    .from("params")
    .select("*")
    .eq("param_type", category)

  if (error) {
    throw new Error(error.message)
  }

  return data
}
