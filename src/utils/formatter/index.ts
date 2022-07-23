import dayjs from 'dayjs'

function utcToLocal(utcString: string, formatTemplate = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(utcString).format(formatTemplate)
}

export { utcToLocal }
