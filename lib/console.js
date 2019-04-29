const Chalk = require('chalk');

module.exports.logRed = (text) => 
  console.log(Chalk.red.bold(text))

module.exports.logGreen = (text) =>
  console.log(Chalk.green.bold(text));

module.exports.logBlue = (text) =>
  console.log(Chalk.blue.bold(text));

module.exports.logBlack = (text) =>
  console.log(Chalk.black.bold(text));

module.exports.statusMessage = (statusCode, message, error, data) => {
  console.log({ statusCode, message, error, data });
  return { statusCode, message, error, data };
};