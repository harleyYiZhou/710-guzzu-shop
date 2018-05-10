var util=require('./util.js');

function signinWithEmail(param){
  return util.callApi('Auth.signinWithEmail', param);
}

function getCurrentSession(param){
  return util.callApi('Auth.getCurrentSession', param);
}

function consumeTicket(param){
  return util.callApi('UserTicket.consume', param);
}

function getUserTicket(param){
  return util.callApi('UserTicket.get', param);
}

function signout(param){
  return util.callApi('Auth.signout', param);
}

function getByUserId(param){
  return util.callApi('Customer.getByUserId', param);
}

module.exports={
  signinWithEmail: signinWithEmail,
  getCurrentSession: getCurrentSession,
  consumeTicket: consumeTicket,
  getUserTicket: getUserTicket,
  signout: signout,
  getByUserId: getByUserId
}