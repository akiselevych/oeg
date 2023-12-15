//libs
import { useState, useEffect, useMemo } from "react"
import { fetchChartStatistic } from "reduxFolder/slices/StatisticsSlice";
import { useSelector, useDispatch } from "react-redux";
import { BarChart as BarChartElement, YAxis, XAxis, Bar, ResponsiveContainer } from 'recharts';
//components
import CustomSelectElement from "components/CustomSelectElement/CustomSelectElement";
//styles
import { Container } from "./styles"
import { CheckBox } from "styles/global"
//types
import { RootStateType, AppDispatch } from "types/index";
//images
import filter from 'assets/icons/filter.svg'
import spiner from "assets/icons/spinner.svg"



const timePeriodOptions = [{
    name: "Alle Zeiten",
    value: "all"
},
{
    name: "Letzter Monat",
    value: "month"
},
{
    name: "Letzte 3 Monate",
    value: "3month"
},
{
    name: "Letzte 6 Monate",
    value: "6month"
},
{
    name: "Letzte 9 Monate",
    value: "9month"
},
{
    name: "Letztes Jahr",
    value: "year"
},]

const BarChart = () => {
    const [timePeriod, setTimePeriod] = useState('year')
    const dispatch = useDispatch<AppDispatch>()
    const statistic = useSelector((state: RootStateType) => state.Statistics.chartStatistic)
    const fetchChartStatisticsLoadingStatus = useSelector((state: RootStateType) => state.Statistics.fetchChartStatisticsLoadingStatus)
    const [isSelectDataTypeOpen, setIsSelectDataTypeOpen] = useState(false)
    const [revenueSelect, setRevenueSelect] = useState(true)
    const [expendituresSelect, setExpendituresSelect] = useState(true)
    const [profitSelect, setProfitSelect] = useState(true)

    useEffect(() => {
        dispatch(fetchChartStatistic({
            startDate: startDate,
            endDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
        }))
        // eslint-disable-next-line
    }, [timePeriod])

    const today = new Date()

    const startDate = useMemo(() => {
        let currDate
        switch (timePeriod) {
            case 'month':
                currDate = new Date(today.getTime() - 2629800000)
                break;
            case '3month':
                currDate = new Date(today.getTime() - (2629800000 * 3))
                break;
            case '6month':
                currDate = new Date(today.getTime() - (2629800000 * 6))
                break;
            case '9month':
                currDate = new Date(today.getTime() - (2629800000 * 9))
                break;
            case 'year':
                currDate = new Date(today.getTime() - (31556952000))
                break;
            default:
                currDate = new Date('1-1-2000')
        }

        const startDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`

        return startDate
        // eslint-disable-next-line
    }, [timePeriod])

    const chartData: {
        name?: string,
        revenue: number,
        profit: number,
        expenditures: number
    }[] = useMemo(() => {
        if (timePeriod === "all") {
            return Object.entries(statistic).map(year => ({
                name: year[0],
                //@ts-ignore
                revenue: calcTotal(year[1], 'revenue'),
                //@ts-ignore
                expenditures: calcTotal(year[1], 'expenditures'),
                //@ts-ignore
                profit: calcTotal(year[1], 'profit')
            }))
        } else if (timePeriod === 'year' || timePeriod === '9month' || timePeriod === '6month') {
            //@ts-ignore
            const monthes = Object.values(statistic).reduce((acc, year) => [...acc, ...Object.entries(year)], [])
            //@ts-ignore
            return monthes.map(month => ({
                name: new Date(`${month[0]}-01-2000`).toLocaleString('de-DE', { month: 'long' }),
                //@ts-ignore
                revenue: calcTotal(month[1], 'revenue'),
                //@ts-ignore
                expenditures: calcTotal(month[1], 'expenditures'),
                //@ts-ignore
                profit: calcTotal(month[1], 'profit')
            }))
        } else if (timePeriod === 'month' || timePeriod === '3month') {
            const weeks: { [key: string]: any } = []
            const addWeeks = (obj: { [key: string]: any }) => {
                Object.values(obj).forEach(item => {
                    if (item.revenue) weeks.push(item)
                    else if (typeof item === 'object') addWeeks(item)
                })
            }
            addWeeks(statistic)
            return weeks
        }
        // eslint-disable-next-line
    }, [statistic])

    return (
        <Container>
            <div className="header">
                <p className="blockTitlr">
                    Leistung
                </p>
                {fetchChartStatisticsLoadingStatus === 'loading' && <img className="spiner" src={spiner} alt="" />}
                {fetchChartStatisticsLoadingStatus === 'error' && "Fehler"}
                <div className="btnGroup">
                    <CheckBox>
                        <p onClick={() => setIsSelectDataTypeOpen(prev => !prev)} className="title">
                            Typ
                            <img src={filter} alt="dropdown" />
                        </p>
                        {isSelectDataTypeOpen &&
                            <div className="selectWrapper">
                                <label>
                                    <input onChange={() => setRevenueSelect(prev => !prev)}
                                        checked={revenueSelect}
                                        type="checkbox"
                                    />
                                    Einnahmen
                                </label>
                                <label>
                                    <input onChange={() => setExpendituresSelect(prev => !prev)}
                                        checked={expendituresSelect}
                                        type="checkbox"
                                    />
                                    Ausgaben
                                </label>
                                <label>
                                    <input
                                        checked={profitSelect}
                                        onChange={() => setProfitSelect(prev => !prev)} type="checkbox"
                                    />
                                    Gewinn
                                </label>
                            </div>}
                    </CheckBox>
                    <CustomSelectElement values={timePeriodOptions} activeValue={{ value: timePeriod, name: "Letztes Jahr" }} onChange={value => setTimePeriod(value)} />
                </div>
            </div>
            <div className="main">
                {fetchChartStatisticsLoadingStatus === 'idle' && !chartData.length && <p>Keine Statistiken für diesen Zeitraum</p>}
                <ResponsiveContainer height={200} width='100%'>
                    <BarChartElement width={730} height={250} data={chartData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        {revenueSelect && <Bar dataKey="revenue" fill="#74B1FA" />}
                        {profitSelect && <Bar dataKey="profit" fill="#B3E893" />}
                        {expendituresSelect && <Bar dataKey="expenditures" fill="#F78888" />}
                    </BarChartElement>
                </ResponsiveContainer>
            </div>
        </Container>
    )
}

export default BarChart

function calcTotal(obj: { [key: string]: string | number }, key: string) {
    let total = 0;
    Object.values(obj).forEach(item => {
        //@ts-ignore
        if (item[key]) {
            //@ts-ignore
            total += item[key]
        } else if (typeof item === 'object') {
            total += calcTotal(item, key)
        }
    })

    return total
}
