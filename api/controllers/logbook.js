const request = require('request');
const cheerio = require('cheerio');
const logbookService = require('../service/logbook');
const {
  url: LP,
  loginFlag: FLAG,
} = require('../constants/logbook');
const {
  logRed,
  logGreen,
  logBlue,
  logBlack,
  statusMessage
} = require('../../lib/console');

const checkLoginSuccess = (flag) => {
  logGreen('Checking login success...');
  const flagList = Object.values(FLAG);
  const result = flagList.find( (flagL) => flagL == flag);
  if (!result) return false;
  return true;
};

const setCookie = (cookie) => {
  logGreen('Set cookie...');
  let setCookie = cookie;
  const jar = request.jar();
  jar.getCookies(LP.BASE);
  if (!(setCookie instanceof Array)) setCookie = [setCookie];
  setCookie.forEach( (cookie) => {
    jar.setCookie(cookie, LP.BASE);
  });
  return jar;
};

// const updateCookie = (line_id, jar) => {
//   console.log('Update cookie...');
//   return logbookService.getBase(jar)
//   .then( (res) => {
//     const cookie = res.headers['set-cookie'];
//     const setCookie = JSON.stringify({cookie});
//     return userService.updateCookie(line_id, setCookie)
//     .catch( (err) => console.log(err));
//   });
// };

// LOGIN LOGBOOK
module.exports.login = async (req, h) => {
  logGreen('LOGBOOK CONTROLLER - LOGIN');
  const { username, password } = req.payload;
  const jar = request.jar();
  const loginPage = await logbookService.getLogin(jar);
  const $ = cheerio.load(loginPage.body);
  const _token = $('.ui.large.form.shadow.login-form input').attr('value');
  const form = { _token, username, password };
  console.log(form)
  return logbookService.postLogin(jar, form)
  .then( async (res) => {
    const $ = cheerio.load(res.body);
    const CheckLogin = await checkLoginSuccess($('.item.active').first().text());
    if (CheckLogin != true) return statusMessage(501, 'Login Failed, Contact Admin!', true);
    const cookie = JSON.stringify({cookie:res.headers['set-cookie']});
    const data = { cookie };
    return statusMessage(200, 'Login succesfully!', false, data);
  }).catch( (err) => statusMessage(500, err.message, true));
};

// CHECK LOGBOOK
module.exports.checkLogbook = async (req, h) => {
  logGreen('LOGBOOK CONTROLLER - CHECK LOGBOOK STATUS');
  const { cookie } = req.payload;
  const jar = await setCookie(JSON.parse(cookie).cookie);
  return logbookService.getInsertLogbook(jar)
  .then( async (res) => {
    const $ = cheerio.load(res.body);
    const statusLogbook = $('.ui.orange.message div.header').text();
    if (statusLogbook) return statusMessage(200, statusLogbook.trim(), false);
    const filledLogbook = $('.ui.segment div.ui.header').text();
    let detailText = '';
    await $('.ui.compact.table tr td').slice(0, 8).each(function(i, elem) {
      detailText = detailText + $(elem).text() + '\n';
    })
    console.log(detailText)
    const data = { logbookDetail:detailText.trim() };
    return statusMessage(200, filledLogbook.trim(), false, data);
  }).catch( (err) => statusMessage(500, err.message, true));
};

// INSERT LOG BOOK
module.exports.insertLogbook = async (req, h) => {
  logGreen('LOGBOOK CONTROLLER - INSERT LOGBOOK');
  const { cookie, clock_in, clock_out, activity, description } = req.payload;
  const jar = await setCookie(JSON.parse(cookie).cookie);
  return logbookService.getInsertLogbook(jar)
  .then( (res) => {
    const $ = cheerio.load(res.body);
    const _token = $('.ui.form input').first().attr('value');
    const form = {
      _token,
      ['clock-in']: clock_in,
      ['clock-out']: clock_out,
      activity,
      description,
    };
    return logbookService.postInsertLogbook(jar, form)
    .then( (res) => {
      const $ = cheerio.load(res.body);
      const statusSuccess = $('.ui.success.message div.header').text()
      if (statusSuccess) return statusMessage(200, statusSuccess.trim(), false);
      return statusMessage(500, 'Failed to insert logbook, Contact Admin!', true)
    }).catch( (err) => statusMessage(500, err.message, true));
  })
};