/* eslint-disable react/prop-types */
import { Card } from "@nextui-org/react"
import Nav from "./Nav"

function ContainerMain({
  icon,
  titulo,
  optional,
  children,
  specialStyles,
  otherDiv,
}) {
  return (
    <div className={`w-100 h-screen flex ${specialStyles}`}>
      <Nav />
      <Card className="w-full  m-10 gap-4">
        <div className="flex w-full">
          <div className="flex flex-col w-full p-10">
            <div className="flex justify-between mb-2">
              <div className="flex items-center gap-2">
                {icon}
                <h2 className="text-2xl font-semibold text-purple-900">
                  {titulo}
                </h2>
              </div>
              {optional}
            </div>
            {children}
          </div>
          {otherDiv}
        </div>
      </Card>
    </div>
  )
}
export default ContainerMain
