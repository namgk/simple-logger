var Log = require('./log'),
  log = Log.createLogger('TEST');

log.debug('from config debug\n');
log.info('from config');
log.warn('from config warn ' + 88)
log.error('\t from config error');
log.fatal(999);

log.setLevel(Log.STDOUT);
log.debug('to stdout\n');
log.info('to stdout');
log.warn('to stdout warn ' + 88)
log.error('\t to stdout error');
log.fatal(999);

log.setLevel(Log.DEBUG);
log.debug('debug \n');
log.info('hi');
log.warn('warn ' + 88)
log.error('\t got error');
log.fatal(999);

log.setLevel(Log.INFO);
log.debug('BUG ALERT!');
log.info('hi');
log.warn('warn ' + 88)
log.error('\t got error');
log.fatal(999);

log.setLevel(Log.WARN);
log.debug('BUG ALERT!');
log.info('BUG ALERT!');
log.warn('warn ' + 88)
log.error('\t got error');
log.fatal(999);

log.setLevel(Log.ERROR);
log.debug('BUG ALERT!');
log.info('BUG ALERT!');
log.warn('BUG ALERT!')
log.error('\t got error');
log.fatal(999);

log.setLevel(Log.FATAL);
log.debug('BUG ALERT!');
log.info('BUG ALERT!');
log.warn('BUG ALERT!');
log.error('BUG ALERT!');
log.fatal(999);	

log.setFile('default.log');
log.setLevel(Log.INFO);
log.info('this creates new file in current directory');
