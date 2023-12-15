
//libs
import { useState, useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
//comonents
import CustomSelectElement from "components/CustomSelectElement/CustomSelectElement"
//redux
import { fetchPreviousStatisticPeriod, fetchСurrentStatisticPeriod } from "reduxFolder/slices/StatisticsSlice"
//utils
import { handleStatus } from "utils/handleStatus"
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { StatusOverlay } from "styles/global"
import { Container, Card } from "./styles"



const dateVariants = [{ value: "all", name: "Alle Zeiten" }, { value: "week", name: "Letzte Woche" }, { value: "month", name: "Letzter Monat" }, { value: "3month", name: "Letzte 3 Monate" },]

const AnalyticsBlock = () => {
  const [currentDate, setCurrentDate] = useState('all')
  const dispatch = useDispatch<AppDispatch>()
  const tableCurrentPeriodStatistics = useSelector((state: RootStateType) => state.Statistics.tableCurrentPeriodStatistics)
  const tablePreviousPeriodStatistics = useSelector((state: RootStateType) => state.Statistics.tablePreviousPeriodStatistics)
  const fetchCurrentPeriodStatisticsLoadingStatus = useSelector((state: RootStateType) => state.Statistics.fetchCurrentPeriodStatisticsLoadingStatus)


  const today = new Date()

  useEffect(() => {
    dispatch(fetchСurrentStatisticPeriod({
      startDate: periods.currentStartDate,
      endDate: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    }))
    dispatch(fetchPreviousStatisticPeriod({
      startDate: periods.prevStartDate,
      endDate: periods.currentStartDate
    }))
    // eslint-disable-next-line
  }, [currentDate])


  const periods = useMemo(() => {
    let currentStartDate,
      prevStartDate
    let currDate, prevDate
    switch (currentDate) {
      case 'week':
        currDate = new Date(today.getTime() - 604800000)
        prevDate = new Date(today.getTime() - (604800000 * 2))
        break;
      case 'month':
        currDate = new Date(today.getTime() - 2629800000)
        prevDate = new Date(today.getTime() - (2629800000 * 2))
        break;
      case '3month':
        currDate = new Date(today.getTime() - (2629800000 * 3))
        prevDate = new Date(today.getTime() - (2629800000 * 6))
        break;

      default:
        currDate = new Date("2000-01-01");
        prevDate = new Date("2000-01-01");
    }

    currentStartDate = `${currDate.getFullYear()}-${currDate.getMonth() + 1}-${currDate.getDate()}`
    prevStartDate = `${prevDate.getFullYear()}-${prevDate.getMonth() + 1}-${prevDate.getDate()}`

    return {
      currentStartDate,
      prevStartDate
    }
    // eslint-disable-next-line
  }, [currentDate])

  const statData = useMemo(() => {
    //@ts-ignore
    const revenue = calcTotal(tableCurrentPeriodStatistics, 'revenue'),
      //@ts-ignore
      expenditures = calcTotal(tableCurrentPeriodStatistics, 'expenditures'),
      //@ts-ignore
      profit = calcTotal(tableCurrentPeriodStatistics, 'profit'),
      //@ts-ignore
      prevRevenue = calcTotal(tablePreviousPeriodStatistics, 'revenue'),
      //@ts-ignore
      prevExpenditures = calcTotal(tablePreviousPeriodStatistics, 'expenditures'),
      //@ts-ignore
      prevProfit = calcTotal(tablePreviousPeriodStatistics, 'profit'),
      revenuePercent = calcPercent(revenue, prevRevenue),
      expendituresPercent = calcPercent(expenditures, prevExpenditures),
      profitPercent = calcPercent(profit, prevProfit)


    return {
      revenue,
      revenuePercent,
      revenueMessage: `${Math.ceil(+revenuePercent)}% ${+revenuePercent >= 0 ? "Erhöhung" : 'abnehmend'}`,
      expenditures,
      expendituresPercent,
      expendituresMessage: `${Math.ceil(+expendituresPercent)}% ${+expendituresPercent >= 0 ? "Erhöhung" : 'abnehmend'}`,
      profit,
      profitPercent,
      profitMessage: `${Math.ceil(+profitPercent)}% ${+profitPercent >= 0 ? "Erhöhung" : 'abnehmend'}`,


    }
    // eslint-disable-next-line
  }, [tableCurrentPeriodStatistics, tablePreviousPeriodStatistics])



  return (
    <Container>
      <div className="header">
        <p className="title">
          Analytik
        </p>
        <CustomSelectElement values={dateVariants} activeValue={{ name: 'Alle Zeiten', value: currentDate }} onChange={(value) => setCurrentDate(value)} />
      </div>
      <div className="cardBlock">
        <StatusOverlay $isNone={fetchCurrentPeriodStatisticsLoadingStatus === 'idle'} className="statusOverlay">
          {fetchCurrentPeriodStatisticsLoadingStatus}
        </StatusOverlay>
        <Card $color="#084D9F" $bgColor="#D0E5FF">
          <p className="title">Einnahmen</p>
          <div className="dataBlock">
            <div className="value">{handleStatus(fetchCurrentPeriodStatisticsLoadingStatus, `${statData.revenue.toFixed(2)} €`)}</div>
            {currentDate !== "all" &&
              <div className="percentBlock">
                <div style={{ transform: `scaleY(${+statData.expendituresPercent >= 0 ? 1 : -1})`, transformBox: 'fill-box' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3334 4L9.00008 10.3333L5.66675 7L0.666748 12" stroke="#084D9F" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.3333 4H15.3333V8" stroke="#084D9F" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text">
                  {handleStatus(fetchCurrentPeriodStatisticsLoadingStatus, `${statData.revenueMessage}`)}
                </p>
              </div>}
          </div>
        </Card>
        <Card $color="#CA0202" $bgColor="#FFE5E5" $arrPosition="scaleY(-1)">
          <p className="title">Ausgaben</p>
          <div className="dataBlock">
            <div className="value">{handleStatus(fetchCurrentPeriodStatisticsLoadingStatus, `${statData.expenditures.toFixed(2)} €`)}</div>
            {currentDate !== 'all' &&
              <div className="percentBlock">
                <div style={{ transform: `scaleY(${+statData.expendituresPercent >= 0 ? -1 : 1})`, transformBox: 'fill-box' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3334 4L9.00008 10.3333L5.66675 7L0.666748 12" stroke="#CA0202" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.3333 4H15.3333V8" stroke="#CA0202" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text">
                  {handleStatus(fetchCurrentPeriodStatisticsLoadingStatus, `${statData.expendituresMessage}`)}
                </p>
              </div>}
          </div>
        </Card>
        <Card $color="#42821C" $bgColor="#E7FFD8">
          <p className="title">Gewinn</p>
          <div className="dataBlock">
            <div className="value">{handleStatus(fetchCurrentPeriodStatisticsLoadingStatus, `${statData.profit.toFixed(2)} €`)}</div>
            {currentDate !== 'all' &&
              <div className="percentBlock">
                <div style={{ transform: `scaleY(${+statData.profitPercent >= 0 ? 1 : -1})`, transformBox: 'fill-box' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.3334 4L9.00008 10.3333L5.66675 7L0.666748 12" stroke="#42821C" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.3333 4H15.3333V8" stroke="#42821C" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text">
                  {handleStatus(fetchCurrentPeriodStatisticsLoadingStatus, `${statData.profitMessage}`)}
                </p>
              </div>}
          </div>
        </Card>
      </div>
    </Container>
  )
}

export default AnalyticsBlock



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

function calcPercent(curr: number, prev: number) {
  if (!prev) return curr
  return ((curr / (prev / 100)) - 100).toFixed(2)
}
