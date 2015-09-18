var fs = require('fs'),
  config = require('./config');

var DEBUG = 5,
    INFO = 4,
    WARN = 3,
    ERROR = 2,
    FATAL = 1,
    STDOUT = 0;

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
      Level + ': ' + msg;
}

function log(msg, logger, type){
  msg = logger.TAG + ': ' + msg;
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
  if (logger.level === 0)
    console.log(msg);
  if (logger.level >= type)
    try {
      fs.appendFile(logger.file, msg + '\n', function(err){
        if (err !== null) console.log('Invalid log file (' + logger.file + ')! ' + msg)
      });
    } catch (e){
      console.log('Invalid log file (' + logger.file + ')! ' + msg);      
    }
}

function Log(tag){
  this.TAG = tag;
  this.file = config.LOG_FILE;
  this.level = config.LOG_LEVEL;
}

Log.prototype.info = function(msg){
  log(msg, this, INFO);
};
Log.prototype.debug = function(msg){
  log(msg, this, DEBUG);
};
Log.prototype.warn = function(msg){
  log(msg, this, WARN);
};
Log.prototype.error = function(msg){
  log(msg, this, ERROR);
};
Log.prototype.fatal = function(msg){
  log(msg, this, FATAL);
};
Log.prototype.setLevel = function(level){
  if (level === STDOUT || 
    level === FATAL || 
    level === ERROR || 
    level === WARN || 
    level ===INFO || 
    level === DEBUG)
    this.level = level;
};
Log.prototype.setFile = function(file){
  this.file = file;
}

module.exports = Log;
module.exports.INFO = INFO;
module.exports.DEBUG = DEBUG;
module.exports.ERROR = ERROR;
module.exports.WARN = WARN;
module.exports.FATAL = FATAL;
module.exports.STDOUT = STDOUT;

module.exports.createLogger = function(tag){
    return new Log(tag);
}
