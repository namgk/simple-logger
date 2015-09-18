var fs = require('fs'),
  config = require('./config');

var DEBUG = 5,
    INFO = 4,
    WARN = 3,
    ERROR = 2,
    FATAL = 1;

var logFile = config.LOGFILE;
var level = config.LOGLEVEL;

function makeMsg(msg, Level){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var sec = date.getSeconds();

    return year + '/' + month + '/' + day + '-' + 
      hour + ':' + minute + ':' + sec + ' ' + 
      Level + ': ' + msg + '\n';
}

function log(type){
  return function(msg){
    msg = this.TAG + ': ' + msg;
    switch (type){
      case ERROR:
        msg = makeMsg(msg, 'ERROR');
        break;
      case DEBUG:
        msg = makeMsg(msg, 'DEBUG');
        break;
      case INFO:
        msg = makeMsg(msg, 'INFO');
        break;
      case WARN:
        msg = makeMsg(msg, 'WARN');
        break;
      case FATAL:
        msg = makeMsg(msg, 'FATAL');
        break;
      default:
        msg = makeMsg(msg, 'INFO');
        break;

    }    
    if (level === 0)
      console.log(msg);
    if (level >= type)
      fs.appendFile(logFile, msg, console.log);
  }

}

function Log(tag){
  this.TAG = tag;
}

Log.prototype.info = log(INFO);
Log.prototype.debug = log(DEBUG);
Log.prototype.ward = log(WARN);
Log.prototype.error = log(ERROR);
Log.prototype.fatal = log(FATAL);

module.exports = Log;
module.exports.createLogger = function(tag){
    return new Log(tag);
}