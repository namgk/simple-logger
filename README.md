# simple-logger

$ npm install --save kb-logger

```javascript
var Logger = require('kb-logger');

var log = Logger.createLogger('KEEBOO');
log.setFile(config.LOG_FILE);
log.setLevel(config.LOG_LEVEL);

log.info('info');
log.info('info');
log.info('info');
log.info('info');
```
