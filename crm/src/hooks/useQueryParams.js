import { useQuery } from "@tanstack/react-query"
import { fetchParametersByCategory } from "../services/ParamsService"

export const useParametersByCategory = (category) => {
  return useQuery({
    queryKey: ["parameters", category],
    queryFn: () => fetchParametersByCategory(category),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  })
}


