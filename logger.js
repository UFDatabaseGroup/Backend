const winston = require('winston');
const { format, transports } = winston;
const { formatWithOptions } = require('util');

// import { LOG_LEVEL, LOG_COLORS } from './config';
const LOG_LEVEL = process.env.LOG_LEVEL ?? 'debug';
const LOG_COLORS = true; // env this maybe

const FORMAT_OPTIONS = {
  depth: null,
  maxArrayLength: null,
  colors: LOG_COLORS
};

let logger = winston.createLogger({
  level: LOG_LEVEL,
  transports: [
    new transports.Console()
  ],
  format: format.combine(
    LOG_COLORS
      ? format.colorize()
      : format.uncolorize(),
    format.printf(info => {
      // @ts-ignore typescript pls
      let splat = info[Symbol.for('splat')];
      return [
        `${info.level}:`,
        splat
          ? formatWithOptions(FORMAT_OPTIONS, info.message, ...splat)
          : formatWithOptions(FORMAT_OPTIONS, info.message)
      ].join(' ');
    })
  )
});

module.exports = logger;
