/* eslint-disable react/prop-types */
import { Button } from "@nextui-org/react"

import { FaBars, FaHome, FaUsers } from "react-icons/fa"
import { FaArrowRightFromBracket, FaX } from "react-icons/fa6"
import { NavLink } from "react-router-dom"
import { createContext, useContext } from "react"
import useNavStore from "../../stores/navStore"
import { useAuth } from "../../AuthProvider"
import useAuthStore from "../../authStore"
const SidebarContext = createContext()
const Nav = () => {
  const expanded = useNavStore((sts) => sts.expanded)
  const setExpanded = useNavStore((sts) => sts.setExpanded)
  const user = useAuthStore(sts => sts.user.user)
  const { signOut } = useAuth()

  const handleToggle = () => {
    setExpanded(!expanded) // Alterna el estado de expansión
  }

  return (
    <aside className="h-screen">
      <nav
        className={`h-full ${
          expanded && "w-52"
        }  flex flex-col bg-white backdrop-blur-xl border-r shadow-sm`}
      >
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
            alt=""
          />
          <button
            onClick={handleToggle}
            className={`p-1.5 rounded-lg ${!expanded && "mx-auto"}`}
          >
            {expanded ? <FaX /> : <FaBars />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 mt-10">
            <SidebarItem
              icon={<FaHome size={20} />}
              text={"Home"}
              to="/dashboard"
            />
            <SidebarItem
              icon={<FaUsers size={20} />}
              text={"Clientes"}
              to="/clientes"
            />
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3">
          <div
            className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
          >
            <div className="leading-4">
              <h4 className="font-semibold">Usuario</h4>
              <span className="text-xs text-gray-600">{user?.email || "USUARIO"}</span>
            </div>
            {expanded && (
              <Button onClick={signOut} isIconOnly className="bg-transparent">
                <FaArrowRightFromBracket className="text-xl hover:text-purple-800"></FaArrowRightFromBracket>
              </Button>
            )}
          </div>
        </div>
      </nav>
    </aside>
  )
}
export default Nav

export const SidebarItem = ({ icon, text, to, alert, active }) => {
  const { expanded } = useContext(SidebarContext) // Si usas el contexto para el estado de expansión

  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-purple-200 to-purple-100 text-purple-800"
            : "hover:bg-purple-50 text-gray-600"
        }
      `}
    >
      {/* NavLink con clases basadas en su estado */}
      <NavLink
        to={to}
        className={({ isActive, isPending }) => `
          flex items-center gap-2 transition-colors
          ${
            isPending
              ? "text-gray-400"
              : isActive
              ? "font-bold text-purple-800"
              : "text-gray-600"
          }
        `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
      </NavLink>

      {/* Alerta si está activa */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-purple-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}

      {/* Tooltip cuando no está expandido */}
      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-purple-100 text-purple-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-50
          `}
        >
          {text}
        </div>
      )}
    </li>
  )
}

// ;<Sidebar
//   className="bg-violet-950"
//   rootStyles={{
//     backgroundColor: "rgba(45, 45, 45, 0.40)",
//     color: "#f4f4f4",
//   }}
//   backgroundColor="rgba(45, 45, 45, 0.10)"
//   collapsed={collapsed}
// >
//   <div className="h-full flex flex-col justify-between">
//     <button onClick={toggleSidebar}>Toggle Sidebar</button>
//     <div className="flex flex-col">
//       <Card className="bg-neutral-50 opacity-25 m-4 p-4 grid grid-cols-5 gap-4 place-content-center mt-10">
//         <FaUser className="text-neutral-900 text-2xl self-center"></FaUser>
//         <div className="text-xs col-span-4">
//           <p>Correo electronico</p>
//           <p>Admin</p>
//         </div>
//       </Card>
//       <Menu iconShape="round" className="p-10">
{
  /* <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                `${
                  isPending ? "text-gray-400" : isActive ? "font-bold" : ""
                } hover:font-bold transition hover:duration-150 duration-0 ease-in-out font-normal`
              }
            >
              <div className="flex flex-row gap-2 pt-6 hover:scale-105 transition-transform duration-200">
                <FaHome className="text-xl"></FaHome>
                <p>Home</p>
              </div>
            </NavLink>
            <NavLink
              to="/clientes"
              className={({ isActive, isPending }) =>
                `${isPending ? "text-gray-400" : isActive ? "font-bold" : ""} `
              }
            >
              <div className="flex flex-row gap-2 pt-6 hover:scale-105 transition-transform duration-200 ">
                <FaUsers className="text-xl"></FaUsers>
                <p>Cliente</p>
              </div>
            </NavLink></Menu> */
}
//     </div>
//     <Button
//       onClick={signOut}
//       className="bg-transparent text-neutral-50 flex flex-row gap-2 p-6 hover:scale-105 transition-transform duration-200 mb-16"
//     >
//       <FaArrowRightFromBracket className="text-xl"></FaArrowRightFromBracket>
//       <p>Cerrar sesión</p>
//     </Button>
//   </div>
// </Sidebar>
