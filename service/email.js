'use strict';

// common js import
const logger = require('../common/logging/common-logging');

module.exports.sendEmail = (event) => {
    // 템플릿 조회
    logger.info(event, "템플릿 조회!!!!");
    // SES 전송
    logger.info(event, "SES 전송!!!!");
};

