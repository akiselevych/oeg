// Libs
import { bindActionCreators } from "@reduxjs/toolkit"
// Hooks
import { useMemo } from "react"
import { useDispatch } from "react-redux"
// Components
import { calendarSlice } from "reduxFolder/slices/Calendar.slice"

const rootActions = {
  ...calendarSlice.actions,
}

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => {
    return bindActionCreators(rootActions, dispatch)
  }, [dispatch])
}
