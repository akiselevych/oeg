//libs
import { FC, useEffect, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
//components
import TableList from "components/TableList/TableList"
//redux
import { fetchInventory } from "reduxFolder/slices/InventorySlice"
import { changePositionItem } from "reduxFolder/slices/ProjectPropositionSlice"
import { pickArticelInventorySelector } from "reduxFolder/selectors"
import { setPickArticleTableGeneralSearchTerm, setPickArticleTableTableFilterTerm, setPickArticleTableTableSearchTerm, setPickArticleTableTableSortTerm } from "reduxFolder/slices/TableFiltersSlice"
//types
import { RootStateType, TableListProps, AppDispatch } from "types/index"
//styles
import { Container } from "./styles"
import { PrimaryButton, SearchInput } from "styles/global"

const order = ['name', 'article', 'supplier', 'add'],
  listType = "PickArticleTable",
  width = [180, 110, 165, 135]

const PickArticleWindow: FC<{ itemId: string | number | null, onSubmit: (arg: any) => void, addedIds: (string | number)[] }> = ({ itemId, onSubmit, addedIds }) => {
  const dispatch = useDispatch<AppDispatch>()
  const materials = useSelector((state: RootStateType) => state.Inventory.inventory)
  const filteredMaterials = useSelector(pickArticelInventorySelector)
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.pickArticleTableSearchTerm)
  const generalSearchTerm = useSelector((state: RootStateType) => state.TableFilters.pickArticleTableGeneralSearchTerm)
  const filterTerm = useSelector((state: RootStateType) => state.TableFilters.pickArticleTableFilterValue)
  const sortTerm = useSelector((state: RootStateType) => state.TableFilters.pickArticleTableSortValue)

  useEffect(() => {
    if (!materials.length) dispatch(fetchInventory())
    // eslint-disable-next-line
  }, [])

  const names: TableListProps['names'] = useMemo(() => {
    return [
      {
        name: 'Werkstoff Name', sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'name',
        setSort: (arg) => dispatch(setPickArticleTableTableSortTerm(arg)),
        sortTerm,
        options: materials.map(({ name }) => ({ name: name, value: name })),
        filterTerm,
        setSearch: (arg) => dispatch(setPickArticleTableTableSearchTerm(arg)),
        setOption: (arg) => dispatch(setPickArticleTableTableFilterTerm(arg)),
        search: true,
        searchTerm,
        placeholder: 'Geben Sie den Namen'
      },
      {
        name: 'Artikel',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'article',
        setSort: (arg) => dispatch(setPickArticleTableTableSortTerm(arg)),
        sortTerm,
        options: materials.map(({ article }) => ({ name: article, value: article })),
        setSearch: (arg) => dispatch(setPickArticleTableTableSearchTerm(arg)),
        setOption: (arg) => dispatch(setPickArticleTableTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        search: true,
        placeholder: '0000'
      },
      {
        name: 'Lieferant',
        sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
        keyName: 'supplier',
        setSort: (arg) => dispatch(setPickArticleTableTableSortTerm(arg)),
        sortTerm,
        options: materials.map(({ supplier }) => ({ name: supplier, value: supplier })),
        setSearch: (arg) => dispatch(setPickArticleTableTableSearchTerm(arg)),
        setOption: (arg) => dispatch(setPickArticleTableTableFilterTerm(arg)),
        filterTerm,
        searchTerm,
        search: true,
        placeholder: 'Geben Sie den Namen'
      },
      'Hinzufügen',
    ]
    // eslint-disable-next-line
  }, [[searchTerm, filterTerm, sortTerm, materials]])

  const setArticle = (id: string | number) => {
    onSubmit(null);
    // @ts-ignore
    dispatch(changePositionItem({ id: itemId!, data: { material: id } }));
  };

  const mapedData = filteredMaterials.map(material => {
    return {
      ...material,
      name: {
        name: material.name,
        image: material.photo ?? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeDQ6y6Zr7jnkPI8IYybZFXIvDhwZbnN2bSXkRGIEamMi69CFqHTDAGuaLX20k4-3vZwQ&usqp=CAU'
      },
      add: {
        name: "Hinzufügen",
        onChange: () => setArticle(material.id),
        disabled: addedIds.some(item => item === material.id)
      }
    }
  })

  return (
    <Container>
      <div className="header">
        Material hinzufügen
        <Link className="link" to="/inventory"><PrimaryButton>Erstellen neuer</PrimaryButton></Link>
      </div>
      <SearchInput value={generalSearchTerm} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setPickArticleTableGeneralSearchTerm(e.target.value))} placeholder="Suchen" />
      <TableList names={names} width={width} listType={listType} order={order} data={mapedData} />
    </Container>
  )
}

export default PickArticleWindow