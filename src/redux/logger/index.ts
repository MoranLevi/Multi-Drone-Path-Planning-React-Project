import { createLogger } from 'redux-logger';
import { AppPackageName } from 'src/constants/AppPackageName';
import { LoggerFactory } from 'src/logger';

export const reduxLogger = createLogger({
    collapsed: true,
    diff: true,
    level: '',
    timestamp: true,
    logger: {
      log: (message?: string, ...optionalParams: any[]) => 
      {
        if (message?.startsWith('action')) {
          const pattern = '%c'
          const start = message.indexOf(pattern)
          const end = message.lastIndexOf(pattern)
          const actionType = message.substring(start + pattern.length, end - 1)

          const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.REDUCERS)
          LOG.log(actionType)
        }
        else if (message === '%c CHANGED:') {
          const actionChange = optionalParams.slice(1).join(' ')

          const LOG = LoggerFactory.getLogger(AppPackageName.SRC.REDUX.REDUCERS)
          LOG.log(actionChange)
        }
      }
    }
  })