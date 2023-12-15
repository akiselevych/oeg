//libs
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { LoadingStatusType, StatisticsType } from "types/index";
//API
import { baseUrl } from "services/API";

const initialState: {
  fetchCurrentPeriodStatisticsLoadingStatus: LoadingStatusType,
  fetchPreviousPeriodStatisticsLoadingStatus: LoadingStatusType,
  fetchChartStatisticsLoadingStatus: LoadingStatusType,
  tableCurrentPeriodStatistics: StatisticsType[],
  tablePreviousPeriodStatistics: StatisticsType[],
  chartStatistic: StatisticsType[]

} = {
  fetchCurrentPeriodStatisticsLoadingStatus: "loading",
  fetchPreviousPeriodStatisticsLoadingStatus: "loading",
  fetchChartStatisticsLoadingStatus: "loading",
  tableCurrentPeriodStatistics: [],
  tablePreviousPeriodStatistics: [],
  chartStatistic: []
}

export const fetchСurrentStatisticPeriod = createAsyncThunk(
  "statistics/fetchCurrentStatistics",
  async (payload: {
    startDate: string,
    endDate: string
  }) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/statistics/?start_date=${payload.startDate}&end_date=${payload.endDate}`);
  }
)
export const fetchPreviousStatisticPeriod = createAsyncThunk(
  "statistics/fetchPreviousStatistics",
  async (payload: {
    startDate: string,
    endDate: string
  }) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/statistics/?start_date=${payload.startDate}&end_date=${payload.endDate}`);
  }
)
export const fetchChartStatistic = createAsyncThunk(
  "statistics/fetchChartStatistic",
  async (payload: {
    startDate: string,
    endDate: string
  }) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/statistics/?start_date=${payload.startDate}&end_date=${payload.endDate}`);
  }
)


const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchСurrentStatisticPeriod.pending, (state) => {
        state.fetchCurrentPeriodStatisticsLoadingStatus = "loading";
      })
      .addCase(fetchСurrentStatisticPeriod.fulfilled, (state, { payload }) => {
        state.fetchCurrentPeriodStatisticsLoadingStatus = "idle";
        state.tableCurrentPeriodStatistics = payload
      })
      .addCase(fetchСurrentStatisticPeriod.rejected, (state) => {
        state.fetchCurrentPeriodStatisticsLoadingStatus = "error";
      })
      .addCase(fetchPreviousStatisticPeriod.pending, (state) => {
        state.fetchPreviousPeriodStatisticsLoadingStatus = "loading";
      })
      .addCase(fetchPreviousStatisticPeriod.fulfilled, (state, { payload }) => {
        state.fetchPreviousPeriodStatisticsLoadingStatus = "idle";
        state.tablePreviousPeriodStatistics = payload
      })
      .addCase(fetchPreviousStatisticPeriod.rejected, (state) => {
        state.fetchPreviousPeriodStatisticsLoadingStatus = "error";
      })
      .addCase(fetchChartStatistic.pending, (state) => {
        state.fetchChartStatisticsLoadingStatus = "loading";
      })
      .addCase(fetchChartStatistic.fulfilled, (state, { payload }) => {
        state.fetchChartStatisticsLoadingStatus = "idle";
        state.chartStatistic = payload.result
      })
      .addCase(fetchChartStatistic.rejected, (state) => {
        state.fetchChartStatisticsLoadingStatus = "error";
      })
      .addDefaultCase((state, action) => { })
  }
})

const { reducer } = statisticsSlice
export default reducer
