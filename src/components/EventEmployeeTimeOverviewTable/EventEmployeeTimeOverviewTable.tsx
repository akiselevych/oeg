//libs
import { useEffect, useMemo, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import moment from "moment"
//redux
import { fetchWorkersEmployeesStatistic } from "reduxFolder/slices/Labors.slice"
import { workersEmployeesStatisticSelector } from "reduxFolder/selectors"
import {
    setLastMonthEventsFilterTerm,
    setLastMonthEventsSearchTerm,
    setLastMonthEventsSortTerm,
} from "reduxFolder/slices/TableFiltersSlice"
//components
import TableList from "components/TableList/TableList"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import CustomSelectElement from "components/CustomSelectElement/CustomSelectElement"
//images
import spiner from 'assets/icons/spinner.svg'
//styles
import { Container } from "./styles"
import { AppDispatch, RootStateType, SearchTermType, FilterTermType, SortTermType } from "types/index"
import removeDuplicates from "utils/removeDuplicates"
require('moment/locale/de');

const order = ['employee_name', 'project_cout', 'hours_count'],
    listType = "monthlyOverview",
    width = [280, 280, 198]

const startDate = moment('2023-01-01');
const endDate = moment();
moment.locale('de');


let timePeriods: string[] = [];

while (startDate.isSameOrBefore(endDate, 'month')) {
    timePeriods.push(startDate.format('MMMM, YYYY'));
    startDate.add(1, 'month');
}
timePeriods = timePeriods.reverse()


const EventEmployeeTimeOverviewTable = () => {
    const workersEmployeesStatistic = useSelector((state: RootStateType) => state.Labors.workersEmployeesStatistic)
    const filteredWorkersEmployeesStatistic = useSelector(workersEmployeesStatisticSelector)
    const loadingStatus = useSelector((state: RootStateType) => state.Labors.fetchWorkersEmployeesStatisticLoadingStatus)
    const dispatch = useDispatch<AppDispatch>()
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.LastMonthTableSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.LastMonthTableFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.LastMonthTableSortValue)
    const [timePeriod, setTimePeriod] = useState({
        name: timePeriods[0],
        value: {
            start_date: moment(timePeriods[0], 'MMMM, YYYY').startOf('month').format('YYYY-MM-DD'),
            end_date: moment(timePeriods[0], 'MMMM, YYYY').endOf('month').format('YYYY-MM-DD'),
        }
    })

    useEffect(() => {
        dispatch(fetchWorkersEmployeesStatistic(timePeriod.value))
        // eslint-disable-next-line
    }, [timePeriod])

    const names = useMemo(() => {
        return [
            {
                name: 'Person',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: "name",
                setSort: (arg: SortTermType) => dispatch(setLastMonthEventsSortTerm(arg)),
                options: removeDuplicates(workersEmployeesStatistic.map(({ employee_name }) => ({ name: employee_name, value: employee_name }))),
                setOption: (arg: FilterTermType) => dispatch(setLastMonthEventsFilterTerm(arg)),
                setSearch: (arg: SearchTermType) => dispatch(setLastMonthEventsSearchTerm(arg)),
                search: true,
                placeholder: 'Namen',
                searchTerm,
                filterTerm,
                sortTerm
            },
            {
                name: 'Anzahl der Projekte',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: "project_cout",
                setSort: (arg: SortTermType) => dispatch(setLastMonthEventsSortTerm(arg)),
                options: removeDuplicates(workersEmployeesStatistic.map(({ project_cout }) => ({ name: project_cout, value: project_cout }))),
                setOption: (arg: FilterTermType) => dispatch(setLastMonthEventsFilterTerm(arg)),
                setSearch: (arg: SearchTermType) => dispatch(setLastMonthEventsSearchTerm(arg)),
                search: true,
                placeholder: '1',
                searchTerm,
                filterTerm,
                sortTerm
            },
            {
                name: 'Gesamtstunden',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: "hours_count",
                setSort: (arg: SortTermType) => dispatch(setLastMonthEventsSortTerm(arg)),
                options: removeDuplicates(workersEmployeesStatistic.map(({ hours_count }) => ({ name: hours_count, value: hours_count }))),
                setOption: (arg: FilterTermType) => dispatch(setLastMonthEventsFilterTerm(arg)),
                setSearch: (arg: SearchTermType) => dispatch(setLastMonthEventsSearchTerm(arg)),
                search: true,
                placeholder: '24',
                searchTerm,
                filterTerm,
                sortTerm
            },
        ]
        // eslint-disable-next-line 
    }, [filteredWorkersEmployeesStatistic, searchTerm, filterTerm, sortTerm])

    const mapedData = filteredWorkersEmployeesStatistic.map(item => ({
        ...item,
        employee_name: {
            name: item.employee_name,
            image: item.image
        },
    }))

    const content = loadingStatus === "idle" ? <TableList order={order} names={names} data={mapedData} listType={listType} width={width} /> : null
    const error = loadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = loadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null

    return (
        <Container>
            {content}
            {error}
            {loading}
            <CustomSelectElement
                bgColor="#fff"
                values={timePeriods.map(period => {
                    return {
                        name: period,
                        value: {
                            start_date: moment(period, 'MMMM, YYYY').startOf('month').format('YYYY-MM-DD'),
                            end_date: moment(period, 'MMMM, YYYY').endOf('month').format('YYYY-MM-DD'),
                        }
                    }
                })}
                onChange={(value) => setTimePeriod(value)}
                activeValue={timePeriod} />
        </Container>
    )
}

export default EventEmployeeTimeOverviewTable