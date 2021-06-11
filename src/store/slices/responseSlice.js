import { createSlice, current } from '@reduxjs/toolkit'
import {
  normalizeScore,
  totalScore,
  calculateChartScore,
  calculateResponseSummary
} from '@/util/score'

export const responseSlice = createSlice({
  name: 'response',
  initialState: {
    value: {},
    totalScore: 0,
    responseCount: 0,
    chartData: [],
    responseData: {}
  },
  reducers: {
    updateResponse: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // update response with payload
      state.value[action.payload.questionId] = { ...action.payload }
      state.responseCount = Object.keys(state.value).length

      // score calculation
      state.value[action.payload.questionId].normalizedScore = normalizeScore(
        state.value[action.payload.questionId].score
      )

      // data for Aster Chart
      state.chartData = calculateChartScore(state.value)

      //total score calculation
      state.totalScore = totalScore(state.value)

      // generate Summary based on score
      state.responseData = calculateResponseSummary(state.value)

      console.log('response: ', current(state).value)
      // console.log('chart data: ', current(state).chartData)
      // console.log('response data: ', current(state).responseData)
      // console.log('total score: ', current(state).totalScore)
    }
  }
})

export const { updateResponse } = responseSlice.actions

export const selectResponse = (state) => state.response.value
export const selectResponseCount = (state) => state.response.responseCount
export const selectTotalScore = (state) => state.response.totalScore
export const selectChartData = (state) => state.response.chartData
export const selectResponseData = (state) => state.response.responseData

export default responseSlice.reducer
