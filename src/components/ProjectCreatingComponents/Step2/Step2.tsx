//libs
import { useState, useEffect, useRef, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
//redux
import { fetchOneProject } from "reduxFolder/slices/ProjectsSlice"
import { changeProposition, changePositionItem, createPosition, setAllPositionItemsAsPaid } from "reduxFolder/slices/ProjectPropositionSlice"
//components
import TableList from "components/TableList/TableList"
import TableSwitcher from "components/TableSwitcher/TableSwitcher"
import CentralModalWindow from "components/CentralModalWindow/CentralModalWindow"
import PickArticleWindow from "components/PickArticleWindow/PickArticleWindow"
import CreateMaterialInProjectForm from "components/CreateMaterialInProjectForm/CreateMaterialInProjectForm"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary";

//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container } from "./styles"
import { SecondaryButton, InputBlock, Label } from "styles/global"
//images
import plus from 'assets/icons/BlackPlus.svg'


const order = ["paid", 'name', 'article', 'supplier', 'price', 'amount', 'unitsType', 'vat', "total"],
  names = ["Bezahlt", 'Name', 'Artikel', 'Lieferant', 'Preis', 'Betrag', 'Einheit', 'MwSt', "Total"],
  listType = "project:products",
  width = [80, 166, 140, 160, 104, 88, 80, 104,]



const Step2 = () => {
  const [currentTable, setCurrentTable] = useState(0)
  const [pickedID, setPickedID] = useState<number | string | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isAddPositionInputOpen, setisAddPositionInputOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)
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
        return pos.position_items.every(({ buying_price, client_price, amount, vat, units }) => {
          return buying_price && client_price && amount && typeof vat === 'number' && units
        })
      }) && !!!currentProject.propositions[0].confirmed_by_client
    )
  //it is using when we have all data but user shouldn't change it
  const disabledLogic = currentProject?.status === 'Completed'


  useEffect(() => {
    if (id) dispatch(fetchOneProject(id))
    // eslint-disable-next-line
  }, [id])



  const mapedData = useMemo(() => {
    if (hidenLogic) return []
    return currentProject?.propositions[0].positions.map(({ title, position_items }) => {
      const data = position_items.map(({ id, name, paid, material, buying_price, vat, amount, units }) => {
        return {
          paid: {
            name: paid,
            onChange: (value: boolean) => dispatch(changePositionItem({ id: id!, data: { paid: value } }))
          },
          name,
          amount,
          article: material?.article_number ?? { name: "Hinzufügen", onChange: () => setPickedID(id!) },
          supplier: material?.supplier,
          price: buying_price,
          unitsType: material?.units ?? units ?? "N/A",
          vat: {
            name: "vat",
            onChange: (arg: number) => dispatch(changePositionItem({ id: id!, data: { vat: arg } })),
            options: vat === 19 ? [{ name: "19%", value: 19 }, { name: "0%", value: 0 }] : [{ name: "0%", value: 0 }, { name: "19%", value: 19 }]
          },
          total: ((+buying_price! + (+buying_price! / 100 * vat!)) * amount!).toFixed(2)
        }
      })
      return <TableList names={names} listType={listType} order={order} width={width} data={data} />
    })
    // eslint-disable-next-line
  }, [currentProject, changePropositionLoadingStatus])

  const addPositionButton = () => {
    if (!disabledLogic && isAddPositionInputOpen && inputRef.current!.value!.length) {
      dispatch(createPosition({
        proposition_id: currentProject?.propositions[0].id!,
        title: inputRef.current!.value!

      }))
        .then(() => {
          setisAddPositionInputOpen(false)
        })
    } else if (isAddPositionInputOpen) {
      setisAddPositionInputOpen(false)
    } else {
      setisAddPositionInputOpen(true)
    }
  }


  const paid = hidenLogic ? 0 : currentProject?.propositions[0].positions.map(pos => pos.position_items).flat().filter(({ paid }) => paid).reduce((acc, { buying_price, vat, amount }) => acc + ((+buying_price! + (+buying_price! / 100 * vat!)) * amount!), 0)
  const total = hidenLogic ? 0 : currentProject?.propositions[0].positions.map(pos => pos.position_items).flat().reduce((acc, { buying_price, vat, amount }) => acc + ((+buying_price! + (+buying_price! / 100 * vat!)) * amount!), 0)
  const toPaid = hidenLogic ? 0 : !!total && !!paid ? (total - paid).toFixed(2) : 0



  const addedMaterialIds = hidenLogic ? [] : currentProject?.propositions[0].positions.flatMap(position => position.position_items.filter(item => item.material).map(item => item.material.id))!

  return (
    <Container>
      <p className="stepTitle">
        Produkte
      </p>
      {!hidenLogic &&
        <div className="tablesContainer">
          <div className="menu">
            {currentProject?.propositions[0].positions.map(({ title }, i) => <div key={i} className={`menuItem ${i === currentTable ? "active" : ''}`} onClick={() => setCurrentTable(i)} >{title}</div>)}
            {isAddPositionInputOpen &&
              <input ref={inputRef} className="menuItem" type="text" placeholder="Name" />
            }
            {!disabledLogic && <div
              onClick={addPositionButton}
              className={`menuItem`}
            >
              {isAddPositionInputOpen ? "Hinzufügen" : <img src={plus} alt="Position hinzufügen" />}
            </div>}
          </div>
          <ErrorBoundary>
            <div className={disabledLogic ? "disableLogic" : ''}>
              {mapedData && mapedData[currentTable]}
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <CreateMaterialInProjectForm position_id={currentProject?.propositions[0].positions[currentTable].id} isOpen={isFormOpen} close={() => setIsFormOpen(false)} />
          </ErrorBoundary>
          {!disabledLogic && <SecondaryButton onClick={() => setIsFormOpen(prev => !prev)} className="add">{isFormOpen ? "Nein" : "Material hinzufügen"}</SecondaryButton>}
          <SecondaryButton
            $disabled={disabledLogic || changePropositionLoadingStatus === 'loading'}
            onClick={() => dispatch(setAllPositionItemsAsPaid({ projectId: currentProject!.id }))}>
            Alle als bezahlt markieren
          </SecondaryButton>
        </div>
      }
      {
        !hidenLogic &&
        <div className="paidContainer">
          <InputBlock>
            <Label>Bezahlt</Label>
            <div className="position">{paid && paid.toFixed(2)}</div>
          </InputBlock>
          <InputBlock>
            <Label>Zu zahlen</Label>
            <div className="position">{toPaid}</div>
          </InputBlock>
        </div>
      }
      {
        !hidenLogic &&
        <div className={`switcher ${disabledLogic && "disableLogic"}`}>
          <p className="title">Netzanfrage</p>
          <TableSwitcher
            onChange={(arg) => dispatch(changeProposition({ id: currentProject?.propositions[0].id, network_requested: arg === 'yes' }))}
            currentValue={currentProject?.propositions[0].network_requested ? "yes" : "no"}
            values={[{ name: "Ja", value: 'yes' }, { name: "Nein", value: 'no' }]}
            activeColor="#6A994E"
            activeBGColor="#fff" />
        </div>
      }
      {
        hidenLogic &&
        <p>Einige Funktionen sind in diesem Schritt nicht verfügbar, da sie von Daten abhängen, die Sie im vorherigen Schritt nicht hinzugefügt haben</p>
      }
      {
        !!pickedID &&
        <CentralModalWindow closeModal={() => setPickedID(null)} height="max-content" isOpen={!!pickedID} >
          <ErrorBoundary>
            <PickArticleWindow addedIds={addedMaterialIds} onSubmit={setPickedID} itemId={pickedID} />
          </ErrorBoundary>
        </CentralModalWindow>
      }
    </Container>
  )
}

export default Step2