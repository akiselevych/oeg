//libs
import { FC } from "react"
import { Link } from "react-router-dom"
//comonents
import CustomSelectElement from "components/CustomSelectElement/CustomSelectElement"
import DebouncedInput from "components/DebouncedInput/DebouncedInput"
import InputWithSubmit from "components/InputWithSubmit/InputWithSubmit"
import ListCellImageWithName from "components/ListCellImageWithName/ListCellImageWithName"
import CellWithImage from "./CellWithImage/CellWithImage"
//styles
import { Container, PDFloader } from "./styles"
//types
import { ListCellProps } from "types/index"



const getNameProps = (name: ListCellProps['name']) => {
  if (typeof name === 'string' || typeof name === 'number') return name
  if (Array.isArray(name)) return name[0]?.name
  if ((!Array.isArray(name) && typeof name === 'object') && !!name) return name.name
}
  ;
const ListCell: FC<ListCellProps> = ({ name, width, cellType, tableName }) => {
  return (
    <Container $width={width} $name={getNameProps(name)}>
      {getContent(cellType, tableName, name)}
    </Container >
  )
}

const unitsType = [
  { value: 'kg', name: 'Kilogram' },
  { value: 'g', name: 'Gram' },
  { value: 'l', name: 'Liter' },
  { value: 'm', name: 'Meter' },
  { value: 'cm', name: 'Centimeter' },
  { value: 'stück', name: 'Stück' },
  { value: 'kWp', name: 'kWp' },
  { value: 'pauschal', name: 'Pauschal' },
  { value: 'stunden', name: 'Stunden' },
]

function getContent(
  cellType: ListCellProps['cellType'],
  tableName: string | undefined,
  name: ListCellProps['name'],) {
  if (!!name && (!Array.isArray(name) && typeof name === 'object') && (name.image || name.image === null) && typeof name.name !== 'boolean') {
    return <CellWithImage image={name.image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'} name={name.name} />
  }

  switch (cellType) {
    case 'timeline':
      return (
        <Link to="/calendar" className="btn">
          Kalender
        </Link>
      )
    case 'downloadLink':
      return (!Array.isArray(name) && typeof name === 'object') ? (
        <div onClick={name.onChange} className="edit">
          {name.name}
        </div>
      ) : 'error'
    case 'viewLink':
      return (!Array.isArray(name) && typeof name === 'object') && typeof name.name === 'string' ? (
        <a href={name.name}
          target="_blank"
          className="edit"
          rel="noopener noreferrer">
          Herunterladen
        </a>
      ) : 'error'

    case 'upload':
      //@ts-ignore
      return <PDFloader disabled={name.disabled}><input className="fileUploader" type="file" onChange={e => name.onChange(e)} />Hochladen</PDFloader>
    case 'wiewDocument':
      //@ts-ignore
      return <a href={name.name}
        target="_blank"
        //@ts-ignore
        className={"edit " + (name.disabled ? "disabled" : "")}
        rel="noopener noreferrer">
        Einsehen
      </a>
    case 'edit':
      return (!Array.isArray(name) && typeof name === 'object') ? (
        <div onClick={name.onChange} className="edit">
          Bearbeiten
        </div>
      ) : 'error'
    case 'open':
      return <Link to={`/project/${name}`} className="add">
        Offen
      </Link>
    case 'units':
      return <div>{unitsType.find(item => item.value === name)?.name}</div>
    case 'paid':
      if ((!Array.isArray(name) && typeof name === 'object') && typeof name.name === "boolean") {
        return <input type="checkbox" checked={name.name} onChange={(e) => name.onChange(!name.name)} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'received':
      //@ts-ignore
      return <div className={'edit'} type="checkbox" onClick={name.onChange} >Empfangen</div>
    case 'reserved':
      if ((!Array.isArray(name) && typeof name === 'object') && typeof name.name === "boolean") {
        return <input disabled={name.disabled} type="checkbox" checked={name.name} onChange={() => { if (!name.disabled) name.onChange(!name.name) }} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'category':
      if ((!Array.isArray(name) && typeof name === 'object') && typeof name.name === "boolean") {
        return <input type="checkbox" checked={name.name} onChange={(e) => name.onChange(!name.name)} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'article':
      if (tableName === "project:products" && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        return <div onClick={name.onChange} className="edit">Hinzufügen</div>
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'description':
      if (tableName === "ProjectСonstructionTable" && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        return <DebouncedInput placeholder="Eingeben" type="text" value={name.name} onChange={name.onChange} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'when':
      if ((tableName === "project:Materials delivery plan" || tableName === "projects") && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        //@ts-ignore
        return <InputWithSubmit
          placeholder="00/00/0000"
          type="text"
          value={name.name}
          onChange={name.onChange} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'hours':
      if (tableName === "WorkersProjectTimeOverviewTable" && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        //@ts-ignore
        return <InputWithSubmit
          placeholder="0"
          type="number"
          value={name.name}
          onChange={name.onChange}
          disabled={name.disabled} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'ordered':
      if (tableName === "project:Materials delivery plan" && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        //@ts-ignore
        return <InputWithSubmit disabled={name.disabled} step={1} placeholder="Eingeben" type="number" value={name.name} onChange={name.onChange} />
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'employee':
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'employees':
      if ((tableName === 'Upcoming events' || tableName === 'monthlyOverview') && Array.isArray(name)) {
        return !!name.length ? <div className="multiCell">
          {name.map((item, i) => <ListCellImageWithName key={i} name={typeof item.name !== 'boolean' ? item.name : 'error'} img={item.image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'} />)}
        </div> : "N/A"
      }
      if (Array.isArray(name)) {
        return 'error'
      }
      return <div className='title'>{(typeof name === 'object') && name && name ? name.name : name ?? "N/A"}</div>
    case 'suppliers':
      if (Array.isArray(name)) {
        return !!name.length ? <div className="multiCell">
          {name.map((item, i) => <ListCellImageWithName key={i} name={typeof item.name !== 'boolean' ? item.name : 'error'} img={item.image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'} />)}
        </div> : "N/A"
      }
      return <div className='title'>{(typeof name === 'object') && name && name ? name.name : name ?? "N/A"}</div>
    case 'vat':
      if (tableName === "project:products" && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        return (
          <CustomSelectElement
            onChange={(value) => name.onChange(value)}
            values={name.options!.map(({ name, value }) => ({ value, name }))}
            activeValue={{ name: name.options![0].name, value: name.options![0].value }}
            type="cell"
          />
        )
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'add':
      if (tableName === "PickArticleTable" && (!Array.isArray(name) && typeof name === 'object') && typeof name.name !== 'boolean') {
        return (
          <div className={`add title ${name.disabled && 'disabled'}`} onClick={name.onChange}>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : name ?? "N/A"}</div>
        )
      }
      return <div className='title'>{(!Array.isArray(name) && typeof name === 'object') && name ? name.name : typeof name === 'number' || typeof name === 'string' ? name ?? "N/A" : 'error'}</div>
    case 'delete':
      if (name) {
        //@ts-ignore
        return <img style={{ margin: "0 auto" }} alt='delete' src={name.name} onClick={name.onChange} />
      } else {
        return <div className='title'></div>

      }
    default:
      return <div className={`title ${name === 0 ? "zero" : ''}`}>{(typeof name === 'object' && !Array.isArray(name)) && name && !!name ? name.name : !Array.isArray(name) ? name ?? "N/A" : 'error'}</div>
  }
}


export default ListCell