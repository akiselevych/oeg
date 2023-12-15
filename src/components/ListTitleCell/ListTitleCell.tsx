//libs
import { FC, useState } from "react"
//styles
import { Container } from "./styles"
//types
import { ListTitleCellProps } from "types/index"
//images
import filter from 'assets/icons/filter.svg'
import sortBy from 'assets/icons/sortBy.svg'
import arrTop from 'assets/icons/arrTop.svg'

const ListTitleCell: FC<ListTitleCellProps> = ({ name, width }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isSortOpen, setIsSortOpen] = useState(false)


    const getCellType = () => {
        if (typeof name === 'string') return undefined
        if (name?.options) return "filter"
        if (name?.sort) return "sort"

    }

    const onSortClick = () => {
        setIsSortOpen(prev => !prev)
        setIsFilterOpen(false)
    }
    const onFilterClick = () => {
        setIsFilterOpen(prev => !prev)
        setIsSortOpen(false)

    }


    return (
        <Container $width={width} $type={getCellType()} $name={typeof name === 'object' ? name.name : name}>
            <div className="title">
                {(typeof name === 'object' && name.sort) &&
                    <img className="icon" onClick={onSortClick} src={sortBy} alt="sort" />
                }
                {typeof name === "string" || typeof name === "number" ? name : name.name}
                {(typeof name === 'object' && (name.options || name.search)) &&
                    <img className="icon" onClick={onFilterClick} src={filter} alt="filter" />
                }
            </div>
            {(typeof name === 'object' && isFilterOpen) &&
                <div className="selectWrapper">
                    {name.search &&
                        <input
                            onChange={(e) => name.setSearch!({ [name.keyName!]: e.target.value })}
                            value={(name.searchTerm && name.searchTerm[name.keyName!]) ? name.searchTerm![name.keyName!] : ''}
                            placeholder={name.placeholder}
                            type="text"
                            className="search" />
                    }
                    {name.options && name.options?.map((item, i) => {
                        const checked = (name.filterTerm && name.filterTerm[name.keyName!] && name.filterTerm[name.keyName!] === item.value) ? true : false
                        return (
                            <label className='filterOption' key={i}>
                                <input
                                    checked={checked}
                                    type="checkbox"
                                    onChange={() => !checked ? name.setOption!({ [name.keyName!]: item.value }) : name.setOption!(null)}
                                />
                                {item.name}
                            </label>
                        )
                    })}
                </div>
            }
            {(typeof name === 'object' && isSortOpen) &&
                <div className="selectWrapper">
                    {name.sort && name.sort?.map((item, i) => {
                        return (
                            <div
                                className={`filterOption ${(name.sortTerm && name.sortTerm[name.keyName!] && name.sortTerm[name.keyName!] === item.value) ? 'active' : ''}`}
                                key={i}
                                onClick={() => name.setSort!({ [name.keyName!]: item.value })}>
                                <img style={{ transform: i === 1 ? 'rotate(180deg)' : 'none' }} src={arrTop} alt="" />
                                {item.name}
                            </div>
                        )
                    })}
                </div>}
        </Container>
    )
}

export default ListTitleCell