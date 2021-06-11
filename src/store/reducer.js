import { combineReducers } from 'redux'
import responseReducer from '@/store/slices/responseSlice'
import progressReducer from '@/store/slices/progressSlice'

const rootReducer = combineReducers({
  response: responseReducer,
  progress: progressReducer
})

export default rootReducer
