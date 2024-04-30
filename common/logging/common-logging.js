'use strict';

module.exports.debug = async (event, message, appendJsonName, appendJson) => {
    console.debug(parseLoggingData("DEBUG", event, message, appendJsonName, appendJson));
};

module.exports.info = async (event, message, appendJsonName, appendJson) => {
    console.info(parseLoggingData("INFO", event, message, appendJsonName, appendJson));
};

module.exports.warn = async (event, message, appendJsonName, appendJson) => {
    console.warn(parseLoggingData("WARN", event, message, appendJsonName, appendJson));
};

module.exports.error = async (event, message, appendJsonName, appendJson) => {
    console.error(parseLoggingData("ERROR", event, message, appendJsonName, appendJson));
};

// 공통 firehose 로깅 처리
function parseLoggingData(logLevel, event, message, appendJsonName, appendJson) {
    let loggingData = {
        "timestamp": new Date(),
        "profile": process.env.PROFILE,
        "level": logLevel,
        "service": process.env.SERVICE,
        "message": message
    };

    if (event !== undefined) {
        // request 요청 정보
        if (event['resource'] !== undefined) {
            loggingData['resource'] = event['resource'];
        }

        if (event['path'] !== undefined) {
            loggingData['path'] = event['path'];
        }

        if (event['httpMethod'] !== undefined) {
            loggingData['method'] = event['httpMethod'];
        }

    }

    if (appendJsonName !== undefined && appendJsonName !== "" && appendJson !== undefined) {
        loggingData[appendJsonName] = appendJson;
    }

    return JSON.stringify(loggingData);
};

