import getTimePeriods from './getTimePeriods'

/**
 * @param {Object} periods Return value from getTimePeriods
 * @param excludePeriods Key list for the object values of that exclude the periods
 * @return {string} '14h 3m 4s'
 */
const formatTimePeriod = (
  periods: ReturnType<typeof getTimePeriods>,
  excludePeriods: string[] = []
) => {
  const textArr: string[] = []

  Object.keys(periods).forEach((period) => {
    if (
      periods[period as keyof typeof periods] > 0 &&
      !excludePeriods.includes(period)
    ) {
      textArr.push(
        `${periods[period as keyof typeof periods]}${period.substr(0, 1)}`
      )
    }
  })

  if (textArr.length === 0) {
    return null
  }

  return textArr.join(' ')
}

export default formatTimePeriod
