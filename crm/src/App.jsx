import { NextUIProvider } from "@nextui-org/react"
import { useNavigate, useHref } from "react-router-dom"
import AppRoutes from "./AppRouter"
import "react-toastify/dist/ReactToastify.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

function App() {
  const navigate = useNavigate()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NextUIProvider navigate={navigate} useHref={useHref}>
          <AppRoutes />
        </NextUIProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
