'use strict';
const logger = require("./common/logging/common-logging");

module.exports.handler = async (event) => {
    logger.info(event, "EventInfo");

    // event에 담겨있는 값 확인
    logger.debug(event, JSON.stringify(event));

    // 비지니스 로직 진행
    await require('./service/email').sendEmail(event);
};
