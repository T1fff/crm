import { Button, Card } from "@nextui-org/react"
import { Input } from "@nextui-org/react"
import { useEffect, useState } from "react"
import { FaEnvelope, FaLock, FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabaseCliente"
import { Bounce, toast, ToastContainer } from "react-toastify"
import useAuthStore from "../authStore"

function Auth() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const setAuthData = useAuthStore((state) => state.setAuthData)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthData(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthData(session)
    })

    return () => subscription.unsubscribe()
  }, [setAuthData])

  const handleLogin = async (event) => {
    event.preventDefault() // Evita el comportamiento por defecto del formulario
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error("Email o contraseña incorrectos.", {
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
    } else {
      toast.success("Inicio de sesión exitoso!", {
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
      navigate("/dashboard")
    }
  }

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div className=" h-screen w-full grid place-content-center bg-gradient-to-b from-purple-800 to-neutral-800 ">
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

      <Card className="py-20 px-24">
        <h2 className="text-3xl font-[600] text-center text-purple-900">
          Inicio de sesión
        </h2>
        <form
          onSubmit={handleLogin}
          className="container flex-column my-10 space-y-5"
        >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            color="secondary"
            startContent={
              <FaEnvelope className="text-purple-700 opacity-25 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            type="email"
            label="Email"
            variant={"underlined"}
            placeholder="Enter your email"
            classNames={{
              label: "text-purple-700 font-[700] ",
              inputWrapper:
                "border-b-1 border-purple-400 group-data-[focus=true]:border-purple-600",
              input: "placeholder:text-purple-800 text-purple-800 w-60",
            }}
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
            color="secondary"
            startContent={
              <FaLock className="text-purple-700 opacity-25 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
            }
            label="Password"
            placeholder="Enter your password"
            variant={"underlined"}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
                aria-label="toggle password visibility"
              >
                {isVisible ? (
                  <FaRegEyeSlash className="text-purple-800" />
                ) : (
                  <FaRegEye className="text-purple-800" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            classNames={{
              label: "text-purple-700 font-[700] ",
              inputWrapper:
                "border-b-1 border-purple-400 group-data-[focus=true]:border-purple-600",
              input: "placeholder:text-purple-800 text-purple-800",
            }}
          />
        </form>
        <Button
          className="bg-purple-800 w-full text-neutral-50"
          variant="solid"
          type="submit"
          onClick={handleLogin}
        >
          Login
        </Button>
      </Card>
      {/* <p className="text-neutral-50 self-bottom">Powered by TN Software Solutions</p> */}
    </div>
  )
}
export default Auth
