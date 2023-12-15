//libs
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useMemo } from "react"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import TableList from "components/TableList/TableList"
//utils 
import removeDuplicates from "utils/removeDuplicates"
//redux
import { fetchInventory, deleteInventory, setAsRecievedInventory } from "reduxFolder/slices/InventorySlice"
import { setInventoryTableSearchTerm, setInventoryTableFilterTerm, setInventoryTableSortTerm } from "reduxFolder/slices/TableFiltersSlice"
import { inventorySelector } from "reduxFolder/selectors"
import { setEditInventory } from "reduxFolder/slices/PagesStateSlice"
//styles
import { Container } from "./styles"
//types
import { RootStateType, AppDispatch, SearchTermType, FilterTermType, SortTermType, TableListProps } from "types/index"
//impages
import spiner from "assets/icons/spinner.svg"
import deleteIcon from "assets/icons/deleteIcon.svg"

const order = [
  'name',
  'description',
  'article',
  'supplier',
  'address',
  'available',
  'reserved',
  'units',
  'ordered',
  'received',
  'edit',
  'delete'],
  listType = "inventory",
  width = [180, 180, 88, 165, 228, 96, 96, 125, 105, 150, 130, 80]

const InventoryTable = () => {
  const filtredInvenrory = useSelector(inventorySelector)
  const inventory = useSelector((state: RootStateType) => state.Inventory.inventory)
  const fetchInventoryLoadingStatus = useSelector((state: RootStateType) => state.Inventory.fetchInventoryLoadingStatus)
  const changeInventoryLoadingStatus = useSelector((state: RootStateType) => state.Inventory.changeInventoryLoadingStatus)
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.inventorySearchTerm)
  const filterTerm = useSelector((state: RootStateType) => state.TableFilters.inventoryFilterValue)
  const sortTerm = useSelector((state: RootStateType) => state.TableFilters.inventorySortValue)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (!inventory.length) dispatch(fetchInventory())
    window.location.hash = ""
    return () => {
      window.location.hash = ""
    }
    // eslint-disable-next-line
  }, [])


  const names: TableListProps['names'] = useMemo(() => {
    return [
      {
        name: 'Materialname',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'name',
        setSort: (arg: SortTermType) => dispatch(setInventoryTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(inventory.map(({ name }) => ({ name: name, value: name }))),
        setOption: (arg: FilterTermType) => dispatch(setInventoryTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setInventoryTableSearchTerm(arg)),
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      "Beschreibung",
      {
        name: 'Artikel',
        keyName: 'article',
        sortTerm,
        options: inventory.map(({ article }) => ({ name: article, value: article })),
        setOption: (arg: FilterTermType) => dispatch(setInventoryTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setInventoryTableSearchTerm(arg)),
        search: true,
        placeholder: '0000'
      },
      {
        name: 'Lieferant',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'supplier',
        setSort: (arg: SortTermType) => dispatch(setInventoryTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(inventory.map(({ supplier }) => ({ name: supplier, value: supplier }))),
        setOption: (arg: FilterTermType) => dispatch(setInventoryTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setInventoryTableSearchTerm(arg)),
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      {
        name: 'Adresse',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'address',
        setSort: (arg: SortTermType) => dispatch(setInventoryTableSortTerm(arg)),
        sortTerm,
        options: removeDuplicates(inventory.map(({ address }) => ({ name: address, value: address }))),
        setOption: (arg: FilterTermType) => dispatch(setInventoryTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        setSearch: (arg: SearchTermType) => dispatch(setInventoryTableSearchTerm(arg)),
        search: true,
        placeholder: 'Adresse'
      },
      "Verfügbar",
      "Reserviert",
      {
        name: 'Einheiten',
        keyName: 'units',
        sortTerm,
        options: [{ name: 'Kilogram', value: "kg" }, { name: 'Liter', value: "l" }, { name: 'Meter', value: "m" }],
        setOption: (arg: FilterTermType) => dispatch(setInventoryTableFilterTerm(arg)),
        filterTerm,
      },
      "Bestellt",
      'Empfangen',
      'Bearbeiten',
      'Löschen'
    ]
    // eslint-disable-next-line
  }, [inventory, searchTerm, filterTerm, sortTerm])

  const mapedData = filtredInvenrory.map(item => ({
    ...item,
    name: {
      name: item.name,
      image: item.photo ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDQ6y6Zr7jnkPI8IYybZFXIvDhwZbnN2bSXkRGIEamMi69CFqHTDAGuaLX20k4-3vZwQ&usqp=CAU'
    },
    received: {
      name: item.received,
      onChange: () => {
        dispatch(setAsRecievedInventory({ id: [item.id] }))
      },
      disabled: !!!item.ordered || changeInventoryLoadingStatus === 'loading'
    },
    edit: {
      name: "Edit",
      onChange: () => {
        dispatch(setEditInventory(item.id));
        window.location.hash = "#changeInventory";
      }
    },
    delete: {
      name: deleteIcon,
      onChange: () => dispatch(deleteInventory(item.id))
    }
  }))

  const content = fetchInventoryLoadingStatus === "idle" ? <TableList listType={listType} order={order} names={names} width={width} data={mapedData} /> : null
  const error = fetchInventoryLoadingStatus === 'error' ? <ErrorMessage /> : null
  const loading = fetchInventoryLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

  return (
    <Container>
      {content}
      {error}
      {loading}
    </Container>
  )
}

export default InventoryTable