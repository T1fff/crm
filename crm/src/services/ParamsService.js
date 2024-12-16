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

export const fetchParametersByCategories = async (categories) => {
  const { data, error } = await supabase
    .from("params")
    .select("*")
    .in("param_type", categories) 

  if (error) {
    throw new Error(error.message)
  }

  const groupedData = categories.reduce((acc, category) => {
    acc[category] = data.filter((item) => item.param_type === category)
    return acc
  }, {})

  return groupedData
}
