//libs
import { FC, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
//components
import { ReactComponent as CheckBoxIcon } from "assets/icons/checkboxCalendar.svg"
import { ReactComponent as DropdownIcon } from "assets/icons/dropdown.svg"
//styles
import {
  Checkbox,
  Container,
  FiltersWrapper,
  Search,
  SearchWrapper,
} from "components/Calendar/CalendarHeader/styles"
//hooks
import { useDebounce } from "hooks/useDebounce"
import { useActions } from "hooks/useActions"
//redux
import { useSelector } from "react-redux"
//types
import { RootStateType } from "types"
import moment from "moment";

type FormValues = {
  search: string
  clients: string[] | []
  // period: string
  date: string
  clientsFilter: string
}

const CalendarHeader: FC = () => {
  const currentDate = useSelector(
    (state: RootStateType) => state.Calendar.currentDate
  )
  const customers = useSelector((state: RootStateType) => state.Calendar.customers)

  const [isClientCheckBoxOpen, setIsClientCheckBoxOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (isClientCheckBoxOpen && e.target.closest("#customersFilter") === null) {
        if (e.target.closest(".selectWrapper")) return
        setIsClientCheckBoxOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [isClientCheckBoxOpen])

  const defaultValues: FormValues = {
    search: "",
    clients: [],
    clientsFilter: "",
    date: currentDate,
  }
  const { register, watch } = useForm<FormValues>({ defaultValues: defaultValues })

  const watchFields = watch()

  const { setCurrentDate, setCustomersFilter, setCalendarSearch } = useActions()

  const debouncedSearch = useDebounce(watchFields.search, 500)
  useEffect(() => {
    setCalendarSearch(debouncedSearch)
    // eslint-disable-next-line
  }, [debouncedSearch])

  useEffect(() => {
    setCustomersFilter(watchFields.clients)
    // eslint-disable-next-line
  }, [watchFields.clients])

  const debouncedCustomersSearch = useDebounce(watchFields.clientsFilter, 500)
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().startsWith(debouncedCustomersSearch.trim().toLowerCase())
  )
  const Clients = filteredCustomers.map((client, i) => (
    <label key={i}>
      <input {...register("clients")} type="checkbox" value={client.id} />
      {client.name}
    </label>
  ))

  return (
    <Container>
      <SearchWrapper>
        <Search {...register("search")} placeholder="Suchen" />
      </SearchWrapper>
      <FiltersWrapper>
        <Checkbox id="customersFilter">
          <p
            onClick={() => setIsClientCheckBoxOpen((prev) => !prev)}
            className="title"
          >
            Alle
            <CheckBoxIcon
              className={isClientCheckBoxOpen ? "rotate" : ""}
              alt="dropdown"
            />
          </p>
          {isClientCheckBoxOpen && (
            <div className="selectWrapper">
              <input
                type="text"
                placeholder="Geben Sie den Namen"
                {...register("clientsFilter")}
              />
              {Clients}
            </div>
          )}
        </Checkbox>
        <Checkbox>
          <p className="title">
            <DropdownIcon className={"dropdown"} alt="dropdown"
              onClick={() => setCurrentDate(moment(currentDate).subtract(1, 'days').format('YYYY-MM-DD'))}
            />
            <input
              type="date"
              value={currentDate}
              onChange={(e) => setCurrentDate(e.target.value)}
            />
            <DropdownIcon className={"dropdown"} alt="dropdown"
              onClick={() => setCurrentDate(moment(currentDate).add(1, 'days').format('YYYY-MM-DD'))}
            />
          </p>
        </Checkbox>
      </FiltersWrapper>
    </Container>
  )
}

export default CalendarHeader
