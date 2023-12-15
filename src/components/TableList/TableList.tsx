//libs
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
//components
import ListCell from "components/ListCell/ListCell";
import ListTitleCell from "components/ListTitleCell/ListTitleCell";
//types
import { TableListProps } from "types/index";
//styles
import { Ul, TitleLi, Li } from "./styles"



const TableList: FC<TableListProps> = ({ listType, order, names, data, width }) => {

    return (
        <Ul $listType={listType}>
            <TitleLi $listType={listType}>
                {
                    names.map((name, i) => {
                        return (
                            <ListTitleCell key={i} width={width[i]} name={name} />
                        )
                    })
                }
            </TitleLi>
            {
                data.length ?
                    data.map((item, i) => {
                        const cells: ReactNode[] = []
                        order.forEach((name, i) => {
                            cells.push(<ListCell
                                width={width[i]}
                                key={i}
                                //@ts-ignore
                                name={item[name]}
                                cellType={name}
                                tableName={listType} />)
                        })
                        return (
                            <Li $bg={(listType === "project:products"
                                || listType === "project:Materials delivery plan"
                                || listType === "ProjectСonstructionTable") && !!(i % 2)} key={i}>
                                {cells}
                            </Li>
                        )
                    })
                    : listType === "PickArticleTable" ? <p className="addInventory">Leider können wir das Material, das Sie suchen, nicht finden.
                        Bitte <Link className="link" to="/inventory">klicken Sie hier</Link> , um ein neues Material zu Ihrem <span>Inventar</span> hinzuzufügen.</p> : <li className="empty">Liste leer ist</li>}
        </Ul>
    )
}

export default TableList