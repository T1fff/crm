import { useQuery } from "@tanstack/react-query"
import { fetchParametersByCategories, fetchParametersByCategory } from "../services/ParamsService"

export const useParametersByCategory = (category) => {
  return useQuery({
    queryKey: ["parameters", category],
    queryFn: () => fetchParametersByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  })
}


export const useParametersByCategories = ({ categories, options = {} }) => {
  return useQuery({
    queryKey: ["parametersByCategories", categories],
    queryFn: () => fetchParametersByCategories(categories),
    enabled: !!categories?.length, 
    ...options,
  })
}

