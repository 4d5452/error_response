/*
 * Available log levels (constants are available)
 *  fatal (60): service will stop
 *  error (50): fatal for paticular request, service will continue
 *  warn (40): note on something that may be of importance
 *  info (30): regular operation
 *  debug (20): too verbose for info
 *  trace (10): logging for external libraries
 *
 * Period Format and Options
 *  $number$scope
 *    $scope := ms, h, d, w, m and y
 *  OR
 *  hourly, dily, weekly, monthly, yearly
 *
 * GIT := <https://github.com/trentm/node-bunyan
 */
const bunyan = require('bunyan');

const LOG_FOLDER_PATH = './logs';
const ERROR_PERIOD = "hourly";
const INFO_PERIOD = "hourly";
const DEBUG_PERIOD = "60000ms" // 60secs

module.exports = (name) => {
  return {
    name: name,
    streams: [
      {
        type: 'rotating-file',
        path: `${LOG_FOLDER_PATH}/error.log`,
        level: bunyan.WARN,
        period: '1d',
        count: 1,
        name: 'error',
        period: ERROR_PERIOD
      },{
        type: 'rotating-file',
        path: `${LOG_FOLDER_PATH}/info.log`,
        level: bunyan.INFO,
        period: '1d',
        count: 1,
        name: 'info',
        period: INFO_PERIOD
      },{
        type: 'rotating-file',
        path: `${LOG_FOLDER_PATH}/debug.log`,
        level: bunyan.DEBUG,
        count: 1,
        name: 'debug',
        period: DEBUG_PERIOD
      }
    ]
  };
};
