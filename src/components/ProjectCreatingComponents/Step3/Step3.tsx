//libs
import { useState, useEffect, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
//redux
import { fetchOneProject } from "reduxFolder/slices/ProjectsSlice"
import { changePositionItem, changeMaterialValues } from "reduxFolder/slices/ProjectPropositionSlice"
//types
import { AppDispatch, RootStateType, PosItemChangeMaterialType, PositionItemType } from "types/index"
//components
import TableList from "components/TableList/TableList"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";
//styles
import { Container } from "./styles"
import { SecondaryButton } from "styles/global"


const order = ["name", 'article', 'supplier', 'amount', 'unitsType', 'when', 'avaliable', "ordered", "received", "reserved"],
  names = ["Name", 'Artikel', 'Lieferant', 'Betrag', 'Einheit', 'Wann', 'Vorrätig', "Bestellt", "Empfangen", "Reserviert"],
  listType = "project:Materials delivery plan",
  width = [160, 88, 160, 88, 100, 190, 88, 120, 140, 98]



const Step3 = () => {
  const [currentTable, setCurrentTable] = useState(0)
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
  const updateProjectsLoadingStatus = useSelector((state: RootStateType) => state.Projects.updateProjectsLoadingStatus)
  const changePropositionLoadingStatus = useSelector((state: RootStateType) => state.ProjectProposition.changePropositionLoadingStatus)
  const dispatch = useDispatch<AppDispatch>()
  const { id } = useParams()


  //it is using when we have not all data and user shouldn't see it
  const hidenLogic = !!!currentProject
    || !!!currentProject.propositions
    || !!!currentProject.propositions[0]
    || !!!currentProject.propositions[0].confirmed_by_client
    || (
      !currentProject?.propositions[0]?.positions?.every(pos => {
        return pos.position_items.every(({ buying_price, client_price, amount, units, material }) => {
          return buying_price && client_price && amount && units && material
        })
      }) && !!!currentProject.propositions[0].confirmed_by_client
    )
    || (
      !currentProject?.propositions[0]?.positions?.every(pos => {
        return pos.position_items.every(({ amount, material }) => {
          return amount && material
        })
      })
    )
    || !currentProject?.propositions[0]?.positions?.some(pos => {
      return !!pos.position_items.length
    })
  //it is using when we have all data but user shouldn't change it
  const disabledLogic = currentProject?.status === "Completed"

  useEffect(() => {
    if (id) dispatch(fetchOneProject(id))
    // eslint-disable-next-line
  }, [id])

  const reserveAllData = useMemo(() => {
    let res: {
      data: PosItemChangeMaterialType,
      materialId: string | number,
      positionId: string | number
    }[] | null = null
    if (hidenLogic) return []
    const positionItems: PositionItemType[] = []
    currentProject?.propositions[0].positions.forEach(position => {
      position.position_items.forEach(item => positionItems.push(item))
    })

    res = positionItems.filter(item => !item.reserved).map(item => ({
      materialId: item.material.id,
      positionId: item.position,
      reserved: true,
      data: {
        position_item_id: item.id!,
        reserved_count: item.amount!,
        available_count: -item.amount!,
        add_ordered_for_item: true
      }
    }))

    return res
    // eslint-disable-next-line
  }, [currentProject])


  const mapedData = useMemo(() => {
    if (hidenLogic) return []
    return currentProject?.propositions[0].positions!.map(({ title, position_items }) => {
      const data = position_items.map(({ id, name, material, buying_price, vat, amount, when, received, position, ordered, reserved }, i) => {
        return {
          name,
          article: material?.article_number,
          supplier: material?.supplier,
          amount,
          unitsType: material?.units,
          when: {
            name: when ?? '',
            onChange: (arg: string) => dispatch(changePositionItem({ id: id!, data: { when: arg } })),
          },
          avaliable: material?.available_count,
          ordered: {
            name: ordered,
            onChange: (arg: number) => {
              if (+arg >= 0) {
                const differ = (arg - ordered)
                dispatch(changeMaterialValues([{
                  positionId: position,
                  materialId: material.id,
                  data: {
                    position_item_id: id!,
                    ordered_count: differ ?? 0,
                    add_ordered_for_item: true
                  }
                }]))
              }
            },
            disabled: changePropositionLoadingStatus === 'loading' || updateProjectsLoadingStatus === 'loading'
          },
          total: +buying_price! + (+buying_price! / 100 * vat!),
          received: {
            name: received,
            onChange: () => {
              dispatch(changeMaterialValues([{
                positionId: position,
                materialId: material.id,
                data: {
                  position_item_id: id!,
                  available_count: ordered,
                  ordered_count: -ordered,
                  add_ordered_for_item: true
                }
              }]))
            },
            disabled: changePropositionLoadingStatus === 'loading' || updateProjectsLoadingStatus === 'loading'
          },
          reserved: {
            name: reserved,
            disabled: (amount! > material.available_count && !reserved) || changePropositionLoadingStatus === 'loading' || updateProjectsLoadingStatus === 'loading',
            onChange: (value: boolean) => {
              if (value) {
                dispatch(changeMaterialValues([{
                  positionId: position,
                  materialId: material.id,
                  data: {
                    position_item_id: id!,
                    available_count: -amount!,
                    reserved_count: amount!,
                    add_ordered_for_item: false
                  }
                }]))
              } else {
                dispatch(changeMaterialValues([{
                  positionId: position,
                  materialId: material.id,
                  data: {
                    position_item_id: id!,
                    available_count: amount!,
                    reserved_count: -amount!,
                    add_ordered_for_item: false
                  }
                }]))
              }
              dispatch(changePositionItem({
                id: id!,
                data: {
                  reserved: value
                }
              }))
            }
          }
        }
      })
      return <TableList names={names} listType={listType} order={order} width={width} data={data} />
    })
    // eslint-disable-next-line
  }, [currentProject, updateProjectsLoadingStatus, changePropositionLoadingStatus])




  return (
    <Container >
      <p className="stepTitle">
        Material Lieferplan
      </p>
      <div className={`tablesContainer`}>
        {
          !hidenLogic &&
          <div className="menu">
            {currentProject?.propositions[0].positions.map(({ title }, i) => <div key={i} className={`menuItem ${i === currentTable ? "active" : ''}`} onClick={() => setCurrentTable(i)} >{title}</div>)}
          </div>
        }
        <ErrorBoundary>
          {
            !hidenLogic &&
            <div className={disabledLogic ? "disableLogic" : ''}>
              {mapedData && mapedData[currentTable]}
            </div>
          }
        </ErrorBoundary>
        {
          !hidenLogic &&
          <SecondaryButton
            onClick={() => dispatch(changeMaterialValues(reserveAllData!))}
            $disabled={disabledLogic || !!!reserveAllData.length || changePropositionLoadingStatus === 'loading' || updateProjectsLoadingStatus === 'loading'}>
            Alle reservieren
          </SecondaryButton>
        }
        {
          hidenLogic &&
          <p>Einige Funktionen sind in diesem Schritt nicht verfügbar, da sie von Daten abhängen, die Sie im vorherigen Schritt nicht hinzugefügt haben</p>
        }
      </div>
    </Container>
  )
}

export default Step3