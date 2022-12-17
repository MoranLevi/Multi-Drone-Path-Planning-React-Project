import loglevel, { LogLevelDesc } from 'loglevel';
import { AppPackageName } from 'src/constants';
import { ILogger } from './ILogger';

export enum ELogLevel {
    TRACE   = 'TRACE',
    DEBUG   = 'DEBUG',
    INFO    = 'INFO',
    WARN    = 'WARN',
    ERROR   = 'ERROR',
    SILENT  = 'SILENT'
}

const DEFAULT_LOG_LEVEL = ELogLevel.DEBUG
const LOGLEVEL_PREFIX = 'loglevel:'

export interface ILoggerConfiguration {
    loggerName: string
    loggerLevel: LogLevelDesc
}

const getCachedLogLevel = (cachedLogLevelValue: string | null) => {
    return Object.values(ELogLevel).find(logLevel => logLevel.toUpperCase() === cachedLogLevelValue?.toUpperCase())
}

const getLoggerConfiguration = (loggerName: string, loggerLevel: ELogLevel = DEFAULT_LOG_LEVEL): ILoggerConfiguration => {
    return { loggerName, loggerLevel }
}

const DEFAULT_LOGGER_CONFIG: ILoggerConfiguration[] = [

]

export const LoggerFactory = {
    init: (initialConfig: ILoggerConfiguration[] = []) => {
        const LOG = LoggerFactory.getLogger(AppPackageName.SRC.LOGGER)

        // Set format for ALL loggers
        const originalFacroty = loglevel.methodFactory
        loglevel.methodFactory = (methodName: string, level: loglevel.LogLevelNumbers, loggerName: string | symbol) => {
            const rawMethod = originalFacroty(methodName, level, loggerName)
            return (message?: any, ...optionalParams: any[]) => {
                const formattedMessage = `${methodName.toUpperCase()} [${String(loggerName)}] ${message}`
                rawMethod(formattedMessage, ...optionalParams)
            }
        }

        LOG.info(`loglevel init - DEFAULT_LOG_LEVEL = ${DEFAULT_LOG_LEVEL}`)

        // Set log level for ALL loggers (can be spesificlly overriden)
        loglevel.setLevel(DEFAULT_LOG_LEVEL)

        // Listen on localStorage changes and update logger accordingly
        window.addEventListener('storage', ({ key, oldValue, newValue }: StorageEvent) => {
            if (key === null || newValue === null) {
                // Logger name and level cannot be null
                LOG.warn(`EventListener storage`, { key, oldValue, newValue })
                return
            }
            
            const loggerLevel = getCachedLogLevel(newValue)
            if (loggerLevel === undefined) {
                // Logger level is invalid - overide it to the old log level or default
                LOG.warn(`EventListener storage - ELogLevel cannot be found from localStorage newValue = ${newValue}`)
                localStorage.setItem(key, oldValue || DEFAULT_LOG_LEVEL)
                return
            }

            // Update the (single) logger configuration that changed
            LoggerFactory.updateConfiguration([{ 
                loggerName: key.slice(LOGLEVEL_PREFIX.length), 
                loggerLevel 
            }])
        }, true)

        // Fire the first logger configuration update
        LoggerFactory.updateConfiguration(initialConfig)
    },
    updateConfiguration: (config: ILoggerConfiguration[]) => {
        config.forEach(({ loggerName, loggerLevel }) => {
            const logger = loglevel.getLogger(loggerName)
            logger.setLevel(loggerLevel, true)
            const cachedLogLevelValue = localStorage.getItem(LOGLEVEL_PREFIX + loggerName)
            const cachedLogLevel = getCachedLogLevel(cachedLogLevelValue)
            if (cachedLogLevel) {
                // Set the lovalStorage already defined level
                logger.setLevel(cachedLogLevel, true)
            } 
            else {
                // No level defined yet, set level from 'config'
                logger.setLevel(loggerLevel, true)
            }
        })
    },
    getLogger: (namespace: string = ''): ILogger => {
        return loglevel.getLogger(namespace)
    }
};
