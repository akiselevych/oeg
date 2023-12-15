//libs
import { useDispatch, useSelector } from "react-redux"
import { useMemo, useEffect, useState } from "react"
import moment from "moment"

//components
import TableList from "components/TableList/TableList"
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import CustomSelectElement from "components/CustomSelectElement/CustomSelectElement"
//redux
import { fetchWorkersSuppliersStatistic } from "reduxFolder/slices/Labors.slice"
import { workersSuppliersStatisticSelector } from "reduxFolder/selectors"
import {
    setLastMonthSuppliersEventsFilterTerm,
    setLastMonthSuppliersEventsSearchTerm,
    setLastMonthSuppliersEventsSortTerm,
} from "reduxFolder/slices/TableFiltersSlice"
//types
import { AppDispatch, RootStateType, SearchTermType, FilterTermType, SortTermType } from "types/index"
//styles
import { Container } from "./styles"
import spiner from 'assets/icons/spinner.svg'
//helpers
import removeDuplicates from "utils/removeDuplicates"
require('moment/locale/de');

const startDate = moment('2023-01-01');
const endDate = moment();
moment.locale('de');


let timePeriods: string[] = [];

while (startDate.isSameOrBefore(endDate, 'month')) {
    timePeriods.push(startDate.format('MMMM, YYYY'));
    startDate.add(1, 'month');
}
timePeriods = timePeriods.reverse()

const order = ['supplier_name', 'worker_name', 'hours_count'],
    listType = "monthlyOverview",
    width = [280, 280, 198]


const EventSupplierTimeOverviewTable = () => {
    const workersSuppliersStatistic = useSelector((state: RootStateType) => state.Labors.workersSuppliersStatistic)
    const filteredWorkersSuppliersStatistic = useSelector(workersSuppliersStatisticSelector)
    const loadingStatus = useSelector((state: RootStateType) => state.Labors.fetchWorkersSuppliersStatisticLoadingStatus)
    const dispatch = useDispatch<AppDispatch>()
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.LastMonthSuppliersTableSearchTerm)
    const filterTerm = useSelector((state: RootStateType) => state.TableFilters.LastMonthSuppliersTableFilterValue)
    const sortTerm = useSelector((state: RootStateType) => state.TableFilters.LastMonthSuppliersTableSortValue)
    const [timePeriod, setTimePeriod] = useState({
        name: timePeriods[0],
        value: {
            start_date: moment(timePeriods[0], 'MMMM, YYYY').startOf('month').format('YYYY-MM-DD'),
            end_date: moment(timePeriods[0], 'MMMM, YYYY').endOf('month').format('YYYY-MM-DD'),
        }
    })


    useEffect(() => {
        if (timePeriod) {
            dispatch(fetchWorkersSuppliersStatistic(timePeriod.value))
        }
        // eslint-disable-next-line
    }, [timePeriod])



    const names = useMemo(() => {
        return [
            {
                name: 'Firmenname',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: "name",
                setSort: (arg: SortTermType) => dispatch(setLastMonthSuppliersEventsSortTerm(arg)),
                options: removeDuplicates(workersSuppliersStatistic.map(({ supplier_name }) => ({ name: supplier_name, value: supplier_name }))),
                setOption: (arg: FilterTermType) => dispatch(setLastMonthSuppliersEventsFilterTerm(arg)),
                setSearch: (arg: SearchTermType) => dispatch(setLastMonthSuppliersEventsSearchTerm(arg)),
                search: true,
                placeholder: 'Namen',
                searchTerm,
                filterTerm,
                sortTerm
            },
            {
                name: 'Person',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: "worker_name",
                setSort: (arg: SortTermType) => dispatch(setLastMonthSuppliersEventsSortTerm(arg)),
                options: removeDuplicates(workersSuppliersStatistic.map(({ worker_name }) => ({ name: worker_name, value: worker_name }))),
                setOption: (arg: FilterTermType) => dispatch(setLastMonthSuppliersEventsFilterTerm(arg)),
                setSearch: (arg: SearchTermType) => dispatch(setLastMonthSuppliersEventsSearchTerm(arg)),
                search: true,
                placeholder: 'Namen',
                searchTerm,
                filterTerm,
                sortTerm
            },
            {
                name: 'Gesamtstunden',
                sort: [{ name: 'Sort ascending', value: "inc" }, { name: 'Sort descending', value: "dec" }],
                keyName: "hours_count",
                setSort: (arg: SortTermType) => dispatch(setLastMonthSuppliersEventsSortTerm(arg)),
                options: removeDuplicates(workersSuppliersStatistic.map(({ hours_count }) => ({ name: hours_count, value: hours_count }))),
                setOption: (arg: FilterTermType) => dispatch(setLastMonthSuppliersEventsFilterTerm(arg)),
                setSearch: (arg: SearchTermType) => dispatch(setLastMonthSuppliersEventsSearchTerm(arg)),
                search: true,
                placeholder: '24',
                searchTerm,
                filterTerm,
                sortTerm
            },
        ]
        // eslint-disable-next-line 
    }, [workersSuppliersStatistic, searchTerm, filterTerm, sortTerm])


    const content = loadingStatus === "idle" ? <TableList order={order} names={names} data={filteredWorkersSuppliersStatistic} listType={listType} width={width} /> : null
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

export default EventSupplierTimeOverviewTable