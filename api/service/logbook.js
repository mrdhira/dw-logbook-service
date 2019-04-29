const Request = require('request');
const Promise = require('bluebird');
const Get = Promise.promisify(Request.get);
const Post = Promise.promisify(Request.post);
const { url: LP } = require('../constants/logbook');

module.exports.getBase = (jar) => {
  console.log('LOGBOOK SERVICE - Get base...');
  return Get( LP.BASE, { jar} );
};

module.exports.getLogin = (jar) => {
  console.log('LOGBOOK SERVICE - Get login...');
  return Get( LP.LOGIN, { jar } );
};

module.exports.postLogin = (jar, form) => {
  console.log('LOGBOOK SERVICE - Post login...');
  return Post( LP.LOGIN, { jar, followAllRedirects: true, form } );
};

module.exports.getInsertLogbook = (jar) => {
  console.log('LOGBOOK SERVICE - Get insert logbook...');
  return Get( LP.INSERT_LOGBOOK, { jar } );
};

module.exports.postInsertLogbook = (jar, form) => {
  console.log('LOGBOOK SERVICE - Post insert logbook...');
  return Post( LP.INSERT_LOGBOOK, { jar, followAllRedirects: true, form } );
};