import { createLogger, format, transports } from 'winston'
import chalk from 'chalk'
const { combine, timestamp, label, printf } = format

const outputFormat = printf(({ level, message, timestamp }) => {
  return chalk`{dim ${timestamp}} {inverse ${level}}  ${message}`
})

export default createLogger({
  format: combine(
    timestamp(),
    outputFormat
  ),
  transports: [new transports.Console()]
})
