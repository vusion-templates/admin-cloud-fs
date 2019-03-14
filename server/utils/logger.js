/**
 * Simple Logger
 */

'use strict';

const chalk = require('chalk');
const moment = require('moment');

const noop = (s) => s;

const LOG_LEVEL = {
    DEBUG: 1,
    VERBOSE: 2,
    INFO: 3,
    IMP: 4,
    WARN: 5,
    ERROR: 6,
    FATAL: 7,
};

const LOG_LEVEL_LABEL = {
    1: 'DEBUG',
    2: 'VERBOSE',
    3: 'INFO',
    4: 'IMP',
    5: 'WARN',
    6: 'ERROR',
    7: 'FATAL',
};

const LOG_LEVEL_COLOR = {
    1: chalk.gray,
    2: chalk.cyan,
    3: chalk.blue,
    4: chalk.magenta,
    5: chalk.yellow,
    6: chalk.red,
    7: chalk.red,
};

class Log {
    constructor(tag, identifier) {
        this.tag = tag;
        this.identifier = identifier;
    }

    /**
     * 输出日志消息
     * @private
     * @param   {LogEntry}  entry   日志
     */
    _write(entry) {
        const log = this._format(entry);
        if (entry.priority >= LOG_LEVEL.ERROR)
            console.error(log);
        else
            console.log(log);
    }

    /**
     * 格式化日志输出
     * @private
     * @param   {LogEntry}  entry   日志
     * @returns {String}    格式化后的日志
     */
    _format(entry) {
        if (this.formatter)
            return this.formatter(entry);

        return `[${chalk.gray(moment().format('YYYY-MM-DD HH:mm:ss'))}] ${chalk.bold(LOG_LEVEL_COLOR[entry.priority](entry.priorityLabel))}/${entry.tag || ''} ${entry.identifier ? '<' + entry.identifier + '>' : ''}${entry.message}`;
    }

    _entry(priority, message) {
        return new LogEntry(
            moment(),
            priority,
            this.tag,
            process.pid,
            this.identifier,
            message
        );
    }

    debug(message) {
        this._write(this._entry(LOG_LEVEL.DEBUG, message));
    }

    verbose(message) {
        this._write(this._entry(LOG_LEVEL.VERBOSE, message));
    }

    info(message) {
        this._write(this._entry(LOG_LEVEL.INFO, message));
    }

    important(message) {
        this._write(this._entry(LOG_LEVEL.IMP, message));
    }

    warn(message) {
        this._write(this._entry(LOG_LEVEL.WARN, message));
    }

    error(message) {
        this._write(this._entry(LOG_LEVEL.ERROR, message));
    }

    fatal(message) {
        this._write(this._entry(LOG_LEVEL.FATAL, message));
    }

    static createLogger(tag) {
        return new Log(tag);
    }
}

class LogEntry {
    constructor(timestamp, priority, tag, pid, identifier, message) {
        this.timestamp = timestamp;
        this.priority = priority;
        this.priorityLabel = LOG_LEVEL_LABEL[priority] || 'UNKNOWN';
        this.tag = tag;
        this.pid = pid;
        this.identifier = identifier;
        this.message = message;
    }
}

module.exports = Log;
module.exports.LogEntry = LogEntry;
