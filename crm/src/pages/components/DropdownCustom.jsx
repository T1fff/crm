/* eslint-disable react/prop-types */
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react"
import { FaChevronCircleDown } from "react-icons/fa"

export const DropdownCustom = ({ title, value, onChange, data }) => {
  return (
    <Dropdown>
      <DropdownTrigger className="hidden sm:flex">
        <Button
          endContent={
            <FaChevronCircleDown className="text-small bg-purple-200" />
          }
          size="sm"
          variant="flat"
          className="bg-purple-200 text-purple-800"
        >
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        closeOnSelect={false}
        selectedKeys={value}
        selectionMode="multiple"
        onSelectionChange={onChange}
        items={data || []}
      >
        {(item) => (
          <DropdownItem key={item?.description}>
            {item?.description}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  )
}
