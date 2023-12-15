import moment from "moment"

export function generateDaysArray(currentDate: string) {
  const startDay = moment(currentDate)
    .startOf("month")
    .startOf("week")
    .subtract(1, "day")
  const day = startDay.clone()
  return [...Array(42)].map(() => day.add(1, "day").clone())
}
