export interface ILogger {
    /**
     *
     */
    log(...messages: any[]): void;

    /**
     * The most fine-grained information only used in rare cases where you need the full visibility of what is happening in your application
     * and inside the third-party libraries that you use.
     */
    trace(...messages: any[]): void;

    /**
     * Relatively detailed tracing used by application developers. The exact meaning of the three debug levels varies among subsystems.
     */
    debug(...messages: any[]): void;

    /**
     * Informational messages that might make sense to end users and system administrators, and highlight the progress of the application.
     */
    info(...messages: any[]): void;

    /**
     * Potentially harmful situations of interest to end users or system managers that indicate potential problems.
     */
    warn(...messages: any[]): void;

    /**
     * Error events of considerable importance that will prevent normal program execution, but might still allow the application to continue running.
     */
    error(...messages: any[]): void;
}
