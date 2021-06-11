import { createSlice, current } from '@reduxjs/toolkit'
import data from '@/data/index.json'
import { flatten } from 'lodash-es'

const totalQuestionCount = data.reduce(
  (accumulator, currentValue) => accumulator + currentValue.question.length,
  0
)

const questions = flatten(data.map((section) => section.question))

export const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    currentQuestionId: 0,
    currentSection: null,
    progressBarState: false,
    totalQuestionCount: totalQuestionCount
  },
  reducers: {
    updateCurrentQuestionId: (state, action) => {
      if (current(state).currentQuestionId === action.payload) return

      state.currentQuestionId = action.payload

      if (action.payload === 0) {
        state.currentSection = null
      } else {
        const currentQuestionObj = questions.find((d) => d.questionId === action.payload)
        state.currentSection = currentQuestionObj.name.split('/')[0]
      }

      // console.log('currentQuestionId: ', current(state).currentQuestionId)
      // console.log('currentSection: ', current(state).currentSection)
    },
    updateProgressBarState: (state, action) => {
      state.progressBarState = action.payload
    }
  }
})

export const { updateCurrentQuestionId, updateProgressBarState } = progressSlice.actions

export const selectCurrentQuestionId = (state) => state.progress.currentQuestionId
export const selectTotalQuestionCount = (state) => state.progress.totalQuestionCount
export const selectCurrentSection = (state) => state.progress.currentSection
export const selectProgressBarState = (state) => state.progress.progressBarState

export default progressSlice.reducer
