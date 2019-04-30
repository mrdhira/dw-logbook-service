const userService = require('../../../service/user');
const logbookService = require('../../../service/logbook');
const Promise = require('bluebird');
const Request = require('request');
const { url: LP } = require('../../../constants/logbook');

/**
 * Cron job name
 * @type {string}
 */
const name = 'REFRESH ALL USER COOKIE!';

/**
 * Rule definition for job scheduling (in UTC)
 * @type {cron} seconds rule supported
 */
const rule = '0 15 * * * *';
const tz = 'Asia/Jakarta';

const setCookie = (cookie) => {
  console.log('Set cookie...');
  const setCookie = cookie;
  const jar = Request.jar();
  jar.getCookies(LP.BASE);
  if (!(setCookie instanceof Array)) setCookie = [setCookie];
  setCookie.forEach( (cookie) => {
    jar.setCookie(cookie, LP.BASE);
  });
  return jar;
};

const updateCookie = (line_id, jar) => {
  console.log(`Update cookie: ${line_id}...`);
  return logbookService.getBase(jar)
  .then( (res) => {
    const cookie = res.headers['set-cookie'];
    const setCookie = JSON.stringify({cookie});
    return userService.updateCookie(line_id, setCookie)
    .catch( (err) => console.log(err));
  });
};

/**
 * The job that will be run
 * @type {func}
 */
const job = () => {
  console.log(`CRON ${name} is running...`);
  return userService.findAllUser()
  .then( (userList) => {
    if (userList && userList.length > 0) {
      return Promise.mapSeries( userList, async (user) => {
        if (user.cookie) {
          const jar = await setCookie(JSON.parse(user.cookie).cookie);
          return updateCookie(user.line_id, jar); 
        };
      });
    }
  });
};

module.exports = {
  name,
  enable: true /* Simple switch to enable/disable jobs */,
  cronjob: { rule, job, tz }, /* export cronjob parts */
};
