import React, { useEffect } from "react"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Spinner,
} from "@nextui-org/react"
import { FaChevronCircleDown, FaEye, FaPlus, FaSearch } from "react-icons/fa"
import ContainerMain from "../components/Container"
import { useNavigate } from "react-router-dom"
import { FaUsers } from "react-icons/fa6"
import { useClientsQuery } from "../../hooks/useQueryClientes"
import { Bounce, toast, ToastContainer } from "react-toastify"
import { DropdownCustom } from "../components/DropdownCustom"

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
}

const INITIAL_VISIBLE_COLUMNS = [
  "client_full_name",
  "occupation",
  "phone",
  "process_status",
  "subsidio",
  "credit_status_description",
  "actions",
]
const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NOMBRE", uid: "client_full_name", sortable: true },
  { name: "Ocupación", uid: "occupation", sortable: true },
  { name: "Celular", uid: "phone", sortable: true },
  { name: "Estado", uid: "process_status", sortable: true },
  { name: "Subsidio", uid: "subsidio", sortable: true },
  { name: "Sisben", uid: "sisben", sortable: true },
  { name: "Crédito", uid: "credit_status_description", sortable: true },
  { name: "", uid: "actions" },
]

const statusOptions = [
  {
    id: 12,
    param_type: "process_status",
    param_value: "PRIMERCONTACTO",
    description: "Primer contacto",
  },
  {
    id: 13,
    param_type: "process_status",
    param_value: "ESPERADESISBEN",
    description: "Espera de Sisben",
  },
  {
    id: 14,
    param_type: "process_status",
    param_value: "ESPERADEBANCO",
    description: "Espera de banco",
  },
  {
    id: 15,
    param_type: "process_status",
    param_value: "ESPERADECONSULTOR",
    description: "Espera de consultor",
  },
  {
    id: 16,
    param_type: "process_status",
    param_value: "FALTAINFORMACION",
    description: "Falta de información",
  },
]

export default function Clientes() {
  const navigate = useNavigate()
  const { data: clients, isLoading, error, refetch } = useClientsQuery()

  useEffect(() => {
    refetch()
  }, [refetch])

  const [filterValue, setFilterValue] = React.useState("")
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]))
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  )
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  useEffect(() => {
    // Define una función para actualizar rowsPerPage según el tamaño de la ventana
    const updateRowsPerPage = () => {
      if (window.innerHeight > 900 && window.innerHeight < 1200) {
        setRowsPerPage(14) // Cambia a 20 si el height es mayor a 900
      } else if (window.innerHeight > 1200) {
        setRowsPerPage(20) // Cambia a 20 si el height es mayor a 900
      } else {
        setRowsPerPage(10) // De lo contrario, se mantiene en 10
      }
    }

    // Llama a la función la primera vez que se carga el componente
    updateRowsPerPage()

    // Agrega un event listener para actualizar en caso de que la ventana cambie de tamaño
    window.addEventListener("resize", updateRowsPerPage)

    // Limpia el event listener al desmontar el componente
    return () => {
      window.removeEventListener("resize", updateRowsPerPage)
    }
  }, [])
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  })

  const [page, setPage] = React.useState(1)
  const pages = Math.ceil(clients?.length / rowsPerPage)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    )
  }, [visibleColumns])

  const filteredItems = React.useMemo(() => {
    let filteredUsers = []
    if (clients?.length > 0) {
      filteredUsers = [...clients]

      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) => {
          const lowerCaseFilterValue = filterValue.toLowerCase()
          const matchesName = user?.client_full_name
            ?.toLowerCase()
            .includes(lowerCaseFilterValue)
          const matchesPhone = user?.phone
            ?.toLowerCase()
            .includes(lowerCaseFilterValue)

          return matchesName || matchesPhone
        })
      }
      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions?.length
      ) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.process_status)
        )
      }
      return filteredUsers
    }
    return filteredUsers
  }, [clients, filterValue, statusFilter])

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column]
      const second = b[sortDescriptor.column]
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === "descending" ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey]

    switch (columnKey) {
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.process_status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        )
      case "actions":
        return (
          <div className=" flex justify-center items-center gap-2 w-1">
            {/* <Dropdown className="bg-background border-1 border-default-200">
              <DropdownTrigger>
                <Button isIconOnly radius="full" size="sm" variant="light">
                  <FaEllipsisVertical className="text-purple-400" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
            <Button
              radius="full"
              isIconOnly
              size="sm"
              variant="light"
              className="w-1"
              onClick={() => navigate(`/clientes/${user?.client_id}`)}
            >
              <FaEye className="text-purple-400" />
            </Button>
          </div>
        )
      default:
        return cellValue || <p className="text-gray-300 text-xs">-Sin asignar-</p>
    }
  })

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue("")
    }
  }, [])

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 mb-5">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1 border-purple-300 ",
              input: "placeholder:text-purple-700 opacity-50",
            }}
            placeholder="Busque por nombre o celular"
            size="sm"
            startContent={<FaSearch className="text-purple-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <DropdownCustom
              title={"Estado"}
              category={"process_status"}
              value={statusFilter}
              onChange={setStatusFilter}
            />
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<FaChevronCircleDown className="text-small" />}
                  size="sm"
                  variant="flat"
                  className="bg-purple-200 text-purple-800"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              className="bg-purple-900 text-background"
              onClick={() => navigate("/crear_cliente")}
              endContent={<FaPlus />}
              size="sm"
            >
              Agregar cliente
            </Button>
          </div>
        </div>
      </div>
    )
  }, [filterValue, onSearchChange, statusFilter, visibleColumns, navigate])

  const bottomContent = React.useMemo(() => {
    return (
      <div className="pt-2 px-2 flex justify-between items-center">
        <Pagination
          showControls
          classNames={{
            cursor: "bg-purple-900 text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-purple-700">
          {selectedKeys === "all"
            ? "Todos los items seleccionados"
            : `${selectedKeys.size} de ${items.length} seleccionados`}
        </span>
        <div className="flex justify-between items-center">
          <span className="text-purple-700 text-small">
            Total {clients?.length} clientes
          </span>
        </div>
      </div>
    )
  }, [
    hasSearchFilter,
    page,
    pages,
    selectedKeys,
    items.length,
    clients?.length,
  ])

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    []
  )

  return (
    <ContainerMain
      titulo={"Clientes"}
      icon={<FaUsers className="text-xl text-purple-900" />}
    >
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
      {clients && (
        <Table
          isCompact
          removeWrapper
          aria-label="Example table with custom cells, pagination and sorting"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          checkboxesProps={{
            classNames: {
              wrapper:
                "after:bg-foreground after:text-background text-background",
            },
          }}
          classNames={classNames}
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSelectionChange={setSelectedKeys}
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                allowsSorting={column.sortable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={
              "No hay clientes asociados con este parámetro de búsqueda."
            }
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item?.client_id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
      {isLoading && (
        <Spinner label="Cargando" color="secondary" labelColor="secondary" />
      )}
      {error &&
        toast.error("Error al consultar datos", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })}
    </ContainerMain>
  )
}
